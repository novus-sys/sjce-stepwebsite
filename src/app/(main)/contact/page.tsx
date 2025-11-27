'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, Phone, Mail, Clock, Send, MessageSquare, 
  Headphones, Calendar, ArrowRight, Building2 
} from 'lucide-react';
import Link from 'next/link';
import { submitContactForm } from '@/lib/supabase';
import { useToast } from '@/components/ui/toast';

export default function ContactPage() {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.category || !formData.subject.trim() || !formData.message.trim()) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        subject: formData.subject,
        message: formData.message
      })

      if (result.error) {
        showToast(result.error, 'error')
      } else {
        showToast('Message sent successfully! We\'ll get back to you within 24 hours.', 'success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: '',
          subject: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      showToast('Failed to send message. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'JSS Science & Technology University',
      subContent: 'Mysuru, Karnataka 570006',
      action: 'Get Directions',
      link: '#',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 821 2548000',
      subContent: 'Mon-Fri: 9:00 AM - 6:00 PM',
      action: 'Call Now',
      link: 'tel:+918212548000',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@sjce-step.in',
      subContent: 'We reply within 24 hours',
      action: 'Send Email',
      link: 'mailto:info@sjce-step.in',
    },
  ];


  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="bg-accent/20 text-white hover:bg-accent/30 border-0 mb-6">
              Let's Connect
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Get in <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Have questions about our programs? Want to visit our campus? We're here to help you start your entrepreneurial journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <div key={index}>
                <Card className="h-full border-2 border-gray-200 hover:border-accent/30 transition-all hover:shadow-xl group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                      <method.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-lg font-semibold text-primary mb-1">{method.content}</p>
                    <p className="text-sm text-gray-600 mb-6">{method.subContent}</p>
                    <a 
                      href={method.link}
                      className="inline-flex items-center text-accent hover:text-accent/80 font-semibold transition-colors"
                    >
                      {method.action} <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Send us a Message
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <Card className="border-2 border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 font-semibold">
                          Full Name *
                        </Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
 
                          required 
                          className="h-12 border-gray-300 focus:border-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900 font-semibold">
                          Email Address *
                        </Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="vikram@example.com" 
                          required 
                          className="h-12 border-gray-300 focus:border-accent"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-900 font-semibold">
                          Phone Number
                        </Label>
                        <Input 
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210" 
                          className="h-12 border-gray-300 focus:border-accent"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-gray-900 font-semibold">
                          Inquiry Type *
                        </Label>
                        <select 
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full h-12 px-3 border border-gray-300 rounded-md focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        >
                          <option value="">Select a category</option>
                          <option value="programs">Program Information</option>
                          <option value="application">Application Process</option>
                          <option value="visit">Campus Visit</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-900 font-semibold">
                        Subject *
                      </Label>
                      <Input 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help you?" 
                        required 
                        className="h-12 border-gray-300 focus:border-accent"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-900 font-semibold">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        className="border-gray-300 focus:border-accent resize-none"
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold text-base disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side - Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Office Hours Card */}
              <Card className="border-2 border-gray-200 shadow-lg mt-8">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Monday - Friday</span>
                          <span className="text-gray-900 font-semibold">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Saturday</span>
                          <span className="text-gray-900 font-semibold">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-medium">Sunday</span>
                          <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200">Closed</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-4/5 mx-auto"
          >
            <Card className="border-2 border-gray-200 shadow-lg overflow-hidden">
              <div className="w-full h-80 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.994746706506!2d76.6125289!3d12.3161402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf7b67b7b7609b%3A0xb265f428562cf9ef!2sSJCE-STEP!5e0!3m2!1sen!2sin!4v1762950864818!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="JSS Science and Technology University Location"
                ></iframe>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Building2 className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Join India's most dynamic startup ecosystem and transform your ideas into reality
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90 text-base px-8 h-12 shadow-xl">
                <Link href="/apply">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white bg-white/10 hover:bg-white/20 text-base px-8 h-12">
                <Link href="/programs">Explore Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
