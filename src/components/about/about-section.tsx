'use client';

import { Timeline } from './timeline';
import type { Experience } from '@/lib/types';

// Marcel's professional experience from resume.md (ordered from most recent to oldest)
const marcelExperiences: Experience[] = [
  {
    id: '1',
    company: 'Confidential',
    position: 'AI Engineer (Agent Reliability & Evaluations)',
    startDate: new Date('2026-07-01'),
    // endDate is omitted for current position
    summary: 'Owned the design and delivery of an end-to-end evaluation platform for production AI agents, taking it from an initial harness to engineering infrastructure used to find, reproduce, and prevent agent failures.',
    description: 'Owned the design and delivery of an end-to-end evaluation platform for production AI agents, taking it from an initial harness to engineering infrastructure used to find, reproduce, and prevent agent failures.',
    technologies: ['AI'],
    achievements: [
      'Architected an agent evaluation platform around immutable agent versions, a harness decoupled from the agent runtime, and structured evidence capture per run.',
      'Integrated evaluations with the production agent backend so tests exercise the full system: model, system prompt, knowledge base, tools, profiles, and organization state.',
      'Replaced predominantly synthetic scenarios with cases derived from real production traces and conversations, prioritizing representativeness of live failure modes.',
      'Kept every evaluation case auditable by linking it to the production trace that motivated its creation.',
      'Turned live agent bugs into permanent regression tests, including failures that only surface when combining model behavior with runtime constraints.',
      'Designed reproducible test environments: anonymized replicas of real customer organizations and deliberately adversarial synthetic organizations.',
      'Structured organization coverage around business archetypes and complexity dimensions rather than individual customers.',
      'Separated universal agent behaviors from organization-specific rules to avoid contaminating expectations across tenants.',
      'Reduced full-suite run time through parallel execution across equivalent test environments.',
      'Integrated tiered evaluation suites (core, per-agent, integration) into CI, moving the platform from a manual harness to a standard development gate.',
      'Connected evaluation to observability so production traces feed new test generation.',
      'Established an evidence-driven loop for agent changes: change → evaluation → evidence → merge/deploy decision.',
      'Proposed living, auto-maintained system documentation and implemented automated AI-assisted code review for the agent backend.'
    ],
  },
  {
    id: '2',
    company: 'Clipboard Health',
    position: 'Staff AI Engineer (IC – Architecture Owner)',
    startDate: new Date('2025-10-01'),
    endDate: new Date('2026-07-01'),
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
    id: '3',
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
    id: '4',
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
