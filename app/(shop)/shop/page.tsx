import { getProducts } from '@/lib/shopify'
import ProductGrid from '@/features/shop/components/ProductGrid'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Shop - NILO Coffee',
  description: 'Browse our collection of single-origin specialty coffees.',
}

export default async function ShopPage() {
  const products = await getProducts(12)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Our Coffees</h1>
        <ProductGrid products={products.map(p => ({
          id: p.id,
          title: p.title,
          image: p.images?.edges[0]?.node?.url || '/placeholder.jpg',
          price: parseFloat(p.priceRange?.minVariantPrice?.amount || '0'),
          handle: p.handle,
        }))} />
      </div>
    </div>
  )
}