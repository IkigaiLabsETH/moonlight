'use client'

import { CreateTokenResult } from '@/common/types'
import { dissoc } from 'ramda'
import React, { FC, useState } from 'react'
import { useForm } from "react-hook-form"

interface CreateTokenProps {
  createToken: (data: FormData) => Promise<CreateTokenResult | undefined>
}

type TFormData = {
  name: string
  decimals: number
  symbol: string
  supply: number
  image: FileList | null
  description: string
  revokeMint: boolean
  revokeFreeze: boolean
  revokeUpdate: boolean
}

export const CreateToken:FC<CreateTokenProps> = ({ createToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>()
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    
    const formData = new FormData()

    if (data?.image?.length) {
      formData.append('file', data.image[0])
    }

    formData.append('data', JSON.stringify(dissoc('file')(data)))
    await createToken(formData)
    setIsLoading(false)
  })

  return (
    <div className='mx-auto max-w-2xl'>
      <form onSubmit={onSubmit}>
        <div className="space-y-12 pb-24">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className='sm:col-span-6'>
              <label htmlFor="name" className='block font-bold leading-6 text-gray-900 mb-1'>Name</label>
              <div>
                <input {...register("name", { required: true })} className='w-full focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ' aria-invalid={errors.name ? "true" : "false"}/>
                {errors.name?.type === "required" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Name is required</p>
                )}
              </div>
            </div>
            {/* <div className='sm:col-span-3'>
              <label htmlFor="decimals" className='block font-bold leading-6 text-gray-900 mb-1'>Decimals</label>
              <div>
                <input type="number" {...register("decimals", { min: 0, max: 18, required: true })} className='w-full' aria-invalid={errors.decimals ? "true" : "false"}/>
                {errors.decimals?.type === "required" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Decimals is required</p>
                )}
                {errors.supply?.type === "min" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Minimal decimals is 0</p>
                )}
                {errors.supply?.type === "max" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Minimal decimals is 18</p>
                )}
              </div>
            </div> */}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className='sm:col-span-6 md:col-span-3'>
              <label htmlFor="symbol" className='block font-bold leading-6 text-gray-900 mb-1'>Symbol</label>
              <div>
                <input {...register("symbol", { required: true })} className='w-full focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ' aria-invalid={errors.symbol ? "true" : "false"}/>
                {errors.symbol?.type === "required" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Symbol is required</p>
                )}
              </div>
            </div>
            <div className='sm:col-span-6 md:col-span-3'>
              <label htmlFor="supply" className='block font-bold leading-6 text-gray-900 mb-1'>Supply</label>
              <div>
                <input type="number" {...register("supply", { min: 1, required: true })} className='w-full focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ' aria-invalid={errors.supply ? "true" : "false"}/>
                {errors.supply?.type === "required" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Supply is required</p>
                )}
                {errors.supply?.type === "min" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Minimal supply is 1</p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="image" className='block font-bold leading-6 text-gray-900 mb-1'>Image</label>
            <div>
              <input type="file" {...register("image", { required: true })} className='w-full focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ' aria-invalid={errors.image ? "true" : "false"}/>
              {errors.image?.type === "required" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Image is required</p>
                )}
            </div>
          </div>
          <div>
            <label htmlFor="description" className='block font-bold leading-6 text-gray-900 mb-1'>Description</label>
            <div>
              <textarea {...register("description", { required: true })} className='w-full h-44 focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ' aria-invalid={errors.description ? "true" : "false"}/>
              {errors.description?.type === "required" && (
                  <p role="alert" className='mt-2 font-bold text-red-500'>Description is required</p>
                )}
            </div>
          </div>
          {/* <div>
            <div className='flex items-center'>
              <input className="mr-2 " type="checkbox" {...register("revokeMint")} />
              <label htmlFor="revokeMint" className='block font-bold leading-6 text-gray-900 mb-1'>Revoke Mint</label>
            </div>
            <div className='flex items-center'>
              <input className="mr-2" type="checkbox" {...register("revokeFreeze")} />
              <label htmlFor="revokeFreeze" className='block font-bold leading-6 text-gray-900 mb-1'>Revoke Freeze</label>
            </div>
            <div className='flex items-center'>
              <input className="mr-2" type="checkbox" {...register("revokeUpdate")} />
              <label htmlFor="revokeUpdate" className='block font-bold leading-6 text-gray-900 mb-1'>Revoke Update</label>
            </div>
          </div> */}
          <button
            type="submit"
            className='w-full sm:text-xl md:text-2xl lg:text-3xl bg-yellow-500 hover:bg-yellow-600 font-bold py-4 px-8 focus:outline-none focus:shadow-outline hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all '
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
