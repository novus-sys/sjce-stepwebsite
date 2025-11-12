// Core types for SJCE-STEP website

export interface Startup {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  category: string;
  founded: string;
  website?: string;
  funding?: string;
  fundingStage?: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'bootstrapped';
  teamSize?: string;
  status: 'active' | 'graduated' | 'alumni';
  batch?: string;
  achievements?: string[];
  tags?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'incubation' | 'acceleration' | 'mentorship';
  benefits: string[];
  eligibility: string[];
  image?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'networking' | 'pitch' | 'seminar';
  image?: string;
  registrationLink?: string;
  capacity?: number;
  registered?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  publishedAt: string;
  category: string;
  tags: string[];
  image: string;
  readTime: number;
}

export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating?: number;
}

export interface Metric {
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  category: 'corporate' | 'academic' | 'government' | 'investor';
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  images: string[];
  capacity?: string;
  amenities: string[];
}

export interface ApplicationStep {
  step: number;
  title: string;
  description: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'file' | 'date';
  required: boolean;
  options?: string[];
  placeholder?: string;
}
