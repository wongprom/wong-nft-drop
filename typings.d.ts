interface Image {
  asset: { url: string }
}

export interface Creator {
  _id: string
  name: string
  address: string
  slug: {
    current: string
  }
}

export interface Ape {
  id: BigNumber
  name: string
  description: string
  image: string
  uri: string
  properties: {
    Shirt: string
    Fur: string
    Glases: string
    Hat: string
    Eyse: string
  }
}

export interface Collection {
  _id: string
  title: string
  address: string
  nftCollectionName: string
  description: string
  title: string
  slug: {
    current: string
  }
  creator: Creator
  mainImage: Image
  previewImage: Image
}
