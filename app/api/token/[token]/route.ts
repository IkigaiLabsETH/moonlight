import { fetchData } from '@coral-xyz/anchor/dist/cjs/utils/registry'
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params

  // const result = await fetch(`https://gmgn.ai/defi/quotation/v1/tokens/sol/${token}`)
  const result = await fetch(`https://gmgn.ai/defi/quotation/v1/tokens/sol/63MjbqC4EJCvJXSRcH1YptsUy9dnm626XjdYCM3Spump`)
  const data = await result.json()

  return Response.json(data)
}
