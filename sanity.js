import { createCurrentUserHook, createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
  //info https://www.npmjs.com/package/next-sanity
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25', // Learn more: https://www.sanity.io/docs/api-versioning. BEFORE CHANGE was '2021-10-21'
  useCdn: process.env.NODE_ENV === 'production',
}

export const sanityClient = createClient(config)

export const urlFor = (source) => createImageUrlBuilder(config).image(source)
