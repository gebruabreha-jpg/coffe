import { Suspense } from 'react'
import CheckoutForm from '@/features/shop/components/cart/CheckoutForm'

export default async function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <Suspense fallback={<div>Loading checkout...</div>}>
        <CheckoutForm />
      </Suspense>
    </div>
  )
}