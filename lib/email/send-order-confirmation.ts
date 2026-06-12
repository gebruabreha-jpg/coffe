import { Resend } from 'resend'

interface OrderEmailItem {
  title: string
  quantity: number
  variantTitle?: string | null
  price?: string | null
}

interface OrderEmailLike {
  id: string
  name?: string | null
  email?: string | null
  totalPrice?: {
    amount: string
    currencyCode: string
  } | null
  total_price?: string | number | null
  currency?: string | null
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
  line_items?: Array<{
    title: string
    quantity: number
    variant_title?: string | null
    price?: string | number | null
  }> | null
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

function getLineItems(order: OrderEmailLike): OrderEmailItem[] {
  if (order.lineItems?.edges?.length) {
    return order.lineItems.edges.map(({ node }) => ({
      title: node.title,
      quantity: node.quantity,
      variantTitle: node.variant?.title,
      price: node.variant?.price?.amount ?? null,
    }))
  }

  if (order.line_items?.length) {
    return order.line_items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      variantTitle: item.variant_title,
      price: typeof item.price === 'number' ? item.price.toFixed(2) : item.price,
    }))
  }

  return []
}

function formatTotal(order: OrderEmailLike) {
  const amount = order.totalPrice?.amount ?? order.total_price ?? '0'
  const currency = order.totalPrice?.currencyCode ?? order.currency ?? 'USD'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(Number(amount))
}

export async function sendOrderConfirmationEmail(order: OrderEmailLike) {
  if (!resend || !order.email) {
    return
  }

  const lineItems = getLineItems(order)
  const orderName = order.name ? ` ${order.name}` : ''
  const itemsHtml = lineItems
    .map(
      (item) => `
        <li>
          <strong>${item.title}${item.variantTitle ? ` - ${item.variantTitle}` : ''}</strong>
          x ${item.quantity}
          ${item.price ? ` - ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(item.price))}` : ''}
        </li>
      `,
    )
    .join('')

  await resend.emails.send({
    from: process.env.EMAIL_FROM || 'NILO Coffee <onboarding@resend.dev>',
    to: [order.email],
    subject: `Thanks for your order${orderName}`,
    html: `
      <h1>Thanks for your order${orderName}</h1>
      <p>We received your order and will prepare it shortly.</p>
      <p><strong>Total:</strong> ${formatTotal(order)}</p>
      <h2>Items</h2>
      <ul>${itemsHtml || '<li>No items found</li>'}</ul>
      <p>Order ID: ${order.id}</p>
    `,
  })
}
