import React, { useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import Link from 'next/link'
import { BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
interface Props {
  collection: Collection
}

const NFTDropPage = ({ collection }: Props) => {
  const [claimedSupply, setClaimedSupply] = useState<BigNumber | number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [priceInEth, setPriceInEth] = useState<string>()
  const [claimedNFTs, setClaimedNFTs] = useState()
  const [unClaimedNFTs, setUnClaimedNFTs] = useState()
  const nftDrop = useNFTDrop(collection.address)

  console.log(claimedNFTs)
  // auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  // info change func name to disconnectFromMetamask
  const disconnectFromMetamask = useDisconnect()

  useEffect(() => {
    if (!nftDrop) return

    const fetchUnclaimedNFTs = async () => {
      const unclaimedNFTs = await nftDrop.getAllUnclaimed()

      // @ts-ignore
      setUnClaimedNFTs(unclaimedNFTs)
    }
    fetchUnclaimedNFTs()
  }, [nftDrop])

  console.log(
    '🚀 ~ file: [id].tsx ~ line 25 ~ NFTDropPage ~ unClaimedNFTs',
    unClaimedNFTs
  )

  useEffect(() => {
    if (!nftDrop) return

    const fetchClaimedNFTs = async () => {
      const claimedNFTs = await nftDrop.getAllClaimed()
      const firstOwner = claimedNFTs[0].owner
      console.log(
        '🚀 ~ file: [id].tsx ~ line 38 ~ fetchClaimedNFTs ~ firstOwner',
        firstOwner
      )
      // @ts-ignore
      setClaimedNFTs(claimedNFTs)
    }
    fetchClaimedNFTs()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return

    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
    }
    fetchPrice()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return

    const fetchNFTDropData = async () => {
      setIsLoading(true)
      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()
      setClaimedSupply(claimed.length)
      setTotalSupply(total)
      setIsLoading(false)
    }
    fetchNFTDropData()
  }, [nftDrop])

  const mintNft = () => {
    if (!nftDrop || !address) return
    const quantity = 1 // how many unique nft's you want to claimed
    setIsLoading(true)

    const notification = toast.loading('Minting NFT...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bold',
        fontSize: '17px',
        padding: '20px',
      },
    })

    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt
        const claimedTokenId = tx[0].id
        const claimedNFT = await tx[0].data()

        toast('HOORAY...You successfully Minted!!', {
          duration: 5000,
          style: {
            background: 'green',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })

        console.log('claimedNFT', claimedNFT)
        console.log('claimedTokenId', claimedTokenId)
        console.log('receipt', receipt)
      })
      .catch((error) => {
        console.error('mintNft func: ', error)
        toast('Whoops...Something went wrong!', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .finally(() => {
        setIsLoading(false)
        toast.dismiss(notification)
      })
  }

  const numberofNFTs = [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
  ]

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Toaster position="top-right" />
      {/* left */}
      <div className="bg-gradient-to-br from-cc_black to-cc_pink lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src={urlFor(collection?.previewImage).url()}
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-cc_white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-cc_light_gray">
              {collection.description}
            </h2>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="flex flex-1 flex-col bg-cc_black p-12 lg:col-span-6">
        {/* header */}
        <header className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 cursor-pointer text-2xl font-extralight text-cc_white sm:w-80 md:text-3xl">
              The{' '}
              <span className="font-extrabold underline decoration-cc_pink/50">
                Wong
              </span>{' '}
              NFT Market Place
            </h1>
          </Link>
          <button
            onClick={() =>
              address ? disconnectFromMetamask() : connectWithMetamask()
            }
            className="group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200 group-hover:from-purple-500 group-hover:to-pink-500 dark:text-white dark:focus:ring-purple-800"
          >
            <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
              {address ? 'Sign Out' : 'Sign In'}
            </span>
          </button>
        </header>
        <hr className="my-2 border border-cc_light_blue/30" />
        {address && (
          <p className="text-center text-cc_white/30">
            You are logedin with wallet {address.substring(0, 4)}...
            {address.substring(address.length - 5)}
          </p>
        )}
        {/* content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection?.mainImage).url()}
            alt=""
          />
          <h1 className="text-3xl font-bold text-cc_white/80 lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          {isLoading ? (
            <p className="animate-pulse pt-2 text-xl text-cc_white">
              Loading Supply ...
            </p>
          ) : (
            <p className="pt-2 text-xl text-cc_orange">
              {claimedSupply} / {totalSupply?.toString()} NFT's claimed
            </p>
          )}
          {/* {isLoading && (
            <img
              className="h-80 w-80 object-contain"
              src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
              alt=""
            />
          )} */}
        </div>
        <main className="">
          {numberofNFTs.map((nft, index) => (
            <Link href="" key={index}>
              <div className="inline-flex cursor-pointer items-center rounded-xl bg-cc_light_gray text-cc_white transition-all duration-200 hover:scale-105">
                <div className=" flex flex-col items-center p-5">
                  <img
                    className="h-60 w-60 rounded-2xl object-cover"
                    src={urlFor(collection?.mainImage).url()}
                    alt=""
                  />
                  <p className="-mt-4 rounded-full bg-cc_light_gray py-2 px-6">
                    ape-0043
                  </p>
                  <p>For</p>
                  <div className="flex flex-col items-center rounded-2xl bg-pink-100 p-5">
                    <h2 className=" ">0xe1...487du</h2>
                    <p className="mt-2 text-sm text-cc_light_gray">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            // <div className="w-56 bg-pink-900" >
            //   <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2">
            //     <img
            //       className="rounded-xl object-cover"
            //       src="https://picsum.photos/250/250"
            //       alt=""
            //     />

            //     <span className="y-2 rounded-2xl bg-cc_white px-4">
            //       12345 etx
            //     </span>
            //   </div>
            // </div>

            // <div className="h-54 flex items-center  bg-pink-900">
            //   <p className="delay-50 group w-60 rounded-lg bg-gray-800 p-5 duration-100 hover:bg-gray-700">
            //     <img
            //       src="https://picsum.photos/250/250"
            //       className="w-full rounded shadow"
            //     />
            //     <h3 className="mt-5 font-bold text-gray-200">
            //       {' '}
            //       Top 50 - Global
            //     </h3>
            //     <p className="mt-2 text-xs font-light text-gray-400">
            //       {' '}
            //       Your daily update of the most played track from around the
            //       world...
            //     </p>
            //   </p>
            // </div>
          ))}
        </main>
        <button
          onClick={mintNft}
          disabled={
            isLoading || claimedSupply === totalSupply?.toNumber() || !address
          }
          className="mt-10 h-16 w-full rounded-full bg-cc_pink font-bold text-white disabled:bg-gray-400"
        >
          {isLoading ? (
            <>Loading...</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>SOLD OUT</>
          ) : !address ? (
            <>Sign in to Mint</>
          ) : (
            <span className="font-bold">Mint NFT ({priceInEth}) ETH</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `
  *[_type == "collection" && slug.current == $id][0]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage{
      asset
    },
    previewImage{
      asset
    },
    slug{
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
        current
      },
    },
  }
`
  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  // return 404 page
  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
