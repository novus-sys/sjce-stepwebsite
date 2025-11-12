export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'demo-day' | 'workshop' | 'networking' | 'masterclass' | 'competition' | 'celebration';
  status: 'upcoming' | 'past';
  image?: string;
  speakers?: Speaker[];
  attendees?: number;
  maxAttendees?: number;
  registrationLink?: string;
  highlights?: string[];
  testimonials?: Testimonial[];
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  image?: string;
  linkedin?: string;
  bio?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  image?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Startup Demo Day Q1 2026',
    description: 'Watch 15 promising startups pitch to 50+ investors. Network with founders, VCs, and industry leaders.',
    date: '2026-01-25',
    time: '2:00 PM - 6:00 PM',
    location: 'SJCE-STEP Main Auditorium',
    type: 'demo-day',
    status: 'upcoming',
    attendees: 120,
    maxAttendees: 200,
    speakers: [
      { id: '1', name: 'Rajesh Kumar', title: 'Managing Partner', company: 'Accel India' },
      { id: '2', name: 'Priya Sharma', title: 'Angel Investor', company: 'Indian Angel Network' },
    ],
  },
  {
    id: '2',
    title: 'Product Management Masterclass',
    description: 'Learn product strategy, roadmapping, and user research from ex-Google Product Lead.',
    date: '2026-01-15',
    time: '10:00 AM - 1:00 PM',
    location: 'Virtual (Zoom)',
    type: 'masterclass',
    status: 'upcoming',
    attendees: 45,
    maxAttendees: 50,
    speakers: [
      { id: '3', name: 'Amit Patel', title: 'Ex-Product Lead', company: 'Google' },
    ],
  },
  {
    id: '3',
    title: 'Founders Networking Mixer',
    description: 'Monthly casual meetup for founders to connect, share experiences, and build relationships.',
    date: '2026-01-20',
    time: '6:00 PM - 8:00 PM',
    location: 'SJCE-STEP Lounge',
    type: 'networking',
    status: 'upcoming',
    attendees: 35,
    maxAttendees: 60,
  },
  {
    id: '4',
    title: 'Growth Hacking Workshop',
    description: 'Hands-on workshop on customer acquisition strategies, viral loops, and growth experiments.',
    date: '2026-01-18',
    time: '3:00 PM - 5:00 PM',
    location: 'SJCE-STEP Workshop Room',
    type: 'workshop',
    status: 'upcoming',
    attendees: 28,
    maxAttendees: 40,
  },
];

export const pastEvents: Event[] = [
  {
    id: '5',
    title: 'Startup Demo Day Q4 2025',
    description: 'Quarterly investor pitch event featuring 12 startups.',
    date: '2025-12-15',
    time: '2:00 PM - 6:00 PM',
    location: 'SJCE-STEP Main Auditorium',
    type: 'demo-day',
    status: 'past',
    attendees: 180,
    highlights: [
      '3 startups received funding offers',
      '50+ investors attended',
      '₹5Cr+ funding commitments',
      'Featured in local media',
    ],
    testimonials: [
      {
        id: '1',
        name: 'Rahul Mehta',
        role: 'Founder',
        company: 'TechFlow Solutions',
        rating: 5,
        comment: 'Got connected with 3 investors and closed our seed round within a month!',
      },
    ],
  },
  {
    id: '6',
    title: 'Fundraising Masterclass',
    description: 'Learn how to raise your first round from a successful VC.',
    date: '2025-12-10',
    time: '10:00 AM - 1:00 PM',
    location: 'Virtual',
    type: 'masterclass',
    status: 'past',
    attendees: 85,
    highlights: [
      'Pitch deck teardown',
      'Term sheet negotiation tips',
      'Investor psychology insights',
    ],
  },
  {
    id: '7',
    title: 'Annual Founders Summit 2025',
    description: 'Celebrating 5 years of SJCE-STEP with 200+ founders, mentors, and investors.',
    date: '2025-11-20',
    time: '9:00 AM - 6:00 PM',
    location: 'JSS Convention Center',
    type: 'celebration',
    status: 'past',
    attendees: 250,
    highlights: [
      '10 panel discussions',
      '25+ speakers',
      'Startup awards ceremony',
      'Networking dinner',
    ],
  },
];

export const featuredSpeakers: Speaker[] = [
  {
    id: '1',
    name: 'Dr. Vikram Malhotra',
    title: 'Former CTO',
    company: 'Tech Unicorn',
    bio: '25+ years in product development, built products used by millions',
  },
  {
    id: '2',
    name: 'Anjali Desai',
    title: 'Serial Entrepreneur',
    company: '3 Successful Exits',
    bio: 'Founded and exited 3 startups, total exit value $50M+',
  },
  {
    id: '3',
    name: 'Rajesh Verma',
    title: 'Managing Partner',
    company: 'Leading VC Fund',
    bio: 'Invested in 50+ startups, 5 unicorns in portfolio',
  },
  {
    id: '4',
    name: 'Priya Sharma',
    title: 'Angel Investor',
    company: 'Indian Angel Network',
    bio: 'Portfolio of 30+ startups, focus on early-stage',
  },
  {
    id: '5',
    name: 'Amit Patel',
    title: 'Ex-Product Lead',
    company: 'Google',
    bio: 'Led product teams at Google, expert in PM and growth',
  },
  {
    id: '6',
    name: 'Meera Krishnan',
    title: 'CMO',
    company: 'Fortune 500',
    bio: 'Marketing and brand building expert, 20+ years experience',
  },
];

export const eventTypes = [
  {
    id: 'demo-day',
    name: 'Demo Days',
    description: 'Quarterly investor pitch events',
    icon: 'trophy',
    color: 'accent',
    frequency: 'Quarterly',
  },
  {
    id: 'workshop',
    name: 'Workshops',
    description: 'Hands-on skill-building sessions',
    icon: 'book',
    color: 'primary',
    frequency: 'Weekly',
  },
  {
    id: 'networking',
    name: 'Networking',
    description: 'Community meetups and mixers',
    icon: 'users',
    color: 'accent',
    frequency: 'Monthly',
  },
  {
    id: 'masterclass',
    name: 'Masterclasses',
    description: 'Expert-led deep dives',
    icon: 'award',
    color: 'primary',
    frequency: 'Bi-weekly',
  },
  {
    id: 'competition',
    name: 'Competitions',
    description: 'Hackathons and pitch contests',
    icon: 'zap',
    color: 'accent',
    frequency: 'Quarterly',
  },
  {
    id: 'celebration',
    name: 'Celebrations',
    description: 'Milestone events and awards',
    icon: 'star',
    color: 'primary',
    frequency: 'Annual',
  },
];
