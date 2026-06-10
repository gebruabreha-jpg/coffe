import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground">All Coffees</Link></li>
              <li><Link href="/subscriptions" className="hover:text-foreground">Subscriptions</Link></li>
              <li><Link href="/bundles" className="hover:text-foreground">Bundles</Link></li>
              <li><Link href="/gift-cards" className="hover:text-foreground">Gift Cards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/story" className="hover:text-foreground">Our Story</Link></li>
              <li><Link href="/origins" className="hover:text-foreground">Origins</Link></li>
              <li><Link href="/brewing" className="hover:text-foreground">Brewing Guides</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">Journal</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-foreground">Returns</Link></li>
              <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground">About</Link></li>
              <li><Link href="/sustainability" className="hover:text-foreground">Sustainability</Link></li>
              <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="/press" className="hover:text-foreground">Press</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 HO Coffee. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}