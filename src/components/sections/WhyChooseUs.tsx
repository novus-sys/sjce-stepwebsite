'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Zap, Award, TrendingUp, Shield } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: Target,
      title: 'Strategic Mentorship',
      description: 'Access to 200+ industry veterans and successful entrepreneurs who provide personalized guidance.',
    },
    {
      icon: Zap,
      title: 'Rapid Acceleration',
      description: 'Our proven framework helps startups achieve product-market fit 3x faster than industry average.',
    },
    {
      icon: Users,
      title: 'Thriving Community',
      description: 'Join a network of 150+ alumni startups, creating endless collaboration opportunities.',
    },
    {
      icon: TrendingUp,
      title: 'Funding Access',
      description: 'Direct connections to VCs, angel investors, and government grants totaling ₹50Cr+ deployed.',
    },
    {
      icon: Award,
      title: 'World-Class Infrastructure',
      description: 'State-of-the-art workspace, labs, and resources to bring your vision to life.',
    },
    {
      icon: Shield,
      title: 'End-to-End Support',
      description: 'From legal and compliance to marketing and sales - we cover all aspects of your journey.',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50/20 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl transform -translate-y-1/2" />

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6 border border-primary/20"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Why Choose Us
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">Why Founders Choose </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">SJCE-STEP</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide everything you need to transform your startup from idea to market leader
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="h-full border-2 border-gray-100 hover:border-primary/30 transition-all hover:shadow-2xl group relative overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 relative z-10">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.div 
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all relative"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent to-orange-600 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-accent/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
