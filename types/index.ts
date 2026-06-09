export interface Product {
  id: string
  title: string
  handle: string
  description: string
  price: number
  image: string
  variants?: Variant[]
  availableForSale?: boolean
}

export interface Variant {
  id: string
  title: string
  price: number
  availableForSale: boolean
}

export interface Collection {
  id: string
  title: string
  handle: string
  description: string
  image?: string
  productsCount?: number
}