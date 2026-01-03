'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone, Linkedin, Facebook, Instagram, ArrowRight, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-700">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section - Takes more space */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <img 
                src="/SJCE-STEP Logo.png" 
                alt="SJCE-STEP Logo" 
                className="h-16 w-auto mb-4 brightness-110"
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-sm text-[15px]">
              Science & Technology Entrepreneurs Park at JSS Science & Technology University, fostering innovation and entrepreneurship in Karnataka.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/company/sjce-step/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-gray-800/80 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-blue-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.facebook.com/sjcestepmysuru" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-gray-800/80 hover:bg-blue-500 flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-blue-500"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/sjcestep/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-gray-800/80 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 group border border-gray-700 hover:border-pink-600"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-base mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]">
                  <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]">
                  <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]">
                  <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Events
                </Link>
              </li>
              <li>
                <Link href="/startups" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]">
                  <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Startups
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]">
                  <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Facilities
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-base mb-6 tracking-wide">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]">
                  <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  News & Blogs
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]">
                  <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]">
                  <ArrowRight className="h-3.5 w-3.5 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Contact Us
                </Link>
              </li>
              <li>
                <a 
                  href="https://jssstuniv.in/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  JSS STU
                </a>
              </li>
              <li>
                <a 
                  href="https://jssonline.org/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors inline-flex items-center group text-[15px]"
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-2" />
                  JSS MVP
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-base mb-6 tracking-wide">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="w-11 h-11 rounded-lg bg-gray-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors border border-gray-700">
                  <MapPin className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-gray-300 text-[15px] leading-relaxed">
                    JSS Science & Technology University<br />
                    Mysuru, Karnataka 570006<br />
                    India
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-11 h-11 rounded-lg bg-gray-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors border border-gray-700">
                  <Phone className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <a href="tel:+918212548000" className="text-gray-300 hover:text-white transition-colors text-[15px]">
                    +91 821 2548000
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="w-11 h-11 rounded-lg bg-gray-800/80 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors border border-gray-700">
                  <Mail className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <a href="mailto:info@sjce-step.in" className="text-gray-300 hover:text-white transition-colors text-[15px]">
                    info@sjce-step.in
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50"></div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SJCE-STEP. All rights reserved.
            </p>
            <span className="hidden md:inline text-gray-600">|</span>
            <a 
              href="https://www.linkedin.com/company/novus-webspace-technologies/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors text-sm group inline-flex items-center"
            >
              Designed & Developed by <span className="ml-1 font-semibold text-gray-300 group-hover:text-white">Novus Webspace Technologies</span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
