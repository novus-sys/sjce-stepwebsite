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
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, MessageSquare, Star, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  content: string
  rating: number
  category: 'startup_founder' | 'mentor' | 'investor' | 'alumni' | 'partner'
  status: 'pending' | 'approved' | 'rejected' | 'published'
  is_featured: boolean
  image_url: string | null
  linkedin: string | null
  created_at: string
  updated_at: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    // TODO: Fetch real data from Supabase
    // For now, using mock data
    setTimeout(() => {
      setTestimonials([
        {
          id: '1',
          name: 'Rahul Verma',
          title: 'CEO & Founder',
          company: 'TechFlow Solutions',
          content: 'SJCE-STEP provided the perfect launchpad for our startup. The mentorship and resources were invaluable in scaling our business from idea to Series A.',
          rating: 5,
          category: 'startup_founder',
          status: 'published',
          is_featured: true,
          image_url: null,
          linkedin: 'https://linkedin.com/in/rahulverma',
          created_at: '2024-10-15T10:00:00Z',
          updated_at: '2024-10-20T15:30:00Z'
        },
        {
          id: '2',
          name: 'Dr. Priya Nair',
          title: 'Senior Technology Mentor',
          company: 'Former Google Engineering Manager',
          content: 'Working with SJCE-STEP startups has been incredibly rewarding. The quality of entrepreneurs and innovative ideas never cease to amaze me.',
          rating: 5,
          category: 'mentor',
          status: 'approved',
          is_featured: false,
          image_url: null,
          linkedin: 'https://linkedin.com/in/priyanair',
          created_at: '2024-10-20T11:00:00Z',
          updated_at: '2024-10-25T09:15:00Z'
        },
        {
          id: '3',
          name: 'Ankit Sharma',
          title: 'Managing Partner',
          company: 'Venture Capital Fund',
          content: 'SJCE-STEP consistently produces high-quality startups with strong fundamentals. We\'ve invested in multiple companies from their portfolio.',
          rating: 4,
          category: 'investor',
          status: 'pending',
          is_featured: false,
          image_url: null,
          linkedin: 'https://linkedin.com/in/ankitsharma',
          created_at: '2024-11-01T14:00:00Z',
          updated_at: '2024-11-01T14:00:00Z'
        },
        {
          id: '4',
          name: 'Sneha Reddy',
          title: 'Product Manager',
          company: 'EcoGreen Innovations',
          content: 'The incubation program at SJCE-STEP transformed our sustainable tech idea into a thriving business. The network and support continue even after graduation.',
          rating: 5,
          category: 'alumni',
          status: 'published',
          is_featured: true,
          image_url: null,
          linkedin: null,
          created_at: '2024-09-15T12:00:00Z',
          updated_at: '2024-09-20T16:45:00Z'
        },
        {
          id: '5',
          name: 'Vikram Singh',
          title: 'Director of Innovation',
          company: 'Tech Corp India',
          content: 'Our partnership with SJCE-STEP has opened doors to cutting-edge startups and innovative solutions for our enterprise challenges.',
          rating: 4,
          category: 'partner',
          status: 'rejected',
          is_featured: false,
          image_url: null,
          linkedin: 'https://linkedin.com/in/vikramsingh',
          created_at: '2024-08-10T09:00:00Z',
          updated_at: '2024-08-15T10:30:00Z'
        },
        {
          id: '6',
          name: 'Maya Patel',
          title: 'Co-Founder',
          company: 'HealthTech Pro',
          content: 'The mentorship and funding support from SJCE-STEP was crucial in our journey from prototype to market leader in digital healthcare.',
          rating: 5,
          category: 'startup_founder',
          status: 'pending',
          is_featured: false,
          image_url: null,
          linkedin: 'https://linkedin.com/in/mayapatel',
          created_at: '2024-11-05T15:00:00Z',
          updated_at: '2024-11-05T15:00:00Z'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'all' || testimonial.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || testimonial.status === statusFilter
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      'startup_founder': 'bg-blue-100 text-blue-800',
      'mentor': 'bg-green-100 text-green-800',
      'investor': 'bg-purple-100 text-purple-800',
      'alumni': 'bg-orange-100 text-orange-800',
      'partner': 'bg-gray-100 text-gray-800'
    }
    
    const categoryLabels = {
      'startup_founder': 'Startup Founder',
      'mentor': 'Mentor',
      'investor': 'Investor',
      'alumni': 'Alumni',
      'partner': 'Partner'
    }
    
    return (
      <Badge className={categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
        {categoryLabels[category as keyof typeof categoryLabels] || category}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const handleApprove = (testimonialId: string) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === testimonialId 
        ? { ...testimonial, status: 'approved' as const, updated_at: new Date().toISOString() }
        : testimonial
    ))
  }

  const handleReject = (testimonialId: string) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === testimonialId 
        ? { ...testimonial, status: 'rejected' as const, updated_at: new Date().toISOString() }
        : testimonial
    ))
  }

  const handlePublish = (testimonialId: string) => {
    setTestimonials(prev => prev.map(testimonial => 
      testimonial.id === testimonialId 
        ? { ...testimonial, status: 'published' as const, updated_at: new Date().toISOString() }
        : testimonial
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
    total: testimonials.length,
    published: testimonials.filter(t => t.status === 'published').length,
    pending: testimonials.filter(t => t.status === 'pending').length,
    featured: testimonials.filter(t => t.is_featured).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage customer testimonials and reviews</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.featured}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Testimonial Management</CardTitle>
          <CardDescription>
            Review, approve, and manage customer testimonials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="startup_founder">Founders</SelectItem>
                <SelectItem value="mentor">Mentors</SelectItem>
                <SelectItem value="investor">Investors</SelectItem>
                <SelectItem value="alumni">Alumni</SelectItem>
                <SelectItem value="partner">Partners</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Testimonials Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {testimonial.name}
                            {testimonial.is_featured && (
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{testimonial.title}</div>
                          <div className="text-xs text-gray-400">{testimonial.company}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getCategoryBadge(testimonial.category)}</TableCell>
                    <TableCell>
                      <div className="max-w-[300px]">
                        <p className="text-sm text-gray-600 line-clamp-3">
                          "{testimonial.content}"
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {renderStars(testimonial.rating)}
                        <span className="text-sm text-gray-500">({testimonial.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {testimonial.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(testimonial.id)}
                              className="text-green-600 border-green-200 hover:bg-green-50"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(testimonial.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <XCircle className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        {testimonial.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePublish(testimonial.id)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            Publish
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
                              View Full
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
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

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No testimonials found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
