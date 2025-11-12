'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, ExternalLink, Building2, Calendar, Users, 
  TrendingUp, Award, Target, Globe, Mail, Phone, MapPin
} from 'lucide-react';
import Link from 'next/link';
import { fetchStartups } from '@/lib/supabase';

interface Startup {
  id: string
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
  created_at?: string
  updated_at?: string
}

export default function StartupDetailPage() {
  const params = useParams();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadStartup = async () => {
      try {
        const startups = await fetchStartups();
        const foundStartup = startups.find(s => s.id === params.id);
        
        if (foundStartup) {
          setStartup(foundStartup);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Failed to load startup:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadStartup();
    }
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'graduated':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'exited':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getFundingColor = (stage?: string) => {
    switch (stage) {
      case 'pre-seed':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'seed':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'series-a':
      case 'series-b':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (notFound || !startup) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Startup Not Found</h1>
          <p className="text-gray-600 mb-6">The startup you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/startups">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Startups
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Button variant="outline" asChild className="mb-6">
              <Link href="/startups">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Startups
              </Link>
            </Button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Logo */}
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                {startup.logo_url ? (
                  <img 
                    src={startup.logo_url} 
                    alt={`${startup.name} logo`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <Building2 className="w-12 h-12 lg:w-16 lg:h-16 text-primary" />
                )}
              </div>

              {/* Main Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className={`${getStatusColor(startup.status || 'active')} border`}>
                    {(startup.status || 'active').toUpperCase()}
                  </Badge>
                  {startup.is_featured && (
                    <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                      ⭐ FEATURED
                    </Badge>
                  )}
                  {startup.category && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {startup.category}
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {startup.name}
                </h1>
                
                {startup.tagline && (
                  <p className="text-xl text-gray-600 mb-6 italic">
                    {startup.tagline}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {startup.website && (
                    <Button asChild size="lg">
                      <a href={startup.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-5 h-5 mr-2" />
                        Visit Website
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                  {startup.contact_email && (
                    <Button variant="outline" size="lg" asChild>
                      <a href={`mailto:${startup.contact_email}`}>
                        <Mail className="w-5 h-5 mr-2" />
                        Contact
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {startup.description && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About {startup.name}</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {startup.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Achievements */}
              {startup.achievements && startup.achievements.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Award className="w-6 h-6 mr-2 text-primary" />
                      Key Achievements
                    </h2>
                    <div className="grid gap-4">
                      {startup.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                        >
                          <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700">{achievement}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tags */}
              {startup.tags && startup.tags.length > 0 && (
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies & Focus Areas</h2>
                    <div className="flex flex-wrap gap-2">
                      {startup.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    {startup.founded_year && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Founded</p>
                          <p className="font-semibold">{startup.founded_year}</p>
                        </div>
                      </div>
                    )}

                    {(startup.team_size_min || startup.team_size_max) && (
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Team Size</p>
                          <p className="font-semibold">
                            {startup.team_size_min && startup.team_size_max 
                              ? `${startup.team_size_min}-${startup.team_size_max} people`
                              : startup.team_size_min 
                                ? `${startup.team_size_min}+ people`
                                : `${startup.team_size_max} people`
                            }
                          </p>
                        </div>
                      </div>
                    )}

                    {startup.batch && (
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Batch</p>
                          <p className="font-semibold">{startup.batch}</p>
                        </div>
                      </div>
                    )}

                    {startup.funding_stage && (
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Funding Stage</p>
                          <Badge className={`${getFundingColor(startup.funding_stage)} border mt-1`}>
                            {startup.funding_stage.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {startup.funding_amount && (
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Funding Raised</p>
                          <p className="font-semibold">₹{startup.funding_amount.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Investors */}
              {startup.investors && startup.investors.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Investors</h3>
                    <div className="space-y-2">
                      {startup.investors.map((investor, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium text-gray-900">{investor}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contact */}
              {(startup.contact_email || startup.contact_phone) && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      {startup.contact_email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <a 
                            href={`mailto:${startup.contact_email}`}
                            className="text-primary hover:underline"
                          >
                            {startup.contact_email}
                          </a>
                        </div>
                      )}
                      {startup.contact_phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <a 
                            href={`tel:${startup.contact_phone}`}
                            className="text-primary hover:underline"
                          >
                            {startup.contact_phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
