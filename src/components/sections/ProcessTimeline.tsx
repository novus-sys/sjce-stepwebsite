'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Rocket, TrendingUp, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      icon: FileText,
      title: 'Apply',
      duration: '10 minutes',
      description: 'Submit your application with your startup idea and vision',
      details: [
        'Quick online application',
        'No application fee',
        'Attach pitch deck (optional)',
        '48-hour review promise'
      ],
      color: 'from-blue-500 to-cyan-500',
      timeline: 'Day 1'
    },
    {
      icon: Users,
      title: 'Assesment',
      duration: '1-2 weeks',
      description: 'Meet with our expert panel and pitch your idea',
      details: [
        'Video call with mentors',
        'Present your vision',
        'Get instant feedback',
        'Market validation insights'
      ],
      color: 'from-purple-500 to-pink-500',
      timeline: 'Week 2-3'
    },
    {
      icon: Rocket,
      title: 'Incubate',
      duration: '6-12 months',
      description: 'Get accepted and start building with our support',
      details: [
        'Dedicated workspace',
        'Weekly mentor sessions',
        'Access to funding',
        'Tech infrastructure'
      ],
      color: 'from-accent to-orange-600',
      timeline: 'Month 1-12'
    },
    {
      icon: TrendingUp,
      title: 'Scale',
      duration: 'Ongoing',
      description: 'Launch your product and grow your business',
      details: [
        'Investor introductions',
        'Go-to-market strategy',
        'Hiring support',
        'Alumni network access'
      ],
      color: 'from-green-500 to-emerald-600',
      timeline: 'Month 12+'
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 border-2"
            style={{ backgroundColor: '#000080', borderColor: '#000080' }}
          >
            <Rocket className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Your Journey
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gray-900">From Idea to </span>
            <span className="block text-accent mt-2">
              Market Success
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A proven 12-month roadmap to transform your startup vision into reality
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-7xl mx-auto">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-green-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onHoverStart={() => setActiveStep(index)}
                onHoverEnd={() => setActiveStep(null)}
                className="relative"
              >
                <motion.div
                  className="relative p-4 rounded-xl border-2 border-gray-100 bg-white hover:border-primary/30 transition-all cursor-pointer group h-full"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 shadow-lg"
                    style={{ backgroundColor: '#000080' }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <step.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-base md:text-lg font-bold mb-2 text-gray-900">
                    {step.title}
                  </h3>

                  {/* Duration */}
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">{step.duration}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <motion.div
                    className="space-y-1"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeStep === index ? 1 : 0,
                      height: activeStep === index ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-1 text-xs text-gray-600">
                        <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Hover Indicator */}
                  <motion.div
                    className="mt-2 text-xs text-gray-400"
                    animate={{
                      opacity: activeStep === index ? 0 : 1
                    }}
                  >
                    Hover for details
                  </motion.div>
                </motion.div>

                {/* Arrow for Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-gray-600 text-lg mb-6">
            Ready to start your journey?
          </p>
          <motion.a
            href="/apply"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            Begin Your Application
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          <p className="text-sm text-gray-500 mt-4">
            ⚡ Applications reviewed within 48 hours • No application fee
          </p>
        </motion.div>
      </div>
    </section>
  );
}
