import shopifyFetch from './client'
import { GET_PRODUCTS_QUERY, GET_COLLECTIONS_QUERY } from './queries'
import { GET_PRODUCT_QUERY, GET_COLLECTION_QUERY } from './queries'

interface ShopifyEdge<T> {
  node: T
}

interface ShopifyConnection<T> {
  edges: ShopifyEdge<T>[]
}

interface ShopifyProductEdge {
  id: string
  title: string
  handle: string
  description?: string | null
  descriptionHtml?: string | null
  priceRange?: {
    minVariantPrice?: {
      amount: string
      currencyCode: string
    }
  }
  images?: ShopifyConnection<{
    url: string
    altText?: string | null
    width?: number
    height?: number
  }>
  variants?: ShopifyConnection<{
    id: string
    title?: string
    price: {
      amount: string
      currencyCode: string
    }
    availableForSale?: boolean
  }>
  tags?: string[]
  productType?: string
  publishedAt?: string
  seo?: {
    title?: string | null
    description?: string | null
  }
}

interface ShopifyCollectionEdge {
  id: string
  title: string
  handle: string
  description?: string | null
  descriptionHtml?: string | null
  image?: {
    url: string
    altText?: string | null
    width?: number
    height?: number
  } | null
  productsCount?: number
  products?: ShopifyConnection<ShopifyProductEdge>
}

interface ShopifyProductResponse {
  productByHandle: ShopifyProductEdge | null
}

interface ShopifyCollectionResponse {
  collectionByHandle: ShopifyCollectionEdge | null
}

export { shopifyFetch }
export { GET_PRODUCTS_QUERY, GET_COLLECTIONS_QUERY, GET_PRODUCT_QUERY, GET_COLLECTION_QUERY }

export async function getProducts(first = 12) {
  const data = await shopifyFetch<{
    products: ShopifyConnection<ShopifyProductEdge>
  }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first },
  })
  return data.products.edges.map((edge) => edge.node)
}

export async function getProduct(handle: string) {
  const data = await shopifyFetch<ShopifyProductResponse>({
    query: GET_PRODUCT_QUERY,
    variables: { handle },
  })
  return data.productByHandle ? { ...data.productByHandle } : null
}

export async function getCollections(first = 4) {
  const data = await shopifyFetch<{
    collections: ShopifyConnection<ShopifyCollectionEdge>
  }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first },
  })
  return data.collections.edges.map((edge) => edge.node)
}

export async function getCollection(handle: string, first = 12) {
  const data = await shopifyFetch<ShopifyCollectionResponse>({
    query: GET_COLLECTION_QUERY,
    variables: { handle, first },
  })
  return data.collectionByHandle ? { ...data.collectionByHandle } : null
}