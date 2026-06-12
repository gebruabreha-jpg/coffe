import { createHmac, timingSafeEqual } from 'node:crypto'
import { SHOPIFY_WEBHOOK_SECRET } from './config'

export function verifyShopifyWebhook(rawBody: string, signature: string | null) {
  if (!SHOPIFY_WEBHOOK_SECRET || !signature) {
    return false
  }

  const expectedSignature = createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, 'utf8')
    .digest('base64')

  const signatureBuffer = Buffer.from(signature)
  const expectedSignatureBuffer = Buffer.from(expectedSignature)

  return (
    signatureBuffer.length === expectedSignatureBuffer.length &&
    timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  )
}
