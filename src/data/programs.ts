import { Program } from '@/types';

export const programs: Program[] = [
  {
    id: '1',
    title: 'Incubation Program',
    description: 'Comprehensive 12-month program for early-stage startups to validate ideas, build MVPs, and achieve product-market fit.',
    duration: '12 months',
    type: 'incubation',
    benefits: [
      'Dedicated workspace and infrastructure',
      'Seed funding up to ₹25 lakhs',
      'One-on-one mentorship from industry experts',
      'Access to legal and accounting support',
      'Networking with investors and corporates',
      'Technical workshops and masterclasses',
    ],
    eligibility: [
      'Early-stage startup (pre-revenue or early revenue)',
      'Innovative and scalable business model',
      'Committed founding team',
      'Technology or innovation-driven solution',
    ],
  },
  {
    id: '2',
    title: 'Acceleration Program',
    description: 'Intensive 6-month program designed to rapidly scale validated startups and prepare them for Series A funding.',
    duration: '6 months',
    type: 'acceleration',
    benefits: [
      'Growth funding up to ₹1 crore',
      'Strategic partnerships and market access',
      'Investor pitch preparation and connections',
      'Advanced business development support',
      'International market expansion guidance',
      'PR and media visibility',
    ],
    eligibility: [
      'Product-market fit achieved',
      'Minimum ₹10 lakhs annual revenue',
      'Proven traction and growth metrics',
      'Clear path to profitability or scale',
    ],
  },
  {
    id: '3',
    title: 'Mentorship Program',
    description: 'Flexible mentorship-only program for startups seeking expert guidance without full incubation.',
    duration: '3-6 months',
    type: 'mentorship',
    benefits: [
      'Bi-weekly mentorship sessions',
      'Access to SJCE-STEP network',
      'Participation in demo days',
      'Workshop and event access',
      'Peer learning community',
    ],
    eligibility: [
      'Any stage startup',
      'Specific mentorship needs identified',
      'Commitment to regular engagement',
    ],
  },
];
