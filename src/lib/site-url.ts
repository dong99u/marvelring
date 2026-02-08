const LOCAL_SITE_URL = 'http://localhost:3000'

function normalizeSiteUrl(rawUrl: string): string {
  const candidate = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`

  try {
    return new URL(candidate).origin
  } catch {
    return LOCAL_SITE_URL
  }
}

export function getSiteUrl(): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_URL

  if (!configuredUrl) {
    return LOCAL_SITE_URL
  }

  return normalizeSiteUrl(configuredUrl)
}
