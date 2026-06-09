import { SHOPIFY_STORE_DOMAIN, SHOPIFY_API_VERSION, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from './config'

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`

async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
}: {
  query: string
  variables?: Record<string, any>
  cache?: RequestCache
}): Promise<T> {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: cache === 'force-cache' ? 3600 : 0,
    },
  })

  const json = await result.json()

  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(', '))
  }

  return json.data
}

export { shopifyFetch as default }
