import { BigNumber } from 'ethers'
import { Ape } from '../typings'

interface Props {
  ape: Ape
  claimedSupply: number | BigNumber
  priceInEth: string | undefined
  totalSupply: number | BigNumber | undefined
}

const CardApe: React.FC<Props> = ({
  ape,
  claimedSupply,
  totalSupply,
  priceInEth,
}) => {
  return (
    <div
      key={ape.name}
      className="group mx-auto grid w-full grid-cols-1 justify-items-center rounded-2xl border bg-gray-900  md:max-w-sm"
    >
      {/* <!--1--> */}
      <div className="flex flex-col">
        <div className="mx-auto my-5 h-2 w-10 rounded-full border-0 bg-gray-500"></div>
        <div className="h-52 w-48 rounded-lg">
          <img
            className="h-full w-full rounded-lg object-cover"
            src={ape.image}
            alt=""
          />
        </div>
        <div className="-mt-4 flex">
          <span className="mx-auto rounded-full bg-white px-4 py-1 text-sm">
            {ape.name}
          </span>
        </div>
        <div className="mt-5 flex justify-center">
          <p className="text-sm font-semibold text-gray-400">INFO</p>
        </div>
      </div>
      {/* <!--2--> */}
      <div className="mt-2 grid w-2/3  gap-4 rounded-xl bg-gray-800  p-3 text-sm text-gray-400">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p>NFT's claimed</p>
          <p className="text-gray-50">
            <span className="text-red-500">{claimedSupply}</span> /{' '}
            {totalSupply?.toString()}
          </p>
        </div>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p>Name</p>
          <p className="text-gray-50">{ape.name}</p>
        </div>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p>Collection</p>
          <p className="text-gray-50">{ape.description}</p>
        </div>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p>Mint price</p>
          <p className="text-gray-50">{priceInEth} ETH</p>
        </div>
      </div>
      {/* <!--3--> */}
      <div className="mt-5 w-2/3 rounded-xl bg-gray-800 p-3 text-white">
        <h3 className="text-blue-200">Properties</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {Object.entries(ape.properties).map((arr) => {
            return (
              <div className="mt-2 flex flex-col overflow-hidden rounded-md border border-blue-400 p-2 ">
                <p className="text-center text-xs text-blue-400">{arr[0]}</p>
                {/* @ts-ignore */}
                <p className="text-center text-sm">{arr[1]}</p>
              </div>
            )
          })}
        </div>
      </div>
      {/* <!--4--> */}
      <div className="flex w-full flex-col items-center">
        <button className="my-10 w-10/12 rounded-full bg-black py-4 text-xl font-medium tracking-widest text-gray-100 shadow-[9px_10px_30px_rgba(240,_46,_170,_0.5)] hover:shadow-[9px_10px_30px_rgba(126,_21,_69,_0.5)]">
          MINT {priceInEth} ETH
        </button>
      </div>
    </div>
  )
}

export default CardApe
