import Image from "next/image"
import Link from "next/link"
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

export default function ProductGrid({ products, featured }: ProductGridProps) {
  const displayProducts = products ?? [
    { id: "1", title: "Ethiopian Blend", image: "/placeholder.jpg", price: 18, handle: "ethiopian-blend" },
    { id: "2", title: "Colombian Single-Origin", image: "/placeholder.jpg", price: 22, handle: "colombian-single-origin" },
    { id: "3", title: "Guatemalan Dark Roast", image: "/placeholder.jpg", price: 19, handle: "guatemalan-dark-roast" },
  ]

  return (
    <div className={featured ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "grid grid-cols-1 md:grid-cols-3 gap-8"}>
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.handle}`} className="group block">
      <div className="aspect-square relative rounded-lg overflow-hidden bg-muted mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{product.title}</h3>
      <p className="text-primary font-bold">{formatPrice(product.price)}</p>
    </Link>
  )
}