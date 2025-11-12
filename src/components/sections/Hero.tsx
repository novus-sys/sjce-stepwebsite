'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, Users, TrendingUp, Target, Sparkles, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-orange-50/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navy blue accent bar with animation */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% 100%' }}
      />

      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full mb-6 border border-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                India's Premier Startup Incubator
              </span>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
              <span className="bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent">
                Transforming Ideas Into
              </span>
              <span className="block bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent mt-2">
                Market Leaders
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              SJCE-STEP provides <span className="font-semibold text-primary">world-class mentorship</span>, funding, and infrastructure to help ambitious founders build <span className="font-semibold text-accent">sustainable, scalable businesses</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="text-base px-8 h-14 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all group">
                <Link href="/apply">
                  <Rocket className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Apply Now 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8 h-14 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg">
                <Link href="/programs">View Programs</Link>
              </Button>
            </div>

            {/* Trust indicators with enhanced design */}
            <motion.div 
              className="flex items-center gap-6 pt-6 border-t border-gray-200/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { value: '150+', label: 'Startups Funded' },
                { value: '₹50Cr+', label: 'Capital Raised' },
                { value: '92%', label: 'Success Rate' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-default"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  {index < 2 && <div className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-gray-200" />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Enhanced Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Target, value: '150+', label: 'Startups Incubated', color: 'from-blue-500 to-primary' },
                { icon: TrendingUp, value: '₹50Cr+', label: 'Capital Raised', color: 'from-accent to-orange-600' },
                { icon: Users, value: '200+', label: 'Expert Mentors', color: 'from-purple-500 to-primary' },
                { icon: Award, value: '92%', label: 'Success Rate', color: 'from-green-500 to-accent' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-100 hover:border-accent/30 transition-all hover:shadow-2xl group relative overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 flex items-center justify-center mb-4 transition-all`}>
                    <stat.icon className="w-7 h-7 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
