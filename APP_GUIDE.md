# Marcel Portfolio App Guide

## Overview
This is a Next.js 15 portfolio website for Marcel Scognamiglio, built with TypeScript, Tailwind CSS, and MDX for content management.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with gray-matter for frontmatter
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer

## Project Structure

### Core Directories
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects/portfolio pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── about/            # About section components
│   ├── blog/             # Blog-related components
│   ├── case-study/       # Project case study components
│   ├── contact/          # Contact form components
│   ├── hero/             # Hero section components
│   ├── layout/           # Layout components (header, footer, nav)
│   ├── mdx/              # MDX rendering components
│   ├── portfolio/        # Portfolio/projects components
│   ├── skills/           # Skills section components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
└── providers/            # React context providers

content/
└── blog/                 # Blog posts in MDX format

public/
├── images/               # Static images
└── resume.pdf           # Current resume PDF
```

## Key Features

### 1. MDX Blog System
- Blog posts stored in `content/blog/`
- Frontmatter support with gray-matter
- Syntax highlighting with rehype-highlight
- Auto-generated table of contents
- Reading time estimation

### 2. Portfolio/Projects
- Case study format for detailed project showcases
- Image galleries and technical details
- Skills and technologies used

### 3. Contact System
- Contact form with server-side email handling
- Form validation with Zod
- Nodemailer integration for email sending

### 4. Theme System
- Dark/light mode support
- Theme persistence
- Tailwind CSS custom theme configuration

### 5. Performance Optimizations
- Next.js Image optimization
- Font optimization with next/font
- Static generation where possible
- React Query for data fetching and caching

## Development Workflow

### Getting Started
```bash
npm install
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Adding New Content

#### Blog Posts
1. Create new `.md` file in `content/blog/`
2. Add frontmatter:
```yaml
---
title: "Post Title"
date: "2024-01-01"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
---
```

#### Projects
1. Add project data to relevant component
2. Create case study page if needed
3. Add project images to `public/images/`

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS custom properties for theme colors

### Component Architecture
- Functional components with TypeScript
- Custom hooks for reusable logic
- Context providers for global state
- Compound component patterns where appropriate

## Configuration Files

### Next.js Configuration
- `next.config.js` - Next.js configuration
- `next-env.d.ts` - Next.js TypeScript declarations

### TypeScript
- `tsconfig.json` - TypeScript configuration
- Strict mode enabled
- Path aliases configured

### Styling
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.prettierrc` - Prettier formatting rules

### Linting
- `.eslintrc.json` - ESLint configuration
- Extends Next.js and Prettier configs

## Deployment
- Optimized for Vercel deployment
- Static assets served from `public/`
- Environment variables in `.env.local`

## Content Management
- Blog posts in Markdown/MDX format
- Static images in `public/images/`
- Resume PDF in `public/resume.pdf`
- Frontmatter for metadata

## SEO & Meta
- Comprehensive meta tags in layout
- OpenGraph and Twitter Card support
- Structured data where applicable
- Sitemap generation (if configured)

## Performance Monitoring
- React Query DevTools in development
- TypeScript strict mode for type safety
- ESLint for code quality

## Resume Management System

### Automated Content Synchronization
The project includes a comprehensive automated system that keeps your resume, website components, and PDF in perfect sync:

#### Auto-Sync Features
- **Experience Sync**: Automatically updates React timeline component when you add/modify professional experience in resume.md
- **Skills Sync**: Automatically updates skills section when you modify technical skills in resume.md  
- **Hero Content Sync**: Automatically updates years of experience, project counts, and bio text in hero section
- **Personal Info Sync**: Updates name, title, location, and email across components and metadata
- **PDF Generation**: Automatically converts resume.md to professional PDF format
- **Type Safety**: Runs TypeScript checks to ensure all updates compile correctly

#### Manual Controls
- **"Sync Resume to React Components"**: Auto-triggered on resume.md save
- **"Convert Resume to PDF"**: Manual PDF generation
- **"Sync All Resume Data"**: Complete sync of experience, skills, and PDF

### Resume Files & Scripts
- `resume.md` - Source markdown resume (edit this file)
- `public/resume.pdf` - Generated PDF resume (auto-updated)
- `scripts/convert-resume-to-pdf.js` - PDF conversion using Puppeteer
- `scripts/update-experience-component.js` - Syncs experience data to React components
- `scripts/update-skills-component.js` - Syncs skills data to React components
- `scripts/update-hero-content.js` - Syncs hero section content (years, projects, bio)
- `scripts/update-personal-info.js` - Syncs personal information across components
- `scripts/update-certifications.js` - Parses certifications and education data
- `scripts/parse-resume-data.js` - Parses structured data from markdown
- `scripts/parse-marcel-resume.js` - Specialized parser for Marcel's resume format

### Component Integration
- `src/components/about/about-section.tsx` - Professional experience timeline
- `src/app/page.tsx` - Technical skills section
- `src/components/hero/hero-section.tsx` - Hero section with bio, stats, and personal info
- `src/app/layout.tsx` - Site metadata and SEO information
- All components automatically update when resume.md changes

### Available Commands
```bash
# Sync Commands
npm run resume:sync-all          # Complete sync: all components + PDF
npm run resume:sync-experience   # Sync experience data only  
npm run resume:sync-skills       # Sync skills data only
npm run resume:sync-hero         # Sync hero content (years, projects, bio)
npm run resume:sync-personal     # Sync personal info (name, title, location, email)
npm run resume:sync-certifications # Parse certifications and education data
npm run resume:build             # Generate PDF only

# Monitoring Commands
npm run resume:monitor           # Check what would change if sync runs
npm run resume:dashboard         # Show comprehensive sync status and available tools
```

### Agent Hooks Configuration
- `.kiro/hooks/sync-resume-to-components.json` - Auto-sync on file save
- `.kiro/hooks/resume-pdf-converter.json` - PDF auto-conversion
- `.kiro/hooks/manual-sync-all-resume-data.json` - Manual complete sync
- `.kiro/hooks/manual-resume-converter.json` - Manual PDF conversion
- `.kiro/hooks/sync-personal-info.json` - Personal information sync
- `.kiro/hooks/monitor-resume-sync.json` - Check sync status without changes

### Monitoring & Debugging
The system includes comprehensive monitoring tools to track automatic updates:

- **Dashboard**: `npm run resume:dashboard` - Shows file status, component sync status, and available tools
- **Monitor**: `npm run resume:monitor` - Previews what changes would be made without applying them
- **Agent Hook**: "Monitor Resume Sync Status" - Check sync status through the UI

**Example Monitoring Output:**
```
📊 CURRENT RESUME DATA:
   • Years of experience: 7+
   • Total projects: 100+
   • Total technologies: 27+

🔄 CHANGES THAT WOULD BE MADE:
   ✏️  Bio years of experience: 5+ → 7+
   ✏️  Hero stats projects: 30+ → 100+
```

The system uses intelligent parsing to extract structured data from your markdown resume and automatically update the corresponding React components, ensuring your website always reflects your latest professional information.

## Future Enhancements
- CMS integration for easier content management
- Analytics integration
- Newsletter subscription
- Search functionality for blog posts
- RSS feed generation