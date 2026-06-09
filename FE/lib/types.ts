export interface Product {
  id: string
  name: string
  description: string
  price: number
  roastType: string
  origin: string
  imageUrl: string
  badge?: string | null
  inStock: boolean
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Story {
  id: string
  title: string
  content: string
  excerpt: string
  imageUrl?: string
  author?: string
  type: string
}

export interface Campaign {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  slug: string
  startDate: string
  endDate: string
  active: boolean
}
