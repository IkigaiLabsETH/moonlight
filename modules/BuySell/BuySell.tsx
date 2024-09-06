'use client'

import React, { FC } from 'react'

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { buy, sell } from '@/common/moonshot'

interface BuySellProps {
  token: string
}

export const BuySell:FC<BuySellProps> = ({ token }) => {
  const { publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()
  const [amount, setAmount] = React.useState(0)

  const updateAmount = (e: any) => {
    const value = e.target.value
    setAmount(value)
  }

  const actions = (
    <div className='grid grid-flow-row grid-cols-2 gap-4 w-full font-bold'>
      <button className=' bg-yellow-500 w-full' onClick={() => buy({publicKey, signTransaction, amount, connection, mintAddress: token })}>Buy</button>
      <button className=' bg-yellow-500 w-full' onClick={() => sell({publicKey, signTransaction, amount, connection, mintAddress: token})}>Sell</button>
    </div>
  )
  
  return (
    <div className='m-2 xl:m-4 bg-black p-2 xl:p-4 flex flex-row w-full'>
      <input type="text" inputMode='decimal' onChange={updateAmount} value={amount} className='bg-black text-white font-bold text-4xl border-none outline-none placeholder:text-white focus:outline-none focus:ring-0'/>
      {
        publicKey ? <div className='w-full flex'>{ actions }</div> : <div><WalletMultiButton style={{width: "100%"}} /></div>
      }
      
    </div>
  )
}
