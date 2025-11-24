'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Rocket, TrendingUp, Users, Clock, ArrowRight, 
  Target, Lightbulb, Award, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';

export default function ProgramsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure cards are visible after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const programs = [
    {
      id: 'incubation',
      icon: Rocket,
      title: 'Incubation Program',
      tagline: 'Transform your idea into a thriving startup',
      duration: '12 months',
      funding: 'Up to ₹25 Lakhs',
      stage: 'Early Stage',
      highlights: [
        'Dedicated workspace & infrastructure',
        'Seed funding support',
        'Expert mentorship network',
        'Legal & accounting assistance',
      ],
      color: 'accent',
    },
    {
      id: 'acceleration',
      icon: TrendingUp,
      title: 'Acceleration Program',
      tagline: 'Scale your startup to new heights',
      duration: '6 months',
      funding: 'Up to ₹1 Crore',
      stage: 'Growth Stage',
      highlights: [
        'Growth capital access',
        'Strategic partnerships',
        'Investor connections',
        'International expansion support',
      ],
      color: 'primary',
    },
    {
      id: 'mentorship',
      icon: Users,
      title: 'Mentorship Program',
      tagline: 'Expert guidance for your startup journey',
      duration: '3-6 months',
      funding: 'No funding',
      stage: 'Any Stage',
      highlights: [
        'Bi-weekly mentorship sessions',
        'Network access',
        'Workshop participation',
        'Peer learning community',
      ],
      color: 'accent',
    },
  ];

  const whyChoose = [
    {
      icon: Target,
      title: 'Tailored Support',
      description: 'Programs designed for every stage of your startup journey',
    },
    {
      icon: Award,
      title: '35+ Years Legacy',
      description: 'One of India\'s oldest and most respected incubators',
    },
    {
      icon: Lightbulb,
      title: 'Proven Track Record',
      description: '150+ startups incubated with ₹50Cr+ funding facilitated',
    },
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
              Our <span className="text-accent">Programs</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Choose the right path for your startup journey - from ideation to scale
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the right path for your startup journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {programs.map((program, index) => (
              <div key={program.id}>
                <Card className="h-full border-2 border-gray-200 hover:border-accent/50 transition-all hover:shadow-2xl group">
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <program.icon className="w-8 h-8 text-accent" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h2>
                    <p className="text-gray-600 mb-6">{program.tagline}</p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {program.duration}
                      </Badge>
                      <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0">
                        {program.stage}
                      </Badge>
                    </div>

                    {/* Funding */}
                    {program.funding !== 'No funding' && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Funding Support</p>
                        <p className="text-xl font-bold text-accent">{program.funding}</p>
                      </div>
                    )}

                    {/* Highlights */}
                    <ul className="space-y-3 mb-8">
                      {program.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button asChild className="w-full bg-accent hover:bg-accent/90">
                      <Link href={`/programs/${program.id}`}>
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
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
              Why Choose Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join India's premier startup ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyChoose.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
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
              Numbers that speak for themselves
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: '150+', label: 'Startups Supported' },
              { value: '₹50Cr+', label: 'Funding Facilitated' },
              { value: '92%', label: 'Success Rate' },
              { value: '5000+', label: 'Jobs Created' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-2 border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Not Sure Which Program Fits You?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Our team is here to help you choose the right path for your startup
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-8 h-12">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/10 hover:bg-white/20 text-base px-8 h-12">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
