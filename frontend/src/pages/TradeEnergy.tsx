import React from 'react'
import FindEnergy from "./FindEnergy";

function TradeEnergy() {
  return (
    <div className="min-h-screen bg-[url('/Chats.png')] bg-cover bg-center p-6 md:p-16 lg:p-40 flex flex-col items-center justify-center bg-zinc-900 w-full">

<div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            
            <h1 className="text-3xl text-white font-bold">Find Energy</h1>
          </div>
          <p className='text-gray-400'>
            Find the nearest energy source for your energy needs.
          </p>
        </div>
      {/* Main container */}
      <div className="relative w-full sm:mt-40 md:mt-20 lg:mt-5  max-w-8xl rounded-[32px] md:rounded-[56px] bg-black/50 border border-gray-500 backdrop-blur-sm overflow-hidden flex justify-center items-center">
        <div className="relative w-full mx-10 my-10 rounded-[20px] md:rounded-[30px] bg-black/50 border border-gray-500 backdrop-blur-sm overflow-hidden">
          {/* Optional outline effect */}
          <div className="absolute inset-0 rounded-2xl border border-gray-600 -z-10 backdrop-blur-md"></div>

          {/* Child content */}
          <FindEnergy />
        </div>
      </div>
    </div>
  )
}

export default TradeEnergy