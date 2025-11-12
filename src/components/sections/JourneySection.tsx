'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react';

export function JourneySection() {
  const steps = [
    {
      icon: FileText,
      title: 'Apply',
      description: 'Submit your application with your startup idea and vision',
      details: ['Quick 10-minute application', 'No application fee', '48-hour review process'],
      color: 'from-blue-500 to-primary'
    },
    {
      icon: Users,
      title: 'Interview',
      description: 'Meet with our expert panel and pitch your idea',
      details: ['One-on-one mentorship session', 'Feedback from industry experts', 'Market validation insights'],
      color: 'from-purple-500 to-primary'
    },
    {
      icon: Rocket,
      title: 'Incubate',
      description: 'Get accepted and start building with our support',
      details: ['6-12 month program', 'Dedicated workspace', 'Access to resources & funding'],
      color: 'from-accent to-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'Scale',
      description: 'Launch your product and grow your business',
      details: ['Investor connections', 'Go-to-market strategy', 'Continued mentorship'],
      color: 'from-green-500 to-accent'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Journey to <span className="text-primary">Success</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A proven 4-step process that has helped 150+ startups go from idea to market leader
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary transform -translate-y-1/2" 
               style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {index + 1}
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 pt-12 border-2 border-gray-100 hover:border-primary/30 transition-all hover:shadow-2xl group relative overflow-hidden h-full"
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 flex items-center justify-center mb-6 mx-auto transition-all`}>
                    <step.icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold mb-3 text-center bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-3">
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent" />
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
          className="text-center mt-16"
        >
          <p className="text-gray-600 text-lg mb-6">
            Ready to start your journey?
          </p>
          <motion.a
            href="/apply"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Begin Your Application
            <Rocket className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
