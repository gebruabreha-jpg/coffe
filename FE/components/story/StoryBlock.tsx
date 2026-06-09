import { MapPin, Calendar, Leaf, Award, Coffee } from 'lucide-react'

export default function StoryBlock() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our journey begins in the highlands of Ethiopia, where coffee was first discovered. 
            We partner directly with smallholder farmers who share our commitment to quality and 
            sustainability.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every batch is roasted in our micro-roastery using traditional methods passed down 
            through generations, ensuring each cup tells a unique story of its origin.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <p className="font-semibold">12 Origins</p>
              <p className="text-sm text-muted-foreground">Across 6 countries</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <p className="font-semibold">100% Organic</p>
              <p className="text-sm text-muted-foreground">Certified farms</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <CoffeeIcon className="h-24 w-24 text-primary mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Est. 2018</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CoffeeIcon({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 21V7h16v4h1v10H2zm16-8v6h1v-6h-1zm0-4v4h1V9h-1zM4 9v12h10V9H4zm2 10V11h6v8H6z" />
    </svg>
  )
}
