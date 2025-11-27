'use client';

import { motion } from 'framer-motion';
import { Building2, Handshake, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function PartnersNetwork() {
  const partners = [
    { name: 'CII', category: 'Industry', logo: '/images/partners/cii.png' },
    { name: 'Startup India', category: 'Government', logo: '/images/partners/startup-india.png' },
    { name: '#startupindia', category: 'Initiative', logo: '/images/partners/startupindia-hash.png' },
    { name: 'JSS STEP', category: 'Incubator', logo: '/images/partners/jss-step.png' },
    { name: 'Government of Karnataka', category: 'Government', logo: '/images/partners/govt-karnataka.png' },
    { name: 'JSS', category: 'Academic', logo: '/images/partners/jss.png' },
    { name: 'TiE Mysuru', category: 'Network', logo: '/images/partners/tie-mysuru.png' },
    { name: 'MSME', category: 'Government', logo: '/images/partners/msme.png' },
    { name: 'AIM', category: 'Government', logo: '/images/partners/aim.png' },
    { name: 'Startup Karnataka', category: 'Government', logo: '/images/partners/startup-karnataka.png' },
    { name: 'NASSCOM', category: 'Industry', logo: '/images/partners/nasscom.png' },
    { name: 'Make in India', category: 'Initiative', logo: '/images/partners/make-in-india.png' },
    { name: 'National Innovation Foundation', category: 'Foundation', logo: '/images/partners/nif.png' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border-2"
            style={{ backgroundColor: '#000080', borderColor: '#000080' }}
          >
            <Handshake className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Ecosystem Partners
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            ECOSYSTEM PARTNERS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Partnering with leading organizations, SJCE-STEP's ecosystem fosters collaboration and growth, providing startups with valuable resources and connections.
          </p>
        </motion.div>

        {/* Stats Row - Moved to top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16"
        >
          {[
            { 
              icon: TrendingUp,
              value: '50+', 
              label: 'Investor Partners', 
              description: 'VCs & Angel Networks'
            },
            { 
              icon: Building2,
              value: '30+', 
              label: 'Corporate Partners', 
              description: 'Fortune 500 Companies'
            },
            { 
              icon: Users,
              value: '20+', 
              label: 'Academic Partners', 
              description: 'Top Universities'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-accent transition-all hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#000080' }}
              >
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-900 font-semibold mb-1 text-sm">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 mb-12">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-all hover:shadow-md flex items-center justify-center aspect-square">
                <div className="w-full h-full relative group-hover:scale-105 transition-transform">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 120px, 120px"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 text-base mb-4">
            Want to partner with us?
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Become a Partner
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
