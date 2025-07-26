'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './project-card';
import type { Project } from '@/lib/types';

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
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

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
    </div>
  );
}
