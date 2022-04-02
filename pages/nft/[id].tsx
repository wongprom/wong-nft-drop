import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

const NFTDropPage = () => {
  // auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  // info change func name to disconnectFromMetamask
  const disconnect = useDisconnect()

  console.log('🚀 ~ file: [id].tsx ~ line 8 ~ NFTDropPage ~ address', address)
  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/* left */}
      <div className="bg-gradient-to-br from-cc_black to-cc_pink lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="https://links.papareact.com/8sg"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-cc_white">Wong's Apes</h1>
            <h2 className="text-xl text-cc_light_gray">
              A collection of Wong Apes who live & breathe React
            </h2>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* header */}
        <header className="flex items-center justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            The{' '}
            <span className="font-extrabold underline decoration-cc_pink/50">
              Wong
            </span>{' '}
            NFT Market Place
          </h1>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              {address ? 'Sign Out' : 'Sign In'}
            </span>
          </button>
        </header>

        <hr className="my-2 border" />
        {address && (
          <p>
            You are logedin with wallet {address.substring(0, 4)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        {/* content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src="https://links.papareact.com/bdy"
            alt=""
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            Wong Ape Coding Club | NFT Drop
          </h1>
          <p className="pt-2 text-xl text-cc_purple">13 / 21 NFT's claimed</p>
        </div>
        <button className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800">
          <span className=" relative w-full rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Mint NFT (0.01 ETH)
          </span>
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage
