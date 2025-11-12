'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Target, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';

export function SuccessStories() {
  const [activeStory, setActiveStory] = useState(0);

  const stories = [
    {
      id: 1,
      company: 'TechVenture AI',
      founder: 'Priya Sharma',
      founderImage: '/avatars/priya.jpg',
      industry: 'AI/ML',
      quote: 'SJCE-STEP transformed our vision into a ₹10Cr revenue reality in just 18 months',
      before: {
        revenue: '₹0',
        users: '0',
        funding: '₹0',
        team: '2'
      },
      after: {
        revenue: '₹10Cr',
        users: '50K+',
        funding: '₹5Cr',
        team: '45'
      },
      growth: {
        revenue: '∞',
        users: '50000%',
        funding: '∞',
        team: '2150%'
      },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      company: 'HealthFirst',
      founder: 'Rajesh Kumar',
      founderImage: '/avatars/rajesh.jpg',
      industry: 'HealthTech',
      quote: 'The mentorship and network access helped us scale from 0 to 100K users in 12 months',
      before: {
        revenue: '₹5L',
        users: '500',
        funding: '₹0',
        team: '3'
      },
      after: {
        revenue: '₹8Cr',
        users: '100K+',
        funding: '₹3Cr',
        team: '32'
      },
      growth: {
        revenue: '1500%',
        users: '19900%',
        funding: '∞',
        team: '967%'
      },
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      company: 'FinFlow',
      founder: 'Ananya Reddy',
      founderImage: '/avatars/ananya.jpg',
      industry: 'FinTech',
      quote: 'From idea to Series A in 24 months - SJCE-STEP made it possible',
      before: {
        revenue: '₹0',
        users: '0',
        funding: '₹0',
        team: '2'
      },
      after: {
        revenue: '₹15Cr',
        users: '200K+',
        funding: '₹12Cr',
        team: '60'
      },
      growth: {
        revenue: '∞',
        users: '200000%',
        funding: '∞',
        team: '2900%'
      },
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const currentStory = stories[activeStory];

  const metrics = [
    { icon: DollarSign, label: 'Revenue', key: 'revenue' },
    { icon: Users, label: 'Users', key: 'users' },
    { icon: TrendingUp, label: 'Funding', key: 'funding' },
    { icon: Target, label: 'Team Size', key: 'team' }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,128,0.5) 1px, transparent 0)`,
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
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border-2"
            style={{ backgroundColor: '#000080', borderColor: '#000080' }}
          >
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white uppercase tracking-wide">
              Success Stories
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            From Zero to
            <span className="block text-accent mt-2">
              Market Leaders
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real transformations. Real results. Real founders.
          </p>
        </motion.div>

        {/* Story Selector */}
        <div className="flex justify-center gap-3 mb-8">
          {stories.map((story, index) => (
            <motion.button
              key={story.id}
              onClick={() => setActiveStory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeStory === index
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-accent'
              }`}
            >
              {story.company}
            </motion.button>
          ))}
        </div>

        {/* Main Story Card */}
        <motion.div
          key={activeStory}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div 
            className="rounded-2xl p-6 md:p-8 border-2 border-gray-200 bg-white shadow-xl"
          >
            {/* Founder Info */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentStory.color} flex items-center justify-center text-white text-xl font-bold`}>
                {currentStory.founder.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{currentStory.founder}</h3>
                <p className="text-sm text-gray-600">Founder, {currentStory.company}</p>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${currentStory.color} text-white`}>
                  {currentStory.industry}
                </span>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-lg md:text-xl font-medium text-gray-900 mb-6 italic">
              "{currentStory.quote}"
            </blockquote>

            {/* Before/After Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentStory.color} flex items-center justify-center mx-auto mb-2`}>
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Label */}
                    <p className="text-xs text-gray-600 mb-3">{metric.label}</p>

                    {/* Before and After - Horizontal */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {/* Before */}
                      <div className="text-left">
                        <p className="text-xs text-gray-500">Before</p>
                        <p className="text-lg font-bold text-gray-600">
                          {currentStory.before[metric.key as keyof typeof currentStory.before]}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-4 h-4 text-accent flex-shrink-0" />

                      {/* After */}
                      <div className="text-left">
                        <p className="text-xs text-gray-500">After</p>
                        <p className="text-lg font-bold text-accent">
                          {currentStory.after[metric.key as keyof typeof currentStory.after]}
                        </p>
                      </div>
                    </div>

                    {/* Growth */}
                    <div className="mt-2">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 text-xs font-semibold">
                        ↑ {currentStory.growth[metric.key as keyof typeof currentStory.growth]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 text-sm"
              >
                Read Full Success Story
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-base">
            Join <span className="text-accent font-bold">150+ startups</span> that have achieved similar success
          </p>
        </motion.div>
      </div>
    </section>
  );
}
