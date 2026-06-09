import Link from 'next/link'
import { ArrowRight, Coffee, Bean } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import CampaignBanner from '@/features/brand/components/CampaignBanner'
import StoryBlock from '@/features/cms/components/StoryBlock'

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

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <FeaturedStorySection story={story} />
      <CampaignBannerSection campaign={campaign} />
      <NewsletterSection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-amber-50 to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
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

function FeaturedStorySection({ story }: { story: any }) {
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

function CampaignBannerSection({ campaign }: { campaign: any }) {
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