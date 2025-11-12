'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Star, 
  Building2, TrendingUp, Users, Award, ExternalLink, Upload, X
} from 'lucide-react'
import { fetchStartups, createStartup, updateStartup, deleteStartup, uploadStartupLogo, deleteStartupLogo } from '@/lib/supabase'
import { useToast } from '@/components/ui/toast'

interface Startup {
  id: string
  name: string
  tagline?: string
  description?: string
  logo_url?: string
  website?: string
  category?: string
  founded_year?: number
  funding_amount?: number
  funding_stage?: string
  investors?: string[]
  team_size_min?: number
  team_size_max?: number
  status?: string
  achievements?: string[]
  tags?: string[]
  batch?: string
  is_featured?: boolean
  contact_email?: string
  contact_phone?: string
  created_at?: string
  updated_at?: string
}

export default function AdminStartupsPage() {
  const { showToast } = useToast()
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const [formData, setFormData] = useState<Partial<Startup>>({})
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>('')

  const loadStartups = async () => {
    try {
      const data = await fetchStartups()
      setStartups(data)
    } catch (error) {
      console.error('Failed to load startups:', error)
      setStartups([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStartups()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name?.trim()) {
      showToast('Startup name is required', 'error')
      return
    }

    try {
      let logoUrl = ''
      
      // First create the startup to get an ID
      const result = await createStartup({
        name: formData.name,
        tagline: formData.tagline,
        description: formData.description,
        logo_url: '', // Will update after logo upload
        website: formData.website,
        category: formData.category,
        founded_year: formData.founded_year,
        funding_stage: formData.funding_stage,
        status: formData.status || 'active',
        batch: formData.batch,
        is_featured: formData.is_featured || false,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone
      })
      
      if (result.error) {
        showToast(result.error, 'error')
        return
      }
      
      // Upload logo if provided
      if (logoFile && result.data) {
        const uploadResult = await uploadStartupLogo(logoFile, result.data.id)
        if (uploadResult.error) {
          showToast(`Startup created but logo upload failed: ${uploadResult.error}`, 'error')
        } else if (uploadResult.data) {
          // Update startup with logo URL
          await updateStartup(result.data.id, { logo_url: uploadResult.data.publicUrl })
        }
      }
      
      showToast('Startup created successfully', 'success')
      setIsCreateDialogOpen(false)
      setFormData({})
      setLogoFile(null)
      setLogoPreview('')
      loadStartups()
    } catch (error) {
      showToast('Failed to create startup', 'error')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedStartup?.id || !formData.name?.trim()) {
      showToast('Invalid data', 'error')
      return
    }

    try {
      let logoUrl = formData.logo_url || ''
      
      // Upload new logo if provided
      if (logoFile) {
        // Delete old logo if exists
        if (selectedStartup.logo_url) {
          await deleteStartupLogo(selectedStartup.logo_url)
        }
        
        const uploadResult = await uploadStartupLogo(logoFile, selectedStartup.id)
        if (uploadResult.error) {
          showToast(`Logo upload failed: ${uploadResult.error}`, 'error')
          return
        } else if (uploadResult.data) {
          logoUrl = uploadResult.data.publicUrl
        }
      }
      
      const result = await updateStartup(selectedStartup.id, {
        ...formData,
        logo_url: logoUrl
      })
      
      if (result.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Startup updated successfully', 'success')
        setIsEditDialogOpen(false)
        setSelectedStartup(null)
        setFormData({})
        loadStartups()
      }
    } catch (error) {
      showToast('Failed to update startup', 'error')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this startup?')) return

    try {
      // Find the startup to get logo URL
      const startup = startups.find(s => s.id === id)
      
      // Delete logo from storage if exists
      if (startup?.logo_url) {
        await deleteStartupLogo(startup.logo_url)
      }
      
      const result = await deleteStartup(id)
      
      if (result.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Startup deleted successfully', 'success')
        loadStartups()
      }
    } catch (error) {
      showToast('Failed to delete startup', 'error')
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview('')
    setFormData({...formData, logo_url: ''})
  }

  const openCreateDialog = () => {
    setFormData({})
    setLogoFile(null)
    setLogoPreview('')
    setIsCreateDialogOpen(true)
  }

  const openEditDialog = (startup: Startup) => {
    setSelectedStartup(startup)
    setFormData(startup)
    setLogoFile(null)
    setLogoPreview(startup.logo_url || '')
    setIsEditDialogOpen(true)
  }

  const filteredStartups = startups.filter(startup =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.tagline?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'graduated': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'exited': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Startups</h1>
          <p className="text-gray-600 mt-1">Manage startup portfolio</p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Startup
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Startups', count: startups.length, icon: Building2, color: 'bg-blue-500' },
          { label: 'Active', count: startups.filter(s => s.status === 'active').length, icon: TrendingUp, color: 'bg-green-500' },
          { label: 'Graduated', count: startups.filter(s => s.status === 'graduated').length, icon: Award, color: 'bg-purple-500' },
          { label: 'Featured', count: startups.filter(s => s.is_featured).length, icon: Star, color: 'bg-yellow-500' }
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
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mr-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
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

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Startups Table */}
      <Card>
        <CardHeader>
          <CardTitle>Startups ({filteredStartups.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Startup</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Founded</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStartups.map((startup) => (
                  <tr key={startup.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {startup.name}
                          {startup.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        {startup.tagline && (
                          <div className="text-sm text-gray-600">{startup.tagline}</div>
                        )}
                        {startup.website && (
                          <a 
                            href={startup.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Website
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {startup.category && (
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {startup.category}
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={`${getStatusColor(startup.status || 'active')} border`}>
                        {(startup.status || 'active').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">
                        {startup.founded_year || 'N/A'}
                      </div>
                      {startup.batch && (
                        <div className="text-sm text-gray-600">{startup.batch}</div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditDialog(startup)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(startup.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredStartups.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No startups found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Startup</DialogTitle>
            <DialogDescription>Create a new startup entry in the portfolio</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Startup Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              />
            </div>
            
            {/* Logo Upload */}
            <div>
              <Label>Startup Logo</Label>
              <div className="mt-2">
                {logoPreview ? (
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">Logo uploaded</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeLogo}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload startup logo</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="founded_year">Founded Year</Label>
                <Input
                  id="founded_year"
                  type="number"
                  value={formData.founded_year || ''}
                  onChange={(e) => setFormData({...formData, founded_year: parseInt(e.target.value) || undefined})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="graduated">Graduated</option>
                  <option value="exited">Exited</option>
                </select>
              </div>
              <div>
                <Label htmlFor="batch">Batch</Label>
                <Input
                  id="batch"
                  value={formData.batch || ''}
                  onChange={(e) => setFormData({...formData, batch: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured || false}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
              />
              <Label htmlFor="is_featured">Featured Startup</Label>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">Create Startup</Button>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Startup</DialogTitle>
            <DialogDescription>Update startup information</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Startup Name *</Label>
                <Input
                  id="edit-name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-tagline">Tagline</Label>
              <Input
                id="edit-tagline"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              />
            </div>
            
            {/* Logo Upload */}
            <div>
              <Label>Startup Logo</Label>
              <div className="mt-2">
                {logoPreview ? (
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden">
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-2">Logo uploaded</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={removeLogo}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload startup logo</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="edit-logo-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('edit-logo-upload')?.click()}
                    >
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-website">Website</Label>
                <Input
                  id="edit-website"
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="edit-founded_year">Founded Year</Label>
                <Input
                  id="edit-founded_year"
                  type="number"
                  value={formData.founded_year || ''}
                  onChange={(e) => setFormData({...formData, founded_year: parseInt(e.target.value) || undefined})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  value={formData.status || 'active'}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="active">Active</option>
                  <option value="graduated">Graduated</option>
                  <option value="exited">Exited</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-batch">Batch</Label>
                <Input
                  id="edit-batch"
                  value={formData.batch || ''}
                  onChange={(e) => setFormData({...formData, batch: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-is_featured"
                checked={formData.is_featured || false}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
              />
              <Label htmlFor="edit-is_featured">Featured Startup</Label>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">Update Startup</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
