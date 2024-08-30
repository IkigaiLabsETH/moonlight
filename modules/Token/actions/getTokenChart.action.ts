export async function getTokenChart(address: string) {
  const chartRequest = await fetch(`http://161.35.212.32/chart/${address}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'nnvzkj9WyAt1XJfu',
    }
  })

  return chartRequest.text()
}
