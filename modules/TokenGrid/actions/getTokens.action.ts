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

  return ['GGqDS6Nc4wh8vZeHkwkk85gunkdXAPnHZKZH1jTTeASk', '6gvWSka7SnJDn4mqV7Ydn4q7AyVNSo2aX4TNGjBg7Cct', 'HmKdGD3mPiGz1BTHtjEvJpLhtvSLhiqmbjVcAZafQ4S7', '43uhykFm8Y9gLvHrWs7r7w1HCKu6vikDi7j394FaSfNz','Em5SwhRenPvmQ6M8oad3iB5K4xeaX1YCVxRdnNAgtFCd','ChTyTncJBo5gR3iReXbXeujrRUCsvVSEjLVzMtpF3x8a','2x1D1WRifYXGLNJ5MC7Bj3TJUruDhVvWdYQ6u75VemsC','Ho9nf7o2sEfimwSfvUDk1XJ8yL7zByHaR4m6uGCzAJWd']
}
