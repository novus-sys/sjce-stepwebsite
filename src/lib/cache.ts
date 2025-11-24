// In-memory cache for client-side caching
class MemoryCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  set(key: string, data: any, ttlSeconds: number = 300): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlSeconds * 1000
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    const now = Date.now()
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data as T
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

export const memoryCache = new MemoryCache()

// Cache key generators
export const cacheKeys = {
  events: (status?: string) => `events:${status || 'all'}`,
  startups: (category?: string) => `startups:${category || 'all'}`,
  blogs: (category?: string, status?: string) => `blogs:${category || 'all'}:${status || 'published'}`,
  teamMembers: (category?: string) => `team:${category || 'all'}`,
  dashboardStats: () => 'dashboard:stats',
  recentActivity: () => 'dashboard:activity',
  testimonials: () => 'testimonials:all'
}

// Cached API wrapper
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  // Try to get from cache first
  const cached = memoryCache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  // Fetch fresh data
  const data = await fetcher()
  
  // Store in cache
  memoryCache.set(key, data, ttlSeconds)
  
  return data
}

// Cache invalidation helpers
export const invalidateCache = {
  events: () => {
    memoryCache.delete(cacheKeys.events())
    memoryCache.delete(cacheKeys.events('upcoming'))
    memoryCache.delete(cacheKeys.events('past'))
    memoryCache.delete(cacheKeys.dashboardStats())
    memoryCache.delete(cacheKeys.recentActivity())
  },
  
  startups: () => {
    memoryCache.delete(cacheKeys.startups())
    memoryCache.delete(cacheKeys.dashboardStats())
    memoryCache.delete(cacheKeys.recentActivity())
  },
  
  blogs: () => {
    memoryCache.delete(cacheKeys.blogs())
    memoryCache.delete(cacheKeys.blogs('success-story'))
    memoryCache.delete(cacheKeys.blogs('insights'))
    memoryCache.delete(cacheKeys.blogs('guides'))
    memoryCache.delete(cacheKeys.blogs('news'))
    memoryCache.delete(cacheKeys.dashboardStats())
    memoryCache.delete(cacheKeys.recentActivity())
  },
  
  team: () => {
    memoryCache.delete(cacheKeys.teamMembers())
    memoryCache.delete(cacheKeys.teamMembers('leadership'))
    memoryCache.delete(cacheKeys.teamMembers('advisory'))
    memoryCache.delete(cacheKeys.dashboardStats())
    memoryCache.delete(cacheKeys.recentActivity())
  },
  
  dashboard: () => {
    memoryCache.delete(cacheKeys.dashboardStats())
    memoryCache.delete(cacheKeys.recentActivity())
  },
  
  all: () => {
    memoryCache.clear()
  }
}

// Auto cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    memoryCache.cleanup()
  }, 5 * 60 * 1000)
}
