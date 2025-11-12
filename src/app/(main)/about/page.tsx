'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, Eye, TrendingUp, Users, Award, Briefcase, 
  Trophy, Shield, Star, Linkedin, ArrowRight, Building2,
  GraduationCap, Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { timeline, partners, awards } from '@/data/about';
import { fetchTeamMembersByCategory } from '@/lib/supabase';
import { useEffect, useRef, useState } from 'react';

interface TeamMember {
  id: string
  name: string
  title?: string
  role?: string
  photo_url?: string
  email?: string
  phone?: string
  linkedin_url?: string
  bio?: string
  display_order?: number
  is_visible?: boolean
}

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [advisoryMembers, setAdvisoryMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Load team members from database
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const [leadershipData, advisoryData] = await Promise.all([
          fetchTeamMembersByCategory('leadership'),
          fetchTeamMembersByCategory('advisory')
        ]);
        
        setTeamMembers(leadershipData);
        setAdvisoryMembers(advisoryData);
      } catch (error) {
        console.error('Failed to load team members:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  useEffect(() => {
    const scrollContainer = timelineRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1; // Slower speed - pixels per frame
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

    const autoScroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset to top when reaching bottom
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollTop = scrollPosition;
      requestAnimationFrame(autoScroll);
    };

    const animationId = requestAnimationFrame(autoScroll);

    // Pause on hover or touch
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(autoScroll);
    };

    const handleTouchStart = () => {
      cancelAnimationFrame(animationId);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  const metrics = [
    { value: '150+', label: 'Startups Incubated', icon: Briefcase },
    { value: '₹50Cr+', label: 'Capital Raised', icon: TrendingUp },
    { value: '200+', label: 'Expert Mentors', icon: Users },
    { value: '92%', label: 'Success Rate', icon: Award },
    { value: '10+', label: 'Years of Excellence', icon: Trophy },
    { value: '5000+', label: 'Jobs Created', icon: Building2 },
  ];

  const ecosystemElements = [
    { label: 'Mentors', icon: Users, color: 'text-accent' },
    { label: 'Investors', icon: TrendingUp, color: 'text-accent' },
    { label: 'Corporates', icon: Building2, color: 'text-accent' },
    { label: 'Government', icon: Shield, color: 'text-accent' },
    { label: 'Academia', icon: GraduationCap, color: 'text-accent' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Building India's <span className="text-accent">Innovation Future</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Empowering entrepreneurs to transform groundbreaking ideas into market-leading businesses since 2015
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey So Far
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Journey through decades of entrepreneurial excellence
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Scrollable Timeline Container */}
            <div className="relative h-[500px] md:h-[600px] overflow-hidden">
              {/* Vertical Line */}
              <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-gray-200 z-0" />

              {/* Spotlight overlay - highlights middle section */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-0 left-0 right-0 h-[150px] md:h-[200px] bg-gradient-to-b from-white to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[150px] md:h-[200px] bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Scrollable Timeline - Hidden scrollbar with auto-scroll */}
              <div 
                ref={timelineRef}
                className="h-full overflow-y-auto px-2 md:px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <div className="py-[150px] md:py-[200px]">
                  {timeline.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-150px" }}
                      transition={{ duration: 0.5 }}
                      className="relative grid grid-cols-[60px_1fr] md:grid-cols-[100px_1fr] gap-3 md:gap-8 mb-12 md:mb-16 last:mb-0"
                    >
                      {/* Year on Left */}
                      <div className="text-right pr-2 md:pr-4">
                        <motion.span 
                          className="text-xl md:text-3xl font-bold text-gray-400 transition-all duration-300"
                          whileInView={{ 
                            scale: 1.1, 
                            color: '#ff6b35',
                            fontWeight: 900
                          }}
                          viewport={{ once: false, margin: "-150px", amount: 0.5 }}
                        >
                          {event.year}
                        </motion.span>
                      </div>

                      {/* Content on Right */}
                      <div className="relative">
                        {/* Dot on timeline */}
                        <motion.div 
                          className="absolute -left-[25px] md:-left-[41px] top-2 w-2.5 h-2.5 md:w-3 md:h-3 bg-accent rounded-full border-2 md:border-4 border-white shadow-md transition-all duration-300"
                          whileInView={{ 
                            scale: 1.3,
                            backgroundColor: '#ff6b35'
                          }}
                          viewport={{ once: false, margin: "-150px", amount: 0.5 }}
                        />
                        
                        <motion.div 
                          className="bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                          whileInView={{ 
                            borderColor: '#ff6b35',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 10px 30px rgba(255, 107, 53, 0.15)'
                          }}
                          viewport={{ once: false, margin: "-150px", amount: 0.5 }}
                        >
                          <div className="flex gap-2 md:gap-4 p-3 md:p-4">
                            {/* Image on left */}
                            <div className="flex-shrink-0 w-20 h-16 md:w-32 md:h-24 bg-gray-200 rounded-lg overflow-hidden">
                              {event.image ? (
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                  <Building2 className="w-8 h-8 md:w-12 md:h-12 text-primary/30" />
                                </div>
                              )}
                            </div>
                            
                            {/* Content on right */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 mb-1 md:mb-2">
                                <span className="text-sm md:text-lg font-bold text-accent">{event.year}</span>
                                <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2">{event.title}</h3>
                              </div>
                              <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">{event.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that tell our story
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-2 border-gray-100 hover:border-accent/30 transition-all hover:shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <metric.icon className="w-7 h-7 text-accent" />
                    </div>
                    <div className="text-4xl font-bold text-accent mb-2">{metric.value}</div>
                    <div className="text-gray-600 font-medium">{metric.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the people driving our vision forward
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No team members found.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Top Row - President (1 person) */}
              {teamMembers.length > 0 && (
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-sm"
                  >
                    <Card className="border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl">
                      <CardContent className="p-8">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center mx-auto mb-6">
                          {teamMembers[0].photo_url ? (
                            <img 
                              src={teamMembers[0].photo_url} 
                              alt={teamMembers[0].name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-4xl font-bold text-primary">
                              {teamMembers[0].name.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{teamMembers[0].name}</h3>
                        {teamMembers[0].title && (
                          <p className="text-base font-semibold text-accent text-center mb-2">{teamMembers[0].title}</p>
                        )}
                        {teamMembers[0].role && (
                          <p className="text-sm font-medium text-gray-700 text-center mb-4">{teamMembers[0].role}</p>
                        )}
                        {teamMembers[0].bio && (
                          <p className="text-sm text-gray-600 text-center mb-6">{teamMembers[0].bio}</p>
                        )}
                        {teamMembers[0].linkedin_url && (
                          <div className="flex justify-center">
                            <a href={teamMembers[0].linkedin_url} target="_blank" rel="noopener noreferrer" 
                               className="text-primary hover:text-accent transition-colors">
                              <Linkedin className="w-6 h-6" />
                            </a>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              )}

              {/* Bottom Row - Other Team Members */}
              {teamMembers.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teamMembers.slice(1).map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                    >
                      <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl">
                        <CardContent className="p-6">
                          <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            {member.photo_url ? (
                              <img 
                                src={member.photo_url} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-3xl font-bold text-primary">
                                {member.name.split(' ').map((n: string) => n[0]).join('')}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{member.name}</h3>
                          {member.title && (
                            <p className="text-sm font-semibold text-accent text-center mb-2">{member.title}</p>
                          )}
                          {member.role && (
                            <p className="text-sm font-medium text-gray-700 text-center mb-3">{member.role}</p>
                          )}
                          {member.bio && (
                            <p className="text-sm text-gray-600 text-center mb-4">{member.bio}</p>
                          )}
                          {member.linkedin_url && (
                            <div className="flex justify-center">
                              <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" 
                                 className="text-primary hover:text-accent transition-colors">
                                <Linkedin className="w-5 h-5" />
                              </a>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Advisory Board
            </h2>
            <p className="text-xl text-gray-600">
              Industry experts guiding our startups
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          ) : advisoryMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No advisory board members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {advisoryMembers.map((advisor, index) => (
                <motion.div
                  key={advisor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-gray-200 hover:border-primary/30 transition-all hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        {advisor.photo_url ? (
                          <img 
                            src={advisor.photo_url} 
                            alt={advisor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-accent">
                            {advisor.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{advisor.name}</h3>
                      {advisor.title && (
                        <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0 mx-auto block w-fit mb-2">
                          {advisor.title}
                        </Badge>
                      )}
                      {advisor.role && (
                        <p className="text-sm font-medium text-gray-700 text-center mb-3">{advisor.role}</p>
                      )}
                      {advisor.bio && (
                        <p className="text-sm text-gray-600 text-center mb-4">{advisor.bio}</p>
                      )}
                      {advisor.linkedin_url && (
                        <div className="flex justify-center">
                          <a href={advisor.linkedin_url} target="_blank" rel="noopener noreferrer" 
                             className="text-primary hover:text-accent transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recognition & Awards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Recognition & Awards
            </h2>
            <p className="text-xl text-gray-600">
              Celebrating our achievements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      {award.icon === 'trophy' && <Trophy className="w-8 h-8 text-accent" />}
                      {award.icon === 'award' && <Award className="w-8 h-8 text-accent" />}
                      {award.icon === 'star' && <Star className="w-8 h-8 text-accent" />}
                      {award.icon === 'shield' && <Shield className="w-8 h-8 text-accent" />}
                    </div>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 mb-3">
                      {award.year}
                    </Badge>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{award.title}</h3>
                    <p className="text-sm text-gray-600">{award.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Ecosystem */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Ecosystem
            </h2>
            <p className="text-xl text-gray-600">
              A comprehensive support network for startup success
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                <div className="w-48 h-48 rounded-full bg-accent flex items-center justify-center mx-auto mb-12">
                  <div className="text-center">
                    <Lightbulb className="w-16 h-16 text-white mx-auto mb-2" />
                    <p className="text-white font-bold text-xl">Startups</p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {ecosystemElements.map((element, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-lg">
                      <CardContent className="p-6 text-center">
                        <element.icon className={`w-10 h-10 ${element.color} mx-auto mb-3`} />
                        <p className="font-semibold text-gray-900">{element.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Join Our Ecosystem?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Be part of India's most dynamic startup community
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-8 h-12 shadow-xl">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/10 hover:bg-white/20 text-base px-8 h-12">
                <Link href="/contact">Schedule a Visit</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
