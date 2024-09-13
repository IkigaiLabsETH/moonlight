import { VersionedTransaction } from '@solana/web3.js';
import { getBuyTransaction } from '.';

export const buy = async ({ publicKey, amount, signTransaction, connection, mintAddress }: { publicKey: any, amount: number, signTransaction: any, connection: any, mintAddress: string }): Promise<string> => {
  console.log('--- Buying token example ---');
  try {
    const blockhash = await connection.getLatestBlockhash('confirmed')
    console.log('Blockhash:', blockhash.blockhash);
    const transaction = await getBuyTransaction({ mintAddress, amount, publicKey: publicKey.toBase58(), blockhash })
    if (!transaction) {
      return 'failed'
    }
    const signedTx = await signTransaction(VersionedTransaction.deserialize(transaction))
    const txHash = await connection.sendTransaction(signedTx, {
      skipPreflight: false,
      maxRetries: 0,
      preflightCommitment: 'confirmed',
    });

    console.log('Buy Transaction Hash:', txHash);
    return txHash;
    return ''
  } catch (error) {
    console.log(error)
    
    return 'failed'
  }
}
