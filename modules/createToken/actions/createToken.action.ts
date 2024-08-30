'use server'

import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { AnchorProvider } from "@coral-xyz/anchor";
import path from "path"

import { PumpFunSDK } from "@/libs/pumpdotfun-sdk";
import { CreateTokenResult } from "@/common/types";
import { getOrCreateKeypair } from "@/common/utils";
import { createMintKeyPair, getSPLBalance, printSOLBalance, printSPLBalance } from "@/common/utils/utils";

const KEYS_FOLDER = path.join(process.cwd(), '.keys');
const SLIPPAGE_BASIS_POINTS = BigInt(100);

export async function createToken(formData: FormData): Promise<CreateTokenResult | undefined> {

  const file = formData.get('file') as File
  let data = JSON.parse(formData.get('data') as string)
  data.image = file

  if (!process.env.HELIUS_RPC_URL) {
    return;
  }
  console.log(`${process.env.HELIUS_RPC_URL}/?api-key=${process.env.HELIUS_API_KEY}`) 
  const connection = new Connection(`${process.env.HELIUS_RPC_URL}/?api-key=${process.env.HELIUS_API_KEY}`);
  const wallet = new NodeWallet(new Keypair()); //note this is not used
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "finalized",
  });

  const testAccount = getOrCreateKeypair(KEYS_FOLDER, "test-account");
  const mint = createMintKeyPair(KEYS_FOLDER);

  await printSOLBalance(
    connection,
    testAccount.publicKey,
    "Test Account keypair"
  );

  const sdk = new PumpFunSDK(provider);

  const globalAccount = await sdk.getGlobalAccount();
  console.log(globalAccount);

  const currentSolBalance = await connection.getBalance(testAccount.publicKey);
  if (currentSolBalance == 0) {
    console.log(
      "Please send some SOL to the test-account:",
      testAccount.publicKey.toBase58()
    );
    return;
  }

  console.log(await sdk.getGlobalAccount());

  //Check if mint already exists
  let boundingCurveAccount = await sdk.getBondingCurveAccount(mint.publicKey);
  if (!boundingCurveAccount) {
    const { name, symbol, description, image } = data

    const tokenMetadata = {
      name,
      symbol,
      description,
      file: image as File,
    };

    const createResults = await sdk.createAndBuy(
      testAccount,
      mint,
      tokenMetadata,
      BigInt(0.0001 * LAMPORTS_PER_SOL),
      SLIPPAGE_BASIS_POINTS,
      {
        unitLimit: 250000,
        unitPrice: 250000,
      },
    );
    console.log("createResults", createResults);
    if (createResults.success) {
      console.log("Success:", `https://pump.fun/${mint.publicKey.toBase58()}`);
      boundingCurveAccount = await sdk.getBondingCurveAccount(mint.publicKey);
      console.log("Bonding curve after create and buy", boundingCurveAccount);
      printSPLBalance(connection, mint.publicKey, testAccount.publicKey);
    }
  } else {
    console.log("boundingCurveAccount", boundingCurveAccount);
    console.log("Success:", `https://pump.fun/${mint.publicKey.toBase58()}`);
    printSPLBalance(connection, mint.publicKey, testAccount.publicKey);
  }

  if (boundingCurveAccount) {
    //buy 0.0001 SOL worth of tokens
    let buyResults = await sdk.buy(
      testAccount,
      mint.publicKey,
      BigInt(0.0001 * LAMPORTS_PER_SOL),
      SLIPPAGE_BASIS_POINTS,
      {
        unitLimit: 250000,
        unitPrice: 250000,
      },
    );

    if (buyResults.success) {
      printSPLBalance(connection, mint.publicKey, testAccount.publicKey);
      console.log("Bonding curve after buy", await sdk.getBondingCurveAccount(mint.publicKey));
    } else {
      console.log("Buy failed");
    }

    //sell all tokens
    let currentSPLBalance = await getSPLBalance(
      connection,
      mint.publicKey,
      testAccount.publicKey
    );
    console.log("currentSPLBalance", currentSPLBalance);
    const { decimals } = data
    if (currentSPLBalance) {
      let sellResults = await sdk.sell(
        testAccount,
        mint.publicKey,
        BigInt(currentSPLBalance * Math.pow(10, decimals)),
        SLIPPAGE_BASIS_POINTS,
        {
          unitLimit: 250000,
          unitPrice: 250000,
        },
      );
      if (sellResults.success) {
        await printSOLBalance(
          connection,
          testAccount.publicKey,
          "Test Account keypair"
        );

        printSPLBalance(connection, mint.publicKey, testAccount.publicKey, "After SPL sell all");
        console.log("Bonding curve after sell", await sdk.getBondingCurveAccount(mint.publicKey));
      } else {
        console.log("Sell failed");
      }
    }
  }
  
  return {
    success: true
  }
}
