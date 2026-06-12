'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PostHogReactProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    if (typeof window === 'undefined' || !apiKey) {
      return
    }

    posthog.init(apiKey, {
      api_host: apiHost,
      person_profiles: 'identified_only',
      capture_pageview: false,
    })
  }, [])

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>
  }

  return <PostHogReactProvider client={posthog}>{children}</PostHogReactProvider>
}
