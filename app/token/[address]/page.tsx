import { currencyFormatter, formatDate } from "@/common/utils";
import clsx from "clsx";
import { map, replace } from "ramda";
import { FaArrowDownLong, FaArrowUpLong, FaGlobe, FaSeedling, FaTelegram, FaX, FaXTwitter } from "react-icons/fa6";
import TradingUI from "@/modules/Trading/Trading";

export default async function Tokens({ params: { address } }: { params: { address: string } }) {
  const result = await fetch(`https://api.moonshot.cc/token/v1/solana/${address}`)
  const tokenData = await result.json()

  const image = replace(/64/g, '2048', tokenData.profile.icon)
  console.log(tokenData)
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row w-full bg-black">
        <div className="w-full lg:w-1/2 p-16 h-screen justify-center flex flex-col">
          <h2 className="text-5xl leading-none font-bold tracking-tight m-0">{tokenData?.baseToken?.name}</h2>
          <div className="mb-4 flex flex-row items-center text-sm text-neutral-500">
            <FaSeedling className="mr-1"/>{' '} {formatDate(tokenData?.createdAt)}
          </div>
          <p className="mb-4 text-white">{tokenData?.profile?.decription}</p>
          <div className="flex border-y border-y-gray-700 py-8 mt-6 text-white">
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest mb-0">SOL:</h4>
                <span className="font-bold text-lg md:text-xl lg:text-2xl tracking-tight">{currencyFormatter.format(tokenData?.priceNative)}</span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest mb-0">USD:</h4>
                <span className="font-bold text-lg md:text-xl lg:text-2xl tracking-tight">
                  {currencyFormatter.format(tokenData?.priceUsd)}
                </span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest mb-0">Market cap:</h4>
                <span className="font-bold text-lg md:text-xl lg:text-2xl tracking-tight">
                  ${currencyFormatter.format(tokenData?.marketCap)}
                </span>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest mb-0">FDV:</h4>
                <span className="font-bold text-lg md:text-xl lg:text-2xl tracking-tight">
                  ${currencyFormatter.format(tokenData?.fdv)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-b border-b-gray-700 py-8 mt-2 text-white">
            <h4 className="text-xs uppercase tracking-widest mb-0">Price change:</h4>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="flex flex-row items-center">
                5m:{' '}<div className={clsx('flex flex-row items-center font-bold', tokenData?.priceChange?.m5 < 0 ? 'text-red-600' : 'text-green-600')}><div className="ml-1">{tokenData?.priceChange?.m5 < 0 ? <FaArrowDownLong /> : <FaArrowUpLong />}</div>{tokenData?.priceChange?.m5}%</div>
              </div>
              <div className="flex flex-row items-center">
                1h:{' '}<div className={clsx('flex flex-row items-center font-bold', tokenData?.priceChange?.h1 < 0 ? 'text-red-600' : 'text-green-600')}><div className="ml-1">{tokenData?.priceChange?.h1 < 0 ? <FaArrowDownLong /> : <FaArrowUpLong />}</div>{tokenData?.priceChange?.h1}%</div>
              </div>
              <div className="flex flex-row items-center">
                6h:{' '}<div className={clsx('flex flex-row items-center font-bold', tokenData?.priceChange?.h6 < 0 ? 'text-red-600' : 'text-green-600')}><div className="ml-1">{tokenData?.priceChange?.h6 < 0 ? <FaArrowDownLong /> : <FaArrowUpLong />}</div>{tokenData?.priceChange?.h6}%</div>
              </div>
              <div className="flex flex-row items-center">
                24h:{' '}<div className={clsx('flex flex-row items-center font-bold', tokenData?.priceChange?.h24 < 0 ? 'text-red-600' : 'text-green-600')}><div className="ml-1">{tokenData?.priceChange?.h24 < 0 ? <FaArrowDownLong /> : <FaArrowUpLong />}</div>{tokenData?.priceChange?.h24}%</div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-xs uppercase tracking-widest mb-0">Progress:</h4>
            <div className="overflow-hidden bg-black border-2 border-yellow-500 transition-all shadow-[3px_3px_0px_0px_rgba(234,179,1,1)] mt-1">
              <div className="h-8 bg-yellow-500 flex items-center font-bold text-white pl-2 text-lg md:text-xl tracking-tight" style={{width: `${tokenData?.moonshot?.progress}%`}}>{tokenData?.moonshot?.progress}%</div>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-0 mt-6">Links:</h4>
            <div className="flex flex-row">
              {tokenData?.profile?.links.map((link: any) => {
                if (link.includes('t.me')) {
                  return (
                    <a href={link} target="_blank" className="text-white text-lg p-1" key={link}>
                      <FaTelegram />
                    </a>
                  ) 
                }
                if (link.includes('x.com')) {
                  return (
                    <a href={link} target="_blank" className="text-white text-lg p-1" key={link}>
                      <FaXTwitter />
                    </a>
                  ) 
                }
                return (
                  <a href={link} target="_blank" className="text-white text-lg p-1" key={link}>
                    <FaGlobe />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
        <div
          className="w-full lg:w-1/2 h-screen bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <TradingUI />
      </div>
    </main>
  );
}
