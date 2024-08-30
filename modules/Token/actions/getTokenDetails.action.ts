export async function getTokenDetails(token: string): Promise<any> {
  const tokenDetailsRequest = await fetch(`http://161.35.212.32/token/${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'nnvzkj9WyAt1XJfu',
    }
  })

  return tokenDetailsRequest.json()
}
