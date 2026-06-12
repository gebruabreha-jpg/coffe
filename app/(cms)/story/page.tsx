import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import Image from 'next/image'

export const revalidate = 3600

export default async function StoryListingPage() {
  const stories = await getStories()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Coffee Stories</h1>
          <p className="text-xl text-muted-foreground">
            Discover the origins, people, and processes behind every cup
          </p>
        </div>

        <div className="space-y-8">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.slug}`}
              className="block group"
            >
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {story.coverImage && (
                    <div className="aspect-video md:aspect-auto relative bg-muted">
                      <Image
                        src={story.coverImage}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <BookOpen className="h-4 w-4" />
                      <span className="capitalize">{story.type}</span>
                      {story.origin && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{story.origin}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h2>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {story.description}
                    </p>
                    <span className="text-sm font-medium text-primary flex items-center gap-1">
                      Read Story <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

async function getStories() {
  return [
    {
      id: '1',
      slug: 'ethiopia-origins',
      title: 'The Origins of Ethiopian Yirgacheffe',
      description: 'Discover how the highlands of Ethiopia produce some of the world\'s finest coffee.',
      coverImage: '/images/stories/ethiopia.jpg',
      type: 'origin',
      origin: 'Ethiopia',
    },
    {
      id: '2',
      slug: 'art-of-roast',
      title: 'The Art of the Perfect Roast',
      description: 'Learn how our master roasters bring out the best in every bean.',
      coverImage: '/images/stories/roasting.jpg',
      type: 'roast',
      origin: 'Roastery',
    },
    {
      id: '3',
      slug: 'farmers-story',
      title: 'Meet the Farmers',
      description: 'The people behind your cup - dedicated farmers committed to quality.',
      coverImage: '/images/stories/farmers.jpg',
      type: 'farmer',
      origin: 'Latin America',
    },
    {
      id: '4',
      slug: 'sustainability',
      title: 'Sustainability at 4Coffee',
      description: 'Our commitment to ethical sourcing and environmental responsibility.',
      coverImage: '/images/stories/sustainability.jpg',
      type: 'sustainability',
      origin: 'Global',
    },
  ]
}
