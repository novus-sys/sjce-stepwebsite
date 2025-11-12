'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export function InsightsSection() {
  const insights = [
    {
      category: 'Insights',
      readTime: '5 min read',
      title: '10 Lessons from India\'s Top Startup Founders',
      description: 'Key insights from founders who scaled from zero to unicorn status in less than 5 years.',
      author: 'Dr. Rajesh Kumar',
      date: 'Dec 15, 2024',
    },
    {
      category: 'Funding',
      readTime: '8 min read',
      title: 'Funding Landscape 2025: What Startups Need to Know',
      description: 'Navigate the changing investment climate with strategies from seasoned VCs and angel investors.',
      author: 'Ananya Iyer',
      date: 'Dec 12, 2024',
    },
    {
      category: 'Product',
      readTime: '6 min read',
      title: 'Building MVP: From Concept to Launch in 90 Days',
      description: 'A practical framework for lean product development that top accelerator startups follow.',
      author: 'Vikram Singh',
      date: 'Dec 10, 2024',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Insights & Thought Leadership
            </h2>
            <p className="text-lg text-gray-600">
              Expert perspectives on building, scaling, and funding startups.
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link href="/news">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all border-gray-200 bg-white group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0">
                      {insight.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {insight.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {insight.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {insight.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">By {insight.author}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {insight.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8 md:hidden"
        >
          <Button asChild variant="outline">
            <Link href="/news">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
