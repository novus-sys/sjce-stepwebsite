// Performance monitoring utilities
import React from 'react'

// Web Vitals tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return

  // Track Core Web Vitals - dynamically import to avoid build errors if not installed
  const loadWebVitals = async () => {
    try {
      // Use dynamic import with proper error handling
      const webVitalsModule = await import('web-vitals' as any)
      
      if (webVitalsModule) {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitalsModule
        
        if (typeof getCLS === 'function') {
          getCLS(console.log)
          getFID(console.log)
          getFCP(console.log)
          getLCP(console.log)
          getTTFB(console.log)
        }
      }
    } catch (error) {
      console.warn('web-vitals package not available. Install with: npm install web-vitals')
    }
  }
  
  loadWebVitals()
}

// Performance timing helper
export function measurePerformance<T extends (...args: any[]) => Promise<any>>(name: string, fn: T): T {
  return (async (...args: Parameters<T>) => {
    const start = performance.now()
    
    try {
      const result = await fn(...args)
      const end = performance.now()
      
      console.log(`⚡ ${name} took ${(end - start).toFixed(2)}ms`)
      
      // Send to analytics in production
      if (process.env.NODE_ENV === 'production') {
        // gtag('event', 'timing_complete', {
        //   name: name,
        //   value: Math.round(end - start)
        // })
      }
      
      return result
    } catch (error) {
      const end = performance.now()
      console.error(`❌ ${name} failed after ${(end - start).toFixed(2)}ms:`, error)
      throw error
    }
  }) as T
}

// Database query performance tracker
export function trackDatabaseQuery(queryName: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    
    descriptor.value = async function (...args: any[]) {
      const start = performance.now()
      
      try {
        const result = await method.apply(this, args)
        const end = performance.now()
        const duration = end - start
        
        // Log slow queries
        if (duration > 1000) {
          console.warn(`🐌 Slow query ${queryName}: ${duration.toFixed(2)}ms`)
        }
        
        return result
      } catch (error) {
        console.error(`❌ Database query ${queryName} failed:`, error)
        throw error
      }
    }
  }
}

// Resource loading performance
export function preloadResource(href: string, as: 'script' | 'style' | 'font' | 'image') {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  
  if (as === 'font') {
    link.crossOrigin = 'anonymous'
  }
  
  document.head.appendChild(link)
}

// Critical resource hints
export function addResourceHints() {
  if (typeof window === 'undefined') return

  // Preconnect to external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    // Add your Supabase domain
    // 'https://your-project.supabase.co'
  ]

  domains.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Bundle size analyzer helper
export function analyzeBundleSize() {
  if (process.env.NODE_ENV === 'development') {
    console.log('📦 Bundle Analysis:')
    console.log('- React:', React)
    console.log('- Next.js version:', process.env.__NEXT_VERSION)
    
    // Log large dependencies
    const largeDeps = [
      'framer-motion',
      '@supabase/supabase-js',
      '@radix-ui/react-dialog'
    ]
    
    largeDeps.forEach(dep => {
      try {
        const module = require(dep)
        console.log(`- ${dep}:`, Object.keys(module).length, 'exports')
      } catch (e) {
        // Module not found or not accessible
      }
    })
  }
}

// Memory usage tracking
export function trackMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) return

  const memory = (performance as any).memory
  
  console.log('🧠 Memory Usage:', {
    used: `${Math.round(memory.usedJSHeapSize / 1048576)}MB`,
    total: `${Math.round(memory.totalJSHeapSize / 1048576)}MB`,
    limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)}MB`
  })
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // Track Web Vitals
  trackWebVitals()
  
  // Add resource hints
  addResourceHints()
  
  // Track memory usage periodically in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(trackMemoryUsage, 30000) // Every 30 seconds
  }
}
