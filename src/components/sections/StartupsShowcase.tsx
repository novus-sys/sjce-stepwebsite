'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { startups } from '@/data/startups';
import { ArrowUpRight, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function StartupsShowcase() {
  const featuredStartups = startups.slice(0, 5);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 0, 128, 0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

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
            <Star className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Portfolio
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gray-900">Startups Shaping </span>
            <span className="block bg-gradient-to-r from-accent via-orange-500 to-red-500 bg-clip-text text-transparent mt-2">
              Tomorrow's World
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From our incubator to market leaders - meet the innovators redefining industries
          </p>
        </motion.div>

        {/* Horizontal Scrolling Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -2000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate startups for infinite loop */}
              {[...featuredStartups, ...featuredStartups, ...featuredStartups].map((startup, index) => (
                <motion.div
                  key={`${startup.id}-${index}`}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group flex-shrink-0 w-[400px]"
                >
                  <div className="h-full bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-accent transition-all hover:shadow-2xl relative overflow-hidden">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: '#000080' }}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <span className="text-2xl font-bold text-white">
                          {startup.name.charAt(0)}
                        </span>
                      </motion.div>
                      <Badge className="bg-accent/10 text-accent border-0 font-semibold">
                        {startup.category}
                      </Badge>
                    </div>

                    {/* Company Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {startup.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {startup.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Founded</div>
                        <div className="font-semibold text-gray-900">{startup.founded}</div>
                      </div>
                      {startup.funding && (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Funding</div>
                          <div className="font-semibold text-accent">
                            {startup.funding}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Achievements */}
                    {startup.achievements && startup.achievements.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {startup.achievements.slice(0, 2).map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span className="line-clamp-1">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    {startup.website && (
                      <motion.a
                        href={startup.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent font-semibold group/link text-sm"
                        whileHover={{ x: 5 }}
                      >
                        Learn More
                        <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5" />
            Explore All 150+ Startups
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
