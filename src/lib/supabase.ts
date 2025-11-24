import { createBrowserClient } from '@supabase/ssr'
import { withCache, cacheKeys, invalidateCache } from './cache'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ruxpmrprsqxkfbodrune.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eHBtcnByc3F4a2Zib2RydW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTY5OTQsImV4cCI6MjA3NzI5Mjk5NH0.IUQ1aHIA2Zt1FcpxtBAbcIP0qipMdQk38osctnz89hQ'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Database types
export interface Database {
  public: {
    Tables: {
      admin_user: {
        Row: {
          id: string
          email: string
          password_hash: string
          created_at: string
          updated_at: string
          last_login: string | null
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_active?: boolean
        }
      }
      startups: {
        Row: {
          id: string
          name: string
          tagline: string | null
          description: string | null
          logo_url: string | null
          website: string | null
          category: string | null
          founded_year: number | null
          funding_amount: number | null
          funding_stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | null
          investors: string[] | null
          team_size_min: number | null
          team_size_max: number | null
          status: 'active' | 'graduated' | 'exited'
          achievements: string[] | null
          tags: string[] | null
          batch: string | null
          is_featured: boolean
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tagline?: string | null
          description?: string | null
          logo_url?: string | null
          website?: string | null
          category?: string | null
          founded_year?: number | null
          funding_amount?: number | null
          funding_stage?: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | null
          investors?: string[] | null
          team_size_min?: number | null
          team_size_max?: number | null
          status?: 'active' | 'graduated' | 'exited'
          achievements?: string[] | null
          tags?: string[] | null
          batch?: string | null
          is_featured?: boolean
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tagline?: string | null
          description?: string | null
          logo_url?: string | null
          website?: string | null
          category?: string | null
          founded_year?: number | null
          funding_amount?: number | null
          funding_stage?: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | null
          investors?: string[] | null
          team_size_min?: number | null
          team_size_max?: number | null
          status?: 'active' | 'graduated' | 'exited'
          achievements?: string[] | null
          tags?: string[] | null
          batch?: string | null
          is_featured?: boolean
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image_url: string | null
          author_id: string | null
          category: 'success-story' | 'insights' | 'guides' | 'news' | null
          tags: string[] | null
          status: 'draft' | 'published' | 'archived'
          is_featured: boolean
          is_trending: boolean
          published_at: string | null
          read_time_minutes: number | null
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image_url?: string | null
          author_id?: string | null
          category?: 'success-story' | 'insights' | 'guides' | 'news' | null
          tags?: string[] | null
          status?: 'draft' | 'published' | 'archived'
          is_featured?: boolean
          is_trending?: boolean
          published_at?: string | null
          read_time_minutes?: number | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image_url?: string | null
          author_id?: string | null
          category?: 'success-story' | 'insights' | 'guides' | 'news' | null
          tags?: string[] | null
          status?: 'draft' | 'published' | 'archived'
          is_featured?: boolean
          is_trending?: boolean
          published_at?: string | null
          read_time_minutes?: number | null
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_authors: {
        Row: {
          id: string
          name: string
          email: string | null
          bio: string | null
          avatar_url: string | null
          social_links: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
          social_links?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          bio?: string | null
          avatar_url?: string | null
          social_links?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      media_library: {
        Row: {
          id: string
          filename: string
          original_filename: string
          file_path: string
          file_url: string
          file_size: number
          file_type: string
          mime_type: string
          folder: string
          alt_text: string | null
          caption: string | null
          width: number | null
          height: number | null
          usage_count: number
          uploaded_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          filename: string
          original_filename: string
          file_path: string
          file_url: string
          file_size: number
          file_type: string
          mime_type: string
          folder?: string
          alt_text?: string | null
          caption?: string | null
          width?: number | null
          height?: number | null
          usage_count?: number
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          filename?: string
          original_filename?: string
          file_path?: string
          file_url?: string
          file_size?: number
          file_type?: string
          mime_type?: string
          folder?: string
          alt_text?: string | null
          caption?: string | null
          width?: number | null
          height?: number | null
          usage_count?: number
          uploaded_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Utility functions for file upload
export async function uploadBlogImage(file: File): Promise<{ url: string; path: string } | null> {
  const supabase = createClient()
  
  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `blog-images/${fileName}`
  
  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) {
      console.error('Upload error:', error)
      return null
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath)
    
    // Save to media library
    await supabase
      .from('media_library')
      .insert({
        filename: fileName,
        original_filename: file.name,
        file_path: filePath,
        file_url: publicUrl,
        file_size: file.size,
        file_type: 'image',
        mime_type: file.type,
        folder: 'blog-images'
      })
    
    return {
      url: publicUrl,
      path: filePath
    }
  } catch (error) {
    console.error('Upload failed:', error)
    return null
  }
}

// Function to fetch blog articles
export async function fetchBlogArticles() {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('blog_articles')
      .select(`
        *,
        blog_authors (
          name,
          email,
          bio,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Fetch error:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Fetch failed:', error)
    return []
  }
}

// Function to create blog article
export async function createBlogArticle(articleData: {
  title: string
  excerpt: string | null
  content: string
  category: string | null
  tags: string[]
  featured_image_url: string | null
}) {
  const supabase = createClient()
  
  // Generate slug from title
  const slug = articleData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  
  try {
    // First, ensure we have a default admin author
    let authorId = null
    const { data: existingAuthor } = await supabase
      .from('blog_authors')
      .select('id')
      .eq('email', 'admin@sjce-step.in')
      .single()
    
    if (existingAuthor) {
      authorId = existingAuthor.id
    } else {
      // Create default admin author
      const { data: newAuthor, error: authorError } = await supabase
        .from('blog_authors')
        .insert({
          name: 'Admin User',
          email: 'admin@sjce-step.in',
          bio: 'SJCE-STEP Admin'
        })
        .select('id')
        .single()
      
      if (authorError) {
        console.error('Author creation error:', authorError)
      } else {
        authorId = newAuthor?.id
      }
    }

    const { data, error } = await supabase
      .from('blog_articles')
      .insert({
        title: articleData.title,
        slug: slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        category: articleData.category || 'news',
        tags: articleData.tags,
        featured_image_url: articleData.featured_image_url,
        author_id: authorId,
        status: 'draft',
        is_featured: false,
        is_trending: false
      })
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return null
    }
    
    return data
  } catch (error) {
    console.error('Create article failed:', error)
    return null
  }
}

// Events functions
export async function fetchEvents() {
  return withCache(
    cacheKeys.events(),
    async () => {
      const supabase = createClient()
      
      const { data, error } = await supabase
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
          )
        `)
        .order('event_date', { ascending: true })

      if (error) {
        console.error('Error fetching events:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        return []
      }

      return data || []
    },
    300 // Cache for 5 minutes
  )
}

export async function createEvent(eventData: {
  title: string
  description: string
  about: string
  event_date: string
  event_time: string
  location: string
  type: string
  max_attendees?: number
  featured_image_url?: string
}) {
  const supabase = createClient()

  try {
    // Generate base slug from title
    const baseSlug = eventData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Function to generate unique slug
    const generateUniqueSlug = async (baseSlug: string): Promise<string> => {
      let slug = baseSlug
      let counter = 0
      
      while (true) {
        // Check if slug exists
        const { data: existingEvent, error: checkError } = await supabase
          .from('events')
          .select('id')
          .eq('slug', slug)
          .single()
        
        // If error is "PGRST116" (no rows found), slug is unique
        if (checkError && checkError.code === 'PGRST116') {
          return slug
        }
        
        // If no error and data exists, slug is taken
        if (!checkError && existingEvent) {
          counter++
          slug = counter === 1 ? `${baseSlug}-${Date.now()}` : `${baseSlug}-${Date.now()}-${counter}`
        } else if (checkError && checkError.code !== 'PGRST116') {
          // If there's a different error, throw it
          throw checkError
        } else {
          // If no data and no error, slug is unique
          return slug
        }
      }
    }

    // Generate unique slug
    const uniqueSlug = await generateUniqueSlug(baseSlug)

    const { data, error } = await supabase
      .from('events')
      .insert({
        title: eventData.title,
        slug: uniqueSlug,
        description: eventData.description,
        about: eventData.about,
        event_date: eventData.event_date,
        event_time: eventData.event_time,
        location: eventData.location,
        type: eventData.type,
        max_attendees: eventData.max_attendees,
        featured_image_url: eventData.featured_image_url,
        status: 'upcoming'
      })
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return null
    }
    
    return data
  } catch (error) {
    console.error('Create event failed:', error)
    return null
  }
}

export async function updateEvent(eventId: string, eventData: {
  title: string
  description: string
  about: string
  event_date: string
  event_time: string
  location: string
  type: string
  max_attendees?: number
  featured_image_url?: string
}) {
  const supabase = createClient()

  try {
    // Generate base slug from title
    const baseSlug = eventData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Function to generate unique slug (excluding current event)
    const generateUniqueSlug = async (baseSlug: string, currentEventId: string): Promise<string> => {
      let slug = baseSlug
      let counter = 0
      
      while (true) {
        // Check if slug exists (excluding current event)
        const { data: existingEvent, error: checkError } = await supabase
          .from('events')
          .select('id')
          .eq('slug', slug)
          .neq('id', currentEventId)
          .single()
        
        // If error is "PGRST116" (no rows found), slug is unique
        if (checkError && checkError.code === 'PGRST116') {
          return slug
        }
        
        // If no error and data exists, slug is taken
        if (!checkError && existingEvent) {
          counter++
          slug = counter === 1 ? `${baseSlug}-${Date.now()}` : `${baseSlug}-${Date.now()}-${counter}`
        } else if (checkError && checkError.code !== 'PGRST116') {
          // If there's a different error, throw it
          throw checkError
        } else {
          // If no data and no error, slug is unique
          return slug
        }
      }
    }

    // Generate unique slug
    const uniqueSlug = await generateUniqueSlug(baseSlug, eventId)

    const { data, error } = await supabase
      .from('events')
      .update({
        title: eventData.title,
        slug: uniqueSlug,
        description: eventData.description,
        about: eventData.about,
        event_date: eventData.event_date,
        event_time: eventData.event_time,
        location: eventData.location,
        type: eventData.type,
        max_attendees: eventData.max_attendees,
        featured_image_url: eventData.featured_image_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', eventId)
      .select()
      .single()
    
    if (error) {
      console.error('Database error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return null
    }
    
    return data
  } catch (error) {
    console.error('Update event failed:', error)
    return null
  }
}

export async function updateEventStatuses(): Promise<{ updated: number; errors: string[] }> {
  const supabase = createClient()
  
  try {
    // Get current date and time
    const now = new Date()
    const currentDate = now.toISOString().split('T')[0] // YYYY-MM-DD format
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5) // HH:MM format
    
    // Find events that should be marked as 'past'
    const { data: eventsToUpdate, error: fetchError } = await supabase
      .from('events')
      .select('id, title, event_date, event_time, status')
      .eq('status', 'upcoming')
      .or(`event_date.lt.${currentDate},and(event_date.eq.${currentDate},event_time.lt.${currentTime})`)
    
    if (fetchError) {
      console.error('Error fetching events to update:', fetchError)
      return { updated: 0, errors: [fetchError.message] }
    }
    
    if (!eventsToUpdate || eventsToUpdate.length === 0) {
      return { updated: 0, errors: [] }
    }
    
    // Update events to 'past' status
    const eventIds = eventsToUpdate.map(event => event.id)
    const { data: updatedEvents, error: updateError } = await supabase
      .from('events')
      .update({ 
        status: 'past',
        updated_at: new Date().toISOString()
      })
      .in('id', eventIds)
      .select('id, title')
    
    if (updateError) {
      console.error('Error updating event statuses:', updateError)
      return { updated: 0, errors: [updateError.message] }
    }
    
    console.log(`Updated ${updatedEvents?.length || 0} events to 'past' status`)
    return { 
      updated: updatedEvents?.length || 0, 
      errors: [] 
    }
    
  } catch (error) {
    console.error('Update event statuses failed:', error)
    return { 
      updated: 0, 
      errors: [error instanceof Error ? error.message : 'Unknown error'] 
    }
  }
}

export async function checkAndUpdateEventStatus(eventId: string): Promise<boolean> {
  const supabase = createClient()
  
  try {
    // Get the specific event
    const { data: event, error: fetchError } = await supabase
      .from('events')
      .select('id, event_date, event_time, status')
      .eq('id', eventId)
      .single()
    
    if (fetchError || !event) {
      console.error('Error fetching event:', fetchError)
      return false
    }
    
    // Skip if already marked as past or cancelled
    if (event.status === 'past' || event.status === 'cancelled') {
      return false
    }
    
    // Check if event has passed
    const now = new Date()
    const eventDateTime = new Date(`${event.event_date}T${event.event_time}`)
    
    if (eventDateTime < now) {
      // Update status to 'past'
      const { error: updateError } = await supabase
        .from('events')
        .update({ 
          status: 'past',
          updated_at: new Date().toISOString()
        })
        .eq('id', eventId)
      
      if (updateError) {
        console.error('Error updating event status:', updateError)
        return false
      }
      
      console.log(`Event ${eventId} status updated to 'past'`)
      return true
    }
    
    return false
  } catch (error) {
    console.error('Check and update event status failed:', error)
    return false
  }
}

export async function uploadEventImage(file: File): Promise<string | null> {
  const supabase = createClient()
  
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `event-images/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return null
    }

    const { data } = supabase.storage
      .from('event-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  } catch (error) {
    console.error('Upload failed:', error)
    return null
  }
}

// Event Registration functions
export async function registerForEvent(registrationData: {
  event_id: string
  name: string
  email: string
  phone?: string
  organization?: string
  dietary_requirements?: string
  questions?: string
}) {
  const supabase = createClient()

  try {
    // Check if user is already registered for this event
    const { data: existingRegistration } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', registrationData.event_id)
      .or(`email.eq.${registrationData.email},attendee_email.eq.${registrationData.email}`)
      .single()

    if (existingRegistration) {
      return { error: 'You are already registered for this event' }
    }

    const { data, error } = await supabase
      .from('event_registrations')
      .insert({
        event_id: registrationData.event_id,
        name: registrationData.name,
        email: registrationData.email,
        phone: registrationData.phone,
        organization: registrationData.organization,
        dietary_requirements: registrationData.dietary_requirements,
        questions: registrationData.questions,
        status: 'registered',
        // Also populate legacy columns for compatibility
        attendee_name: registrationData.name,
        attendee_email: registrationData.email,
        attendee_phone: registrationData.phone,
        special_requirements: registrationData.dietary_requirements
      })
      .select()
      .single()
    
    if (error) {
      console.error('Registration error:', error)
      return { error: error.message }
    }
    
    return { data }
  } catch (error) {
    console.error('Registration failed:', error)
    return { error: 'Registration failed. Please try again.' }
  }
}

export async function fetchEventRegistrations(eventId?: string) {
  const supabase = createClient()
  
  let query = supabase
    .from('event_registrations')
    .select(`
      *,
      events (
        title,
        event_date,
        event_time,
        location
      )
    `)
    .order('created_at', { ascending: false })

  if (eventId) {
    query = query.eq('event_id', eventId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching registrations:', error)
    return []
  }

  return data || []
}

export async function getEventRegistrationCount(eventId: string) {
  const supabase = createClient()
  
  const { count, error } = await supabase
    .from('event_registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('status', 'registered')

  if (error) {
    console.error('Error fetching registration count:', error)
    return 0
  }

  return count || 0
}

// Contact Submission functions
export async function submitContactForm(contactData: {
  name: string
  email: string
  phone?: string
  category: string
  subject: string
  message: string
}) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone || null,
        category: contactData.category || 'other',
        subject: contactData.subject,
        message: contactData.message,
        status: 'new',
        is_read: false,
        submitted_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Contact submission error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return { error: error.message }
    }
    
    return { data }
  } catch (error) {
    console.error('Contact submission failed:', error)
    return { error: 'Submission failed. Please try again.' }
  }
}

export async function fetchContactSubmissions() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) {
    console.error('Error fetching contact submissions:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return []
  }

  return data || []
}

export async function updateContactSubmissionStatus(id: string, status: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating contact submission status:', error)
    return { error: error.message }
  }

  return { data }
}

// Application functions
export async function submitApplication(applicationData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  linkedin?: string
  startupName: string
  website?: string
  stage: string
  description: string
  targetMarket: string
  revenueModel: string
  fundingRequirement?: string
  preferredProgram: string
}) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('applications')
      .insert({
        first_name: applicationData.firstName,
        last_name: applicationData.lastName,
        founder_name: `${applicationData.firstName} ${applicationData.lastName}`,
        founder_email: applicationData.email,
        founder_phone: applicationData.phone,
        linkedin_profile: applicationData.linkedin,
        startup_name: applicationData.startupName,
        website: applicationData.website,
        business_stage: applicationData.stage,
        business_description: applicationData.description,
        target_market: applicationData.targetMarket,
        revenue_model: applicationData.revenueModel,
        funding_requirement: applicationData.fundingRequirement,
        preferred_program: applicationData.preferredProgram,
        status: 'pending',
        submitted_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Application submission error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return { error: error.message }
    }
    
    return { data }
  } catch (error) {
    console.error('Application submission failed:', error)
    return { error: 'Submission failed. Please try again.' }
  }
}

export async function fetchApplications() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (error) {
    console.error('Error fetching applications:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return []
  }

  return data || []
}

export async function updateApplicationStatus(id: string, status: string, adminNotes?: string) {
  const supabase = createClient()
  
  const updateData: any = { 
    status,
    reviewed_at: new Date().toISOString()
  }
  
  if (adminNotes) {
    updateData.admin_notes = adminNotes
  }
  
  const { data, error } = await supabase
    .from('applications')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating application status:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return { error: error.message }
  }

  return { data }
}

// Startup functions
export async function fetchStartups() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching startups:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return []
  }

  return data || []
}

export async function fetchPublishedStartups() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('status', 'active')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching published startups:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return []
  }

  return data || []
}

export async function createStartup(startupData: {
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
}) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('startups')
      .insert({
        ...startupData,
        status: startupData.status || 'active',
        is_featured: startupData.is_featured || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Startup creation error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return { error: error.message }
    }
    
    return { data }
  } catch (error) {
    console.error('Startup creation failed:', error)
    return { error: 'Creation failed. Please try again.' }
  }
}

export async function updateStartup(id: string, startupData: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('startups')
    .update({
      ...startupData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating startup:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return { error: error.message }
  }

  return { data }
}

export async function deleteStartup(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('startups')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting startup:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return { error: error.message }
  }

  return { success: true }
}

// Storage functions for startup logos
export async function uploadStartupLogo(file: File, startupId: string) {
  const supabase = createClient()
  
  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${startupId}-${Date.now()}.${fileExt}`
  
  try {
    const { data, error } = await supabase.storage
      .from('startup-logos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading logo:', error)
      return { error: error.message }
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('startup-logos')
      .getPublicUrl(fileName)

    return { data: { path: data.path, publicUrl } }
  } catch (error) {
    console.error('Upload failed:', error)
    return { error: 'Upload failed. Please try again.' }
  }
}

export async function deleteStartupLogo(logoPath: string) {
  const supabase = createClient()
  
  // Extract filename from URL or path
  const fileName = logoPath.split('/').pop() || logoPath
  
  try {
    const { error } = await supabase.storage
      .from('startup-logos')
      .remove([fileName])

    if (error) {
      console.error('Error deleting logo:', error)
      return { error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Delete failed:', error)
    return { error: 'Delete failed. Please try again.' }
  }
}

// Team management functions
export async function fetchTeamMembers() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching team members:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return []
  }

  return data || []
}

export async function fetchTeamMembersByCategory(category: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('category', category)
    .eq('is_visible', true)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching ${category} members:`, error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return []
  }

  return data || []
}

export async function createTeamMember(memberData: {
  name: string
  title?: string
  role?: string
  photo_url?: string
  email?: string
  phone?: string
  linkedin_url?: string
  twitter_url?: string
  bio?: string
  expertise?: string[]
  display_order?: number
  is_visible?: boolean
  category?: string
}) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('team_members')
      .insert({
        ...memberData,
        is_visible: memberData.is_visible ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      console.error('Team member creation error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return { error: error.message }
    }
    
    return { data }
  } catch (error) {
    console.error('Team member creation failed:', error)
    return { error: 'Creation failed. Please try again.' }
  }
}

export async function updateTeamMember(id: string, memberData: any) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .update({
      ...memberData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating team member:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return { error: error.message }
  }

  return { data }
}

export async function deleteTeamMember(id: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting team member:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return { error: error.message }
  }

  return { success: true }
}

// Dashboard Statistics Functions
export interface DashboardStats {
  totalStartups: number
  totalBlogs: number
  upcomingEvents: number
  pendingApplications: number
  unreadMessages: number
  draftBlogs: number
  recentRegistrations: number
  teamMembers: number
}

export interface ActivityItem {
  id: string
  type: 'application' | 'blog' | 'event' | 'team' | 'contact'
  title: string
  description: string
  timestamp: string
  color: string
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  return withCache(
    cacheKeys.dashboardStats(),
    async () => {
      const supabase = createClient()
  
  try {
    // Fetch all counts in parallel
    const [
      startupsResult,
      blogsResult,
      eventsResult,
      applicationsResult,
      contactsResult,
      draftBlogsResult,
      registrationsResult,
      teamResult
    ] = await Promise.all([
      // Total startups
      supabase.from('startups').select('id', { count: 'exact', head: true }),
      
      // Published blogs
      supabase.from('blog_articles').select('id', { count: 'exact', head: true }).eq('status', 'published'),
      
      // Upcoming events
      supabase.from('events').select('id', { count: 'exact', head: true }).eq('status', 'upcoming'),
      
      // Pending applications
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      
      // Recent contact submissions (last 7 days)
      supabase.from('contact_submissions')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      
      // Draft blogs
      supabase.from('blog_articles').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
      
      // Recent event registrations (last 30 days)
      supabase.from('event_registrations')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
      
      // Team members
      supabase.from('team_members').select('id', { count: 'exact', head: true }).eq('is_visible', true)
    ])

    return {
      totalStartups: startupsResult.count || 0,
      totalBlogs: blogsResult.count || 0,
      upcomingEvents: eventsResult.count || 0,
      pendingApplications: applicationsResult.count || 0,
      unreadMessages: contactsResult.count || 0,
      draftBlogs: draftBlogsResult.count || 0,
      recentRegistrations: registrationsResult.count || 0,
      teamMembers: teamResult.count || 0
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      totalStartups: 0,
      totalBlogs: 0,
      upcomingEvents: 0,
      pendingApplications: 0,
      unreadMessages: 0,
      draftBlogs: 0,
      recentRegistrations: 0,
      teamMembers: 0
    }
  }
    },
    180 // Cache for 3 minutes (dashboard data changes frequently)
  )
}

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  const supabase = createClient()
  const activities: ActivityItem[] = []
  
  try {
    // Get recent applications (last 7 days)
    const { data: applications } = await supabase
      .from('applications')
      .select('id, startup_name, founder_name, submitted_at')
      .gte('submitted_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('submitted_at', { ascending: false })
      .limit(3)

    if (applications) {
      applications.forEach(app => {
        activities.push({
          id: `app-${app.id}`,
          type: 'application',
          title: 'New startup application received',
          description: `${app.startup_name} by ${app.founder_name}`,
          timestamp: app.submitted_at,
          color: 'bg-green-500'
        })
      })
    }

    // Get recently published blogs (last 7 days)
    const { data: blogs } = await supabase
      .from('blog_articles')
      .select('id, title, published_at')
      .eq('status', 'published')
      .gte('published_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('published_at', { ascending: false })
      .limit(3)

    if (blogs) {
      blogs.forEach(blog => {
        activities.push({
          id: `blog-${blog.id}`,
          type: 'blog',
          title: 'Blog post published',
          description: blog.title,
          timestamp: blog.published_at,
          color: 'bg-blue-500'
        })
      })
    }

    // Get recently updated events (last 7 days)
    const { data: events } = await supabase
      .from('events')
      .select('id, title, updated_at')
      .gte('updated_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      .order('updated_at', { ascending: false })
      .limit(3)

    if (events) {
      events.forEach(event => {
        activities.push({
          id: `event-${event.id}`,
          type: 'event',
          title: 'Event updated',
          description: event.title,
          timestamp: event.updated_at,
          color: 'bg-purple-500'
        })
      })
    }

    // Get recent team additions (last 30 days)
    const { data: teamMembers } = await supabase
      .from('team_members')
      .select('id, name, created_at')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(2)

    if (teamMembers) {
      teamMembers.forEach(member => {
        activities.push({
          id: `team-${member.id}`,
          type: 'team',
          title: 'New team member added',
          description: member.name,
          timestamp: member.created_at,
          color: 'bg-orange-500'
        })
      })
    }

    // Get recent contact submissions (last 3 days)
    const { data: contacts } = await supabase
      .from('contact_submissions')
      .select('id, name, created_at')
      .gte('created_at', new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(2)

    if (contacts) {
      contacts.forEach(contact => {
        activities.push({
          id: `contact-${contact.id}`,
          type: 'contact',
          title: 'New contact submission',
          description: `Message from ${contact.name}`,
          timestamp: contact.created_at,
          color: 'bg-red-500'
        })
      })
    }

    // Sort all activities by timestamp and return top 8
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8)

  } catch (error) {
    console.error('Error fetching recent activity:', error)
    return []
  }
}
