import { SHOPIFY_STORE_DOMAIN, SHOPIFY_API_VERSION, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from './config'

function assertStorefrontCredentials() {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN || SHOPIFY_STOREFRONT_ACCESS_TOKEN.includes('your-')) {
    throw new Error('Missing valid Shopify Storefront API credentials in .env.local')
  }
}

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`

async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
}): Promise<T> {
  assertStorefrontCredentials()

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

  if (!result.ok) {
    throw new Error(`Shopify Storefront API request failed with ${result.status}. Check that NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is a Storefront API token, not an Admin/App token.`)
  }

  const json = await result.json()

  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '))
  }

  return json.data
}

export { shopifyFetch as default }
