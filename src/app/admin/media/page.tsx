'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
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
import { Upload, Search, MoreHorizontal, Edit, Trash2, Eye, FolderOpen, Image, FileText, Video, Music, Download, Copy, ExternalLink } from 'lucide-react'

interface MediaFile {
  id: string
  filename: string
  original_name: string
  file_type: 'image' | 'video' | 'audio' | 'document' | 'other'
  mime_type: string
  file_size: number
  file_url: string
  thumbnail_url: string | null
  alt_text: string | null
  caption: string | null
  folder: string | null
  tags: string[]
  is_public: boolean
  uploaded_by: string
  created_at: string
  updated_at: string
}

export default function MediaPage() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [folderFilter, setFolderFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    // TODO: Fetch real data from Supabase
    // For now, using mock data
    setTimeout(() => {
      setMediaFiles([
        {
          id: '1',
          filename: 'startup-demo-day-2024.jpg',
          original_name: 'Startup Demo Day 2024.jpg',
          file_type: 'image',
          mime_type: 'image/jpeg',
          file_size: 2048576,
          file_url: '/uploads/images/startup-demo-day-2024.jpg',
          thumbnail_url: '/uploads/thumbnails/startup-demo-day-2024-thumb.jpg',
          alt_text: 'Startup Demo Day 2024 event photo',
          caption: 'Annual startup demo day featuring 15 innovative startups',
          folder: 'events',
          tags: ['demo-day', 'startups', '2024', 'event'],
          is_public: true,
          uploaded_by: 'Admin User',
          created_at: '2024-11-01T10:30:00Z',
          updated_at: '2024-11-01T10:30:00Z'
        },
        {
          id: '2',
          filename: 'ai-workshop-presentation.pdf',
          original_name: 'AI Workshop Presentation.pdf',
          file_type: 'document',
          mime_type: 'application/pdf',
          file_size: 5242880,
          file_url: '/uploads/documents/ai-workshop-presentation.pdf',
          thumbnail_url: null,
          alt_text: null,
          caption: 'AI/ML Workshop presentation slides',
          folder: 'workshops',
          tags: ['ai', 'ml', 'workshop', 'presentation'],
          is_public: false,
          uploaded_by: 'Program Manager',
          created_at: '2024-10-25T14:15:00Z',
          updated_at: '2024-10-25T14:15:00Z'
        },
        {
          id: '3',
          filename: 'team-photo-2024.png',
          original_name: 'Team Photo 2024.png',
          file_type: 'image',
          mime_type: 'image/png',
          file_size: 3145728,
          file_url: '/uploads/images/team-photo-2024.png',
          thumbnail_url: '/uploads/thumbnails/team-photo-2024-thumb.png',
          alt_text: 'SJCE-STEP team photo 2024',
          caption: 'Official team photo for the about page',
          folder: 'team',
          tags: ['team', 'photo', '2024', 'about'],
          is_public: true,
          uploaded_by: 'Marketing Team',
          created_at: '2024-10-20T11:45:00Z',
          updated_at: '2024-10-20T11:45:00Z'
        },
        {
          id: '4',
          filename: 'startup-pitch-video.mp4',
          original_name: 'Startup Pitch Video.mp4',
          file_type: 'video',
          mime_type: 'video/mp4',
          file_size: 52428800,
          file_url: '/uploads/videos/startup-pitch-video.mp4',
          thumbnail_url: '/uploads/thumbnails/startup-pitch-video-thumb.jpg',
          alt_text: null,
          caption: 'Sample startup pitch video for training purposes',
          folder: 'training',
          tags: ['pitch', 'video', 'training', 'startup'],
          is_public: false,
          uploaded_by: 'Mentor',
          created_at: '2024-10-15T16:20:00Z',
          updated_at: '2024-10-15T16:20:00Z'
        },
        {
          id: '5',
          filename: 'incubation-brochure.pdf',
          original_name: 'Incubation Program Brochure.pdf',
          file_type: 'document',
          mime_type: 'application/pdf',
          file_size: 1572864,
          file_url: '/uploads/documents/incubation-brochure.pdf',
          thumbnail_url: null,
          alt_text: null,
          caption: 'Official incubation program brochure',
          folder: 'marketing',
          tags: ['brochure', 'incubation', 'program', 'marketing'],
          is_public: true,
          uploaded_by: 'Marketing Team',
          created_at: '2024-10-10T09:30:00Z',
          updated_at: '2024-10-10T09:30:00Z'
        },
        {
          id: '6',
          filename: 'logo-variations.zip',
          original_name: 'SJCE-STEP Logo Variations.zip',
          file_type: 'other',
          mime_type: 'application/zip',
          file_size: 1048576,
          file_url: '/uploads/assets/logo-variations.zip',
          thumbnail_url: null,
          alt_text: null,
          caption: 'Brand logo variations and assets',
          folder: 'branding',
          tags: ['logo', 'branding', 'assets', 'design'],
          is_public: false,
          uploaded_by: 'Design Team',
          created_at: '2024-10-05T13:15:00Z',
          updated_at: '2024-10-05T13:15:00Z'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      file.caption?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || file.file_type === typeFilter
    const matchesFolder = folderFilter === 'all' || file.folder === folderFilter
    
    return matchesSearch && matchesType && matchesFolder
  })

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return <Image className="w-4 h-4" />
      case 'video':
        return <Video className="w-4 h-4" />
      case 'audio':
        return <Music className="w-4 h-4" />
      case 'document':
        return <FileText className="w-4 h-4" />
      default:
        return <FolderOpen className="w-4 h-4" />
    }
  }

  const getTypeBadge = (fileType: string) => {
    const typeColors = {
      'image': 'bg-green-100 text-green-800',
      'video': 'bg-blue-100 text-blue-800',
      'audio': 'bg-purple-100 text-purple-800',
      'document': 'bg-orange-100 text-orange-800',
      'other': 'bg-gray-100 text-gray-800'
    }
    
    return (
      <Badge className={typeColors[fileType as keyof typeof typeColors] || 'bg-gray-100 text-gray-800'}>
        {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
      </Badge>
    )
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    // TODO: Show toast notification
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
    total: mediaFiles.length,
    images: mediaFiles.filter(f => f.file_type === 'image').length,
    documents: mediaFiles.filter(f => f.file_type === 'document').length,
    videos: mediaFiles.filter(f => f.file_type === 'video').length,
    totalSize: mediaFiles.reduce((sum, f) => sum + f.file_size, 0)
  }

  const uniqueFolders = [...new Set(mediaFiles.map(f => f.folder).filter(Boolean))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage and organize your media files and assets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images</CardTitle>
            <Image className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.images}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.documents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.videos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FolderOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatFileSize(stats.totalSize)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>File Management</CardTitle>
          <CardDescription>
            Browse, search, and manage your media files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={folderFilter} onValueChange={setFolderFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Folders</SelectItem>
                {uniqueFolders.map((folder) => (
                  <SelectItem key={folder} value={folder || ''}>{folder}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Files Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {file.thumbnail_url ? (
                        <img 
                          src={file.thumbnail_url} 
                          alt={file.alt_text || file.original_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400">
                          {getFileIcon(file.file_type)}
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-sm truncate" title={file.original_name}>
                        {file.original_name}
                      </div>
                      <div className="flex items-center justify-between">
                        {getTypeBadge(file.file_type)}
                        <span className="text-xs text-gray-500">{formatFileSize(file.file_size)}</span>
                      </div>
                      {file.folder && (
                        <div className="text-xs text-gray-500">📁 {file.folder}</div>
                      )}
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(file.file_url)}
                          className="h-6 px-2"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {file.thumbnail_url ? (
                        <img 
                          src={file.thumbnail_url} 
                          alt={file.alt_text || file.original_name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-gray-400">
                          {getFileIcon(file.file_type)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{file.original_name}</div>
                      <div className="text-sm text-gray-500">
                        {file.folder && `📁 ${file.folder} • `}
                        {formatFileSize(file.file_size)} • 
                        Uploaded by {file.uploaded_by} on {new Date(file.created_at).toLocaleDateString()}
                      </div>
                      {file.caption && (
                        <div className="text-sm text-gray-600 mt-1">{file.caption}</div>
                      )}
                      {file.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {file.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {file.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{file.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTypeBadge(file.file_type)}
                    {file.is_public && (
                      <Badge variant="outline" className="text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(file.file_url)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No files found matching your criteria.</p>
              <Button className="mt-4">
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First File
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
