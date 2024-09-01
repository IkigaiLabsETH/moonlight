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

  return ['ggqds6nc4wh8vzehkwkk85gunkdxapnhzkzh1jtteask', '6gvwska7snjdn4mqv7ydn4q7ayvnso2ax4tngjbg7cct', 'hmkdgd3mpigz1bthtjevjplhtvslhiqmbjvcazafq4s7', '43uhykfm8y9glvhrws7r7w1hcku6vikdi7j394fasfnz','em5swhrenpvmq6m8oad3ib5k4xeax1ycvxrdnnagtfcd','chtytncjbo5gr3irexbxeujrrucsvvsejlvzmtpf3x8a','2x1d1wrifyxglnj5mc7bj3tjurudhvvwdyq6u75vemsc','ho9nf7o2sefimwsfvudk1xj8yl7zbyhar4m6ugczajwd']
}
