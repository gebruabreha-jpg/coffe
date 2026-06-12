import {
  SHOPIFY_ADMIN_API_ACCESS_TOKEN,
  SHOPIFY_API_VERSION,
  SHOPIFY_STORE_DOMAIN,
} from './config'
import { ORDER_BY_ID_QUERY } from './queries'

interface ShopifyAdminErrors {
  message: string
}

interface ShopifyAdminResponse<T> {
  data: T
  errors?: ShopifyAdminErrors[]
}

export async function shopifyAdminFetch<T>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_API_ACCESS_TOKEN) {
    throw new Error('Missing Shopify Admin API credentials')
  }

  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!result.ok) {
    throw new Error(`Shopify Admin API request failed with ${result.status}`)
  }

  const json = (await result.json()) as ShopifyAdminResponse<T>

  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join(', '))
  }

  return json.data
}

interface ShopifyAdminOrder {
  id: string
  name?: string | null
  email?: string | null
  totalPrice?: {
    amount: string
    currencyCode: string
  } | null
  lineItems?: {
    edges: Array<{
      node: {
        title: string
        quantity: number
        variant?: {
          id?: string | null
          title?: string | null
          price?: {
            amount: string
            currencyCode: string
          } | null
        } | null
      }
    }>
  } | null
}

interface GetOrderByIdResponse {
  node: ShopifyAdminOrder | null
}

function normalizeOrderId(id: string) {
  if (id.startsWith('gid://')) {
    return id
  }

  return `gid://shopify/Order/${id}`
}

export async function getOrderById(id: string) {
  const data = await shopifyAdminFetch<GetOrderByIdResponse>({
    query: ORDER_BY_ID_QUERY,
    variables: { id: normalizeOrderId(id) },
  })

  return data.node
}
