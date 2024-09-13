'use server'

import { TransactionMessage } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { VersionedTransaction } from "@solana/web3.js";
import { ComputeBudgetProgram } from "@solana/web3.js";
import { Environment, FixedSide, Moonshot } from "@wen-moon-ser/moonshot-sdk";

export const getBuyTransaction = async ({ mintAddress, amount, publicKey, blockhash }: any) => {
  try {
    const pk = new PublicKey(publicKey)
    const rpcUrl = `${process.env.HELIUS_RPC_URL}/?api-key=${process.env.HELIUS_API_KEY}`;
    console.log('rpcUrl', rpcUrl)
    const moonshot = new Moonshot({
      rpcUrl,
      environment: Environment.MAINNET,
      chainOptions: {
        solana: { confirmOptions: { commitment: 'confirmed' } },
      },
    });
    console.log('a', mintAddress)
    const token = moonshot.Token({
      mintAddress,
    });
    console.log('b')
    console.log('token', token)
    const curvePos = await token.getCurvePosition();
    console.log('Current position of the curve: ', curvePos); // Prints the current curve position

    // make sure creator has funds

    const tokenAmount = BigInt(amount) * 1000000000n; // Buy 10k tokens
    // Buy example
    const collateralAmount = await token.getCollateralAmountByTokens({
      tokenAmount,
      tradeDirection: 'BUY',
    });
    const { ixs } = await token.prepareIxs({
      slippageBps: 500,
      creatorPK: pk.toBase58(),
      tokenAmount,
      collateralAmount,
      tradeDirection: 'BUY',
      fixedSide: FixedSide.OUT, // This means you will get exactly the token amount and slippage is applied to collateral amount
    });
    const priorityIx = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 400_000,
    });

    const messageV0 = new TransactionMessage({
      payerKey: pk,
      recentBlockhash: blockhash.blockhash,
      instructions: [priorityIx, ...ixs],
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messageV0);
  
    return transaction.serialize()
  } catch (e) {
    console.log(e)
  }
}

export const getSellTransaction = async ({ mintAddress, amount, publicKey, blockhash }: any) => {
  const rpcUrl = `${process.env.HELIUS_RPC_URL}/?api-key=${process.env.HELIUS_API_KEY}`;
  const pk = new PublicKey(publicKey)
  const moonshot = new Moonshot({
    rpcUrl,
    environment: Environment.MAINNET,
    chainOptions: {
      solana: { confirmOptions: { commitment: 'confirmed' } },
    },
  });
  
  const token = moonshot.Token({
    mintAddress,
  });

  const curvePos = await token.getCurvePosition();
  console.log('Current position of the curve: ', curvePos); // Prints the current curve position

  // make sure creator has funds

  const tokenAmount = BigInt(amount) * 1000000000n; // Buy 10k tokens

  // Buy example
  const collateralAmount = await token.getCollateralAmountByTokens({
    tokenAmount,
    tradeDirection: 'SELL',
  });

  const { ixs } = await token.prepareIxs({
    slippageBps: 500,
    creatorPK: publicKey,
    tokenAmount,
    collateralAmount,
    tradeDirection: 'SELL',
    fixedSide: FixedSide.IN, // This means you will pay exactly the token amount slippage is applied to collateral amount
  });

  const priorityIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 200_000,
  });

  const messageV0 = new TransactionMessage({
    payerKey: pk,
    recentBlockhash: blockhash.blockhash,
    instructions: [priorityIx, ...ixs],
  }).compileToV0Message();

  const transaction = new VersionedTransaction(messageV0);

  return transaction.serialize()
}
