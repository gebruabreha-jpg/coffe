import { getProduct } from '@/lib/shopify'
import { Truck, RefreshCw } from 'lucide-react'
import { useCart } from '@/features/shop/components/cart/CartProvider'
import { Button } from '@/components/ui/button'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return <div>Product not found</div>
  }

  const image = product.images?.edges?.[0]?.node
  const variant = product.variants?.edges?.[0]?.node
  const price = parseFloat(variant?.price?.amount || '0') / 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          {image && (
            <img
              src={image.url}
              alt={image.altText || product.title}
              className="h-full w-full object-cover"
              width={1200}
              height={1200}
            />
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-bold text-primary mb-6">
            ${price.toFixed(2)}
          </p>

          <div
            className="prose mb-8"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
          />

          <AddToCartButton product={product} variant={variant} image={image} />

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-semibold">Freshly Roasted</p>
                <p className="text-sm text-muted-foreground">
                  Roasted within 48 hours of delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddToCartButton({ product, variant, image }: { product: any; variant: any; image: any }) {
  'use client'
  const { addItem } = useCart()

  return (
    <Button
      className="w-full"
      onClick={() => {
        addItem({
          id: variant?.id || '',
          title: product.title,
          price: parseFloat(variant?.price?.amount || '0'),
          image: image?.url || '',
        })
      }}
    >
      Add to Cart
    </Button>
  )
}