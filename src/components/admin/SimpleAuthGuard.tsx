'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopBar } from './AdminTopBar'

export function SimpleAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true'
    setIsAuthenticated(isLoggedIn)
    setLoading(false)

    // Redirect to login if not authenticated and not already on login page
    if (!isLoggedIn && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [router, pathname])

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login page content directly (no layout)
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show admin panel with layout if authenticated
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Top Bar */}
          <AdminTopBar />
          
          {/* Page Content */}
          <main className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    )
  }

  // Show nothing while redirecting
  return null
}

