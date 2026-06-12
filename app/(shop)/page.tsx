import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Coffee, Bean, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import CampaignBanner from '@/features/brand/components/CampaignBanner'
import ProductGrid from '@/features/shop/components/ProductGrid'
import { getProducts, getCollections } from '@/lib/shopify'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'NILO Coffee - Single-Origin Specialty Coffee',
  description: 'Discover single-origin coffees sourced directly from farmers. Roasted to perfection. Delivered fresh to your door.',
  openGraph: {
    title: 'NILO Coffee - Single-Origin Specialty Coffee',
    description: 'Discover single-origin coffees sourced directly from farmers.',
    images: ['/og-image.jpg'],
  },
}

interface StoryPreview {
  title: string
  excerpt: string
}

interface CampaignPreview {
  title: string
  subtitle: string
  slug: string
}

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    location: 'San Francisco, CA',
    rating: 5,
    quote: "Best coffee I've ever had. The Ethiopian blend is incredible - you can taste the craftsmanship.",
  },
  {
    id: '2',
    name: 'Marcus Rivera',
    location: 'Portland, OR',
    rating: 5,
    quote: 'Fresh, aromatic, and ethically sourced. NILO has converted me to single-origin for life.',
  },
  {
    id: '3',
    name: 'Julia Kim',
    location: 'Seattle, WA',
    rating: 5,
    quote: 'The subscription box introduced me to coffees I never would have found. Every month is a discovery.',
  },
]

export default async function HomePage() {
  const story = {
    title: 'From Ethiopia to Your Cup',
    excerpt: 'Discover the journey of our flagship single-origin beans.',
  }

  const campaign = {
    title: 'Spring Subscription Box',
    subtitle: '3 exclusive single-origin coffees delivered monthly',
    slug: 'spring-subscription',
  }

  const products = await getProducts(4)
  const collections = await getCollections(3)

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FeaturedProductsSection products={products} />
      <CollectionsSection collections={collections} />
      <FeaturedStorySection story={story} />
      <TestimonialsSection testimonials={testimonials} />
      <CampaignBannerSection campaign={campaign} />
      <NewsletterSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-amber-50 to-background overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Discover Your Perfect <span className="text-primary">Brew</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Single-origin coffees sourced directly from farmers. Roasted to perfection. Delivered fresh to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/shop">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/story">Our Story</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="/hero-coffee-beans.jpg"
              alt="Premium coffee beans being poured into a glass container"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Coffee className="h-8 w-8 text-primary" />}
            title="Premium Beans"
            description="Single-origin Arabica from renowned growing regions"
          />
          <FeatureCard
            icon={<Bean className="h-8 w-8 text-primary" />}
            title="Freshly Roasted"
            description="Small-batch roasted to order within 48 hours"
          />
          <FeatureCard
            icon={<Coffee className="h-8 w-8 text-primary" />}
            title="Ethically Sourced"
            description="Direct trade relationships with farming cooperatives"
          />
          <FeatureCard
            icon={<Coffee className="h-8 w-8 text-primary" />}
            title="Satisfaction Guaranteed"
            description="30-day money-back guarantee on all products"
          />
        </div>
      </div>
    </section>
  )
}

function FeaturedProductsSection({ products }: { products: Awaited<ReturnType<typeof getProducts>> }) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button asChild variant="ghost">
            <Link href="/shop">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <ProductGrid products={products.map(p => ({
          id: p.id,
          title: p.title,
          image: p.images?.edges[0]?.node?.url || '/placeholder.jpg',
          price: parseFloat(p.priceRange?.minVariantPrice?.amount || '0'),
          handle: p.handle,
        }))} featured />
      </div>
    </section>
  )
}

function CollectionsSection({ collections }: { collections: Awaited<ReturnType<typeof getCollections>> }) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/shop/${collection.handle}`}
              className="group block"
            >
              <div className="aspect-square relative rounded-lg overflow-hidden bg-muted mb-4">
                <Image
                  src={collection.image?.url || '/placeholder.jpg'}
                  alt={collection.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-center group-hover:text-primary transition-colors">
                {collection.title}
              </h3>
              {collection.productsCount && (
                <p className="text-sm text-muted-foreground text-center">
                  {collection.productsCount} products
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedStorySection({ story }: { story: StoryPreview }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">{story.title}</h3>
          <p className="text-muted-foreground mb-6">{story.excerpt}</p>
          <Button asChild variant="outline">
            <Link href="/story">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
          ))}
        </div>
        <p className="text-muted-foreground mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function CampaignBannerSection({ campaign }: { campaign: CampaignPreview }) {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <CampaignBanner campaign={campaign} />
      </div>
    </section>
  )
}

function NewsletterSection() {
  return (
    <section className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Club</h2>
        <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
          Get 15% off your first order plus exclusive access to limited releases and brewing guides.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-md bg-background/10 border border-background/20 text-background placeholder:text-background/60 focus:outline-none focus:ring-2 focus:ring-background/50"
          />
          <Button variant="secondary" type="submit">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}