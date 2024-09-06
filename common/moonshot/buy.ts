import { VersionedTransaction } from '@solana/web3.js';
import { getBuyTransaction } from '.';

export const buy = async ({ publicKey, amount, signTransaction, connection, mintAddress }: { publicKey: any, amount: number, signTransaction: any, connection: any, mintAddress: string }): Promise<string> => {
  console.log('--- Buying token example ---');
  const blockhash = await connection.getLatestBlockhash('confirmed')
  const transaction = await getBuyTransaction({ mintAddress, amount, publicKey: publicKey.toBase58(), blockhash })
  const signedTx = await signTransaction(VersionedTransaction.deserialize(transaction))

  try {
    const txHash = await connection.sendTransaction(signedTx, {
      skipPreflight: false,
      maxRetries: 0,
      preflightCommitment: 'confirmed',
    });

    console.log('Buy Transaction Hash:', txHash);
    return txHash;
  } catch (error) {
    console.log(error)
    
    return 'failed'
  }
}
