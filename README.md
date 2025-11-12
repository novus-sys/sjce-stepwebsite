# SJCE-STEP Website

A premium, modern website for SJCE-STEP - a world-class startup incubator and accelerator. Built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Bold, Aspirational Design**: Modern UI with vibrant, professional color palette
- **Comprehensive Navigation**: Home, About, Programs, Events, News & Blogs, Startups, Team, Facilities, Apply, Contact
- **Interactive Metrics Dashboard**: Showcasing impact with animated infographics
- **Testimonials & Founder Stories**: Rotating testimonials with avatars
- **Portfolio Showcase**: Grid/list view of successful startups with filtering
- **Multi-Step Application Flow**: Intuitive onboarding process for new startups
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Modular Architecture**: Easy to extend with new features

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Form Handling**: React Hook Form + Zod

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
sjce-step-website/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── about/             # About page
│   │   ├── programs/          # Programs page
│   │   ├── apply/             # Multi-step application form
│   │   ├── contact/           # Contact page
│   │   └── ...                # Other pages
│   ├── components/
│   │   ├── layout/            # Navigation, Footer
│   │   ├── sections/          # Hero, Metrics, Testimonials, etc.
│   │   └── ui/                # shadcn/ui components
│   ├── data/                  # Mock data (ready for CMS integration)
│   ├── types/                 # TypeScript type definitions
│   ├── lib/                   # Utility functions
│   └── hooks/                 # Custom React hooks
├── public/
│   └── images/                # Static assets
└── ...
```

## 🎨 Color Palette

The website uses a vibrant, professional color scheme:

- **Primary (Electric Blue)**: `oklch(0.55 0.25 264)`
- **Secondary (Vibrant Purple)**: `oklch(0.65 0.22 300)`
- **Accent (Energetic Coral)**: `oklch(0.70 0.18 30)`
- **Chart Colors**: Teal, Lime for data visualization

## 🔧 Customization

### Adding New Content

1. **Startups**: Edit `src/data/startups.ts`
2. **Testimonials**: Edit `src/data/testimonials.ts`
3. **Programs**: Edit `src/data/programs.ts`
4. **Metrics**: Edit `src/data/metrics.ts`

### Creating New Pages

```bash
# Create a new page directory
mkdir src/app/your-page

# Add page.tsx
touch src/app/your-page/page.tsx
```

### Styling

- Global styles: `src/app/globals.css`
- Tailwind config: Uses Tailwind v4 CSS-based configuration
- Component styles: Inline with Tailwind utility classes

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
```

## 📝 Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
NODE_ENV=production
```

### For Vercel Deployment

1. Copy `.env.example` to `.env.local` and fill in your values
2. In Vercel dashboard, add the same environment variables
3. Make sure to set `NODE_ENV=production` for production deployment

## 🎯 Future Enhancements

- [ ] CMS Integration (Sanity/Contentful)
- [ ] Blog/News with MDX support
- [ ] Event calendar with RSVP functionality
- [ ] Alumni network portal
- [ ] Resources section (guides, podcasts)
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] SEO optimization

## 📄 License

This project is proprietary to SJCE-STEP.

## 🤝 Contributing

For internal development team only. Please follow the established coding standards and create feature branches for new development.

## 📞 Support

For questions or support, contact: info@sjce-step.in
