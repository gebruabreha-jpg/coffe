import shopifyFetch from './client'
import { GET_PRODUCTS_QUERY, GET_COLLECTIONS_QUERY } from './queries'
import { GET_PRODUCT_QUERY, GET_COLLECTION_QUERY } from './queries'

export { shopifyFetch }
export { GET_PRODUCTS_QUERY, GET_COLLECTIONS_QUERY, GET_PRODUCT_QUERY, GET_COLLECTION_QUERY }

export async function getProducts(first = 12) {
  const data = await shopifyFetch<{
    products: { edges: any[] }
  }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first },
  })
  return data.products.edges.map((edge) => ({
    id: edge.node.id,
    ...edge.node,
  }))
}

export async function getProduct(handle: string) {
  const data = await shopifyFetch<{
    productByHandle: any
  }>({
    query: GET_PRODUCT_QUERY,
    variables: { handle },
  })
  return data.productByHandle ? { ...data.productByHandle } : null
}

export async function getCollections(first = 4) {
  const data = await shopifyFetch<{
    collections: { edges: any[] }
  }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first },
  })
  return data.collections.edges.map((edge) => ({
    id: edge.node.id,
    ...edge.node,
  }))
}

export async function getCollection(handle: string, first = 12) {
  const data = await shopifyFetch<{
    collectionByHandle: any
  }>({
    query: GET_COLLECTION_QUERY,
    variables: { handle, first },
  })
  return data.collectionByHandle ? { ...data.collectionByHandle } : null
}