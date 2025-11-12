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
  Search, MoreHorizontal, Eye, Mail, Phone, Calendar, 
  CheckCircle, Clock, AlertCircle, XCircle, Download, Filter 
} from 'lucide-react'
import { fetchApplications, updateApplicationStatus } from '@/lib/supabase'
import { useToast } from '@/components/ui/toast'

interface Application {
  id: string
  first_name?: string
  last_name?: string
  founder_name: string
  founder_email: string
  founder_phone?: string
  linkedin_profile?: string
  startup_name: string
  website?: string
  business_stage?: string
  business_description?: string
  business_category?: string
  target_market?: string
  revenue_model?: string
  funding_requirement?: string
  preferred_program?: string
  status?: string
  admin_notes?: string
  feedback?: string
  rejection_reason?: string
  submitted_at?: string
  reviewed_at?: string
  created_at?: string
  updated_at?: string
}

export default function ApplicationsPage() {
  const { showToast } = useToast()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [programFilter, setProgramFilter] = useState<string>('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const loadApplications = async () => {
    try {
      const data = await fetchApplications()
      setApplications(data)
    } catch (error) {
      console.error('Failed to load applications:', error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadApplications()
  }, [])

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      const result = await updateApplicationStatus(applicationId, newStatus)
      if (result.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Status updated successfully', 'success')
        loadApplications() // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update status:', error)
      showToast('Failed to update status. Please try again.', 'error')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProgramColor = (program: string) => {
    switch (program) {
      case 'incubation':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'acceleration':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'mentorship':
        return 'bg-green-100 text-green-800 border-green-200'
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

  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.founder_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.founder_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.startup_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || (application.status || 'pending') === statusFilter
    const matchesProgram = programFilter === 'all' || (application.preferred_program || 'incubation') === programFilter
    
    return matchesSearch && matchesStatus && matchesProgram
  })

  const statusCounts = {
    all: applications.length,
    pending: applications.filter(a => (a.status || 'pending') === 'pending').length,
    accepted: applications.filter(a => (a.status || 'pending') === 'accepted').length,
    rejected: applications.filter(a => (a.status || 'pending') === 'rejected').length
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
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600 mt-1">Manage startup program applications</p>
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
          { label: 'Pending', count: statusCounts.pending, color: 'bg-blue-500' },
          { label: 'Accepted', count: statusCounts.accepted, color: 'bg-green-500' },
          { label: 'Rejected', count: statusCounts.rejected, color: 'bg-red-500' }
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
                  placeholder="Search by name, email, or startup..."
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
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Programs</option>
                <option value="incubation">Incubation</option>
                <option value="acceleration">Acceleration</option>
                <option value="mentorship">Mentorship</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Applicant</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Startup</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Program</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Submitted</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">{application.founder_name}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {application.founder_email}
                        </div>
                        {application.founder_phone && (
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {application.founder_phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{application.startup_name}</div>
                      {application.business_stage && (
                        <div className="text-sm text-gray-600">
                          Stage: {application.business_stage}
                        </div>
                      )}
                      {application.funding_requirement && (
                        <div className="text-sm text-gray-600">
                          Funding: {application.funding_requirement}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getProgramColor(application.preferred_program || 'incubation')} border`}>
                        {(application.preferred_program || 'incubation').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(application.status || 'pending')} border flex items-center gap-1 w-fit`}>
                        {getStatusIcon(application.status || 'pending')}
                        {(application.status || 'pending').replace('_', ' ').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">
                        {formatDate(application.submitted_at || application.created_at || '')}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedApplication(application)
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
                            <DropdownMenuItem onClick={() => handleStatusUpdate(application.id, 'pending')}>
                              <Clock className="w-4 h-4 mr-2" />
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(application.id, 'accepted')}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accepted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(application.id, 'rejected')}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Rejected
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No applications found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Complete application information and business details
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Name</Label>
                    <p className="text-gray-900">{selectedApplication.founder_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Email</Label>
                    <p className="text-gray-900">{selectedApplication.founder_email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {selectedApplication.founder_phone && (
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Phone</Label>
                      <p className="text-gray-900">{selectedApplication.founder_phone}</p>
                    </div>
                  )}
                  {selectedApplication.linkedin_profile && (
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">LinkedIn</Label>
                      <a 
                        href={selectedApplication.linkedin_profile} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Startup Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Startup Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Startup Name</Label>
                    <p className="text-gray-900">{selectedApplication.startup_name}</p>
                  </div>
                  {selectedApplication.website && (
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Website</Label>
                      <a 
                        href={selectedApplication.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedApplication.website}
                      </a>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {selectedApplication.business_stage && (
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Business Stage</Label>
                      <p className="text-gray-900">{selectedApplication.business_stage}</p>
                    </div>
                  )}
                  {selectedApplication.preferred_program && (
                    <div>
                      <Label className="text-sm font-semibold text-gray-700">Preferred Program</Label>
                      <Badge className={`${getProgramColor(selectedApplication.preferred_program)} border mt-1`}>
                        {selectedApplication.preferred_program.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                </div>

                {selectedApplication.funding_requirement && (
                  <div className="mt-4">
                    <Label className="text-sm font-semibold text-gray-700">Funding Requirement</Label>
                    <p className="text-gray-900">{selectedApplication.funding_requirement}</p>
                  </div>
                )}
              </div>

              {/* Business Details */}
              {selectedApplication.business_description && (
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Business Description</Label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-line">{selectedApplication.business_description}</p>
                  </div>
                </div>
              )}

              {selectedApplication.target_market && (
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Target Market</Label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-line">{selectedApplication.target_market}</p>
                  </div>
                </div>
              )}

              {selectedApplication.revenue_model && (
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Revenue Model</Label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-line">{selectedApplication.revenue_model}</p>
                  </div>
                </div>
              )}

              {/* Status and Admin Notes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Current Status</Label>
                    <Badge className={`${getStatusColor(selectedApplication.status || 'pending')} border flex items-center gap-1 w-fit mt-1`}>
                      {getStatusIcon(selectedApplication.status || 'pending')}
                      {(selectedApplication.status || 'pending').replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">Submitted</Label>
                    <p className="text-gray-900">{formatDate(selectedApplication.submitted_at || selectedApplication.created_at || '')}</p>
                  </div>
                </div>

                {selectedApplication.admin_notes && (
                  <div className="mt-4">
                    <Label className="text-sm font-semibold text-gray-700">Admin Notes</Label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-900 whitespace-pre-line">{selectedApplication.admin_notes}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  onClick={() => window.open(`mailto:${selectedApplication.founder_email}?subject=Re: Your Application - ${selectedApplication.startup_name}`, '_blank')}
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                {selectedApplication.founder_phone && (
                  <Button 
                    variant="outline"
                    onClick={() => window.open(`tel:${selectedApplication.founder_phone}`, '_blank')}
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
