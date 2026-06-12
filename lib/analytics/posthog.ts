const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

export async function capturePostHogEvent({
  distinctId,
  event,
  properties = {},
}: {
  distinctId: string
  event: string
  properties?: Record<string, unknown>
}) {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

  if (!apiKey) {
    return
  }

  try {
    await fetch(`${POSTHOG_HOST.replace(/\/$/, '')}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        event,
        distinct_id: distinctId,
        properties: {
          ...properties,
          $lib: 'nilo-server',
        },
      }),
    })
  } catch {
    return
  }
}
