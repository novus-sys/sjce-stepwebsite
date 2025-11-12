'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Users, Building2, Award, Globe, Zap, Target, Rocket } from 'lucide-react';

function AnimatedCounter({ 
  end, 
  duration = 2, 
  suffix = '', 
  prefix = '' 
}: { 
  end: number; 
  duration?: number; 
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function ImpactMetrics() {
  const stats = [
    {
      icon: Building2,
      value: 150,
      suffix: '+',
      label: 'Startups Incubated',
      description: 'Across 15+ industries',
      color: 'from-blue-500 via-blue-600 to-primary',
      bgColor: 'from-blue-500/20 to-primary/20'
    },
    {
      icon: TrendingUp,
      value: 50,
      suffix: 'Cr+',
      prefix: '₹',
      label: 'Capital Raised',
      description: 'By portfolio companies',
      color: 'from-accent via-orange-500 to-red-500',
      bgColor: 'from-accent/20 to-red-500/20'
    },
    {
      icon: Users,
      value: 200,
      suffix: '+',
      label: 'Expert Mentors',
      description: 'Industry veterans',
      color: 'from-purple-500 via-purple-600 to-indigo-600',
      bgColor: 'from-purple-500/20 to-indigo-600/20'
    },
    {
      icon: Award,
      value: 92,
      suffix: '%',
      label: 'Success Rate',
      description: 'Achieving product-market fit',
      color: 'from-green-500 via-emerald-500 to-teal-500',
      bgColor: 'from-green-500/20 to-teal-500/20'
    },
    {
      icon: Globe,
      value: 15,
      suffix: '+',
      label: 'Countries',
      description: 'Global market presence',
      color: 'from-cyan-500 via-sky-500 to-blue-500',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      icon: Zap,
      value: 500,
      suffix: '+',
      label: 'Jobs Created',
      description: 'Employment opportunities',
      color: 'from-yellow-500 via-amber-500 to-orange-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: Target,
      value: 25,
      suffix: 'L',
      prefix: '₹',
      label: 'Average Funding',
      description: 'Per startup',
      color: 'from-pink-500 via-rose-500 to-red-500',
      bgColor: 'from-pink-500/20 to-red-500/20'
    },
    {
      icon: Rocket,
      value: 48,
      suffix: 'hrs',
      label: 'Review Time',
      description: 'Application to response',
      color: 'from-indigo-500 via-violet-500 to-purple-500',
      bgColor: 'from-indigo-500/20 to-purple-500/20'
    }
  ];

  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border-2 border-white/30"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          >
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Our Impact
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Driving Innovation Through
            <span className="block bg-gradient-to-r from-accent via-orange-400 to-yellow-400 bg-clip-text text-transparent mt-2">
              Measurable Results
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Numbers that showcase our commitment to building successful startups
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div 
                className="relative p-4 rounded-xl border-2 border-white/20 bg-white transition-all duration-300 hover:border-accent hover:shadow-lg"
              >
                {/* Icon */}
                <motion.div
                  className="relative w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-3 mx-auto shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Value */}
                <div className="relative text-3xl md:text-4xl font-bold text-accent mb-2 text-center">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>

                {/* Label */}
                <h3 className="relative text-sm md:text-base font-semibold text-gray-900 mb-1 text-center">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="relative text-xs text-gray-600 text-center">
                  {stat.description}
                </p>
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
          className="text-center mt-8"
        >
          <p className="text-base text-gray-300 mb-3">
            Join the ranks of successful startups transforming industries
          </p>
          <motion.div
            className="inline-flex items-center gap-2 text-accent font-semibold text-sm"
            whileHover={{ x: 5 }}
          >
            <span>See all success stories</span>
            <TrendingUp className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
