import { formatPrice } from "@/lib/utils"

interface Product {
  id: string
  title: string
  image: string
  price: number
  handle: string
}

interface ProductGridProps {
  products?: Product[]
  featured?: boolean
}

export default function ProductGrid({ products }: ProductGridProps) {
  const displayProducts = products || [
    { id: "1", title: "Ethiopian Blend", image: "/placeholder.jpg", price: 1800, handle: "ethiopian-blend" },
    { id: "2", title: "Colombian Single-Origin", image: "/placeholder.jpg", price: 2200, handle: "colombian-single-origin" },
    { id: "3", title: "Guatemalan Dark Roast", image: "/placeholder.jpg", price: 1900, handle: "guatemalan-dark-roast" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <div className="aspect-square relative rounded-lg overflow-hidden bg-muted mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform"
        />
      </div>
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-primary font-bold">{formatPrice(product.price)}</p>
    </div>
  )
}