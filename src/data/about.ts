export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'government' | 'corporate' | 'investor' | 'academic';
  logo?: string;
}

export interface Award {
  id: string;
  title: string;
  year: string;
  description: string;
  icon: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: '1988',
    title: 'Foundation',
    description: 'SJCE-STEP established in the campus of JSS S&T University with support from Department of Science & Technology, Govt. of India, and IDBI',
  },
  {
    year: '1990',
    title: 'Early Operations',
    description: 'Began operations as one of the pioneering Science & Technology Entrepreneurs Parks in India',
  },
  {
    year: '1992',
    title: 'Best Science-Tech Award',
    description: 'STEP entrepreneurs bag the "Best Science-Tech Entrepreneurs Award", establishing credibility in the ecosystem',
  },
  {
    year: '1994',
    title: 'BEST STEP Award',
    description: 'Consulted the Canada-India Institutional Cooperation Project. SJCE-STEP bags best STEP Award among 14 STEPs in India',
  },
  {
    year: '1996',
    title: 'Quality Movement',
    description: 'Quality Assurance center established. Govt of Karnataka identifies SJCE-STEP as a nodal agency in bringing quality movement',
  },
  {
    year: '1998',
    title: 'Infrastructure Expansion',
    description: 'Expanded facilities and infrastructure to accommodate growing number of incubatees',
  },
  {
    year: '2000',
    title: 'Methodology Innovation',
    description: 'Developed innovative methodologies to identify and groom entrepreneurs across IT and communication domains',
  },
  {
    year: '2005',
    title: 'Industry Partnerships',
    description: 'Established strategic partnerships with leading corporations and industry bodies',
  },
  {
    year: '2010',
    title: '100+ Entrepreneurs',
    description: 'Successfully promoted 100+ entrepreneurs, marking two decades of entrepreneurial excellence',
  },
  {
    year: '2015',
    title: 'Digital Transformation',
    description: 'Launched digital initiatives and strengthened government partnerships for startup ecosystem',
  },
  {
    year: '2018',
    title: '30 Years Milestone',
    description: 'Celebrated 30 years of fostering entrepreneurship and innovation in Karnataka',
  },
  {
    year: '2020',
    title: '150+ Entrepreneurs',
    description: 'Crossed milestone of promoting 150+ entrepreneurs over three decades of excellence',
  },
  {
    year: '2022',
    title: 'Modern Programs',
    description: 'Introduced NIDHI-PRAYAS and advanced incubation programs with enhanced funding support',
  },
  {
    year: '2024',
    title: 'Continued Leadership',
    description: 'Leading startup incubation center catalyzing entrepreneurship with state-of-the-art facilities and comprehensive support',
  },
];

export const partners: Partner[] = [
  { id: '1', name: 'Karnataka Innovation & Technology Society', category: 'government' },
  { id: '2', name: 'Department of Science & Technology', category: 'government' },
  { id: '3', name: 'Startup India', category: 'government' },
  { id: '4', name: 'TCS', category: 'corporate' },
  { id: '5', name: 'Infosys', category: 'corporate' },
  { id: '6', name: 'Wipro', category: 'corporate' },
  { id: '7', name: 'Accel Partners', category: 'investor' },
  { id: '8', name: 'Sequoia Capital', category: 'investor' },
  { id: '9', name: 'Indian Angel Network', category: 'investor' },
  { id: '10', name: 'IIT Bombay', category: 'academic' },
  { id: '11', name: 'IIM Bangalore', category: 'academic' },
  { id: '12', name: 'BITS Pilani', category: 'academic' },
];

export const awards: Award[] = [
  {
    id: '1',
    title: 'Best Incubator 2023',
    year: '2023',
    description: 'Awarded by Startup India for outstanding contribution to startup ecosystem',
    icon: 'trophy',
  },
  {
    id: '2',
    title: 'Excellence in Innovation',
    year: '2022',
    description: 'Recognized by Karnataka Government for fostering innovation',
    icon: 'award',
  },
  {
    id: '3',
    title: 'Top 10 Incubators',
    year: '2023',
    description: 'Featured in YourStory\'s list of India\'s top startup incubators',
    icon: 'star',
  },
  {
    id: '4',
    title: 'ISO 9001:2015 Certified',
    year: '2021',
    description: 'Quality management certification for incubation processes',
    icon: 'shield',
  },
];
