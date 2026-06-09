import { Suspense } from 'react'
import CheckoutForm from '@/components/cart/CheckoutForm'
import { getProducts } from '@/lib/shopify'

export default async function CheckoutPage() {
  const products = await getProducts(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <Suspense fallback={<div>Loading checkout...</div>}>
        <CheckoutForm products={products} />
      </Suspense>
    </div>
  )
}
