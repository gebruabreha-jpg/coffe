import Link from 'next/link'
import { ChevronRight, Coffee, Menu, Search, ShoppingBag, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCollections } from '@/lib/shopify'
import { SearchModal } from '@/components/layout/SearchModal'

export default async function Header() {
  const collections = await getCollections()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" className="flex items-center space-x-2">
              <Coffee className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">4Coffee</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/shop" className="transition-colors hover:text-primary">
                Shop
              </Link>
              {collections.slice(0, 4).map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="transition-colors hover:text-primary"
                >
                  {collection.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <SearchModal>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </SearchModal>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
