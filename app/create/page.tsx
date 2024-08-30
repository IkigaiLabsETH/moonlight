import { CreateToken, createToken } from "@/modules/createToken";


export default function Create() {

  return (
    <main className="">
      <div className="max-w-screen-2xl m-auto">
        <div className="p-5 md:p-10 lg:p-20 bg-neutral-900 text-center md:text-left">
          <h1 className="sm:text-2xl md:text-4xl lg:text-6xl">Create Token</h1>
        </div>
        <CreateToken createToken={createToken}/>
      </div>
    </main>
  );
}
