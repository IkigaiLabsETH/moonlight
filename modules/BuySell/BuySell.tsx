'use client'

import React, { FC, useEffect } from 'react'

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { buy, sell } from '@/common/moonshot'
import useSWR from 'swr'
import { rest } from '@/common/fetcher'

interface BuySellProps {
  token: string
}

export const BuySell:FC<BuySellProps> = ({ token }) => {
  const { data, error, isLoading } = useSWR(`https://api.moonshot.cc/token/v1/solana/${token}`, rest, { refreshInterval: 10000 })
  const { publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()
  const [amount, setAmount] = React.useState(0)
  const [tokenAmount, setTokenAmount] = React.useState(0)

  const updateAmount = (e: any) => {
    const value = e.target.value
    setAmount(value.replace(',', '.'))
  }

  useEffect(() => {
    if (data && amount > 0) {
      setTokenAmount(Math.floor(amount / data.priceNative))
    }
  }, [data, amount])

  // useEffect(() => {
  //   const updatePrice = async () => {
  //     debounce(await mutate(`https://api.moonshot.cc/token/v1/solana/${token}`), 300)
  //   }

  //   updatePrice().catch(console.error)
  // }, [amount, token])



  const actions = (
    <div className='grid grid-flow-row grid-cols-2 gap-4 w-full font-bold'>
      <button className=' bg-yellow-500 w-full' onClick={() => buy({publicKey, signTransaction, amount: tokenAmount, connection, mintAddress: token })}>Buy</button>
      <button className=' bg-yellow-500 w-full' onClick={() => sell({publicKey, signTransaction, amount: tokenAmount, connection, mintAddress: token})}>Sell</button>
    </div>
  )
  
  return (
    <div className='m-2 xl:m-4 bg-black p-2 xl:p-4 w-full'>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-full items-center mr-5'><input type="text" inputMode='decimal' onChange={updateAmount} value={amount} className='bg-black text-white font-bold text-4xl border-none outline-none placeholder:text-white focus:outline-none focus:ring-0'/> <span className='text-white font-bold text-xl'>SOL</span></div>
        {
          publicKey ? <div className='w-full flex'>{ actions }</div> : <div><WalletMultiButton style={{width: "100%"}} /></div>
        }
      </div>
      <div className='text-sm text-gray-500'>
        {
          isLoading ? 'Loading...' : error ? 'Error' : data && amount > 0 ? `~ ${tokenAmount.toLocaleString()} ${data?.baseToken?.symbol}` : '~'
        }
      </div>
    </div>
  )
}
