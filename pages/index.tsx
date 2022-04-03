import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="mx-auto min-h-screen max-w-7xl flex-col py-20 px-10 2xl:px-0">
      <Head>
        <title>NFT drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mb-10 text-4xl font-extralight">
        The{' '}
        <span className="font-extrabold underline decoration-cc_pink/50">
          Wong
        </span>{' '}
        NFT Market Place
      </h1>

      <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection) => (
            <div
              key={collection._id}
              className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105"
            >
              <img
                className="h-96 w-60 rounded-2xl object-cover"
                src={urlFor(collection.mainImage).url()}
                alt=""
              />

              <div className="p-5">
                <h2 className="text-3xl text-cc_black">{collection.title}</h2>
                <p className="mt-2 text-sm text-cc_light_gray">
                  {collection.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
export const getServerSideProps: GetServerSideProps = async () => {
  const query = `
    *[_type == "collection"]{
      _id,
      title,
      address,
      description,
      nftCollectionName,
      mainImage{
        asset
      },
      privewImage{
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

  const collections = await sanityClient.fetch(query)

  return {
    props: {
      collections,
    },
  }
}
