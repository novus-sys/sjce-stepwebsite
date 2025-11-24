import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}

const defaultSEO = {
  title: 'SJCE-STEP - Startup Incubation & Innovation Hub',
  description: 'SJCE-STEP is a leading startup incubation center fostering innovation and entrepreneurship. We provide mentorship, funding, and resources to transform ideas into successful businesses.',
  keywords: 'startup incubation, innovation hub, entrepreneurship, mentorship, funding, SJCE, business development, technology startups',
  image: '/images/og-image.jpg',
  url: 'https://sjce-step.com',
  type: 'website' as const,
  author: 'SJCE-STEP Team'
}

export default function SEOHead({
  title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  author = defaultSEO.author,
  publishedTime,
  modifiedTime,
  noIndex = false
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | ${defaultSEO.title}` : defaultSEO.title
  const fullUrl = url.startsWith('http') ? url : `${defaultSEO.url}${url}`
  const fullImageUrl = image.startsWith('http') ? image : `${defaultSEO.url}${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="SJCE-STEP" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@sjcestep" />
      <meta name="twitter:site" content="@sjcestep" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#1e40af" />
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SJCE-STEP",
            "description": description,
            "url": defaultSEO.url,
            "logo": `${defaultSEO.url}/images/logo.png`,
            "sameAs": [
              "https://linkedin.com/company/sjce-step",
              "https://twitter.com/sjcestep",
              "https://instagram.com/sjcestep"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "customer service",
              "availableLanguage": "English"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "JSS Science and Technology University",
              "addressLocality": "Mysuru",
              "addressRegion": "Karnataka",
              "postalCode": "570006",
              "addressCountry": "IN"
            }
          })
        }}
      />
    </Head>
  )
}
