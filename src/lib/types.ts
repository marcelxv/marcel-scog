// Core data types for the portfolio

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  bio: string;
  avatar: string;
  resume: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  proficiency: number; // 1-5 scale
  icon: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  caseStudySlug?: string;
  featured: boolean;
  company?: string;
  year: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: Date;
  updatedAt?: Date;
  categories: string[];
  readingTime: number;
  featured: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  projectId?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  testimonials: Testimonial[];
  social: SocialLink[];
}

// ID Card specific types
export interface IDCardData {
  personal: {
    name: string;
    title: string;
    location: string;
    status: 'available' | 'busy' | 'open-to-opportunities';
    avatar: string;
    qrCode: string;
  };
  badges: SkillBadge[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    resume: string;
  };
  stats: {
    experience: string;
    projects: number;
    technologies: number;
  };
}

export interface SkillBadge {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  color: string;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  external?: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Video types
export interface VideoConfig {
  id: string;
  url: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration?: string;
}

export interface VideoState {
  isModalOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
}
