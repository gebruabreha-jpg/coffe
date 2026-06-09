import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, MapPin } from 'lucide-react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const revalidate = 3600

interface StoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const story = await getStory(slug)

  if (!story) {
    notFound()
  }

  return (
    <article>
      <div className="relative h-[50vh] md:h-[60vh]">
        {story.coverImage && (
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 text-white">
            <Button asChild variant="ghost" className="mb-4 text-white hover:text-white/80">
              <Link href="/story">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stories
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{story.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm opacity-90">
              {story.origin && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {story.origin}
                </span>
              )}
              {story.roast && (
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" /> {story.roast} Roast
                </span>
              )}
              {story.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {story.date}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {story.content?.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {story.product && (
            <>
              <Separator className="my-12" />
              <div className="bg-muted/50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Try This Coffee</h2>
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  {story.product.image && (
                    <div className="relative w-32 h-32 rounded-md overflow-hidden bg-muted shrink-0">
                      <Image
                        src={story.product.image}
                        alt={story.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{story.product.name}</h3>
                    <p className="text-muted-foreground mb-4">{story.product.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold">${story.product.price}</span>
                      <Button>Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

async function getStory(slug: string) {
  const stories = [
    {
      id: '1',
      slug,
      title: 'The Origins of Ethiopian Yirgacheffe',
      coverImage: '/images/stories/ethiopia.jpg',
      content: 'Nestled in the southern highlands of Ethiopia, Yirgacheffe is renowned for producing some of the world\'s finest Arabica coffees. The region\'s unique combination of altitude, climate, and soil creates ideal conditions for coffee cultivation.\n\nLocal farmers here have been growing coffee for centuries, using traditional organic methods passed down through generations. The result is a cup with distinctive floral and citrus notes that have made Ethiopian coffee famous worldwide.\n\nOur direct trade partnerships ensure farmers receive fair prices while maintaining their commitment to sustainable farming practices. Every bag of our Ethiopian Yirgacheffe supports these communities and helps preserve their rich coffee heritage.',
      type: 'origin',
      origin: 'Ethiopia, Yirgacheffe',
      roast: 'Light',
      date: 'March 2025',
      product: {
        name: 'Ethiopian Yirgacheffe',
        description: 'Floral, citrus notes with a bright, clean finish',
        price: 18,
        image: '/images/products/ethiopia.jpg',
      },
    },
    {
      id: '2',
      slug,
      title: 'The Art of the Perfect Roast',
      coverImage: '/images/stories/roasting.jpg',
      content: 'Roasting is where green coffee transforms into the aromatic beans we know and love. It\'s both a science and an art form that requires precise timing, temperature control, and years of experience.\n\nAt our micro-roastery, we roast in small batches to ensure consistency and quality. Each origin receives a custom roast profile designed to highlight its unique characteristics.\n\nLight roasts preserve the bean\'s origin flavors, while darker roasts develop rich, caramelized notes. Our master roasters taste each batch to ensure it meets our exacting standards before it reaches you.',
      type: 'roast',
      origin: 'Multiple Origins',
      roast: 'Medium',
      date: 'February 2025',
      product: {
        name: 'House Blend',
        description: 'A perfectly balanced medium roast',
        price: 16,
        image: '/images/products/blend.jpg',
      },
    },
  ]

  const story = stories.find((s) => s.slug === slug)
  return story || null
}

export async function generateStaticParams() {
  const slugs = ['ethiopia-origins', 'art-of-roast']
  return slugs.map((slug) => ({ slug }))
}
