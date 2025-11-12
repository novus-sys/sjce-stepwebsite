'use client';

import { motion } from 'framer-motion';
import { Target, Users, Zap, Award, TrendingUp, Shield, Lightbulb, Briefcase } from 'lucide-react';
import { useState } from 'react';

export function WhyChooseUsV2() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Target,
      title: 'Strategic Mentorship',
      description: 'Access to 200+ industry veterans and successful entrepreneurs',
      details: [
        'One-on-one mentoring sessions',
        'Industry-specific guidance',
        'Quarterly strategy reviews',
        'Network with alumni founders'
      ],
      stats: '200+ Mentors'
    },
    {
      icon: Zap,
      title: 'Rapid Acceleration',
      description: 'Achieve product-market fit 3x faster than industry average',
      details: [
        'Proven growth frameworks',
        'Weekly milestone tracking',
        'Agile development support',
        'Market validation tools'
      ],
      stats: '3x Faster Growth'
    },
    {
      icon: Users,
      title: 'Thriving Community',
      description: 'Join a network of 150+ alumni creating collaboration opportunities',
      details: [
        'Monthly networking events',
        'Peer learning sessions',
        'Co-founder matching',
        'Alumni support network'
      ],
      stats: '150+ Alumni'
    },
    {
      icon: TrendingUp,
      title: 'Funding Access',
      description: 'Direct connections to VCs, angels, and government grants',
      details: [
        'Investor pitch training',
        'Demo day presentations',
        'Grant application support',
        'Fundraising strategy'
      ],
      stats: '₹50Cr+ Deployed'
    },
    {
      icon: Award,
      title: 'World-Class Infrastructure',
      description: 'State-of-the-art workspace, labs, and resources',
      details: [
        '24/7 workspace access',
        'Tech labs & equipment',
        'Meeting & event spaces',
        'High-speed connectivity'
      ],
      stats: '10,000 sq ft'
    },
    {
      icon: Shield,
      title: 'End-to-End Support',
      description: 'Legal, compliance, marketing, and sales expertise',
      details: [
        'Legal & IP protection',
        'Compliance guidance',
        'Marketing strategy',
        'Sales enablement'
      ],
      stats: '360° Support'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Lab',
      description: 'Access to cutting-edge technology and R&D facilities',
      details: [
        'AI/ML infrastructure',
        'Cloud credits worth ₹10L',
        'Prototyping tools',
        'Tech workshops'
      ],
      stats: '₹10L+ Credits'
    },
    {
      icon: Briefcase,
      title: 'Market Access',
      description: 'Direct connections to enterprise clients and partners',
      details: [
        'Corporate partnerships',
        'Pilot program opportunities',
        'B2B introductions',
        'Channel partnerships'
      ],
      stats: '50+ Corporates'
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,128,0.5) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border-2"
            style={{ backgroundColor: '#000080', borderColor: '#000080' }}
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Why Choose Us
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gray-900">Everything You Need to </span>
            <span className="block text-accent mt-2">
              Build & Scale
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive support system designed to transform your startup from idea to market leader
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.div
                className="h-full p-4 rounded-xl border-2 border-gray-100 bg-white relative overflow-hidden cursor-pointer hover:border-accent hover:shadow-lg transition-all"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Icon */}
                <motion.div
                  className="relative w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-3 shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 text-left group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Description - visible by default */}
                  <motion.p
                    className="text-xs text-gray-600 mb-2 text-left"
                    animate={{
                      opacity: hoveredIndex === index ? 0 : 1,
                      height: hoveredIndex === index ? 0 : 'auto'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Details - visible on hover */}
                  <motion.div
                    className="space-y-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      height: hoveredIndex === index ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Stats Badge */}
                  <motion.div
                    className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.stats}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-base mb-3">
            Ready to experience the SJCE-STEP advantage?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Schedule a Campus Tour
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
