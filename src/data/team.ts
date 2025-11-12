export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'HH Sri Sri Ravishankar',
    role: 'Chairman, SJCE-STEP',
    bio: 'Global humanitarian leader and spiritual teacher, founder of Art of Living Foundation, guiding SJCE-STEP\'s vision to nurture innovative entrepreneurs for societal transformation.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '2',
    name: 'Dr. C G Betsurmath',
    role: 'Director, SJCE-STEP',
    bio: 'Distinguished academician and visionary leader with extensive experience in engineering education and innovation, driving SJCE-STEP\'s mission to foster entrepreneurial excellence.',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '3',
    name: 'Dr. Suresh Bojraj',
    role: 'Principal, SJCE',
    bio: 'Accomplished educator and administrator with deep expertise in engineering and technology, providing strategic leadership to integrate academic excellence with entrepreneurial innovation.',
    linkedin: 'https://linkedin.com',
  },
];

export const advisors: TeamMember[] = [
  {
    id: '1',
    name: 'Vikram Malhotra',
    role: 'Technology & Innovation',
    bio: 'Former CTO of leading tech unicorn, 25+ years in product development',
  },
  {
    id: '2',
    name: 'Anjali Desai',
    role: 'Business Strategy',
    bio: 'Serial entrepreneur, founded 3 successful startups, exits totaling $50M+',
  },
  {
    id: '3',
    name: 'Prof. Suresh Iyer',
    role: 'Academic & Research',
    bio: 'Dean of Innovation at IIT, published 100+ research papers',
  },
  {
    id: '4',
    name: 'Meera Krishnan',
    role: 'Marketing & Growth',
    bio: 'Ex-CMO of Fortune 500 company, growth hacking expert',
  },
  {
    id: '5',
    name: 'Rahul Verma',
    role: 'Legal & Compliance',
    bio: 'Corporate lawyer specializing in startup law, 15+ years experience',
  },
  {
    id: '6',
    name: 'Kavita Nair',
    role: 'Finance & Funding',
    bio: 'Angel investor, portfolio of 30+ startups, former VC partner',
  },
];
