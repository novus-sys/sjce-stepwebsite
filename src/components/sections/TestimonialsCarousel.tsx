'use client';

import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from '@/data/testimonials';
import { Quote, MessageCircle, Star } from 'lucide-react';

export function TestimonialsCarousel() {

  return (
    <section className="py-24 bg-gradient-to-br from-white via-orange-50/20 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl" />

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
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Testimonials
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Voices of Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from founders who turned their vision into reality with SJCE-STEP
          </p>
        </motion.div>

        {/* Testimonials Container */}
        <div className="max-w-7xl mx-auto">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                  <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-100 hover:border-accent/40 transition-all hover:shadow-2xl group relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                      {/* Quote Icon */}
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="inline-block mb-6"
                      >
                        <Quote className="w-12 h-12 text-accent/30" />
                      </motion.div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <p className="text-gray-700 text-lg mb-8 leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                        <Avatar className="h-14 w-14 ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                          <p className="text-sm font-semibold bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tr-full" />
                  </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                150+
              </div>
              <div className="text-sm text-gray-600">Happy Founders</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
