import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Bean } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
              {product.badge}
            </span>
          )}
        </Link>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bean className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground capitalize">{product.roastType.replace('_', ' ')}</span>
          </div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            <span className="text-xs text-muted-foreground">{product.origin.replace('_', ' ')}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
