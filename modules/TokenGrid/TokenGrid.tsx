import React, { FC } from 'react'
import { TokenCard } from '../TokenCard/TokenCard'

interface TokenGridProps {
  tokens: string[]
}

export const TokenGrid:FC<TokenGridProps> = ({ tokens }) => {
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-2xl text-black mb-12'>
      {
        tokens.map((token: string) => (
          <TokenCard token={token} key={token}/>
        ))
      }
    </div>
  )
}
