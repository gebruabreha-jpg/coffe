interface CampaignBannerProps {
  campaign?: {
    title: string
    subtitle: string
    slug: string
  }
}

export default function CampaignBanner({ campaign }: CampaignBannerProps) {
  if (!campaign) return null
  
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-2">{campaign.title}</h3>
      <p className="text-muted-foreground">{campaign.subtitle}</p>
    </div>
  )
}