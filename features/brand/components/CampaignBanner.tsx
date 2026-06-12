import Link from 'next/link'

interface CampaignPreview {
  title: string
  subtitle: string
  slug: string
}

export default function CampaignBanner({ campaign }: { campaign: CampaignPreview }) {
  return (
    <section className="relative py-24 px-6 text-center bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold leading-tight">
          {campaign.title}
        </h1>

        <p className="mt-6 text-lg text-gray-200 leading-relaxed">
          {campaign.subtitle}
        </p>

        <div className="mt-8">
          <Link href={`/campaigns/${campaign.slug}`} className="bg-white text-black px-6 py-3 rounded-full font-medium">
            Shop Coffee
          </Link>
        </div>
      </div>
    </section>
  )
}
