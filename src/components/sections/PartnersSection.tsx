'use client';

import { motion } from 'framer-motion';
import { Building2, Handshake } from 'lucide-react';

export function PartnersSection() {
  const partners = [
    { name: 'Partner 1', category: 'Venture Capital' },
    { name: 'Partner 2', category: 'Corporate' },
    { name: 'Partner 3', category: 'Government' },
    { name: 'Partner 4', category: 'Academic' },
    { name: 'Partner 5', category: 'Technology' },
    { name: 'Partner 6', category: 'Industry' },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6 border border-primary/20">
            <Handshake className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Our Network
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Leading <span className="text-primary">Partners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with top-tier investors, corporations, and institutions to provide unparalleled support
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100 hover:border-primary/30 transition-all hover:shadow-lg flex flex-col items-center justify-center aspect-square">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-semibold text-gray-900 text-center mb-1">
                  {partner.name}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {partner.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '50+', label: 'Investor Partners', color: 'from-blue-500 to-primary' },
            { value: '30+', label: 'Corporate Partners', color: 'from-accent to-orange-600' },
            { value: '20+', label: 'Academic Partners', color: 'from-purple-500 to-primary' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100"
            >
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
