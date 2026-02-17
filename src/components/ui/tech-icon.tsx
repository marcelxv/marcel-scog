import React from 'react';
import {
  Code2,
  Database,
  Cloud,
  Cpu,
  Globe,
  Layers,
  Zap,
  GitBranch,
  Palette,
  Settings,
  Terminal,
  Workflow,
  Brain,
  Bot,
  Network,
  Shield,
  Smartphone,
  Monitor,
  FileCode,
  Package,
} from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = 'w-6 h-6' }: TechIconProps) {
  const iconMap: Record<string, React.JSX.Element> = {
    // Languages & Frameworks
    javascript: <Code2 className={`${className} text-yellow-500`} />,
    typescript: <Code2 className={`${className} text-blue-600`} />,
    react: <Layers className={`${className} text-cyan-400`} />,
    nextjs: <Globe className={`${className} text-black dark:text-white`} />,
    vue: <Layers className={`${className} text-green-500`} />,
    python: <Code2 className={`${className} text-blue-500`} />,
    graphql: <Network className={`${className} text-pink-500`} />,
    php: <Code2 className={`${className} text-purple-600`} />,
    rust: <Settings className={`${className} text-orange-600`} />,

    // Databases & Storage
    postgresql: <Database className={`${className} text-blue-700`} />,
    mongodb: <Database className={`${className} text-green-600`} />,
    supabase: <Database className={`${className} text-green-400`} />,
    firebase: <Database className={`${className} text-orange-500`} />,

    // Cloud & DevOps
    aws: <Cloud className={`${className} text-orange-500`} />,
    docker: <Package className={`${className} text-blue-500`} />,
    kubernetes: <Cpu className={`${className} text-blue-600`} />,
    cicd: <Workflow className={`${className} text-blue-500`} />,
    vercel: <Zap className={`${className} text-black dark:text-white`} />,
    netlify: <Globe className={`${className} text-teal-500`} />,

    // AI & Automation
    conductor: <Workflow className={`${className} text-purple-600`} />,
    novu: <Bot className={`${className} text-pink-500`} />,
    openai: <Brain className={`${className} text-green-600`} />,
    n8n: <Workflow className={`${className} text-red-500`} />,
    trigger: <Zap className={`${className} text-green-500`} />,
    ai: <Brain className={`${className} text-purple-500`} />,

    // Architecture & Design
    events: <Network className={`${className} text-orange-500`} />,
    microservices: <Layers className={`${className} text-blue-500`} />,
    api: <Network className={`${className} text-green-500`} />,
    architecture: <Layers className={`${className} text-purple-500`} />,
    'design-system': <Palette className={`${className} text-teal-500`} />,
    ux: <Monitor className={`${className} text-pink-500`} />,

    // Tools & Collaboration
    figma: <Palette className={`${className} text-red-500`} />,
    git: <GitBranch className={`${className} text-orange-600`} />,
    jira: <Settings className={`${className} text-blue-600`} />,
    notion: (
      <FileCode className={`${className} text-gray-700 dark:text-gray-300`} />
    ),
    miro: <Palette className={`${className} text-yellow-500`} />,
    mermaid: <Network className={`${className} text-pink-600`} />,
  };

  // Default fallback icon
  const defaultIcon = <Code2 className={`${className} text-gray-500`} />;

  return iconMap[name.toLowerCase()] || defaultIcon;
}
