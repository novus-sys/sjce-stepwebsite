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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, MoreHorizontal, Edit, Trash2, Eye, Mail, Phone, MessageSquare, Clock, CheckCircle, XCircle, Reply } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  inquiry_type: 'general' | 'partnership' | 'investment' | 'media' | 'support' | 'application'
  status: 'new' | 'read' | 'replied' | 'resolved' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigned_to: string | null
  response_sent: boolean
  created_at: string
  updated_at: string
}

export default function ContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  useEffect(() => {
    // TODO: Fetch real data from Supabase
    // For now, using mock data
    setTimeout(() => {
      setSubmissions([
        {
          id: '1',
          name: 'Rajesh Kumar',
          email: 'rajesh@techstartup.com',
          phone: '+91 9876543210',
          subject: 'Partnership Opportunity',
          message: 'We are interested in partnering with SJCE-STEP for our upcoming tech accelerator program. Would love to discuss collaboration opportunities.',
          inquiry_type: 'partnership',
          status: 'new',
          priority: 'high',
          assigned_to: null,
          response_sent: false,
          created_at: '2024-11-10T14:30:00Z',
          updated_at: '2024-11-10T14:30:00Z'
        },
        {
          id: '2',
          name: 'Priya Sharma',
          email: 'priya.sharma@investor.fund',
          phone: '+91 9876543211',
          subject: 'Investment Inquiry',
          message: 'I represent a VC fund interested in investing in startups from your portfolio. Can we schedule a meeting to discuss potential opportunities?',
          inquiry_type: 'investment',
          status: 'read',
          priority: 'high',
          assigned_to: 'Admin User',
          response_sent: false,
          created_at: '2024-11-09T11:15:00Z',
          updated_at: '2024-11-10T09:30:00Z'
        },
        {
          id: '3',
          name: 'Arjun Patel',
          email: 'arjun@newsportal.com',
          phone: null,
          subject: 'Media Coverage Request',
          message: 'We would like to feature SJCE-STEP in our upcoming article about startup ecosystems in Karnataka. Could you provide some information and arrange an interview?',
          inquiry_type: 'media',
          status: 'replied',
          priority: 'medium',
          assigned_to: 'Marketing Team',
          response_sent: true,
          created_at: '2024-11-08T16:45:00Z',
          updated_at: '2024-11-09T10:20:00Z'
        },
        {
          id: '4',
          name: 'Sneha Reddy',
          email: 'sneha@entrepreneur.in',
          phone: '+91 9876543212',
          subject: 'Application Process Query',
          message: 'I have a fintech startup and would like to know more about your incubation program. What are the eligibility criteria and application deadlines?',
          inquiry_type: 'application',
          status: 'resolved',
          priority: 'medium',
          assigned_to: 'Program Manager',
          response_sent: true,
          created_at: '2024-11-07T13:20:00Z',
          updated_at: '2024-11-08T15:45:00Z'
        },
        {
          id: '5',
          name: 'Vikram Singh',
          email: 'vikram@corporate.com',
          phone: '+91 9876543213',
          subject: 'General Inquiry',
          message: 'Our company is looking for innovative startups to collaborate with. Can you provide information about your current portfolio companies?',
          inquiry_type: 'general',
          status: 'archived',
          priority: 'low',
          assigned_to: 'Business Development',
          response_sent: true,
          created_at: '2024-11-05T10:30:00Z',
          updated_at: '2024-11-06T14:15:00Z'
        },
        {
          id: '6',
          name: 'Maya Patel',
          email: 'maya@techsupport.help',
          phone: '+91 9876543214',
          subject: 'Website Technical Issue',
          message: 'I am facing issues with the application form submission on your website. The form keeps showing an error message when I try to submit.',
          inquiry_type: 'support',
          status: 'new',
          priority: 'urgent',
          assigned_to: null,
          response_sent: false,
          created_at: '2024-11-10T09:15:00Z',
          updated_at: '2024-11-10T09:15:00Z'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter
    const matchesType = typeFilter === 'all' || submission.inquiry_type === typeFilter
    const matchesPriority = priorityFilter === 'all' || submission.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800"><MessageSquare className="w-3 h-3 mr-1" />New</Badge>
      case 'read':
        return <Badge className="bg-yellow-100 text-yellow-800"><Eye className="w-3 h-3 mr-1" />Read</Badge>
      case 'replied':
        return <Badge className="bg-purple-100 text-purple-800"><Reply className="w-3 h-3 mr-1" />Replied</Badge>
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800"><XCircle className="w-3 h-3 mr-1" />Archived</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    const typeColors = {
      'general': 'bg-gray-100 text-gray-800',
      'partnership': 'bg-blue-100 text-blue-800',
      'investment': 'bg-purple-100 text-purple-800',
      'media': 'bg-green-100 text-green-800',
      'support': 'bg-red-100 text-red-800',
      'application': 'bg-orange-100 text-orange-800'
    }
    
    const typeLabels = {
      'general': 'General',
      'partnership': 'Partnership',
      'investment': 'Investment',
      'media': 'Media',
      'support': 'Support',
      'application': 'Application'
    }
    
    return (
      <Badge className={typeColors[type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800'}>
        {typeLabels[type as keyof typeof typeLabels] || type}
      </Badge>
    )
  }

  const markAsRead = (submissionId: string) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { ...submission, status: 'read' as const, updated_at: new Date().toISOString() }
        : submission
    ))
  }

  const markAsReplied = (submissionId: string) => {
    setSubmissions(prev => prev.map(submission => 
      submission.id === submissionId 
        ? { 
            ...submission, 
            status: 'replied' as const, 
            response_sent: true,
            updated_at: new Date().toISOString() 
          }
        : submission
    ))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  const stats = {
    total: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    pending: submissions.filter(s => ['new', 'read'].includes(s.status)).length,
    resolved: submissions.filter(s => s.status === 'resolved').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600">Manage and respond to contact form submissions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Response</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Message Management</CardTitle>
          <CardDescription>
            Review and respond to contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="application">Application</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submissions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Subject & Message</TableHead>
                  <TableHead>Type & Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id} className={submission.status === 'new' ? 'bg-blue-50' : ''}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{submission.name}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          <span className="truncate max-w-[150px]">{submission.email}</span>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{submission.phone}</span>
                          </div>
                        )}
                        {submission.assigned_to && (
                          <div className="text-xs text-gray-500">
                            Assigned: {submission.assigned_to}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px] space-y-1">
                        <div className="font-medium truncate">{submission.subject}</div>
                        <div className="text-sm text-gray-600 line-clamp-3">
                          {submission.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        {getTypeBadge(submission.inquiry_type)}
                        {getPriorityBadge(submission.priority)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getStatusBadge(submission.status)}
                        {submission.response_sent && (
                          <div className="text-xs text-green-600">✓ Response sent</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(submission.created_at).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {submission.status === 'new' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(submission.id)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        )}
                        {['new', 'read'].includes(submission.status) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsReplied(submission.id)}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Reply className="w-3 h-3" />
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Full Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Reply
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No contact submissions found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
