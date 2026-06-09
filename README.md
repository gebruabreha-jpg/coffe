# 4Coffee Commerce Platform

Headless coffee e-commerce built with Next.js + Shopify Storefront API.

## Architecture

```
4coffe-commerce-platform/
  FE/            - Next.js 14 App Router frontend
  FE/app/        - Pages (shop, brand, CMS)
  FE/components/ - React components (ui, product, cart, story, brand)
  FE/lib/        - Shopify client, utils, types
  lib/           - Shared utilities
  styles/        - Tailwind + design system
```

## Tech Stack

- Next.js 14 (App Router) - SSR/SSG/ISR
- Shopify Storefront API - headless commerce
- Tailwind CSS + Radix UI - design system
- Vercel Edge - caching + performance

Vercel:-
  Your stack is already optimized for it:
  Native support for Next.js 14 App Router
  Excellent support for SSR, SSG, ISR, and Server Components
  Global Edge Network for fast page delivery
  Automatic deployments from GitHub
  Built-in preview environments for every PR
  Easy environment variable management for Shopify API keys
  Image optimization and caching out of the box

  GitHub
    ↓
  Vercel
    ↓
  Next.js 14
    ↓
  Shopify Storefront API