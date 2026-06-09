# HO Coffee

SaaS-grade headless coffee e-commerce built with Next.js + Shopify Storefront API.
## 📁 PROJECT STRUCTURE (START HERE)
### 🏗️ Feature-Based Architecture
```
/niloo-coffee
├── app/                       # Next.js App Router
│   ├── (shop)/                # Shop feature routes
│   │   ├── page.tsx           # Homepage
│   │   ├── cart/              # Cart page
│   │   ├── checkout/          # Checkout page  
│   │   └── product/[slug]/    # Product detail
│   ├── (cms)/                 # CMS feature routes
│   │   └── story/             # Story pages
│   ├── (brand)/               # Brand feature routes
│   │   ├── campaigns/         # Campaign landing pages
│   │   └── subscriptions/     # Subscription pages
│   ├── api/                   # Backend routes
│   └── layout.tsx
│
├── features/                  # Feature-based modules
│   ├── shop/
│   │   ├── components/
│   │   │   ├── cart/          # Cart components
│   │   │   └── ProductGrid.tsx
│   │   ├── hooks/             # Shop-specific hooks
│   │   └── services/          # Shopify API integration
│   ├── cms/
│   │   └── components/
│   │       └── StoryBlock.tsx
│   └── brand/
│       └── components/
│           └── CampaignBanner.tsx
│
├── components/                # Shared UI only
│   ├── ui/                    # Design system (Button, Card, Input, Dialog)
│   └── layout/                # Navbar, Footer, SearchModal
│
├── lib/
│   ├── shopify/               # Shopify GraphQL client + queries
│   ├── sanity/                # Sanity CMS client  
│   └── utils.ts               # Utility functions
│
├── store/                     # Global state (Zustand)
├── types/                     # Shared types
├── hooks/                     # Shared hooks
├── config/
└── public/
```