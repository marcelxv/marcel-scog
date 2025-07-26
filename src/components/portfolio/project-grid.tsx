'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './project-card';
import { useIsMobile } from '@/hooks/use-is-mobile';
import type { Project } from '@/lib/types';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  if (isMobile) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="grid"
            index={index}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          variant="grid"
          index={index}
        />
      ))}
    </motion.div>
  );
}
