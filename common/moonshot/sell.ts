import {
  VersionedTransaction,
}  from '@solana/web3.js';
import { getSellTransaction } from '.';

export const sell = async ({ publicKey, amount, signTransaction, connection, mintAddress }: { publicKey: any, amount: number, signTransaction: any, connection: any, mintAddress: string }): Promise<string>=> {
  console.log('--- Selling token example ---');

  const blockhash = await connection.getLatestBlockhash('confirmed')
  const transaction = await getSellTransaction({ mintAddress, amount, publicKey, blockhash })

  const signedTx = await signTransaction(VersionedTransaction.deserialize(transaction));
  const txHash = await connection.sendTransaction(signedTx, {
    skipPreflight: false,
    maxRetries: 0,
    preflightCommitment: 'confirmed',
  });

  console.log('Sell Transaction Hash:', txHash);
  return txHash;
};
