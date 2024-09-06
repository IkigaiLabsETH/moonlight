import { TokenGrid, getTokens } from "@/modules/TokenGrid";

export default async function Tokens() {
  const tokens = await getTokens()
  
  return (
    <main className="">
      <div className="m-auto">
        <div className="p-5 md:p-10 lg:p-15 bg-neutral-900 text-center md:text-left">
          <div className="max-w-screen-2xl m-auto"> 
            <h1 className="sm:text-2xl md:text-4xl lg:text-8xl">Cult Coins</h1>
          </div>
        </div>
        <div className="max-w-screen-2xl m-auto px-8 py-5 md:py-10 lg:py-20">
          <TokenGrid tokens={tokens}/>
        </div>
      </div>
    </main>
  );
}
