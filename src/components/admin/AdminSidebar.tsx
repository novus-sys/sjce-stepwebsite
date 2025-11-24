'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from './AuthProvider'
import {
  LayoutDashboard,
  Building2,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  FileCheck,
  UserCheck,
  Mail,
  LogOut
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Startups', href: '/admin/startups', icon: Building2 },
  { name: 'Blog & Articles', href: '/admin/blog', icon: FileText },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Team', href: '/admin/team', icon: Users },
  { name: 'Applications', href: '/admin/applications', icon: FileCheck },
  { name: 'Registrations', href: '/admin/registrations', icon: UserCheck },
  { name: 'Contact Submissions', href: '/admin/contacts', icon: Mail },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg lg:block">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-blue-900 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">SJCE-STEP</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 shrink-0',
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </div>

        {/* Logout */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <LogoutButton />
        </div>
      </nav>
    </div>
  )
}

function LogoutButton() {
  const { signOut } = useAuth()

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/admin/login'
  }

  return (
    <button 
      onClick={handleLogout}
      className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
    >
      <LogOut className="mr-3 h-5 w-5 shrink-0 text-gray-400 group-hover:text-red-500" />
      Logout
    </button>
  )
}
