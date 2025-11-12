'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, 
  MapPin, Users, Clock, CheckCircle, XCircle, Upload, Image 
} from 'lucide-react'
import { fetchEvents, createEvent, uploadEventImage, createClient } from '@/lib/supabase'
import { useToast } from '@/components/ui/toast'

interface EventData {
  id: string
  title: string
  description: string
  event_date: string
  event_time: string
  location: string
  type: string
  max_attendees?: number
  registration_link?: string
  featured_image_url?: string
  status: string
  created_at: string
  slug: string
}

export default function AdminEventsPage() {
  const { showToast } = useToast()
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    about: '',
    event_date: '',
    event_time: '',
    location: '',
    type: '',
    max_attendees: '',
    featured_image: null as File | null
  })

  const loadEvents = async () => {
    try {
      const data = await fetchEvents()
      setEvents(data)
    } catch (error) {
      console.error('Failed to load events:', error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter
    const matchesType = typeFilter === 'all' || event.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case 'past':
        return <Badge className="bg-gray-100 text-gray-800">Past</Badge>
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewEvent({...newEvent, featured_image: file})
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setNewEvent({...newEvent, featured_image: null})
    setImagePreview(null)
  }

  const handleCreateEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.description.trim() || !newEvent.about.trim() || !newEvent.event_date || !newEvent.event_time || !newEvent.location.trim()) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    setIsCreating(true)

    try {
      let imageUrl = null

      // Upload image if selected
      if (newEvent.featured_image) {
        imageUrl = await uploadEventImage(newEvent.featured_image)
        if (!imageUrl) {
          showToast('Failed to upload image. Please try again.', 'error')
          setIsCreating(false)
          return
        }
      }

      // Create event data
      const eventData = {
        title: newEvent.title,
        description: newEvent.description,
        about: newEvent.about,
        event_date: newEvent.event_date,
        event_time: newEvent.event_time,
        location: newEvent.location,
        type: newEvent.type || 'workshop',
        max_attendees: newEvent.max_attendees ? parseInt(newEvent.max_attendees) : undefined,
        featured_image_url: imageUrl || undefined
      }

      const createdEvent = await createEvent(eventData)

      if (createdEvent) {
        // Add to local state
        const newEventData: EventData = {
          id: createdEvent.id,
          title: createdEvent.title,
          description: createdEvent.description,
          event_date: createdEvent.event_date,
          event_time: createdEvent.event_time,
          location: createdEvent.location,
          type: createdEvent.type,
          max_attendees: createdEvent.max_attendees,
          registration_link: createdEvent.registration_link,
          featured_image_url: createdEvent.featured_image_url,
          status: createdEvent.status,
          created_at: createdEvent.created_at,
          slug: createdEvent.slug
        }

        setEvents(prev => [newEventData, ...prev])

        // Reset form
        setNewEvent({
          title: '',
          description: '',
          about: '',
          event_date: '',
          event_time: '',
          location: '',
          type: '',
          max_attendees: '',
          featured_image: null
        })
        setImagePreview(null)
        setIsCreateDialogOpen(false)
        
        showToast('Event created successfully!', 'success')
      } else {
        showToast('Failed to create event. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      showToast('An error occurred while creating the event.', 'error')
    } finally {
      setIsCreating(false)
    }
  }

  const handlePreview = async (event: EventData) => {
    // Open event in new tab for preview
    window.open(`/events/${event.slug}`, '_blank')
  }

  const handleEdit = async (event: EventData) => {
    try {
      const supabase = createClient()
      
      // Get the full event data
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', event.id)
        .single()

      if (error || !data) {
        console.error('Failed to get event data:', error)
        showToast("Failed to load event for editing. Please try again.", "error")
        return
      }

      // Populate the create form with the event data
      setNewEvent({
        title: data.title,
        description: data.description || '',
        about: data.about || '',
        event_date: data.event_date,
        event_time: data.event_time,
        location: data.location,
        type: data.type || '',
        max_attendees: data.max_attendees?.toString() || '',
        featured_image: null // We don't load the existing image file
      })

      // Clear image preview since we're not loading the existing image
      setImagePreview(null)
      setIsCreateDialogOpen(true)

      showToast("Event loaded for editing. Make your changes and create as new version.", "success")
    } catch (error) {
      console.error('Edit failed:', error)
      showToast("Failed to load event for editing. Please try again.", "error")
    }
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return
    }

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)

      if (error) {
        console.error('Failed to delete event:', error)
        showToast("Failed to delete event. Please try again.", "error")
        return
      }

      // Remove from local state
      setEvents(prev => prev.filter(event => event.id !== eventId))
      showToast("Event deleted successfully!", "success")
    } catch (error) {
      console.error('Delete failed:', error)
      showToast("Failed to delete event. Please try again.", "error")
    }
  }

  const handlePublish = async (eventId: string) => {
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('events')
        .update({ status: 'upcoming' })
        .eq('id', eventId)

      if (error) {
        console.error('Failed to publish event:', error)
        showToast("Failed to publish event. Please try again.", "error")
        return
      }

      // Update local state
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, status: 'upcoming' }
          : event
      ))

      showToast("Event published successfully!", "success")
      loadEvents() // Refresh the list
    } catch (error) {
      console.error('Publish failed:', error)
      showToast("Failed to publish event. Please try again.", "error")
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600">Create and manage events for your startup community</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[720px] max-h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Create a new event for your startup community.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto flex-1 min-h-0">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Startup Demo Day Q1 2026"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description for event listings (50 words max)..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  rows={3}
                  className="resize-y"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about">About this Event *</Label>
                <Textarea
                  id="about"
                  placeholder="Detailed information about the event, agenda, what attendees will learn, etc..."
                  value={newEvent.about}
                  onChange={(e) => setNewEvent({...newEvent, about: e.target.value})}
                  rows={6}
                  className="resize-y"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event_date">Event Date *</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={newEvent.event_date}
                    onChange={(e) => setNewEvent({...newEvent, event_date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event_time">Event Time *</Label>
                  <Input
                    id="event_time"
                    placeholder="e.g., 2:00 PM - 6:00 PM"
                    value={newEvent.event_time}
                    onChange={(e) => setNewEvent({...newEvent, event_time: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., SJCE-STEP Main Auditorium"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <select
                    id="type"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a type</option>
                    <option value="demo-day">Demo Day</option>
                    <option value="workshop">Workshop</option>
                    <option value="networking">Networking</option>
                    <option value="masterclass">Masterclass</option>
                    <option value="competition">Competition</option>
                    <option value="celebration">Celebration</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max_attendees">Max Attendees</Label>
                  <Input
                    id="max_attendees"
                    type="number"
                    placeholder="e.g., 200"
                    value={newEvent.max_attendees}
                    onChange={(e) => setNewEvent({...newEvent, max_attendees: e.target.value})}
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
                        {newEvent.featured_image?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Image className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="featured_image" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Upload event image
                          </span>
                          <span className="mt-1 block text-sm text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </span>
                        </label>
                        <input
                          id="featured_image"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter className="flex-shrink-0 mt-4">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent} disabled={!newEvent.title.trim() || isCreating}>
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  'Create Event'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search events..."
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
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="demo-day">Demo Day</option>
              <option value="workshop">Workshop</option>
              <option value="networking">Networking</option>
              <option value="masterclass">Masterclass</option>
              <option value="competition">Competition</option>
              <option value="celebration">Celebration</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Events ({filteredEvents.length})</CardTitle>
          <CardDescription>
            Manage your events and track their performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {event.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <div>
                        <div>{new Date(event.event_date).toLocaleDateString()}</div>
                        <div className="text-gray-500">{event.event_time}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {event.type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      {event.max_attendees ? `Max ${event.max_attendees}` : 'No limit'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {event.status !== 'upcoming' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePublish(event.id)}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
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
                          <DropdownMenuItem onClick={() => handlePreview(event)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(event)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(event.id)}>
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
          
          {filteredEvents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No events found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
