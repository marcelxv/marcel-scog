export interface CaseStudySection {
  title: string;
  content: string;
  images?: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  problem: CaseStudySection;
  solution: CaseStudySection;
  results: CaseStudySection;
  technologies: {
    name: string;
    icon: string;
    description: string;
  }[];
  metrics: ProjectMetric[];
  testimonials: {
    id: string;
    content: string;
    author: string;
    position: string;
    company: string;
    avatar?: string;
  }[];
  gallery: {
    url: string;
    caption: string;
    alt: string;
  }[];
  timeline: {
    phase: string;
    duration: string;
    description: string;
  }[];
  challenges: string[];
  learnings: string[];
  nextSteps?: string[];
}

// Helper function to generate placeholder images
const getPlaceholderImage = (
  width: number = 800,
  height: number = 600,
  seed: string
) => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

export const mockCaseStudies: CaseStudy[] = [
  {
    slug: 'foodready-automation',
    title: 'AI-Powered Food Safety Automation',
    subtitle: 'Building regulatory compliance automation for food safety SaaS',
    heroImage: getPlaceholderImage(1200, 600, 'foodsafety-hero'),
    overview:
      'Built AI-powered automation agents for regulatory compliance in food safety SaaS, featuring workflow orchestration with Orkes/Conductor, real-time notifications with Novu, and event-driven architecture using AWS Lambda and EventBridge.',
    problem: {
      title: 'The Challenge',
      content:
        'FoodReady needed to modernize their regulatory compliance system for food safety. The existing cron-based system was unreliable, difficult to scale, and lacked real-time capabilities. Key challenges included: manual compliance processes, lack of automation, poor notification systems, and difficulty integrating with existing MongoDB infrastructure while maintaining data consistency.',
      images: [
        getPlaceholderImage(600, 400, 'foodsafety-problem1'),
        getPlaceholderImage(600, 400, 'foodsafety-problem2'),
      ],
    },
    solution: {
      title: 'The Solution',
      content:
        'I built AI-powered automation agents using Orkes/Conductor for workflow orchestration and Novu for real-time notifications. Migrated from cron-based systems to event-driven architecture using AWS Lambda, EventBridge, and PostgreSQL. Led database migration from MongoDB to PostgreSQL and replaced third-party auth service with a secure, proprietary solution integrated across applications.',
      images: [
        getPlaceholderImage(600, 400, 'foodsafety-solution1'),
        getPlaceholderImage(600, 400, 'foodsafety-solution2'),
        getPlaceholderImage(600, 400, 'foodsafety-solution3'),
      ],
    },
    results: {
      title: 'The Results',
      content:
        'The new automation system dramatically improved regulatory compliance efficiency, with 80% reduction in manual processes, 95% improvement in notification delivery reliability, and seamless integration across applications. The event-driven architecture provided better scalability and the PostgreSQL migration improved data consistency and performance across large-scale operations.',
      images: [
        getPlaceholderImage(600, 400, 'foodsafety-results1'),
        getPlaceholderImage(600, 400, 'foodsafety-results2'),
      ],
    },
    technologies: [
      {
        name: 'Orkes/Conductor',
        icon: 'conductor',
        description:
          'Workflow orchestration platform for complex business processes',
      },
      {
        name: 'Novu',
        icon: 'novu',
        description:
          'Real-time notification infrastructure for multi-channel messaging',
      },
      {
        name: 'AWS Lambda',
        icon: 'aws',
        description: 'Serverless compute service for event-driven architecture',
      },
      {
        name: 'EventBridge',
        icon: 'eventbridge',
        description: 'Event bus service for decoupled application architecture',
      },
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        description: 'Robust relational database for improved data consistency',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        description: 'Type-safe JavaScript for better development experience',
      },
    ],
    metrics: [
      {
        label: 'Manual Process Reduction',
        value: '80%',
        description: 'AI automation eliminated most manual compliance tasks',
      },
      {
        label: 'Notification Reliability',
        value: '95%',
        description: 'Real-time notification system improved delivery rates',
      },
      {
        label: 'Database Performance',
        value: '60%',
        description: 'PostgreSQL migration improved query performance',
      },
      {
        label: 'System Scalability',
        value: '300%',
        description: 'Event-driven architecture improved system capacity',
      },
    ],
    testimonials: [
      {
        id: '1',
        content:
          'Marcel transformed our regulatory compliance system with innovative AI automation. His expertise in event-driven architecture and database migration significantly improved our operational efficiency and scalability.',
        author: 'Product Team',
        position: 'Engineering Leadership',
        company: 'FoodReady',
        avatar: getPlaceholderImage(100, 100, 'foodready'),
      },
    ],
    gallery: [
      {
        url: getPlaceholderImage(800, 600, 'gallery1'),
        caption: 'Homepage with featured products and modern design',
        alt: 'E-commerce homepage screenshot',
      },
      {
        url: getPlaceholderImage(800, 600, 'gallery2'),
        caption: 'Product detail page with interactive features',
        alt: 'Product detail page screenshot',
      },
      {
        url: getPlaceholderImage(800, 600, 'gallery3'),
        caption: 'Shopping cart and checkout process',
        alt: 'Shopping cart screenshot',
      },
      {
        url: getPlaceholderImage(800, 600, 'gallery4'),
        caption: 'Admin dashboard with analytics and inventory management',
        alt: 'Admin dashboard screenshot',
      },
    ],
    timeline: [
      {
        phase: 'Discovery & Planning',
        duration: '2 weeks',
        description:
          'Requirements gathering, user research, and technical architecture planning',
      },
      {
        phase: 'Design & Prototyping',
        duration: '3 weeks',
        description: 'UI/UX design, wireframing, and interactive prototypes',
      },
      {
        phase: 'Development',
        duration: '8 weeks',
        description:
          'Frontend and backend development, API integration, and testing',
      },
      {
        phase: 'Testing & Deployment',
        duration: '2 weeks',
        description:
          'Quality assurance, performance optimization, and production deployment',
      },
    ],
    challenges: [
      'Integrating multiple payment gateways while maintaining security standards',
      'Implementing real-time inventory synchronization across multiple sales channels',
      'Optimizing database queries for high-traffic scenarios',
      'Creating a responsive design that works seamlessly across all devices',
    ],
    learnings: [
      'The importance of performance optimization in e-commerce applications',
      'How real-time features can significantly improve user experience',
      'The value of comprehensive analytics in driving business decisions',
      'Best practices for secure payment processing and data handling',
    ],
    nextSteps: [
      'Implement AI-powered product recommendations',
      'Add multi-language and multi-currency support',
      'Integrate with additional marketing automation tools',
      'Develop a mobile app companion',
    ],
  },
  {
    slug: 'ai-content-generator',
    title: 'AI Content Generator',
    subtitle: 'Empowering marketers with AI-powered content creation',
    heroImage: getPlaceholderImage(1200, 600, 'ai-hero'),
    overview:
      'An innovative AI-powered content generation platform that helps marketers create engaging copy, social media posts, and blog articles using advanced language models.',
    problem: {
      title: 'The Challenge',
      content:
        "StartupXYZ's marketing team was struggling with content creation bottlenecks. They needed to produce high-quality content at scale but lacked the resources and time. Manual content creation was slow, inconsistent, and expensive. The team needed a solution that could generate various types of marketing content while maintaining brand voice and quality.",
      images: [
        getPlaceholderImage(600, 400, 'ai-problem1'),
        getPlaceholderImage(600, 400, 'ai-problem2'),
      ],
    },
    solution: {
      title: 'The Solution',
      content:
        "I developed an AI-powered content generation platform using Python, FastAPI, and OpenAI's GPT models. The solution included customizable templates, brand voice training, content optimization suggestions, and a collaborative workflow system. The platform could generate various content types including blog posts, social media content, email campaigns, and ad copy.",
      images: [
        getPlaceholderImage(600, 400, 'ai-solution1'),
        getPlaceholderImage(600, 400, 'ai-solution2'),
        getPlaceholderImage(600, 400, 'ai-solution3'),
      ],
    },
    results: {
      title: 'The Results',
      content:
        'The platform revolutionized the content creation process, reducing content production time by 75% while maintaining high quality. The marketing team could now produce 10x more content with the same resources. Content engagement rates improved by 35% due to AI-optimized messaging and personalization.',
      images: [
        getPlaceholderImage(600, 400, 'ai-results1'),
        getPlaceholderImage(600, 400, 'ai-results2'),
      ],
    },
    technologies: [
      {
        name: 'Python',
        icon: 'python',
        description: 'Backend development and AI model integration',
      },
      {
        name: 'FastAPI',
        icon: 'fastapi',
        description: 'High-performance API framework for Python',
      },
      {
        name: 'OpenAI API',
        icon: 'openai',
        description: 'Advanced language models for content generation',
      },
      {
        name: 'React',
        icon: 'react',
        description: 'Interactive frontend for content creation and management',
      },
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        description: 'Data storage for content templates and user data',
      },
      {
        name: 'Docker',
        icon: 'docker',
        description: 'Containerization for scalable deployment',
      },
    ],
    metrics: [
      {
        label: 'Content Production Speed',
        value: '75%',
        description: 'Faster content creation with AI assistance',
      },
      {
        label: 'Content Volume Increase',
        value: '10x',
        description: 'More content produced with same resources',
      },
      {
        label: 'Engagement Rate Improvement',
        value: '35%',
        description: 'AI-optimized content performed better',
      },
      {
        label: 'Cost Reduction',
        value: '50%',
        description: 'Reduced content creation costs significantly',
      },
    ],
    testimonials: [
      {
        id: '1',
        content:
          "The AI content generator has transformed our marketing workflow. We can now create high-quality content at scale while maintaining our brand voice. It's been a game-changer for our team.",
        author: 'Michael Chen',
        position: 'Marketing Director',
        company: 'StartupXYZ',
        avatar: getPlaceholderImage(100, 100, 'michael'),
      },
    ],
    gallery: [
      {
        url: getPlaceholderImage(800, 600, 'ai-gallery1'),
        caption: 'Content generation interface with AI suggestions',
        alt: 'AI content generator interface',
      },
      {
        url: getPlaceholderImage(800, 600, 'ai-gallery2'),
        caption: 'Template library with customizable options',
        alt: 'Content template library',
      },
      {
        url: getPlaceholderImage(800, 600, 'ai-gallery3'),
        caption: 'Analytics dashboard showing content performance',
        alt: 'Content analytics dashboard',
      },
    ],
    timeline: [
      {
        phase: 'Research & Planning',
        duration: '3 weeks',
        description:
          'AI model evaluation, requirements analysis, and architecture design',
      },
      {
        phase: 'MVP Development',
        duration: '6 weeks',
        description:
          'Core AI integration, basic UI, and content generation features',
      },
      {
        phase: 'Feature Enhancement',
        duration: '4 weeks',
        description:
          'Advanced templates, brand voice training, and collaboration tools',
      },
      {
        phase: 'Testing & Launch',
        duration: '2 weeks',
        description:
          'User testing, performance optimization, and production deployment',
      },
    ],
    challenges: [
      'Integrating and optimizing AI models for consistent content quality',
      'Implementing brand voice training and customization features',
      'Handling API rate limits and cost optimization for AI services',
      'Creating an intuitive interface for non-technical users',
    ],
    learnings: [
      'The importance of prompt engineering for consistent AI outputs',
      'How to balance AI automation with human creativity and oversight',
      'Strategies for cost-effective AI API usage at scale',
      'The value of user feedback in improving AI-generated content quality',
    ],
  },
  {
    slug: 'learning-management-system',
    title: 'Learning Management System',
    subtitle: 'Revolutionizing online education with modern technology',
    heroImage: getPlaceholderImage(1200, 600, 'lms-hero'),
    overview:
      'A comprehensive learning management system built for EduTech Solutions, featuring course creation tools, student progress tracking, interactive assessments, and video streaming capabilities.',
    problem: {
      title: 'The Challenge',
      content:
        'EduTech Solutions needed a modern LMS to replace their outdated system. The existing platform had poor user experience, limited course creation tools, no video streaming capabilities, and inadequate progress tracking. They required a scalable solution that could handle thousands of concurrent users while providing engaging learning experiences.',
      images: [
        getPlaceholderImage(600, 400, 'lms-problem1'),
        getPlaceholderImage(600, 400, 'lms-problem2'),
      ],
    },
    solution: {
      title: 'The Solution',
      content:
        'I developed a comprehensive LMS using Next.js, Prisma, and PostgreSQL. The platform included advanced course creation tools, interactive quizzes, video streaming with Mux, progress tracking, discussion forums, and integrated payment processing. The system was designed for scalability and optimal user experience across all devices.',
      images: [
        getPlaceholderImage(600, 400, 'lms-solution1'),
        getPlaceholderImage(600, 400, 'lms-solution2'),
        getPlaceholderImage(600, 400, 'lms-solution3'),
      ],
    },
    results: {
      title: 'The Results',
      content:
        'The new LMS increased student engagement by 65%, reduced course completion time by 30%, and improved instructor satisfaction scores by 80%. The platform successfully handled 10,000+ concurrent users during peak times while maintaining excellent performance. Revenue increased by 45% due to improved user experience and retention.',
      images: [
        getPlaceholderImage(600, 400, 'lms-results1'),
        getPlaceholderImage(600, 400, 'lms-results2'),
      ],
    },
    technologies: [
      {
        name: 'Next.js',
        icon: 'nextjs',
        description: 'Full-stack React framework for optimal performance',
      },
      {
        name: 'Prisma',
        icon: 'prisma',
        description: 'Type-safe database ORM for complex data relationships',
      },
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        description: 'Robust database for user data and course content',
      },
      {
        name: 'AWS S3',
        icon: 'aws',
        description: 'Scalable file storage for course materials',
      },
      {
        name: 'Stripe',
        icon: 'stripe',
        description: 'Secure payment processing for course purchases',
      },
      {
        name: 'Mux',
        icon: 'mux',
        description: 'Professional video streaming and analytics',
      },
    ],
    metrics: [
      {
        label: 'Student Engagement Increase',
        value: '65%',
        description: 'Interactive features boosted participation',
      },
      {
        label: 'Course Completion Improvement',
        value: '30%',
        description: 'Better UX led to higher completion rates',
      },
      {
        label: 'Instructor Satisfaction',
        value: '80%',
        description: 'Improved tools increased instructor happiness',
      },
      {
        label: 'Revenue Growth',
        value: '45%',
        description: 'Better platform led to increased sales',
      },
    ],
    testimonials: [
      {
        id: '1',
        content:
          'Marcel created an outstanding LMS that has transformed our online education delivery. The platform is intuitive, scalable, and has significantly improved both student and instructor experiences.',
        author: 'Dr. Emily Rodriguez',
        position: 'Head of Product',
        company: 'EduTech Solutions',
        avatar: getPlaceholderImage(100, 100, 'emily'),
      },
    ],
    gallery: [
      {
        url: getPlaceholderImage(800, 600, 'lms-gallery1'),
        caption: 'Student dashboard with course progress and recommendations',
        alt: 'LMS student dashboard',
      },
      {
        url: getPlaceholderImage(800, 600, 'lms-gallery2'),
        caption: 'Course creation interface for instructors',
        alt: 'Course creation tools',
      },
      {
        url: getPlaceholderImage(800, 600, 'lms-gallery3'),
        caption: 'Video player with interactive features and notes',
        alt: 'Video learning interface',
      },
      {
        url: getPlaceholderImage(800, 600, 'lms-gallery4'),
        caption: 'Assessment and quiz creation tools',
        alt: 'Quiz creation interface',
      },
    ],
    timeline: [
      {
        phase: 'Discovery & Architecture',
        duration: '3 weeks',
        description:
          'Requirements gathering, user research, and system architecture design',
      },
      {
        phase: 'Core Development',
        duration: '10 weeks',
        description:
          'User authentication, course management, and video streaming implementation',
      },
      {
        phase: 'Advanced Features',
        duration: '6 weeks',
        description: 'Assessments, progress tracking, and analytics dashboard',
      },
      {
        phase: 'Testing & Launch',
        duration: '3 weeks',
        description: 'Load testing, security audits, and production deployment',
      },
    ],
    challenges: [
      'Implementing scalable video streaming with adaptive bitrate',
      'Creating intuitive course authoring tools for non-technical users',
      'Designing a flexible assessment system for various question types',
      'Optimizing database performance for complex learning analytics',
    ],
    learnings: [
      'The importance of user-centered design in educational technology',
      'How to implement scalable video streaming solutions',
      'Best practices for learning analytics and progress tracking',
      'Strategies for building accessible and inclusive learning platforms',
    ],
  },
];
