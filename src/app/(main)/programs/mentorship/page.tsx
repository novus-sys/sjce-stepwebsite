'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, Clock, CheckCircle2, ArrowRight,
  MessageCircle, Calendar, BookOpen, Network, Target, Lightbulb,
  Award, Star, Quote, TrendingUp, Zap
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function MentorshipProgramPage() {
  const [activeTab, setActiveTab] = useState('sessions');

  const successStories = [
    {
      name: 'EduTech Startup',
      founder: 'Neha Gupta',
      industry: 'EdTech',
      challenge: 'Product-market fit',
      outcome: 'Found PMF, 10x users',
      quote: 'The mentorship helped us pivot at the right time and find our true market. Invaluable guidance.',
      image: '/placeholder.jpg',
    },
    {
      name: 'AgriTech Solutions',
      founder: 'Karthik Reddy',
      industry: 'AgriTech',
      challenge: 'Go-to-market strategy',
      outcome: 'Launched in 3 states',
      quote: 'Our mentor helped us craft a GTM strategy that actually worked. We scaled faster than expected.',
      image: '/placeholder.jpg',
    },
  ];

  const mentors = [
    {
      name: 'Priya Malhotra',
      expertise: 'Product Management',
      company: 'Ex-Product Lead, Google',
      sessions: '50+ startups mentored',
    },
    {
      name: 'Sanjay Verma',
      expertise: 'Marketing & Growth',
      company: 'Growth Hacker',
      sessions: '40+ startups mentored',
    },
    {
      name: 'Anita Sharma',
      expertise: 'Operations',
      company: 'Ex-COO, Startup',
      sessions: '35+ startups mentored',
    },
  ];

  const monthlyBreakdown = [
    { month: 'Month 1', title: 'Discovery', activities: ['Goal setting', 'Mentor matching', 'Baseline assessment', 'Action plan'] },
    { month: 'Month 2', title: 'Foundation', activities: ['Core challenges', 'Strategy development', 'Skill building', 'Quick wins'] },
    { month: 'Month 3', title: 'Implementation', activities: ['Execute plans', 'Iterate & improve', 'Measure progress', 'Course correct'] },
    { month: 'Month 4', title: 'Optimization', activities: ['Refine approach', 'Scale what works', 'Build systems', 'Team alignment'] },
    { month: 'Month 5', title: 'Growth', activities: ['Expand scope', 'New initiatives', 'Partnership building', 'Network leverage'] },
    { month: 'Month 6', title: 'Graduation', activities: ['Review progress', 'Future roadmap', 'Alumni transition', 'Ongoing support'] },
  ];

  const tabContent = {
    sessions: {
      title: 'Mentorship Sessions',
      items: [
        { label: 'Frequency', value: 'Bi-weekly 1-on-1', icon: Calendar },
        { label: 'Duration', value: '60-90 minutes', icon: Clock },
        { label: 'Format', value: 'Virtual or In-person', icon: MessageCircle },
        { label: 'Flexibility', value: 'Schedule as needed', icon: Target },
      ],
    },
    network: {
      title: 'Network Access',
      items: [
        { label: 'Alumni Network', value: '150+ startups', icon: Network },
        { label: 'Mentor Pool', value: '200+ experts', icon: Users },
        { label: 'Events', value: 'Monthly meetups', icon: Calendar },
        { label: 'Community', value: 'Slack workspace', icon: MessageCircle },
      ],
    },
    learning: {
      title: 'Learning Resources',
      items: [
        { label: 'Workshops', value: 'Weekly sessions', icon: BookOpen },
        { label: 'Masterclasses', value: 'Monthly deep-dives', icon: Award },
        { label: 'Resources', value: 'Curated library', icon: Lightbulb },
        { label: 'Tools', value: 'Startup toolkit', icon: Zap },
      ],
    },
    support: {
      title: 'Additional Support',
      items: [
        { label: 'Office Hours', value: 'Weekly Q&A', icon: MessageCircle },
        { label: 'Peer Groups', value: 'Cohort learning', icon: Users },
        { label: 'Demo Days', value: 'Showcase progress', icon: TrendingUp },
        { label: 'Feedback', value: 'Regular reviews', icon: Target },
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
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 text-sm px-4 py-2 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Rolling Admissions - Apply Anytime
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Mentorship Program
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
              Expert guidance for your startup journey
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Duration</div>
                <div className="text-white font-bold text-lg">3-6 Months</div>
              </div>
              <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Stage</div>
                <div className="text-white font-bold text-lg">Any Stage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Sessions</div>
                <div className="text-white font-bold text-lg">Bi-weekly</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Mentors</div>
                <div className="text-white font-bold text-lg">200+ Experts</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-10 h-14 text-lg shadow-2xl">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-base px-10 h-14 text-lg">
                <Link href="#success-stories">See Impact</Link>
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
              { icon: Users, label: '200+ Expert Mentors', color: 'text-accent' },
              { icon: Network, label: '100+ Startups Mentored', color: 'text-accent' },
              { icon: Award, label: '15+ Domains Covered', color: 'text-accent' },
              { icon: Star, label: '4.9/5 Satisfaction', color: 'text-accent' },
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

      {/* Overview */}
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
                Personalized Guidance for Your Needs
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our flexible Mentorship Program connects you with industry experts who have been where you are. 
                Whether you need help with product, marketing, fundraising, or operations, our 200+ mentors provide 
                tailored guidance to help you overcome challenges and accelerate growth.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Perfect for startups at any stage who need expert advice without full incubation. Get the support 
                you need, when you need it.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">100+</div>
                  <div className="text-sm text-gray-600">Mentored</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">200+</div>
                  <div className="text-sm text-gray-600">Mentors</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">15+</div>
                  <div className="text-sm text-gray-600">Domains</div>
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
                <Users className="w-48 h-48 text-accent/20" />
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
              Comprehensive mentorship and community support
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
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
              Your Mentorship Journey
            </h2>
            <p className="text-xl text-gray-600">
              Structured yet flexible path to growth
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
              Impact Stories
            </h2>
            <p className="text-xl text-gray-600">
              How mentorship made a difference
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
                        Mentored
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Challenge</div>
                        <div className="text-lg font-bold text-gray-900">{story.challenge}</div>
                      </div>
                      <div className="bg-accent/10 rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-1">Outcome</div>
                        <div className="text-lg font-bold text-accent">{story.outcome}</div>
                      </div>
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
              Featured Mentors
            </h2>
            <p className="text-xl text-gray-600">
              Learn from experienced practitioners
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
              Rolling Admissions - Start Anytime
            </Badge>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Get Expert Guidance?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Connect with mentors who can help you overcome challenges
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
