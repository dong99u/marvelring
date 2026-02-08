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

export function isSearchIndexingAllowed(): boolean {
  const vercelEnv = process.env.VERCEL_ENV

  // On Vercel, index only production deployments.
  if (vercelEnv) {
    return vercelEnv === 'production'
  }

  // Outside Vercel, default to blocking local/dev-style hosts.
  const siteUrl = getSiteUrl()
  const hostname = new URL(siteUrl).hostname

  if (hostname === 'localhost' || hostname.endsWith('.localhost')) {
    return false
  }

  return true
}
