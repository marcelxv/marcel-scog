'use client';

import { Timeline } from './timeline';
import type { Experience } from '@/lib/types';

// Marcel's professional experience from resume.md (ordered from most recent to oldest)
const marcelExperiences: Experience[] = [
  {
    id: '1',
    company: 'Clipboard Health',
    position: 'Staff AI Engineer (IC – Architecture Owner)',
    startDate: new Date('2025-10-01'),
    // endDate is omitted for current position
    summary: 'Architecture Owner for AI-driven document validation platform transforming manual SOP-based healthcare workflows. System processes ~1000 documents/day, achieving 70%+ automated approval rate with ~1% false-positive rate. Reshaped operational capacity by reducing manual dependency by 66%, enabling the organization to scale document throughput without linear headcount growth.',
    description: 'Architecture Owner for AI-driven document validation platform transforming manual SOP-based healthcare workflows. System processes ~1000 documents/day, achieving 70%+ automated approval rate with ~1% false-positive rate. Reshaped operational capacity by reducing manual dependency by 66%, enabling the organization to scale document throughput without linear headcount growth.',
    technologies: ['Rust', 'AI'],
    achievements: [
      'Defined long-term technical direction for AI validation workflows, aligning model performance thresholds with operational risk tolerance.',
      'Replaced manual review dependency with deterministic multi-LLM orchestration and rule-based fallback layers.',
      'Structured system for horizontal expansion across new document types without increasing operational headcount.',
      'Introduced evaluation gates and regression controls to ensure continuous deployment without degrading operational trust.',
      'Established three-layer domain architecture with strict dependency isolation.',
      'Implemented idempotent event consumers and transactional background jobs for resilience at scale.',
      'Designed type-safe contracts ensuring cross-service integrity.'
    ],
  },
  {
    id: '2',
    company: 'FoodReady',
    position: 'Lead Software Developer',
    startDate: new Date('2024-11-01'),
    endDate: new Date('2025-07-01'),
    summary: 'Redefined backend execution model from time-based scheduling to event-driven architecture, enabling asynchronous scalability and reducing cross-team coordination overhead.',
    description: 'Redefined backend execution model from time-based scheduling to event-driven architecture, enabling asynchronous scalability and reducing cross-team coordination overhead.',
    technologies: ['AWS', 'EventBridge', 'Lambda', 'AI', 'Automation'],
    achievements: [
      'Designed AWS-based event architecture (Lambda, EventBridge, SQS).',
      'Introduced AI-assisted automation agents integrated with workflow engines.',
      'Defined technical roadmap and architecture principles adopted by engineering team.'
    ],
  },
  {
    id: '3',
    company: 'FoodReady',
    position: 'Senior Software Developer',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-11-01'),
    summary: 'Fullstack development for compliance and regulatory systems.',
    description: 'Fullstack development for compliance and regulatory systems.',
    technologies: [],
    achievements: [
      'Built scalable data processing workflows.',
      'Implemented observability improvements and reliability enhancements.'
    ],
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary-100 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <Timeline experiences={marcelExperiences} />
      </div>
    </section>
  );
}
