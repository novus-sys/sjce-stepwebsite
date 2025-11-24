import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sjce-step.com'

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/programs',
    '/programs/incubation',
    '/programs/acceleration', 
    '/programs/mentorship',
    '/startups',
    '/blog',
    '/events',
    '/facilities',
    '/contact',
  ]

  const staticSitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // TODO: Add dynamic pages when we have the data
  // - Blog articles: /blog/[slug]
  // - Events: /events/[slug]
  // - Startups: /startups/[slug]

  return staticSitemap
}
