import { capturePostHogEvent } from '@/lib/analytics/posthog'
import { sendOrderConfirmationEmail } from '@/lib/email/send-order-confirmation'
import { getOrderById } from '../admin'

interface WebhookOrder {
  id: string
  email?: string | null
  name?: string | null
  total_price?: string | number | null
  currency?: string | null
  line_items?: Array<{
    title: string
    quantity: number
    variant_title?: string | null
    price?: string | number | null
  }>
}

interface AdminOrder {
  id: string
  email?: string | null
  name?: string | null
  totalPrice?: {
    amount: string
    currencyCode: string
  } | null
  lineItems?: {
    edges?: Array<{
      node: {
        title: string
        quantity: number
        variant?: {
          title?: string | null
          price?: {
            amount: string
            currencyCode: string
          } | null
        } | null
      }
    }>
  } | null
}

type OrderPayload = WebhookOrder | AdminOrder

function isOrderPayload(value: unknown): value is OrderPayload {
  return typeof value === 'object' && value !== null && 'id' in value
}

function getOrderEmail(order: OrderPayload) {
  return order.email
}

function getOrderTotal(order: OrderPayload) {
  if ('totalPrice' in order && order.totalPrice) {
    return {
      amount: order.totalPrice.amount,
      currency: order.totalPrice.currencyCode,
    }
  }

  const webhookOrder = order as WebhookOrder

  return {
    amount: typeof webhookOrder.total_price === 'number' ? webhookOrder.total_price.toFixed(2) : webhookOrder.total_price ?? '0',
    currency: webhookOrder.currency ?? 'USD',
  }
}

async function captureWebhookEvent(topic: string, order: OrderPayload, extraProperties: Record<string, unknown> = {}) {
  const email = getOrderEmail(order)
  const total = getOrderTotal(order)

  await capturePostHogEvent({
    distinctId: email || order.id,
    event: 'shopify_webhook_received',
    properties: {
      topic,
      orderId: order.id,
      orderName: order.name ?? null,
      email: email ?? null,
      total: total.amount,
      currency: total.currency,
      ...extraProperties,
    },
  })
}

export async function handleShopifyWebhook({
  topic,
  payload,
}: {
  topic: string
  payload: Record<string, unknown>
}) {
  if (topic === 'ORDERS_PAID') {
    if (!isOrderPayload(payload.order)) {
      return
    }

    const webhookOrder = payload.order
    const adminOrder = await getOrderById(webhookOrder.id).catch(() => null)
    const order = adminOrder ?? webhookOrder

    try {
      await sendOrderConfirmationEmail(order)
    } catch (error) {
      await capturePostHogEvent({
        distinctId: order.id,
        event: 'order_confirmation_email_failed',
        properties: {
          orderId: order.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      })
    }

    await captureWebhookEvent(topic, order)
    return
  }

  if (topic === 'FULFILLMENTS_UPDATE') {
    await capturePostHogEvent({
      distinctId: String(payload.id ?? 'fulfillment'),
      event: 'shopify_fulfillment_updated',
      properties: payload,
    })
    return
  }

  if (topic === 'INVENTORY_LEVELS_UPDATE') {
    await capturePostHogEvent({
      distinctId: String(payload.inventory_item_id ?? 'inventory'),
      event: 'shopify_inventory_updated',
      properties: payload,
    })
  }
}
