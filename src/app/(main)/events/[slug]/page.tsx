'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Calendar, Clock, MapPin, Users, Share2, 
  User, Trophy, BookOpen, Award, TrendingUp, Star,
  Facebook, Twitter, Linkedin, Link as LinkIcon, ArrowRight
} from 'lucide-react'
import { ImageCarousel } from '@/components/ui/image-carousel'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createClient, registerForEvent, getEventRegistrationCount } from '@/lib/supabase'
import { useToast } from '@/components/ui/toast'

interface EventData {
  id: string
  title: string
  slug: string
  description: string
  about?: string
  event_date: string
  event_time: string
  location: string
  type: string
  max_attendees?: number
  registration_link?: string
  featured_image_url?: string
  status: string
  created_at: string
  event_speakers?: Array<{
    id: string
    name: string
    title: string
    company: string
    bio?: string
    photo_url?: string
    linkedin_url?: string
  }>
  event_images?: Array<{
    id: string
    image_url: string
    alt_text?: string
    caption?: string
    is_featured?: boolean
    display_order: number
  }>
}

export default function EventPage() {
  const { showToast } = useToast()
  const params = useParams()
  const slug = params.slug as string
  const [event, setEvent] = useState<EventData | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedEvents, setRelatedEvents] = useState<EventData[]>([])
  const [registrationCount, setRegistrationCount] = useState(0)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    questions: ''
  })

  useEffect(() => {
    const fetchEvent = async () => {
      const supabase = createClient()
      
      try {
        const { data: eventData, error } = await supabase
          .from('events')
          .select(`
            *,
            event_speakers (
              id,
              name,
              title,
              company,
              bio,
              photo_url,
              linkedin_url
            ),
            event_images (
              id,
              image_url,
              alt_text,
              caption,
              is_featured,
              display_order
            )
          `)
          .eq('slug', slug)
          .single()

        if (error || !eventData) {
          console.error('Event not found:', error)
          setEvent(null)
          setLoading(false)
          return
        }

        setEvent(eventData)

        // Fetch registration count
        const count = await getEventRegistrationCount(eventData.id)
        setRegistrationCount(count)

        // Fetch related events (same type, different event)
        const { data: relatedData } = await supabase
          .from('events')
          .select('*')
          .eq('type', eventData.type)
          .neq('id', eventData.id)
          .limit(2)

        if (relatedData) {
          setRelatedEvents(relatedData)
        }

      } catch (error) {
        console.error('Failed to fetch event:', error)
        setEvent(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchEvent()
    }
  }, [slug])

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'demo-day': return Trophy
      case 'workshop': return BookOpen
      case 'networking': return Users
      case 'masterclass': return Award
      case 'competition': return TrendingUp
      case 'celebration': return Star
      default: return Calendar
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = event?.title || ''
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        break
    }
  }

  const handleRegistration = async () => {
    if (!event) return

    if (!registrationForm.name.trim() || !registrationForm.email.trim()) {
      showToast('Please fill in your name and email', 'error')
      return
    }

    setIsRegistering(true)

    try {
      const result = await registerForEvent({
        event_id: event.id,
        name: registrationForm.name,
        email: registrationForm.email,
        phone: registrationForm.phone,
        organization: registrationForm.organization,
        questions: registrationForm.questions
      })

      if (result.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Registration successful! You will receive a confirmation email shortly.', 'success')
        setIsRegistrationOpen(false)
        setRegistrationForm({
          name: '',
          email: '',
          phone: '',
          organization: '',
          questions: ''
        })
        // Refresh registration count
        const count = await getEventRegistrationCount(event.id)
        setRegistrationCount(count)
      }
    } catch (error) {
      console.error('Registration error:', error)
      showToast('Registration failed. Please try again.', 'error')
    } finally {
      setIsRegistering(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link href="/events">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isUpcoming = new Date(event.event_date) > new Date()
  const EventIcon = getEventIcon(event.type)
  
  // Special registration handling for specific events
  const hasExternalRegistration = event.slug === 'democratizing-ai-resources-ai-for-digital-public-infrastructure'
  const externalRegistrationUrl = 'https://forms.gle/zRU9LNxr6juHmrdQA'

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/events" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-accent text-white">
                <EventIcon className="w-4 h-4 mr-2" />
                {event.type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </Badge>
              {isUpcoming && (
                <Badge className="bg-green-500 text-white">
                  Upcoming Event
                </Badge>
              )}
              {!isUpcoming && (
                <Badge className="bg-gray-500 text-white">
                  Past Event
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              {event.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center text-white">
                <Calendar className="w-6 h-6 text-accent mr-3" />
                <div>
                  <div className="font-semibold">{formatDate(event.event_date)}</div>
                  <div className="text-white/80 text-sm">Date</div>
                </div>
              </div>
              <div className="flex items-center text-white">
                <Clock className="w-6 h-6 text-accent mr-3" />
                <div>
                  <div className="font-semibold">{event.event_time}</div>
                  <div className="text-white/80 text-sm">Time</div>
                </div>
              </div>
              <div className="flex items-center text-white">
                <MapPin className="w-6 h-6 text-accent mr-3" />
                <div>
                  <div className="font-semibold">{event.location}</div>
                  <div className="text-white/80 text-sm">Location</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-white/80">
                  <Users className="w-5 h-5 mr-2" />
                  <span>
                    {registrationCount} registered
                    {event.max_attendees && ` / ${event.max_attendees} max`}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="sm" className="bg-white/90 text-gray-900 hover:bg-white border-0 shadow-sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleShare('twitter')}>
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('facebook')}>
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare('copy')}>
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {isUpcoming && (
                  <>
                    {hasExternalRegistration ? (
                      <Button 
                        size="lg" 
                        className="bg-accent text-white hover:bg-accent/90"
                        onClick={() => window.open(externalRegistrationUrl, '_blank')}
                        disabled={event.max_attendees ? registrationCount >= event.max_attendees : false}
                      >
                        {event.max_attendees && registrationCount >= event.max_attendees 
                          ? 'Event Full' 
                          : 'Register Now'
                        } 
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    ) : (
                      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            size="lg" 
                            className="bg-accent text-white hover:bg-accent/90"
                            disabled={event.max_attendees ? registrationCount >= event.max_attendees : false}
                          >
                            {event.max_attendees && registrationCount >= event.max_attendees 
                              ? 'Event Full' 
                              : 'Register Now'
                            } 
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Register for {event.title}</DialogTitle>
                        <DialogDescription>
                          Fill out the form below to register for this event.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              placeholder="Your full name"
                              value={registrationForm.name}
                              onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              value={registrationForm.email}
                              onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              placeholder="+91 9876543210"
                              value={registrationForm.phone}
                              onChange={(e) => setRegistrationForm({...registrationForm, phone: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="organization">Organization</Label>
                            <Input
                              id="organization"
                              placeholder="Company/University"
                              value={registrationForm.organization}
                              onChange={(e) => setRegistrationForm({...registrationForm, organization: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="questions">Questions or Comments</Label>
                          <Textarea
                            id="questions"
                            placeholder="Any questions about the event?"
                            value={registrationForm.questions}
                            onChange={(e) => setRegistrationForm({...registrationForm, questions: e.target.value})}
                            rows={3}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRegistrationOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleRegistration} disabled={isRegistering}>
                          {isRegistering ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Registering...
                            </>
                          ) : (
                            'Complete Registration'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                      </Dialog>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Images Carousel */}
      {((event.event_images && event.event_images.length > 0) || event.featured_image_url) && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {event.event_images && event.event_images.length > 0 ? (
                  <ImageCarousel 
                    images={event.event_images.sort((a, b) => a.display_order - b.display_order)}
                    showThumbnails={event.event_images.length > 1}
                    showFullscreen={true}
                  />
                ) : event.featured_image_url ? (
                  <ImageCarousel 
                    images={[{
                      id: 'featured',
                      image_url: event.featured_image_url,
                      alt_text: event.title,
                      caption: undefined,
                      is_featured: true
                    }]}
                    showThumbnails={false}
                    showFullscreen={true}
                  />
                ) : null}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* About this Event */}
      {event.about && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">About this Event</h2>
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {event.about}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}


      {/* Speakers Section */}
      {event.event_speakers && event.event_speakers.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Speakers</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.event_speakers.map((speaker) => (
                    <Card key={speaker.id} className="border-2 border-gray-200 hover:border-accent/30 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                            {speaker.photo_url ? (
                              <img 
                                src={speaker.photo_url} 
                                alt={speaker.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-8 h-8 text-accent" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {speaker.name}
                            </h3>
                            <p className="text-accent font-medium mb-1">{speaker.title}</p>
                            <p className="text-gray-600 text-sm mb-2">{speaker.company}</p>
                            {speaker.bio && (
                              <p className="text-gray-600 text-sm">{speaker.bio}</p>
                            )}
                            {speaker.linkedin_url && (
                              <a 
                                href={speaker.linkedin_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-accent hover:text-accent/80 text-sm mt-2"
                              >
                                <Linkedin className="w-4 h-4 mr-1" />
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedEvents.map((relatedEvent) => {
                  const RelatedIcon = getEventIcon(relatedEvent.type)
                  const isRelatedUpcoming = new Date(relatedEvent.event_date) > new Date()
                  
                  return (
                    <motion.div
                      key={relatedEvent.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline">
                              <RelatedIcon className="w-3 h-3 mr-1" />
                              {relatedEvent.type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                            </Badge>
                            {isRelatedUpcoming && (
                              <Badge className="bg-green-100 text-green-800">
                                Upcoming
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                            {relatedEvent.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {relatedEvent.description}
                          </p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-2" />
                              {formatDate(relatedEvent.event_date)}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-2" />
                              {relatedEvent.location}
                            </div>
                          </div>
                          
                          <Link href={`/events/${relatedEvent.slug}`}>
                            <Button variant="outline" size="sm" className="w-full">
                              Learn More
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
