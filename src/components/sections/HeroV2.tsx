'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Rocket, Zap, TrendingUp, Award, Sparkles, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

export function HeroV2() {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const words = ['Market Leaders', 'Success Stories', 'Industry Disruptors'];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Subtle Professional Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Elegant gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-orange-50/30" />
        
        {/* Ultra-fine grid */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,128,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,128,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating gradient orbs - very subtle */}
        <motion.div
          className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, rgba(0,0,128,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Elegant geometric accents */}
        <motion.div
          className="absolute top-32 right-32 w-32 h-32 border border-primary/10 rounded-2xl"
          animate={{
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-32 left-32 w-24 h-24 border border-accent/10"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          animate={{
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Subtle accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full border-2"
              style={{ backgroundColor: '#000080', borderColor: '#000080' }}
            >
              <Award className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white uppercase tracking-wide">
                Ranked #1 Startup Incubator in Karnataka
              </span>
            </motion.div>

            {/* Main Headline with Typing Effect */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="block text-gray-900"
                >
                  Transform Ideas Into
                </motion.span>
                
                <span className="block text-accent mt-2 min-h-[1.2em]">
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-1 h-12 md:h-16 lg:h-20 bg-accent ml-1 align-middle"
                  />
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Join <span className="text-accent font-bold">100+ funded startups</span> • 
              <span className="text-accent font-bold"> ₹20Cr+ raised</span> • 
              <span className="text-accent font-bold"> 92% success rate</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-lg font-semibold bg-accent hover:bg-accent/90 shadow-lg"
                >
                  <Link href="/apply" className="flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Apply Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Link href="/programs" className="flex items-center gap-2">
                    View Programs
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Zap, text: '48-hour review', color: 'accent' },
                { icon: TrendingUp, text: 'Up to ₹25L funding', color: 'accent' },
                { icon: Award, text: '92% success rate', color: 'primary' },
                { icon: Rocket, text: '50+ mentors', color: 'primary' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-xl bg-white border-2 border-gray-100 hover:border-primary/30 transition-all hover:shadow-lg group"
                >
                  <div className={`w-12 h-12 rounded-lg bg-${item.color}/10 flex items-center justify-center mb-3 mx-auto group-hover:bg-${item.color}/20 transition-colors`}>
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 text-center">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-8 h-12 rounded-full border-2 border-primary flex items-start justify-center p-2 group-hover:border-accent transition-colors"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full group-hover:bg-accent transition-colors"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
