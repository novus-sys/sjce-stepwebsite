export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: BlogCategory;
  author: Author;
  publishDate: string;
  lastUpdated?: string;
  readTime: number;
  image: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  views?: number;
  likes?: number;
  status: 'published' | 'draft';
}

export interface Author {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  bio?: string;
  linkedin?: string;
  twitter?: string;
}

export type BlogCategory = 
  | 'news' 
  | 'success-story' 
  | 'insights' 
  | 'guide' 
  | 'event-coverage' 
  | 'press-release';

export interface BlogStats {
  totalArticles: number;
  monthlyReaders: number;
  newsletterSubscribers: number;
  articlesPerMonth: number;
}
