import { currencyFormatter } from '@/common/utils/client-utils'
import clsx from 'clsx'
import Link from 'next/link'
import { replace } from 'ramda'
import React, { FC } from 'react'
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6"

interface TokenCardProps {
  token: string
}

export const TokenCard:FC<TokenCardProps> = async ({token}) => {  
  const result = await fetch(`https://api.moonshot.cc/token/v1/solana/${token}`)
  const tokenData = await result.json()

  if (tokenData.error) {
    return <div className='flex justify-center items-center border-2 font-bold text-neutral-400'>Error loading token</div>
  }

  const image = replace(/64/g, '480', tokenData?.profile?.icon)
  return (
    <Link href={`/token/${token}`} key={token} className='border-2 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-[32rem]'>
      <div className="overflow-clip h-1/2">
        <img src={image} alt={tokenData.baseToken.name} width={480} height={480} />
      </div>
      <div className="p-4 flex h-1/2">
        <div className="flex flex-col justify-between w-full">
          <h5 className="font-bold text-xl mb-2">{tokenData.baseToken.name}</h5>
          <div className="flex flex-row justify-between">
            <div className="text-black text-l font-bold m-0 w-1/2">
              24h Vol:{' '}
              <span className={clsx('font-bold', tokenData.priceChange.h24 < 0 ? 'text-red-500' : 'text-green-500')}>
                <div className='flex flex-row items-center'>{tokenData.priceChange.h24 < 0 ? <FaArrowDownLong /> : <FaArrowUpLong />} {tokenData.priceChange.h24}</div>
              </span>{' '}
              <span className="!text-xs">
              </span>
            </div>
            <div className="text-black text-l font-bold m-0">
              Market cap:{' '}
              <span className="font-bold">
                ${currencyFormatter.format(tokenData.marketCap)}
              </span>{' '}
              <span className="!text-xs">
              </span>
            </div>
          </div>
          <div className="overflow-hidden bg-gray-200">
            <div className="h-8 bg-black flex items-center font-bold text-yellow-500 pl-2" style={{width: `${tokenData?.moonshot?.progress}%`}}>{tokenData?.moonshot?.progress}%</div>
          </div>
          <div className="flex justify-end mt-5 text-lg font-bold">&rarr;</div>
        </div>
      </div>
    </Link>
  )
}
