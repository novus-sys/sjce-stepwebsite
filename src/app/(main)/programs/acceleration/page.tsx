'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, Clock, IndianRupee, CheckCircle2, ArrowRight,
  Target, Zap, Globe, LineChart, Handshake, Megaphone,
  Calendar, Award, Star, Quote, Percent, Users, Network
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AccelerationProgramPage() {
  const [activeTab, setActiveTab] = useState('funding');

  const successStories = [
    {
      name: 'FinTech Pro',
      founder: 'Amit Kumar',
      industry: 'FinTech',
      beforeRevenue: '₹10L/year',
      afterRevenue: '₹5Cr/year',
      funding: '₹50L from SJCE + ₹3Cr Series A',
      quote: 'The acceleration program helped us scale 50x in just 6 months. The investor connections alone were worth it.',
      image: '/placeholder.jpg',
    },
    {
      name: 'HealthTech Solutions',
      founder: 'Dr. Meera Iyer',
      industry: 'HealthTech',
      beforeRevenue: '₹15L/year',
      afterRevenue: '₹8Cr/year',
      funding: '₹1Cr from SJCE + ₹5Cr Series A',
      quote: 'SJCE-STEP accelerated our growth trajectory and connected us with the right investors at the right time.',
      image: '/placeholder.jpg',
    },
  ];

  const mentors = [
    {
      name: 'Rajesh Verma',
      expertise: 'Growth Strategy',
      company: 'Ex-VP, Fortune 500',
      sessions: '20+ sessions',
    },
    {
      name: 'Kavita Nair',
      expertise: 'Fundraising',
      company: 'VC Partner',
      sessions: '15+ sessions',
    },
    {
      name: 'Arjun Malhotra',
      expertise: 'International Expansion',
      company: 'Serial Entrepreneur',
      sessions: '18+ sessions',
    },
  ];

  const monthlyBreakdown = [
    { month: 'Month 1', title: 'Assessment', activities: ['Growth audit', 'KPI analysis', 'Strategy planning', 'Team alignment'] },
    { month: 'Month 2', title: 'Optimize', activities: ['Process improvement', 'Unit economics', 'Sales funnel', 'Product refinement'] },
    { month: 'Month 3', title: 'Scale', activities: ['Market expansion', 'Team hiring', 'Infrastructure scaling', 'Partnership deals'] },
    { month: 'Month 4', title: 'Accelerate', activities: ['Revenue growth', 'Customer acquisition', 'Brand building', 'PR campaigns'] },
    { month: 'Month 5', title: 'Prepare', activities: ['Investor deck', 'Financial modeling', 'Due diligence prep', 'Valuation analysis'] },
    { month: 'Month 6', title: 'Raise', activities: ['Investor pitches', 'Series A close', 'Term sheet negotiation', 'Exit strategy'] },
  ];

  const tabContent = {
    funding: {
      title: 'Growth Capital',
      items: [
        { label: 'Growth Funding', value: 'Up to ₹1 Crore', icon: IndianRupee },
        { label: 'Equity Stake', value: '3-7%', icon: Percent },
        { label: 'Investor Network', value: '50+ VCs & Angels', icon: Network },
        { label: 'Follow-on Support', value: 'Series A readiness', icon: TrendingUp },
      ],
    },
    partnerships: {
      title: 'Strategic Partnerships',
      items: [
        { label: 'Corporate Partners', value: '20+ companies', icon: Handshake },
        { label: 'Distribution Channels', value: 'Market access', icon: Globe },
        { label: 'Technology Partners', value: 'Integration support', icon: Zap },
        { label: 'Pilot Programs', value: 'POC opportunities', icon: Target },
      ],
    },
    growth: {
      title: 'Growth Support',
      items: [
        { label: 'Sales Strategy', value: 'Expert guidance', icon: LineChart },
        { label: 'Marketing Support', value: 'Campaign planning', icon: Megaphone },
        { label: 'PR & Media', value: 'Brand visibility', icon: Award },
        { label: 'International', value: 'Global expansion', icon: Globe },
      ],
    },
    network: {
      title: 'Network Access',
      items: [
        { label: 'Investor Intros', value: 'Warm connections', icon: Handshake },
        { label: 'Corporate Meetings', value: 'Decision makers', icon: Users },
        { label: 'Alumni Network', value: '150+ startups', icon: Network },
        { label: 'Demo Days', value: 'Quarterly events', icon: Calendar },
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
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 text-sm px-4 py-2 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Next Cohort Starts: February 2026
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Acceleration Program
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
              Scale your startup to new heights
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Duration</div>
                <div className="text-white font-bold text-lg">6 Months</div>
              </div>
              <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Funding</div>
                <div className="text-white font-bold text-lg">Up to ₹1Cr</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Equity</div>
                <div className="text-white font-bold text-lg">3-7%</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Cohort Size</div>
                <div className="text-white font-bold text-lg">10 Startups</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-10 h-14 text-lg shadow-2xl">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary text-base px-10 h-14 text-lg">
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
              { icon: Users, label: '30+ Startups Accelerated', color: 'text-accent' },
              { icon: TrendingUp, label: '₹200Cr+ Series A Raised', color: 'text-accent' },
              { icon: Award, label: '90% Funding Success', color: 'text-accent' },
              { icon: Star, label: '4.9/5 Rating', color: 'text-accent' },
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
                Rapid Growth in 6 Months
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our intensive Acceleration Program is designed for startups with proven traction ready to scale rapidly. 
                We provide growth capital, strategic partnerships, investor connections, and expert guidance to help you 
                reach Series A and beyond.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                With 30+ successful graduates raising ₹200Cr+ in Series A funding, we have the track record and network 
                to accelerate your growth trajectory.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">30+</div>
                  <div className="text-sm text-gray-600">Accelerated</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">90%</div>
                  <div className="text-sm text-gray-600">Got Funded</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">₹6Cr</div>
                  <div className="text-sm text-gray-600">Avg. Series A</div>
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
                <TrendingUp className="w-48 h-48 text-accent/20" />
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
              Everything you need to scale rapidly
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
              Your 6-Month Sprint
            </h2>
            <p className="text-xl text-gray-600">
              Intensive growth journey to Series A
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
              Startups that scaled with us
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
                        <div className="text-sm text-gray-600 mb-1">After 6 Months</div>
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
              Applications Close: January 31, 2026
            </Badge>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Scale Fast?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Join our acceleration program and reach Series A
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-10 h-14 text-lg shadow-2xl">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary text-base px-10 h-14 text-lg">
                <Link href="/contact">Schedule a Call</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
