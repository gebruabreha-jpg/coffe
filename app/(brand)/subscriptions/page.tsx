import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const revalidate = 3600

export default async function SubscriptionsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Coffee Subscriptions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Freshly roasted coffee delivered to your door on your schedule. Pause, skip, or cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <SubscriptionCard
          name="Explorer"
          price={24}
          frequency="Monthly"
          description="2 bags per shipment"
          features={[
            '2 single-origin coffees',
            'Free shipping',
            'Brewing guide included',
            'Pause or skip anytime',
          ]}
          highlighted={false}
        />
        <SubscriptionCard
          name="Connoisseur"
          price={42}
          frequency="Monthly"
          description="3 bags per shipment"
          features={[
            '3 premium single-origin coffees',
            'Free priority shipping',
            'Exclusive micro-lots',
            'Brewing guide + tasting notes',
            '15% off all shop products',
          ]}
          highlighted={true}
        />
        <SubscriptionCard
          name="Roaster Club"
          price={60}
          frequency="Monthly"
          description="5 bags per shipment"
          features={[
            '5 exclusive microlots',
            'Free express shipping',
            'Early access to new releases',
            'Virtual cupping sessions',
            '25% off all shop products',
            'Free gift wrapping',
          ]}
          highlighted={false}
        />
      </div>
    </div>
  )
}

function SubscriptionCard({
  name,
  price,
  frequency,
  description,
  features,
  highlighted,
}: {
  name: string
  price: number
  frequency: string
  description: string
  features: string[]
  highlighted: boolean
}) {
  return (
    <Card className={`relative ${highlighted ? 'border-primary shadow-lg scale-105' : ''}`}>
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{frequency}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="w-full" variant={highlighted ? 'default' : 'outline'}>
          <Link href="/checkout?plan={name}">Subscribe Now</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
