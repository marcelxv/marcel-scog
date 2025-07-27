'use client';

import { motion } from 'framer-motion';
import type { SkillCategory } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { TechIcon } from '@/components/ui/tech-icon';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export function SkillsSection({ skillCategories }: SkillsProps) {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const allSkills = skillCategories.flatMap(category =>
    category.skills.map(skill => skill.name)
  );

  const renderSkills = () => (
    <div className="max-w-6xl mx-auto space-y-12">
      {skillCategories.map(category => (
        <div
          key={category.category}
          className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm"
        >
          <h3 className="text-xl font-bold text-text-900 dark:text-white mb-6 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            {category.category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {category.skills.map(skill => (
              <div key={skill.name} className="group">
                <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg hover:bg-accent-100 dark:hover:bg-neutral-900 transition-colors duration-200 cursor-default">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0">
                      <TechIcon name={skill.icon} className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-semibold text-text-900 dark:text-white group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors duration-200">
                      {skill.name}
                    </div>
                  </div>
                  {skill.description && (
                    <div className="text-xs text-text-600 dark:text-text-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {skill.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderAnimatedSkills = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="max-w-6xl mx-auto space-y-12"
    >
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          variants={categoryVariants}
          className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h3 className="text-xl font-bold text-text-900 dark:text-white mb-6 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            {category.category}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: categoryIndex * 0.1 + skillIndex * 0.05,
                }}
                className="group"
              >
                <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-950 rounded-lg hover:bg-accent-100 dark:hover:bg-neutral-900 transition-colors duration-200 cursor-default">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0">
                      <TechIcon name={skill.icon} className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-semibold text-text-900 dark:text-white group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors duration-200">
                      {skill.name}
                    </div>
                  </div>
                  {skill.description && (
                    <div className="text-xs text-text-600 dark:text-text-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {skill.description}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-primary-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-900 dark:text-text-50 mb-4">
            Technical Skills & Expertise
          </h2>
          <p className="text-lg text-text-700 dark:text-text-300 max-w-3xl mx-auto leading-relaxed">
            Specialized in modern web development, AI automation, system
            architecture, and cloud technologies. Experienced across the full
            technology stack with focus on scalable, maintainable solutions.
          </p>
        </div>

        {isMobile ? renderSkills() : renderAnimatedSkills()}

        {/* SEO Keywords Section (Hidden but crawlable) */}
        <div className="sr-only">
          <h3>Technical Skills Keywords</h3>
          <p>
            Marcel Scognamiglio specializes in: {allSkills.join(', ')}. Expert
            in full-stack development, AI automation, system architecture,
            event-driven systems, microservices, cloud computing, database
            design, frontend development, backend development, DevOps, and
            modern web technologies.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-300 mb-2">
                {allSkills.length}+
              </div>
              <div className="text-sm text-text-600 dark:text-text-400">
                Technologies
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-secondary-600 dark:text-secondary-300 mb-2">
                {skillCategories.length}
              </div>
              <div className="text-sm text-text-600 dark:text-text-400">
                Specializations
              </div>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm">
              <div className="text-2xl font-bold text-accent-700 dark:text-accent-200 mb-2">
                5+
              </div>
              <div className="text-sm text-text-600 dark:text-text-400">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
