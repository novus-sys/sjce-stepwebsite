'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wrench, Lightbulb, Users, BookOpen, ArrowRight,
  Printer, Zap, Ruler, Settings, Target, CheckCircle2,
  Calendar, Award, Star, Building2, Cog, Layers
} from 'lucide-react';
import Link from 'next/link';

export default function FacilitiesPage() {
  const programs = [
    {
      icon: Target,
      title: 'Prototype Development Support',
      description: 'Comprehensive assistance to transform your ideas into functional prototypes with expert guidance and state-of-the-art equipment.',
      features: ['Concept to prototype journey', 'Technical feasibility analysis', 'Material selection guidance', 'Testing and validation support']
    },
    {
      icon: BookOpen,
      title: 'Workshops and Training',
      description: 'Hands-on sessions to enhance your skills and knowledge in modern manufacturing and prototyping techniques.',
      features: ['3D printing workshops', 'Laser cutting training', 'Design thinking sessions', 'Technical skill development']
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'Access to industry experts and experienced mentors who guide you through your innovation journey.',
      features: ['One-on-one mentoring', 'Industry expert access', 'Technical guidance', 'Business development support']
    },
    {
      icon: Cog,
      title: 'Project Assistance',
      description: 'Comprehensive guidance and support throughout your project development lifecycle.',
      features: ['Project planning support', 'Technical troubleshooting', 'Resource allocation', 'Timeline management']
    }
  ];

  const facilities = [
    {
      icon: Printer,
      title: '3D Printers',
      description: 'Turn digital designs into tangible prototypes with our advanced 3D printing technology.',
      specs: ['Multiple material support', 'High precision printing', 'Various build volumes', 'Professional grade quality'],
      color: 'text-accent'
    },
    {
      icon: Zap,
      title: 'Laser Cutting Machines',
      description: 'Precision cutting and engraving capabilities for diverse materials and applications.',
      specs: ['Multi-material compatibility', 'High precision cutting', 'Engraving capabilities', 'Computer-controlled operation'],
      color: 'text-primary'
    },
    {
      icon: Ruler,
      title: 'Measuring Instruments',
      description: 'Accurate and reliable measurement tools for precise project development.',
      specs: ['Digital calipers', 'Precision gauges', 'Surface measurement tools', 'Quality control equipment'],
      color: 'text-accent'
    },
    {
      icon: Settings,
      title: 'Wire EDM',
      description: 'Advanced electrical discharge machining for intricate and complex components.',
      specs: ['High precision machining', 'Complex geometry capability', 'Superior surface finish', 'Tight tolerance achievement'],
      color: 'text-primary'
    }
  ];

  const stats = [
    { icon: Building2, label: '5000+ sq ft Makerspace', color: 'text-accent' },
    { icon: Wrench, label: '50+ Advanced Tools', color: 'text-accent' },
    { icon: Users, label: '200+ Projects Completed', color: 'text-accent' },
    { icon: Award, label: 'NIDHI Certified Lab', color: 'text-accent' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
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
                <Wrench className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 text-sm px-4 py-2 mb-4">
              <Award className="w-4 h-4 mr-2" />
              NIDHI Prayas Certified Lab
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Our <span className="text-accent">Facilities</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
              State-of-the-art makerspace for innovation
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Lab Space</div>
                <div className="text-white font-bold text-lg">5000+ sq ft</div>
              </div>
              <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Equipment</div>
                <div className="text-white font-bold text-lg">50+ Tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Access</div>
                <div className="text-white font-bold text-lg">24/7 Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3">
                <div className="text-white/70 text-sm mb-1">Certification</div>
                <div className="text-white font-bold text-lg">NIDHI Prayas</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-10 h-14 text-lg shadow-2xl">
                <Link href="/contact">
                  Book a Tour <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary text-base px-10 h-14 text-lg">
                <Link href="#programs">Explore Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-8 bg-gray-50 border-b-2 border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
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
                NIDHI Prayas Lab
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Where Ideas Become Reality
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our NIDHI Prayas certified makerspace is equipped with cutting-edge technology and tools 
                designed to support your innovation journey from concept to prototype. We provide comprehensive 
                facilities and expert guidance to help transform your ideas into functional prototypes.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                With over 5000 sq ft of dedicated space and 50+ advanced tools, we offer the perfect 
                environment for research, development, and prototyping across various domains.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">200+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">50+</div>
                  <div className="text-sm text-gray-600">Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-1">24/7</div>
                  <div className="text-sm text-gray-600">Access</div>
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
                <Wrench className="w-48 h-48 text-accent/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs and Services */}
      <section id="programs" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Programs and Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive support designed to guide your journey from concept to prototype
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                      <program.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                    <ul className="space-y-3">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
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

      {/* Facilities Section */}
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
              Our Equipment & Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology and tools to bring your innovations to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <facility.icon className={`w-8 h-8 ${facility.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{facility.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{facility.description}</p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      {facility.specs.map((spec, i) => (
                        <div key={i} className="flex items-start text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{spec}</span>
                        </div>
                      ))}
                    </div>
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
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 text-base px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Available for Tours & Access
            </Badge>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Visit our makerspace and explore the possibilities for your next innovation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-10 h-14 text-lg shadow-2xl">
                <Link href="/contact">
                  Schedule a Visit <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary text-base px-10 h-14 text-lg">
                <Link href="/apply">Request Access</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
