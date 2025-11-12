'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, MoreHorizontal, Eye, Mail, Phone, MessageSquare, 
  Calendar, Filter, Download, CheckCircle, Clock, AlertCircle, XCircle 
} from 'lucide-react'
import { fetchContactSubmissions, updateContactSubmissionStatus } from '@/lib/supabase'
import { useToast } from '@/components/ui/toast'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  category?: string
  subject: string
  message: string
  status: string
  is_read: boolean
  admin_notes?: string
  response?: string
  submitted_at: string
  resolved_at?: string
  created_at: string
  updated_at: string
}

export default function ContactsPage() {
  const { showToast } = useToast()
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const loadContacts = async () => {
    try {
      const data = await fetchContactSubmissions()
      setContacts(data)
    } catch (error) {
      console.error('Failed to load contacts:', error)
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const handleStatusUpdate = async (contactId: string, newStatus: string) => {
    try {
      const result = await updateContactSubmissionStatus(contactId, newStatus)
      if (result.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Status updated successfully', 'success')
        loadContacts() // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update status:', error)
      showToast('Failed to update status. Please try again.', 'error')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programs':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'application':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'visit':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'partnership':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'other':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || (contact.category || 'other') === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const statusCounts = {
    all: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    pending: contacts.filter(c => c.status === 'pending').length,
    resolved: contacts.filter(c => c.status === 'resolved').length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-1">Manage and respond to contact form submissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total', count: statusCounts.all, color: 'bg-blue-500' },
          { label: 'New', count: statusCounts.new, color: 'bg-blue-500' },
          { label: 'Pending', count: statusCounts.pending, color: 'bg-yellow-500' },
          { label: 'Resolved', count: statusCounts.resolved, color: 'bg-green-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${stat.color} mr-3`}></div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="pending">Pending</option>
                <option value="resolved">Resolved</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Categories</option>
                <option value="programs">Programs</option>
                <option value="application">Application</option>
                <option value="visit">Campus Visit</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions ({filteredContacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Contact</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{contact.subject}</div>
                      <div className="text-sm text-gray-600 truncate max-w-xs">
                        {contact.message}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getCategoryColor(contact.category || 'other')} border`}>
                        {(contact.category || 'other').replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(contact.status)} border flex items-center gap-1 w-fit`}>
                        {getStatusIcon(contact.status)}
                        {contact.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{formatDate(contact.submitted_at || contact.created_at)}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedContact(contact)
                            setIsDetailDialogOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusUpdate(contact.id, 'new')}>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              New
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(contact.id, 'pending')}>
                              <Clock className="w-4 h-4 mr-2" />
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(contact.id, 'resolved')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Resolved
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredContacts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No contact submissions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Submission Details</DialogTitle>
            <DialogDescription>
              View full details of the contact submission
            </DialogDescription>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Name</Label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Email</Label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>
              </div>
              
              {selectedContact.phone && (
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                  <p className="text-gray-900">{selectedContact.phone}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Category</Label>
                  <Badge className={`${getCategoryColor(selectedContact.category || 'other')} border mt-1`}>
                    {(selectedContact.category || 'other').replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Status</Label>
                  <Badge className={`${getStatusColor(selectedContact.status)} border flex items-center gap-1 w-fit mt-1`}>
                    {getStatusIcon(selectedContact.status)}
                    {selectedContact.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-700">Subject</Label>
                <p className="text-gray-900 mt-1">{selectedContact.subject}</p>
              </div>
              
              <div>
                <Label className="text-sm font-semibold text-gray-700">Message</Label>
                <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-line">{selectedContact.message}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Submitted</Label>
                  <p>{formatDate(selectedContact.submitted_at || selectedContact.created_at)}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Last Updated</Label>
                  <p>{formatDate(selectedContact.updated_at)}</p>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  onClick={() => window.open(`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`, '_blank')}
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
                {selectedContact.phone && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`tel:${selectedContact.phone}`, '_blank')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
