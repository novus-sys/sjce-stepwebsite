'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, Calendar, Clock, Eye, Heart, Share2, 
  User, Tag, Facebook, Twitter, Linkedin, Link as LinkIcon
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    bio?: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
  featured_image?: string
  status: 'published' | 'draft'
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      const supabase = createClient()
      
      try {
        const { data: articleData, error } = await supabase
          .from('blog_articles')
          .select(`
            *,
            blog_authors (
              name,
              bio
            )
          `)
          .eq('slug', slug)
          .eq('status', 'published')
          .single()

        if (error || !articleData) {
          console.error('Article not found:', error)
          setArticle(null)
          setLoading(false)
          return
        }

        const article: BlogPost = {
          id: articleData.id,
          title: articleData.title,
          slug: articleData.slug,
          excerpt: articleData.excerpt || '',
          content: articleData.content,
          author: {
            name: articleData.blog_authors?.name || 'Admin User',
            bio: articleData.blog_authors?.bio || ''
          },
          category: articleData.category || 'news',
          tags: articleData.tags || [],
          publishedAt: articleData.published_at || articleData.created_at,
          readTime: articleData.read_time_minutes || 5,
          featured_image: articleData.featured_image_url,
          status: 'published'
        }

        setArticle(article)

      } catch (error) {
        console.error('Failed to fetch article:', error)
        setArticle(null)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])

  const getFallbackContent = () => {
    return `
      <div class="prose prose-lg max-w-none">
        <p>This article is currently being prepared. Please check back soon for the full content.</p>
        <p>In the meantime, you can explore our other articles or contact us for more information about SJCE-STEP programs.</p>
      </div>
    `
  }

  const displayContent = article?.content && article.content.length > 100 
    ? article.content 
    : getFallbackContent()

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = article?.title || ''
    
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

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/news">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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
            <Link href="/news" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge className="bg-accent text-white">
                {article.category.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </Badge>
              <div className="flex items-center text-white/80 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} min read
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{article.author.name}</div>
                  <div className="text-white/80 text-sm">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {article.featured_image && (
                <div className="mb-8">
                  <img 
                    src={article.featured_image} 
                    alt={article.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg"
                  />
                </div>
              )}

              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: displayContent }}
              />

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    {article.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Bio */}
              {article.author.bio && (
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          About {article.author.name}
                        </h3>
                        <p className="text-gray-600">{article.author.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
