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

  return ['F7bjKTh1hVGPuyAaKHwrUTThS3XPSj5LY8kBegKu8Z3H', 'Dvs4JL1xF1QBvNK5jGHTJJivKo1tMk5J2B3iXuR6PyrV']
}
