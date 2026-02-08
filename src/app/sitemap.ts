import type { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { getSiteUrl } from '@/lib/site-url'

const STATIC_ROUTES: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/collections', changeFrequency: 'daily', priority: 0.9 },
  { path: '/new', changeFrequency: 'daily', priority: 0.8 },
  { path: '/fashion', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/pure-gold', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/sale', changeFrequency: 'daily', priority: 0.8 },
  { path: '/partnership', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/custom-order', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/support', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/announcements', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('product_full_details')
      .select('product_id, updated_at')
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Failed to generate product sitemap entries:', error.message)
      return staticEntries
    }

    const productEntries: MetadataRoute.Sitemap = (data ?? []).map((product) => ({
      url: `${siteUrl}/products/${product.product_id}`,
      lastModified: product.updated_at ? new Date(product.updated_at) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    return [...staticEntries, ...productEntries]
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return staticEntries
  }
}
