import { NextRequest, NextResponse } from 'next/server'
import { createShopifyCheckout } from '@/lib/shopify/checkout'

interface CheckoutLineInput {
  variantId?: string
  quantity?: number
}

interface CheckoutBody {
  email?: string
  items?: CheckoutLineInput[]
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unable to create Shopify checkout'
}

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as CheckoutBody | null

  if (!body || !Array.isArray(body.items)) {
    return NextResponse.json({ error: 'Invalid checkout payload' }, { status: 400 })
  }

  const lines = body.items
    .map((item) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    }))
    .filter((line): line is { merchandiseId: string; quantity: number } => {
      return typeof line.merchandiseId === 'string' && Number.isInteger(line.quantity) && (line.quantity ?? 0) > 0
    })

  if (!lines.length || lines.length !== body.items.length) {
    return NextResponse.json({ error: 'Invalid cart lines' }, { status: 400 })
  }

  try {
    const url = await createShopifyCheckout({
      lines,
      email: typeof body.email === 'string' ? body.email : undefined,
      attributes: [
        { key: 'source', value: 'nilo-nextjs' },
        { key: 'storefront', value: request.headers.get('host') ?? 'unknown' },
      ],
    })

    return NextResponse.json({ url })
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 })
  }
}
