# Admin Panel Requirements - SJCE-STEP Website

## Overview
A comprehensive admin panel for managing all content and operations of the SJCE-STEP website. Single admin user with full access to all features.

---

## 1. Content Management

### 1.1 Startups Management
**Purpose**: Manage the portfolio of incubated startups

**Features**:
- ✅ Add new startups with complete details
- ✅ Edit existing startup information
- ✅ Delete startups (with confirmation)
- ✅ Upload and manage startup logos
- ✅ Update funding stages (seed, pre-seed, series-a, series-b)
- ✅ Manage team size ranges
- ✅ Set startup status (active, graduated, exited)
- ✅ Add/edit achievements
- ✅ Manage tags and categories
- ✅ Feature/unfeature startups on homepage
- ✅ Assign batch information
- ✅ Update website links and contact details

**Data Fields**:
- Basic Info: Name, tagline, description, logo
- Business: Category, founded year, website
- Funding: Amount, stage, investors
- Team: Size, key members
- Status: Active/graduated/exited
- Achievements: Array of milestones
- Tags: Technology/industry tags
- Batch: Cohort information

### 1.2 Blog & Articles Management
**Purpose**: Manage blog content and insights

**Features**:
- ✅ Create new blog posts with rich text editor
- ✅ Edit existing articles
- ✅ Delete articles (with confirmation)
- ✅ Upload and manage article images
- ✅ Manage categories (success-story, insights, guides, news)
- ✅ Add and manage tags
- ✅ Set featured status (homepage display)
- ✅ Set trending status
- ✅ Manage article status (draft, published, archived)
- ✅ Schedule publishing dates
- ✅ Manage author information
- ✅ SEO fields (meta title, description)

**Data Fields**:
- Content: Title, slug, excerpt, full content
- Media: Featured image, inline images
- Metadata: Author, publish date, read time
- Organization: Category, tags
- Status: Draft/published/archived
- Engagement: Featured, trending flags
- SEO: Meta title, description

### 1.3 Events Management
**Purpose**: Manage all SJCE-STEP events

**Features**:
- ✅ Create new events
- ✅ Edit event details
- ✅ Delete events (with confirmation)
- ✅ Upload event images and materials
- ✅ Manage event types (demo-day, workshop, networking, masterclass, competition, celebration)
- ✅ Add/edit speaker information with bios
- ✅ Set attendee limits
- ✅ Track registration counts
- ✅ Update event status (upcoming, past)
- ✅ Add event highlights
- ✅ Manage registration links
- ✅ Add location details

**Data Fields**:
- Basic: Title, description, image
- Schedule: Date, time, duration
- Location: Venue details, address
- Type: Event category
- Speakers: Name, title, company, bio, photo, LinkedIn
- Capacity: Max attendees, current registrations
- Status: Upcoming/past
- Registration: Link, requirements
- Highlights: Key takeaways

### 1.4 Team Management
**Purpose**: Manage SJCE-STEP team members

**Features**:
- ✅ Add new team members
- ✅ Edit member information
- ✅ Delete team members
- ✅ Upload member photos
- ✅ Manage roles and titles
- ✅ Add social media links (LinkedIn, Twitter, Email)
- ✅ Update bio/description
- ✅ Set display order

**Data Fields**:
- Personal: Name, photo, title, role
- Contact: Email, phone
- Social: LinkedIn, Twitter
- Bio: Description, expertise
- Display: Order, visibility

### 1.5 Testimonials Management
**Purpose**: Manage testimonials from startups and mentors

**Features**:
- ✅ Add new testimonials
- ✅ Edit testimonials
- ✅ Delete testimonials
- ✅ Upload author photos
- ✅ Set testimonial visibility
- ✅ Feature testimonials on homepage
- ✅ Manage author details

**Data Fields**:
- Content: Quote/testimonial text
- Author: Name, role, company, photo
- Metadata: Date, rating (if applicable)
- Display: Featured, visibility, order

---

## 2. Authentication & Security

### 2.1 Single Admin User
**Purpose**: Secure access for one administrator

**Features**:
- ✅ Email/password login
- ✅ Secure session management
- ✅ Password reset via email
- ✅ "Remember me" functionality
- ✅ Auto-logout after inactivity
- ✅ Secure password requirements

**Security Measures**:
- JWT-based authentication
- Password hashing (bcrypt)
- CSRF protection
- Rate limiting on login attempts
- Secure HTTP-only cookies
- Environment variable for admin credentials

---

## 3. Application & Form Management

### 3.1 Startup Applications
**Purpose**: Review and manage incoming startup applications

**Features**:
- ✅ View all applications in a list
- ✅ Filter by status (pending, accepted, rejected)
- ✅ View detailed application information
- ✅ Accept applications with feedback
- ✅ Reject applications with reason
- ✅ Download submitted documents (pitch decks, business plans)
- ✅ Add internal notes
- ✅ Send automated emails on status change
- ✅ Export applications to CSV

**Data Fields**:
- Startup Info: Name, founder, contact
- Business: Description, category, stage
- Documents: Pitch deck, business plan, financials
- Status: Pending/accepted/rejected
- Timestamps: Submitted date, reviewed date
- Notes: Internal admin notes
- Communication: Email history

### 3.2 Event Registrations
**Purpose**: Manage event attendees

**Features**:
- ✅ View all registrations per event
- ✅ Filter by event
- ✅ Export attendee lists (CSV, Excel)
- ✅ Send confirmation emails
- ✅ Mark attendance (check-in)
- ✅ View registration details
- ✅ Cancel registrations if needed

**Data Fields**:
- Attendee: Name, email, phone, organization
- Event: Event name, date
- Status: Registered, attended, cancelled
- Timestamps: Registration date
- Special requirements: Dietary, accessibility

### 3.3 Contact Form Submissions
**Purpose**: Manage inquiries from website visitors

**Features**:
- ✅ View all submissions
- ✅ Filter by status (new, pending, resolved)
- ✅ Mark as read/unread
- ✅ Respond to inquiries
- ✅ Add internal notes
- ✅ Mark as resolved
- ✅ Export submissions
- ✅ Delete spam

**Data Fields**:
- Contact: Name, email, phone
- Message: Subject, content
- Status: New/pending/resolved
- Timestamps: Submitted date, resolved date
- Notes: Admin notes, response

---

## 4. Media Library

### 4.1 Asset Management
**Purpose**: Centralized media storage and management

**Features**:
- ✅ Upload images (JPG, PNG, SVG, WebP)
- ✅ Upload documents (PDF, DOCX)
- ✅ Organize files in folders
- ✅ Search and filter media
- ✅ Image preview and thumbnails
- ✅ Bulk upload
- ✅ Bulk delete
- ✅ Image optimization (auto-compress)
- ✅ Copy file URLs for use in content
- ✅ View file details (size, dimensions, upload date)

**Organization**:
- Folders: Startups, Blog, Events, Team, General
- Metadata: Filename, size, type, upload date
- Usage tracking: Where file is used

---

## 5. Notifications Dashboard

### 5.1 Activity Overview
**Purpose**: Quick view of pending items and recent activity

**Features**:
- ✅ Count of pending startup applications
- ✅ Count of unread contact submissions
- ✅ Upcoming events (next 7 days)
- ✅ Recent event registrations
- ✅ Draft blog posts count
- ✅ Recent activity log
- ✅ Quick action buttons

**Dashboard Widgets**:
- Pending Applications (count + quick link)
- Unread Messages (count + quick link)
- Upcoming Events (list)
- Recent Registrations (list)
- Draft Content (count)
- Quick Stats (total startups, total events, total blogs)

---

## 6. Technical Architecture

### 6.1 Tech Stack

**Frontend**:
- Next.js 14+ (App Router)
- TypeScript
- shadcn/ui components
- TailwindCSS (Navy/Orange theme)
- React Hook Form (form handling)
- Zod (validation)

**Backend**:
- Next.js API Routes (serverless)
- Supabase (PostgreSQL database)
- Supabase Auth (authentication)
- Supabase Storage (file storage)

**Rich Text Editor**:
- TipTap or Lexical
- Image upload support
- Markdown support
- Code syntax highlighting

**Additional Libraries**:
- React Query (data fetching)
- React Table (data tables)
- Date-fns (date formatting)
- React Dropzone (file uploads)
- React Hot Toast (notifications)

### 6.2 Database Schema

**Tables**:
1. `startups` - Startup portfolio data
2. `blog_articles` - Blog posts and articles
3. `blog_authors` - Author information
4. `events` - Event information
5. `event_speakers` - Speaker details
6. `event_registrations` - Event attendee data
7. `team_members` - Team information
8. `testimonials` - Testimonial data
9. `applications` - Startup applications
10. `contact_submissions` - Contact form data
11. `media_library` - Uploaded files metadata
12. `admin_user` - Single admin credentials

### 6.3 Security Features

**Authentication**:
- Supabase Auth with email/password
- JWT tokens with expiration
- Secure session management
- Password reset flow

**API Security**:
- Protected API routes (middleware)
- CSRF protection
- Rate limiting
- Input validation (Zod schemas)
- SQL injection prevention (Supabase RLS)

**Data Security**:
- Row Level Security (RLS) policies
- Encrypted sensitive data
- Secure file uploads (validation)
- Environment variables for secrets

---

## 7. User Interface Design

### 7.1 Layout Structure

**Sidebar Navigation**:
- Dashboard (home)
- Startups
- Blog & Articles
- Events
- Team
- Testimonials
- Applications
- Registrations
- Contact Submissions
- Media Library
- Settings
- Logout

**Top Bar**:
- SJCE-STEP logo
- Notification bell (pending items count)
- Admin profile dropdown
- Quick search

### 7.2 Design System

**Colors** (matching main website):
- Primary: Navy Blue (#000080)
- Accent: Orange (#ff6b35)
- Background: White (#ffffff)
- Text: Gray-900 (#1a1a1a)
- Borders: Gray-200 (#e5e5e5)

**Components**:
- Data tables with sorting, filtering, pagination
- Modal dialogs for create/edit forms
- Toast notifications for actions
- Loading states and skeletons
- Empty states with helpful messages
- Confirmation dialogs for destructive actions

### 7.3 Responsive Design
- Desktop-first approach
- Tablet-friendly (collapsible sidebar)
- Mobile-accessible (bottom navigation)
- Touch-friendly buttons and inputs

---

## 8. Implementation Priority

### Phase 1: Foundation (Week 1)
1. ✅ Setup Supabase project
2. ✅ Create database schema
3. ✅ Setup authentication system
4. ✅ Create admin layout and navigation
5. ✅ Build dashboard overview

### Phase 2: Core Content (Week 2)
6. ✅ Startups CRUD operations
7. ✅ Media library implementation
8. ✅ Blog/Articles CRUD operations
9. ✅ Rich text editor integration

### Phase 3: Events & Team (Week 3)
10. ✅ Events CRUD operations
11. ✅ Team management
12. ✅ Testimonials management
13. ✅ Speaker management

### Phase 4: Applications & Forms (Week 4)
14. ✅ Startup applications system
15. ✅ Event registrations management
16. ✅ Contact form submissions
17. ✅ Email notifications

### Phase 5: Polish & Testing (Week 5)
18. ✅ Notifications dashboard
19. ✅ Search and filters
20. ✅ Bulk operations
21. ✅ Testing and bug fixes
22. ✅ Documentation

---

## 9. Key Features Summary

### Must-Have Features
- ✅ Secure single admin authentication
- ✅ Full CRUD for all content types
- ✅ Rich text editor for blog posts
- ✅ Image upload and management
- ✅ Application review system
- ✅ Event registration tracking
- ✅ Contact form management
- ✅ Responsive design

### Nice-to-Have Features
- ✅ Bulk operations (delete, export)
- ✅ Search across all content
- ✅ Preview before publishing
- ✅ Duplicate content (clone)
- ✅ Activity logs
- ✅ Email templates customization
- ✅ Backup and restore

### Future Enhancements
- 📋 Version history for content
- 📋 Scheduled publishing
- 📋 Multi-language support
- 📋 Advanced analytics integration
- 📋 API access for mobile app
- 📋 Automated backups

---

## 10. Success Metrics

**Usability**:
- Admin can add a new startup in < 3 minutes
- Admin can publish a blog post in < 5 minutes
- All actions have clear feedback (success/error)
- No training required (intuitive UI)

**Performance**:
- Page load time < 2 seconds
- Image uploads < 5 seconds
- Search results instant (< 500ms)
- Responsive on all devices

**Reliability**:
- 99.9% uptime
- Auto-save for long forms
- No data loss on errors
- Graceful error handling

---

## Notes

- All timestamps in IST (Indian Standard Time)
- Currency in INR (₹)
- Date format: DD/MM/YYYY
- File size limits: Images (5MB), Documents (10MB)
- Image formats: JPG, PNG, SVG, WebP
- Document formats: PDF, DOCX
- Rich text supports: Bold, Italic, Links, Images, Lists, Headings, Code blocks
