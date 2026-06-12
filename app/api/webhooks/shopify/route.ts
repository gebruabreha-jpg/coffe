import { NextRequest, NextResponse } from 'next/server'
import { handleShopifyWebhook } from '@/lib/shopify/webhooks/handler'
import { verifyShopifyWebhook } from '@/lib/shopify/webhook'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const topic = request.headers.get('x-shopify-topic')
  const hmac = request.headers.get('x-shopify-hmac-sha256')

  if (!topic || !verifyShopifyWebhook(rawBody, hmac)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: Record<string, unknown>

  try {
    payload = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 })
  }

  await handleShopifyWebhook({ topic, payload })

  return NextResponse.json({ ok: true })
}
