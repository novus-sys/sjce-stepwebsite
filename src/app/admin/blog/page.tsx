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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, FileText, User, Calendar, Image, Upload } from 'lucide-react'
import { uploadBlogImage, createBlogArticle, fetchBlogArticles, createClient } from '@/lib/supabase'
import { useToast } from '@/components/ui/toast'

interface BlogPost {
  id: string
  title: string
  excerpt: string | null
  author_name: string
  author_type: 'admin' | 'founder'
  status: 'draft' | 'pending_approval' | 'approved' | 'published' | 'rejected'
  category: string | null
  tags: string[]
  featured_image: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export default function BlogPage() {
  const { showToast } = useToast()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [authorFilter, setAuthorFilter] = useState<string>('all')
  
  // Create Article Dialog State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    category: '',
    tags: '',
    content: '',
    featured_image: null as File | null
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const loadBlogArticles = async () => {
    try {
      const articles = await fetchBlogArticles()
      
      // Transform the data to match our BlogPost interface
      const transformedBlogs: BlogPost[] = articles.map((article: any) => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt,
        author_name: article.blog_authors?.name || 'Admin User',
        author_type: 'admin', // TODO: Determine based on author or add author_type field
        status: article.status,
        category: article.category,
        tags: article.tags || [],
        featured_image: article.featured_image_url,
        published_at: article.published_at,
        created_at: article.created_at,
        updated_at: article.updated_at
      }))
      
      setBlogs(transformedBlogs)
    } catch (error) {
      console.error('Failed to load blog articles:', error)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogArticles()
  }, [])

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter
    const matchesAuthor = authorFilter === 'all' || blog.author_type === authorFilter
    
    return matchesSearch && matchesStatus && matchesAuthor
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>
      case 'approved':
        return <Badge className="bg-blue-100 text-blue-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>
      case 'pending_approval':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800"><FileText className="w-3 h-3 mr-1" />Draft</Badge>
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getAuthorBadge = (authorType: string) => {
    return authorType === 'admin' ? (
      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
        <User className="w-3 h-3 mr-1" />Admin
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <User className="w-3 h-3 mr-1" />Founder
      </Badge>
    )
  }

  const handleApprove = (blogId: string) => {
    setBlogs(prev => prev.map(blog => 
      blog.id === blogId 
        ? { ...blog, status: 'approved' as const, updated_at: new Date().toISOString() }
        : blog
    ))
  }

  const handleReject = (blogId: string) => {
    setBlogs(prev => prev.map(blog => 
      blog.id === blogId 
        ? { ...blog, status: 'rejected' as const, updated_at: new Date().toISOString() }
        : blog
    ))
  }

  const handlePreview = async (blog: BlogPost) => {
    try {
      const supabase = createClient()
      
      // Get the actual slug from the database
      const { data, error } = await supabase
        .from('blog_articles')
        .select('slug')
        .eq('id', blog.id)
        .single()

      if (error || !data) {
        console.error('Failed to get article slug:', error)
        showToast("Failed to preview article. Please try again.", "error")
        return
      }

      // Open article in new tab for preview
      window.open(`/news/${data.slug}`, '_blank')
    } catch (error) {
      console.error('Preview failed:', error)
      showToast("Failed to preview article. Please try again.", "error")
    }
  }

  const handleEdit = async (blog: BlogPost) => {
    try {
      const supabase = createClient()
      
      // Get the full article data including content
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('id', blog.id)
        .single()

      if (error || !data) {
        console.error('Failed to get article data:', error)
        showToast("Failed to load article for editing. Please try again.", "error")
        return
      }

      // Populate the create form with the article data
      setNewArticle({
        title: data.title,
        excerpt: data.excerpt || '',
        category: data.category || '',
        tags: data.tags ? data.tags.join(', ') : '',
        content: data.content || '',
        featured_image: null // We don't load the existing image file
      })

      // Clear image preview since we're not loading the existing image
      setImagePreview(null)

      showToast("Article loaded for editing. Make your changes and create as new version.", "success")
    } catch (error) {
      console.error('Edit failed:', error)
      showToast("Failed to load article for editing. Please try again.", "error")
    }
  }

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return
    }

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('blog_articles')
        .delete()
        .eq('id', blogId)

      if (error) {
        console.error('Failed to delete article:', error)
        showToast("Failed to delete article. Please try again.", "error")
        return
      }

      // Remove from local state
      setBlogs(prev => prev.filter(blog => blog.id !== blogId))
      showToast("Article deleted successfully!", "success")
    } catch (error) {
      console.error('Delete failed:', error)
      showToast("Failed to delete article. Please try again.", "error")
    }
  }

  const handlePublish = async (blogId: string) => {
    try {
      const supabase = createClient()
      const now = new Date().toISOString()
      
      console.log('Publishing article with ID:', blogId)
      console.log('Current timestamp:', now)
      
      const { data, error } = await supabase
        .from('blog_articles')
        .update({
          status: 'published',
          published_at: now,
          updated_at: now
        })
        .eq('id', blogId)

      console.log('Publish response data:', data)
      console.log('Publish response error:', error)

      if (error) {
        console.error('Failed to publish article:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        showToast(`Failed to publish article: ${error.message || 'Unknown error'}`, "error")
        return
      }

      // Update local state
      setBlogs(prev => prev.map(blog => 
        blog.id === blogId 
          ? { 
              ...blog, 
              status: 'published' as const, 
              published_at: now,
              updated_at: now 
            }
          : blog
      ))

      showToast("Article published successfully!", "success")
      
      // Refresh the articles list to reflect the change
      loadBlogArticles()
    } catch (error) {
      console.error('Publish failed:', error)
      showToast("Failed to publish article. Please try again.", "error")
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewArticle({...newArticle, featured_image: file})
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setNewArticle({...newArticle, featured_image: null})
    setImagePreview(null)
  }

  const handleCreateArticle = async () => {
    if (!newArticle.title.trim()) return

    setIsCreating(true)
    try {
      // Upload image to Supabase Storage if provided
      let imageUrl = null
      if (newArticle.featured_image) {
        const uploadResult = await uploadBlogImage(newArticle.featured_image)
        if (uploadResult) {
          imageUrl = uploadResult.url
        }
      }

      // Create article in Supabase
      const articleData = {
        title: newArticle.title,
        excerpt: newArticle.excerpt || null,
        content: newArticle.content,
        category: newArticle.category || null,
        tags: newArticle.tags ? newArticle.tags.split(',').map(tag => tag.trim()) : [],
        featured_image_url: imageUrl
      }

      const createdArticle = await createBlogArticle(articleData)
      
      if (createdArticle) {
        // Convert Supabase article to BlogPost format for local state
        const article: BlogPost = {
          id: createdArticle.id,
          title: createdArticle.title,
          excerpt: createdArticle.excerpt,
          author_name: 'Admin User', // TODO: Get from current user context
          author_type: 'admin',
          status: createdArticle.status as any,
          category: createdArticle.category,
          tags: createdArticle.tags || [],
          featured_image: createdArticle.featured_image_url,
          published_at: createdArticle.published_at,
          created_at: createdArticle.created_at,
          updated_at: createdArticle.updated_at
        }

        setBlogs(prev => [article, ...prev])
        
        // Reset form
        setNewArticle({
          title: '',
          excerpt: '',
          category: '',
          tags: '',
          content: '',
          featured_image: null
        })
        setImagePreview(null)
        setIsCreateDialogOpen(false)
        
        showToast('Article created successfully!', 'success')
      } else {
        showToast('Failed to create article. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error creating article:', error)
      showToast('An error occurred while creating the article.', 'error')
    } finally {
      setIsCreating(false)
    }
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
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published').length,
    pending: blogs.filter(b => b.status === 'pending_approval').length,
    drafts: blogs.filter(b => b.status === 'draft').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog & Articles</h1>
          <p className="text-gray-600">Manage blog posts and founder submissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[720px] max-h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>Create New Article</DialogTitle>
              <DialogDescription>
                Create a new blog article. It will be saved as a draft initially.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto flex-1 min-h-0">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter article title"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the article"
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a category</option>
                    <option value="success-story">Success Story</option>
                    <option value="insights">Insights</option>
                    <option value="guides">Guides</option>
                    <option value="news">News</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Comma separated tags"
                    value={newArticle.tags}
                    onChange={(e) => setNewArticle({...newArticle, tags: e.target.value})}
                  />
                </div>
              </div>
              
              {/* Featured Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="featured_image">Featured Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeImage}
                        >
                          ✕
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        {newArticle.featured_image?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <input
                        type="file"
                        id="featured_image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label 
                        htmlFor="featured_image" 
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-primary">Click to upload</span> or drag and drop
                        </div>
                        <div className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your article content here..."
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                  rows={6}
                  className="min-h-[150px] resize-y"
                />
              </div>
            </div>
            <DialogFooter className="flex-shrink-0 mt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isCreating}>
                Cancel
              </Button>
              <Button onClick={handleCreateArticle} disabled={!newArticle.title.trim() || isCreating}>
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  'Create Article'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <FileText className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.drafts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Article Management</CardTitle>
          <CardDescription>
            Review, approve, and manage all blog posts and articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending_approval">Pending</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={authorFilter} onValueChange={setAuthorFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="founder">Founder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Articles Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div className="max-w-[300px]">
                        <div className="font-medium truncate">{blog.title}</div>
                        {blog.excerpt && (
                          <div className="text-sm text-gray-500 truncate">{blog.excerpt}</div>
                        )}
                        {blog.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {blog.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {blog.tags.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{blog.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="font-medium">{blog.author_name}</div>
                        {getAuthorBadge(blog.author_type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {blog.category && (
                        <Badge variant="outline">{blog.category}</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(blog.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {blog.status === 'pending_approval' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApprove(blog.id)}
                              className="text-green-600 border-green-200 hover:bg-green-50"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(blog.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <XCircle className="w-3 h-3" />
                            </Button>
                          </>
                        )}
                        {(blog.status === 'approved' || blog.status === 'draft') && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePublish(blog.id)}
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
                            <DropdownMenuItem onClick={() => handlePreview(blog)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(blog)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(blog.id)}>
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

          {filteredBlogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No articles found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
