'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, Clock, IndianRupee, CheckCircle2, ArrowRight,
  Building2, Users, Briefcase, Scale, BookOpen, Network,
  Calendar, TrendingUp, Award, Target, Zap, Star, Quote, Percent
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function IncubationProgramPage() {
  const [activeTab, setActiveTab] = useState('funding');

  const successStories = [
    {
      name: 'TechFlow Solutions',
      founder: 'Rahul Mehta',
      industry: 'SaaS',
      beforeRevenue: '₹0',
      afterRevenue: '₹2.5Cr',
      funding: '₹15L from SJCE + ₹50L Series A',
      quote: 'The 12-month incubation gave us the foundation, mentorship, and network to scale from idea to revenue-generating product.',
      image: '/placeholder.jpg',
    },
    {
      name: 'GreenTech Innovations',
      founder: 'Priya Sharma',
      industry: 'CleanTech',
      beforeRevenue: 'Pre-revenue',
      afterRevenue: '₹1.8Cr',
      funding: '₹20L from SJCE + ₹1Cr Angel',
      quote: 'SJCE-STEP believed in our vision when no one else did. Their support was instrumental in our journey.',
      image: '/placeholder.jpg',
    },
  ];

  const mentors = [
    {
      name: 'Dr. Vikram Patel',
      expertise: 'Product Development',
      company: 'Ex-CTO, Tech Unicorn',
      sessions: '24+ sessions',
    },
    {
      name: 'Anjali Desai',
      expertise: 'Business Strategy',
      company: 'Serial Entrepreneur',
      sessions: '30+ sessions',
    },
    {
      name: 'Suresh Kumar',
      expertise: 'Fundraising',
      company: 'Angel Investor',
      sessions: '18+ sessions',
    },
  ];

  const monthlyBreakdown = [
    { month: 'Month 1-2', title: 'Foundation', activities: ['Workspace setup', 'Team onboarding', 'Mentor matching', 'Business model refinement'] },
    { month: 'Month 3-4', title: 'Build', activities: ['MVP development', 'Technical workshops', 'Product design sprints', 'Initial user testing'] },
    { month: 'Month 5-6', title: 'Validate', activities: ['Beta launch', 'User feedback loops', 'Market validation', 'Pivot if needed'] },
    { month: 'Month 7-8', title: 'Grow', activities: ['Customer acquisition', 'Marketing campaigns', 'Sales strategy', 'Revenue generation'] },
    { month: 'Month 9-10', title: 'Scale', activities: ['Team expansion', 'Process optimization', 'Investor prep', 'Financial modeling'] },
    { month: 'Month 11-12', title: 'Launch', activities: ['Demo Day prep', 'Investor pitches', 'Series A readiness', 'Alumni transition'] },
  ];

  const tabContent = {
    funding: {
      title: 'Funding Support',
      items: [
        { label: 'Seed Capital', value: 'Up to ₹25 Lakhs', icon: IndianRupee },
        { label: 'Equity Stake', value: '2-5%', icon: Percent },
        { label: 'Milestone-based', value: 'Released in tranches', icon: Target },
        { label: 'Additional Support', value: 'Connect to investors', icon: Network },
      ],
    },
    mentorship: {
      title: 'Mentorship Network',
      items: [
        { label: 'Dedicated Mentors', value: '3-4 per startup', icon: Users },
        { label: 'Session Frequency', value: 'Bi-weekly 1-on-1', icon: Calendar },
        { label: 'Expert Domains', value: '15+ specializations', icon: Award },
        { label: 'Total Network', value: '200+ mentors', icon: Network },
      ],
    },
    infrastructure: {
      title: 'Infrastructure & Facilities',
      items: [
        { label: 'Office Space', value: '24/7 access', icon: Building2 },
        { label: 'Meeting Rooms', value: 'Unlimited booking', icon: Users },
        { label: 'High-speed Internet', value: '1 Gbps fiber', icon: Zap },
        { label: 'Equipment', value: 'Printers, scanners, etc', icon: Briefcase },
      ],
    },
    network: {
      title: 'Network & Community',
      items: [
        { label: 'Alumni Network', value: '150+ startups', icon: Network },
        { label: 'Investor Access', value: '50+ VCs & Angels', icon: TrendingUp },
        { label: 'Corporate Partners', value: '20+ companies', icon: Briefcase },
        { label: 'Events', value: 'Monthly networking', icon: Calendar },
      ],
    },
  };

  return (
    <div className="pt-16">
      {/* Enhanced Hero */}
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-accent/20 backdrop-blur-sm flex items-center justify-center border-2 border-accent/30">
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 text-sm px-4 py-2 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Next Cohort Starts: January 2026
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Incubation Program
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
              Transform your idea into a thriving startup
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Duration</div>
                <div className="text-white font-bold text-lg">12 Months</div>
              </div>
              <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Funding</div>
                <div className="text-white font-bold text-lg">Up to ₹25L</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Equity</div>
                <div className="text-white font-bold text-lg">2-5%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Cohort Size</div>
                <div className="text-white font-bold text-lg">15 Startups</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-10 h-14 text-lg shadow-2xl">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-10 h-14 text-lg">
                <Link href="#success-stories">See Success Stories</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-8 bg-gray-50 border-b-2 border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Users, label: '50+ Startups Graduated', color: 'text-accent' },
              { icon: TrendingUp, label: '₹100Cr+ Funding Raised', color: 'text-accent' },
              { icon: Award, label: '85% Success Rate', color: 'text-accent' },
              { icon: Star, label: '4.8/5 Rating', color: 'text-accent' },
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

      {/* Overview with Visual */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0 mb-4">
                Program Overview
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your 12-Month Journey to Success
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our comprehensive Incubation Program takes you from idea to market-ready product. We provide everything 
                you need: funding, mentorship, workspace, legal support, and access to our extensive network of investors 
                and industry experts.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                With a proven track record of 50+ successful graduates and ₹100Cr+ in funding facilitated, we know what 
                it takes to build a thriving startup.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">50+</div>
                  <div className="text-sm text-gray-600">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">85%</div>
                  <div className="text-sm text-gray-600">Still Operating</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">₹2Cr</div>
                  <div className="text-sm text-gray-600">Avg. Funding</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                <Rocket className="w-48 h-48 text-accent/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabbed Benefits */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What You'll Get
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive support across all dimensions
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tabContent[tab as keyof typeof tabContent].title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-gray-200">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tabContent[activeTab as keyof typeof tabContent].items.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">{item.label}</div>
                          <div className="text-2xl font-bold text-accent">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Monthly Breakdown */}
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
              Your 12-Month Roadmap
            </h2>
            <p className="text-xl text-gray-600">
              Structured journey from idea to investment-ready
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyBreakdown.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 mb-3">
                      {phase.month}
                    </Badge>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.activities.map((activity, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real startups, real results
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{story.name}</h3>
                        <p className="text-gray-600">{story.founder} • {story.industry}</p>
                      </div>
                      <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0">
                        Graduate
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Before</div>
                        <div className="text-xl font-bold text-gray-900">{story.beforeRevenue}</div>
                      </div>
                      <div className="bg-accent/10 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">After 12 Months</div>
                        <div className="text-xl font-bold text-accent">{story.afterRevenue}</div>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-4 mb-6">
                      <div className="text-sm text-gray-600 mb-1">Total Funding</div>
                      <div className="text-lg font-bold text-primary">{story.funding}</div>
                    </div>

                    <div className="relative">
                      <Quote className="w-8 h-8 text-accent/20 absolute -top-2 -left-2" />
                      <p className="text-gray-700 italic pl-6">{story.quote}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Showcase */}
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
              Learn From The Best
            </h2>
            <p className="text-xl text-gray-600">
              Featured mentors for this program
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-accent">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{mentor.name}</h3>
                    <p className="text-sm font-semibold text-accent mb-2">{mentor.expertise}</p>
                    <p className="text-sm text-gray-600 mb-3">{mentor.company}</p>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      {mentor.sessions}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 text-base px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Applications Close: December 31, 2025
            </Badge>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Build Your Startup?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Join our next cohort and transform your idea into reality
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-10 h-14 text-lg shadow-2xl">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-10 h-14 text-lg">
                <Link href="/contact">Schedule a Call</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
