import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/features/shop/components/cart/CartProvider'
import { PostHogProvider } from '@/components/analytics/PostHogProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HO Coffee - Premium Single-Origin Coffee',
  description: 'Discover exceptional single-origin coffees sourced directly from farmers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}