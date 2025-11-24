'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Building2,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  FileCheck,
  UserCheck,
  Mail,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react'
import { fetchDashboardStats, fetchRecentActivity, DashboardStats, ActivityItem } from '@/lib/supabase'


export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStartups: 0,
    totalBlogs: 0,
    upcomingEvents: 0,
    pendingApplications: 0,
    unreadMessages: 0,
    draftBlogs: 0,
    recentRegistrations: 0,
    teamMembers: 0
  })
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsData, activityData] = await Promise.all([
          fetchDashboardStats(),
          fetchRecentActivity()
        ])
        
        setStats(statsData)
        setActivities(activityData)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const quickStats = [
    {
      title: 'Total Startups',
      value: stats.totalStartups,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/startups'
    },
    {
      title: 'Published Blogs',
      value: stats.totalBlogs,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/blog'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/events'
    },
    {
      title: 'Team Members',
      value: stats.teamMembers,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/team'
    }
  ]

  const pendingItems = [
    {
      title: 'Pending Applications',
      count: stats.pendingApplications,
      icon: FileCheck,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      href: '/admin/applications',
      urgent: stats.pendingApplications > 5
    },
    {
      title: 'Unread Messages',
      count: stats.unreadMessages,
      icon: Mail,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      href: '/admin/contact',
      urgent: stats.unreadMessages > 10
    },
    {
      title: 'Draft Blogs',
      count: stats.draftBlogs,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/blog?status=draft',
      urgent: false
    },
    {
      title: 'Recent Registrations',
      count: stats.recentRegistrations,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/registrations',
      urgent: false
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with SJCE-STEP.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Active
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending Items */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
              Pending Actions
            </CardTitle>
            <CardDescription>
              Items that need your attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingItems.map((item) => (
              <div key={item.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${item.bgColor}`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.count} {item.count === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {item.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 ${activity.color} rounded-full mt-2`}></div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Building2 className="h-6 w-6" />
              <span className="text-sm">Add Startup</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span className="text-sm">Write Blog</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Create Event</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

