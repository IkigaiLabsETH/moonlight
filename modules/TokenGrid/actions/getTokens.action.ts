import { Token } from "@/common/types"

export async function getTokens(): Promise<string[]> {
  // const mintedTokenTransactionsRequest = await fetch(`${process.env.HELIUS_API_URL}/v0/addresses/${process.env.WALLET_ADDRESS}/transactions?type=TOKEN_MINT&api-key=${process.env.HELIUS_API_KEY}`)
  // const mintedTokenTransactions = await mintedTokenTransactionsRequest.json()
  // const mintAccounts = mintedTokenTransactions.map((transaction: any) => {
  //   return transaction?.tokenTransfers[0]?.mint
  // })

  // const tokens = await fetch(`${process.env.HELIUS_API_URL}/v0/token-metadata?api-key=${process.env.HELIUS_API_KEY}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ mintAccounts: mintAccounts, includeOffChain: true })
  // })

  // return tokens.json()

  return ['a7jpm5unxa9o5ecvbhcqrr6zlczzcrucxr8bvybsgeto', 'euwgfageap4uddybpwvwjzplcryzemgr2pxxw8bji7e5', '2a6cadqwxqszsywkdp2jjgf9bwwg42dh3xgoye7f512r', 'e7rpjcn8sckkzjynjcpjup48ho29khgksfrorjyqms5c']
}
