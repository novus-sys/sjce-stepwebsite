'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, Clock, MapPin, Users, ArrowRight, Star,
  Trophy, BookOpen, Award, TrendingUp, CheckCircle2,
  Filter, Search
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { fetchEvents } from '@/lib/supabase'

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [daysUntilNext, setDaysUntilNext] = useState(0)

  // Helper function to truncate description to 50 words
  const truncateDescription = (text: string, wordLimit: number = 50) => {
    if (!text) return ''
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + '...'
  }

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents()
        setEvents(data)
        
        // Calculate days until next upcoming event
        const upcomingEvents = data.filter((event: any) => new Date(event.event_date) > new Date())
        if (upcomingEvents.length > 0) {
          const nextEvent = new Date(upcomingEvents[0].event_date)
          const today = new Date()
          const diff = Math.ceil((nextEvent.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
          setDaysUntilNext(diff)
        }
      } catch (error) {
        console.error('Failed to load events:', error)
        setEvents([])
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [])

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
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  // Filter events based on status and type
  const filteredEvents = events.filter((event: any) => {
    const eventDate = new Date(event.event_date)
    const today = new Date()
    const isUpcoming = eventDate > today
    
    // Filter by time period
    if (filter === 'upcoming' && !isUpcoming) return false
    if (filter === 'past' && isUpcoming) return false
    
    // Filter by type
    if (typeFilter !== 'all' && event.type !== typeFilter) return false
    
    // Filter by search query
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !event.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    
    return true
  })
  
  const upcomingEvents = events.filter((event: any) => new Date(event.event_date) > new Date())
  const pastEvents = events.filter((event: any) => new Date(event.event_date) <= new Date())
  
  const eventTypes = [
    { id: 'demo-day', name: 'Demo Day', icon: Trophy, description: 'Startups pitch to investors and industry leaders', frequency: 'Quarterly' },
    { id: 'workshop', name: 'Workshop', icon: BookOpen, description: 'Hands-on learning sessions on various topics', frequency: 'Monthly' },
    { id: 'networking', name: 'Networking', icon: Users, description: 'Connect with entrepreneurs and professionals', frequency: 'Bi-weekly' },
    { id: 'masterclass', name: 'Masterclass', icon: Award, description: 'Deep-dive sessions with industry experts', frequency: 'Monthly' },
    { id: 'competition', name: 'Competition', icon: TrendingUp, description: 'Competitive events and challenges', frequency: 'Quarterly' },
    { id: 'celebration', name: 'Celebration', icon: Star, description: 'Milestone celebrations and achievements', frequency: 'As needed' }
  ]

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            {daysUntilNext > 0 && (
              <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 text-sm px-4 py-2 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                Next Event in {daysUntilNext} Days
              </Badge>
            )}
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Where Innovation <span className="text-accent">Meets Opportunity</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
              Join our vibrant community of founders, investors, and innovators
            </p>

            {/* Featured Event */}
            {upcomingEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-left max-w-4xl mx-auto"
              >
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-accent text-white hover:bg-accent/90 border-0">
                    Featured Event
                  </Badge>
                  <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
                    {upcomingEvents[0].type.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-4">{upcomingEvents[0].title}</h2>
                <p className="text-white/80 mb-6">{truncateDescription(upcomingEvents[0].description)}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span>{formatDate(upcomingEvents[0].event_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-accent" />
                    <span>{upcomingEvents[0].event_time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span>{upcomingEvents[0].location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80">
                    <Users className="w-5 h-5" />
                    <span>Max {upcomingEvents[0].max_attendees} attendees</span>
                  </div>
                  {upcomingEvents[0].registration_link && (
                    <a href={upcomingEvents[0].registration_link} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="bg-accent text-white hover:bg-accent/90">
                        Register Now <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-gray-50 border-b-2 border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Calendar, label: `${events.length}+ Events Hosted`, color: 'text-accent' },
              { icon: Users, label: '5000+ Total Attendees', color: 'text-accent' },
              { icon: Award, label: '50+ Expert Speakers', color: 'text-accent' },
              { icon: Star, label: '4.8/5 Average Rating', color: 'text-accent' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-gray-700 font-semibold">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Status Filter */}
              <div className="flex gap-2">
                <Button
                  onClick={() => setFilter('upcoming')}
                  variant={filter === 'upcoming' ? 'default' : 'outline'}
                  className={filter === 'upcoming' ? 'bg-accent hover:bg-accent/90' : ''}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Upcoming ({upcomingEvents.length})
                </Button>
                <Button
                  onClick={() => setFilter('past')}
                  variant={filter === 'past' ? 'default' : 'outline'}
                  className={filter === 'past' ? 'bg-accent hover:bg-accent/90' : ''}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Past ({pastEvents.length})
                </Button>
                <Button
                  onClick={() => setFilter('all')}
                  variant={filter === 'all' ? 'default' : 'outline'}
                  className={filter === 'all' ? 'bg-accent hover:bg-accent/90' : ''}
                >
                  All Events
                </Button>
              </div>

              {/* Search and Type Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none"
                  />
                </div>
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none"
                >
                  <option value="all">All Types</option>
                  {eventTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No events found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredEvents.map((event: any, index: number) => {
                  const Icon = getEventIcon(event.type)
                  const isUpcoming = new Date(event.event_date) > new Date()
                  
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl">
                        <CardContent className="p-6">
                          {event.featured_image_url && (
                            <div className="aspect-video overflow-hidden rounded-lg mb-4">
                              <img 
                                src={event.featured_image_url} 
                                alt={event.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          
                          <div className="flex items-start justify-between mb-4">
                            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0">
                              <Icon className="w-3 h-3 mr-1" />
                              {event.type.replace('-', ' ')}
                            </Badge>
                            {!isUpcoming && (
                              <Badge className="bg-gray-200 text-gray-700 border-0">
                                Past Event
                              </Badge>
                            )}
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{truncateDescription(event.description)}</p>
                          
                          <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4 text-accent" />
                              <span>{formatDate(event.event_date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4 text-accent" />
                              <span>{event.event_time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4 text-accent" />
                              <span>{event.location}</span>
                            </div>
                            {event.max_attendees && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="w-4 h-4 text-accent" />
                                <span>Max {event.max_attendees} attendees</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <Link href={`/events/${event.slug}`}>
                              <Button variant="outline" size="sm">
                                Learn More
                              </Button>
                            </Link>
                            {isUpcoming && event.registration_link && (
                              <a href={event.registration_link} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="bg-accent hover:bg-accent/90">
                                  Register <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
