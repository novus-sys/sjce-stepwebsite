'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, MoreHorizontal, Eye, Mail, Phone, CheckCircle, XCircle, 
  Clock, Download, Calendar, Users, Building, MessageSquare, Utensils, UserCheck 
} from 'lucide-react'
import { fetchEventRegistrations, createClient } from '@/lib/supabase'
import { useToast } from '@/components/ui/toast'

interface Registration {
  id: string
  event_id: string
  name: string
  email: string
  phone?: string
  organization?: string
  dietary_requirements?: string
  questions?: string
  status: string
  created_at: string
  events: {
    title: string
    event_date: string
    event_time: string
    location: string
  }
}

export default function RegistrationsPage() {
  const { showToast } = useToast()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [eventFilter, setEventFilter] = useState<string>('all')
  const [events, setEvents] = useState<Array<{id: string, title: string}>>([])

  const loadRegistrations = async () => {
    try {
      const data = await fetchEventRegistrations()
      setRegistrations(data)
      
      // Extract unique events for filter
      const uniqueEvents = Array.from(
        new Map(data.map(reg => [reg.event_id, { id: reg.event_id, title: reg.events.title }])).values()
      )
      setEvents(uniqueEvents)
    } catch (error) {
      console.error('Failed to load registrations:', error)
      setRegistrations([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRegistrations()
  }, [])

  const filteredRegistrations = registrations.filter(registration => {
    const matchesSearch = 
      registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.events.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (registration.organization && registration.organization.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || registration.status === statusFilter
    const matchesEvent = eventFilter === 'all' || registration.event_id === eventFilter
    
    return matchesSearch && matchesStatus && matchesEvent
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>
      case 'waitlisted':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Waitlisted</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
      case 'attended':
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 mr-1" />Attended</Badge>
      case 'no_show':
        return <Badge className="bg-gray-100 text-gray-800"><XCircle className="w-3 h-3 mr-1" />No Show</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleUpdateStatus = async (registrationId: string, newStatus: string) => {
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('event_registrations')
        .update({ status: newStatus })
        .eq('id', registrationId)

      if (error) {
        console.error('Failed to update status:', error)
        showToast("Failed to update registration status. Please try again.", "error")
        return
      }

      // Update local state
      setRegistrations(prev => prev.map(reg => 
        reg.id === registrationId 
          ? { ...reg, status: newStatus }
          : reg
      ))

      showToast(`Registration status updated to ${newStatus}`, "success")
    } catch (error) {
      console.error('Status update failed:', error)
      showToast("Failed to update registration status. Please try again.", "error")
    }
  }

  const handleDeleteRegistration = async (registrationId: string) => {
    if (!confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
      return
    }

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('id', registrationId)

      if (error) {
        console.error('Failed to delete registration:', error)
        showToast("Failed to delete registration. Please try again.", "error")
        return
      }

      // Remove from local state
      setRegistrations(prev => prev.filter(reg => reg.id !== registrationId))
      showToast("Registration deleted successfully!", "success")
    } catch (error) {
      console.error('Delete failed:', error)
      showToast("Failed to delete registration. Please try again.", "error")
    }
  }

  const exportRegistrations = () => {
    const csvContent = [
      // Header
      ['Name', 'Email', 'Phone', 'Organization', 'Event', 'Event Date', 'Status', 'Dietary Requirements', 'Questions', 'Registration Date'].join(','),
      // Data
      ...filteredRegistrations.map(reg => [
        reg.name,
        reg.email,
        reg.phone || '',
        reg.organization || '',
        reg.events.title,
        formatDate(reg.events.event_date),
        reg.status,
        reg.dietary_requirements || '',
        reg.questions || '',
        formatDate(reg.created_at)
      ].map(field => `"${field}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `event-registrations-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading registrations...</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = {
    total: registrations.length,
    confirmed: registrations.filter(r => r.status === 'confirmed').length,
    waitlisted: registrations.filter(r => r.status === 'waitlisted').length,
    attended: registrations.filter(r => r.status === 'attended').length
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Registrations</h1>
          <p className="text-gray-600">Manage event registrations and attendee information</p>
        </div>
        
        <Button onClick={exportRegistrations} className="bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waitlisted</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.waitlisted}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attended</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.attended}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search registrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="waitlisted">Waitlisted</option>
              <option value="cancelled">Cancelled</option>
              <option value="attended">Attended</option>
              <option value="no_show">No Show</option>
            </select>
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Events</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>{event.title}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
          <CardDescription>
            View and manage event registrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRegistrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{registration.name}</div>
                      {registration.dietary_requirements && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Utensils className="w-3 h-3 mr-1" />
                          {registration.dietary_requirements}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{registration.events.title}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(registration.events.event_date)} at {registration.events.event_time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="w-3 h-3 mr-1 text-gray-400" />
                        <a href={`mailto:${registration.email}`} className="text-blue-600 hover:underline">
                          {registration.email}
                        </a>
                      </div>
                      {registration.phone && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          <a href={`tel:${registration.phone}`} className="hover:underline">
                            {registration.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {registration.organization ? (
                      <div className="flex items-center text-sm">
                        <Building className="w-3 h-3 mr-1 text-gray-400" />
                        {registration.organization}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(registration.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatDate(registration.created_at)}</div>
                      <div className="text-gray-500">{formatTime(registration.created_at)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {registration.questions && (
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            View Questions
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(registration.id, 'confirmed')}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(registration.id, 'waitlisted')}>
                          <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                          Waitlist
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(registration.id, 'attended')}>
                          <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                          Mark Attended
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdateStatus(registration.id, 'no_show')}>
                          <XCircle className="mr-2 h-4 w-4 text-gray-600" />
                          No Show
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDeleteRegistration(registration.id)}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredRegistrations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No registrations found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
