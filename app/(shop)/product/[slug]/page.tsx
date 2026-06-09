import { getProduct } from '@/lib/shopify'

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
            ${variant?.price.amount}
          </p>

          <div 
            className="prose mb-8"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
          />

          <button 
            className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md font-semibold hover:opacity-90 transition-opacity"
            onClick={() => {
              addToCart({
                id: variant?.id || '',
                title: product.title,
                price: parseFloat(variant?.price.amount || '0'),
                image: image?.url || '',
              })
            }}
          >
            Add to Cart
          </button>

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
