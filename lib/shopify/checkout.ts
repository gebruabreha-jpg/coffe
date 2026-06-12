import shopifyFetch from './client'
import {
  CART_ATTRIBUTES_UPDATE_MUTATION,
  CART_BUYER_IDENTITY_UPDATE_MUTATION,
  CART_CREATE_MUTATION,
} from './queries'

export interface ShopifyCartLineInput {
  merchandiseId: string
  quantity: number
}

export interface ShopifyCartAttributeInput {
  key: string
  value: string
}

interface ShopifyUserError {
  field?: string[] | null
  message: string
}

interface CartCreateResponse {
  cartCreate?: {
    cart?: {
      id: string
      checkoutUrl: string
      createdAtUpdatedAt: string
    } | null
    userErrors?: ShopifyUserError[]
  } | null
}

interface CartBuyerIdentityUpdateResponse {
  cartBuyerIdentityUpdate?: {
    cart?: {
      id: string
      checkoutUrl: string
    } | null
    userErrors?: ShopifyUserError[]
  } | null
}

interface CartAttributesUpdateResponse {
  cartAttributesUpdate?: {
    cart?: {
      id: string
      checkoutUrl: string
    } | null
    userErrors?: ShopifyUserError[]
  } | null
}

function assertNoUserErrors(userErrors?: ShopifyUserError[] | null) {
  if (userErrors?.length) {
    throw new Error(userErrors.map((error) => error.message).join(', '))
  }
}

export async function createShopifyCheckout({
  lines,
  email,
  attributes = [],
}: {
  lines: ShopifyCartLineInput[]
  email?: string
  attributes?: ShopifyCartAttributeInput[]
}) {
  if (!lines.length) {
    throw new Error('Cart is empty')
  }

  const cartCreate = await shopifyFetch<CartCreateResponse>({
    query: CART_CREATE_MUTATION,
    variables: { lines },
    cache: 'no-store',
  })

  const cart = cartCreate.cartCreate?.cart
  assertNoUserErrors(cartCreate.cartCreate?.userErrors)

  if (!cart?.checkoutUrl) {
    throw new Error('Shopify checkout was not created')
  }

  if (email) {
    const buyerIdentityUpdate = await shopifyFetch<CartBuyerIdentityUpdateResponse>({
      query: CART_BUYER_IDENTITY_UPDATE_MUTATION,
      variables: { cartId: cart.id, email },
      cache: 'no-store',
    })

    assertNoUserErrors(buyerIdentityUpdate.cartBuyerIdentityUpdate?.userErrors)
  }

  if (attributes.length) {
    const attributesUpdate = await shopifyFetch<CartAttributesUpdateResponse>({
      query: CART_ATTRIBUTES_UPDATE_MUTATION,
      variables: { cartId: cart.id, attributes },
      cache: 'no-store',
    })

    assertNoUserErrors(attributesUpdate.cartAttributesUpdate?.userErrors)
  }

  return cart.checkoutUrl
}
