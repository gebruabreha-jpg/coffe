import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateStaticParams() {
  const campaigns = await getCampaigns()
  return campaigns.map((campaign) => ({
    slug: campaign.slug,
  }))
}

interface CampaignProduct {
  id: string
  name: string
  description: string
  price: number
  image?: string
}

interface Campaign {
  id: string
  slug: string
  title: string
  description: string
  image?: string
  content?: string
  ctaText?: string
  ctaLink?: string
  products: CampaignProduct[]
  startDate: string
  endDate: string
}

interface CampaignPageProps {
  params: Promise<{ slug: string }>
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = await params
  const campaign = await getCampaign(slug)

  if (!campaign) {
    notFound()
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center">
        <div className="absolute inset-0">
          {campaign.image && (
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              priority
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative container mx-auto px-4 text-white">
          <span className="text-sm font-medium mb-4 block opacity-80">
            Limited Time Offer
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{campaign.title}</h1>
          <p className="text-xl opacity-90 max-w-2xl mb-8">{campaign.description}</p>
          <Button asChild size="lg" variant="secondary">
            <Link href={campaign.ctaLink || '/shop'}>
              {campaign.ctaText || 'Shop Now'} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Content */}
      {campaign.content && (
        <section className="py-16">
          <div className="container mx-auto px-4 prose prose-lg max-w-3xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: campaign.content }} />
          </div>
        </section>
      )}

      {/* Products */}
      {campaign.products && campaign.products.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">In This Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaign.products.map((product) => (
                <div key={product.id} className="bg-background rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-square relative bg-muted">
                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${product.price}</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

async function getCampaigns(): Promise<Campaign[]> {
  return [
    {
      id: '1',
      slug: 'spring-subscription',
      title: 'Spring Subscription Box',
      description: 'Get 3 exclusive single-origin coffees delivered monthly',
      image: '/images/campaigns/spring-bundle.jpg',
      content: '<p>Our spring subscription box features three rare single-origin coffees from Ethiopia, Colombia, and Guatemala.</p>',
      ctaText: 'Start Subscription',
      ctaLink: '/subscriptions',
      products: [],
      startDate: '2025-03-01',
      endDate: '2025-05-31',
    },
    {
      id: '2',
      slug: 'beginner-bundle',
      title: 'Starter Bundle',
      description: 'Everything you need to begin your coffee journey',
      image: '/images/campaigns/beginner-bundle.jpg',
      content: '<p>Perfect for those new to specialty coffee. Includes 3 bags of our most popular blends and a brewing guide.</p>',
      ctaText: 'Get Bundle',
      ctaLink: '/bundles/beginner',
      products: [],
      startDate: '2025-01-01',
      endDate: '2025-12-31',
    },
  ]
}

async function getCampaign(slug: string) {
  const campaigns = await getCampaigns()
  return campaigns.find((c) => c.slug === slug) || null
}
