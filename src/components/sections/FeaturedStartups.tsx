'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { startups } from '@/data/startups';
import { ArrowUpRight, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

export function FeaturedStartups() {
  // Show only first 3 startups (1 row)
  const featuredStartups = startups.slice(0, 3);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 0, 128, 0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full mb-6 border border-accent/20"
          >
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Startups Shaping </span>
            <span className="bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">Tomorrow</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From our incubator to market leaders - meet the innovators redefining industries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredStartups.map((startup, index) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-2 border-gray-100 hover:border-accent/40 transition-all hover:shadow-2xl overflow-hidden bg-white relative">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-8 relative z-10">
                  {/* Header with logo and category */}
                  <div className="flex items-start justify-between mb-6">
                    <motion.div 
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg"
                      whileHover={{ rotate: 5 }}
                    >
                      <span className="text-3xl font-bold bg-gradient-to-br from-accent to-orange-600 bg-clip-text text-transparent">
                        {startup.name.charAt(0)}
                      </span>
                    </motion.div>
                    <Badge className="bg-gradient-to-r from-accent/10 to-primary/10 text-accent hover:from-accent/20 hover:to-primary/20 border-0 font-semibold">
                      {startup.category}
                    </Badge>
                  </div>

                  {/* Startup info */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {startup.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-2">
                    {startup.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="group/metric">
                      <div className="text-sm text-gray-500 mb-1">Founded</div>
                      <div className="font-semibold text-gray-900 group-hover/metric:text-primary transition-colors">{startup.founded}</div>
                    </div>
                    {startup.funding && (
                      <div className="group/metric">
                        <div className="text-sm text-gray-500 mb-1">Funding</div>
                        <div className="font-semibold bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
                          {startup.funding}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Achievements */}
                  {startup.achievements && startup.achievements.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {startup.achievements.slice(0, 2).map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent to-orange-600 mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
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
                      className="inline-flex items-center gap-2 text-accent font-semibold group/link"
                      whileHover={{ x: 5 }}
                    >
                      Learn More 
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </motion.a>
                  )}
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline" className="px-8">
            <Link href="/startups">
              Explore All Startups <ArrowUpRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
