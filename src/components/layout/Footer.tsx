'use client';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">
              SJCE-STEP
            </h3>
            <p className="text-background/80 mb-4">
              Empowering the next generation of innovators and entrepreneurs.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/sjce-step/" className="text-background/80 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/sjcestepmysuru" className="text-background/80 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/sjcestep/" className="text-background/80 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-background/80 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-background/80 hover:text-primary transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-background/80 hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/startups" className="text-background/80 hover:text-primary transition-colors">
                  Startups
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-background/80 hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-background/80 hover:text-primary transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/80 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-background/80 hover:text-primary transition-colors">
                  Apply
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>JSS Science & Technology University, Mysuru, Karnataka 570006</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+91 821 2548000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@sjce-step.in</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-background/80 mb-4 text-sm">
              Stay updated with our latest news and events.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} SJCE-STEP. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-background/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-background/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal" className="text-background/60 hover:text-primary transition-colors">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
