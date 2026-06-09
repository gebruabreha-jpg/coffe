import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Campaign } from '@/lib/types'

interface CampaignBannerProps {
  campaign?: Campaign
}

export default function CampaignBanner({ campaign }: CampaignBannerProps) {
  const defaultCampaign: Campaign = {
    id: 'default',
    title: 'Spring Subscription Box',
    subtitle: 'Get 3 exclusive single-origin coffees delivered monthly',
    imageUrl: '/images/campaigns/spring-bundle.jpg',
    slug: 'spring-subscription',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    active: true
  }

  const data = campaign ?? defaultCampaign

  return (
    <div className="relative rounded-2xl overflow-hidden bg-primary/10">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <span className="text-sm font-medium text-primary mb-4">LIMITED OFFER</span>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">{data.title}</h3>
          <p className="text-lg text-muted-foreground mb-6">{data.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={`/campaign/${data.slug}`}>
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/subscriptions">View Plans</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 lg:h-auto">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
