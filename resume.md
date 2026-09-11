# Marcel Scognamiglio

**AI Systems Architect | Deterministic AI Engineering | Event-Driven Platforms**

Brazil (Open to EU / US relocation) | 📧 marcelx@protonmail.com

**Languages**: Portuguese – Native | English – Professional

---

## Professional Summary

AI Engineer with 8+ years across event-driven platforms and deterministic AI systems. Currently designing the evaluation infrastructure and reliability methodology for production AI agents — building the platform and processes that turn real production behavior into reproducible tests and permanent regression suites, integrated with the agent runtime and CI.

---

## Core Expertise

- **Operational Transformation**: Redefining manual workflows into deterministic AI-driven systems
- **Deterministic AI Systems**: Multi-LLM orchestration, evaluation harness, regression control
- **Event-Driven Distributed Architecture**: AWS, idempotent consumers, transactional jobs
- **Organizational Scalability**: Designing systems for horizontal expansion without increasing headcount
- **Technical Roadmapping & Domain Ownership**

---

## Technical Skills

### Languages & Frameworks

- **TypeScript/JavaScript**: Node.js, NestJS, Next.js, React, TypeScript (Strict Mode)
- **Database & ORM**: PostgreSQL, Prisma (TypedSQL), MongoDB, Supabase, Redis
- **API & Contracts**: ts-rest, Zod, GraphQL, REST (JSON:API), OpenAPI/Swagger
- **Python**: Backend development, AI integration, automation scripts

### AI & Automation

- **LLM Orchestration**: RAG, Prompt chaining, Deterministic LLM, GPT, Anthropic, Mistral
- **Document Processing**: OCR (Vision-based), Field Extraction, Rules Engines
- **Automation Tools**: Orkes/Conductor, Novu, n8n, Trigger.dev
- **Evaluation**: AI-based data enrichment, Backtesting and LLM evaluation scripts

### Cloud, DevOps & Observability

- **AWS**: EventBridge, SQS, S3, RDS, SSM, Lambda - Event-driven architecture
- **Infrastructure as Code**: Terraform, LocalStack (AWS emulation)
- **Observability**: Datadog (Tracing, Metrics, Monitors)
- **Tooling**: Docker, GitHub Actions, LaunchDarkly (Feature Flags)

### Architecture & Practices

- **System Design**: Three-tier architecture, Repository pattern, Domain Objects (DOs)
- **Async Systems**: Background jobs, idempotent consumers, cross-service messaging
- **Quality**: Jest, TDD, strict type safety, 100% logic coverage targets
- **UX & Design**: Figma, Design Systems, Responsive Design, Accessibility

---

## Professional Experience

### AI Engineer (Agent Reliability & Evaluations) | Confidential

_Jul 2026 – Present · Remote_

Owned the design and delivery of an end-to-end evaluation platform for production AI agents, taking it from an initial harness to engineering infrastructure used to find, reproduce, and prevent agent failures.

**Platform & Methodology**

- Architected an agent evaluation platform around immutable agent versions, a harness decoupled from the agent runtime, and structured evidence capture per run.
- Integrated evaluations with the production agent backend so tests exercise the full system: model, system prompt, knowledge base, tools, profiles, and organization state.
- Replaced predominantly synthetic scenarios with cases derived from real production traces and conversations, prioritizing representativeness of live failure modes.
- Kept every evaluation case auditable by linking it to the production trace that motivated its creation.

**Reliability & Regression**

- Turned live agent bugs into permanent regression tests, including failures that only surface when combining model behavior with runtime constraints.
- Designed reproducible test environments: anonymized replicas of real customer organizations and deliberately adversarial synthetic organizations.
- Structured organization coverage around business archetypes and complexity dimensions rather than individual customers.
- Separated universal agent behaviors from organization-specific rules to avoid contaminating expectations across tenants.

**Delivery & Engineering**

- Reduced full-suite run time through parallel execution across equivalent test environments.
- Integrated tiered evaluation suites (core, per-agent, integration) into CI, moving the platform from a manual harness to a standard development gate.
- Connected evaluation to observability so production traces feed new test generation.
- Established an evidence-driven loop for agent changes: change → evaluation → evidence → merge/deploy decision.
- Proposed living, auto-maintained system documentation and implemented automated AI-assisted code review for the agent backend.

### Staff AI Engineer (IC – Architecture Owner) | Clipboard Health

_Oct 2025 – Jul 2026 · Remote (US)_

Architecture Owner for AI-driven document validation platform transforming manual SOP-based healthcare workflows. System processes ~1000 documents/day, achieving 70%+ automated approval rate with ~1% false-positive rate. Reshaped operational capacity by reducing manual dependency by 66%, enabling the organization to scale document throughput without linear headcount growth.

**Organizational & Architectural Impact**

- Defined long-term technical direction for AI validation workflows, aligning model performance thresholds with operational risk tolerance.
- Replaced manual review dependency with deterministic multi-LLM orchestration and rule-based fallback layers.
- Structured system for horizontal expansion across new document types without increasing operational headcount.
- Introduced evaluation gates and regression controls to ensure continuous deployment without degrading operational trust.

**Engineering Foundations**

- Established three-layer domain architecture with strict dependency isolation.
- Implemented idempotent event consumers and transactional background jobs for resilience at scale.
- Designed type-safe contracts ensuring cross-service integrity.

### Lead Software Developer | FoodReady

_Nov 2024 – Jul 2025 · Remote (US)_

Redefined backend execution model from time-based scheduling to event-driven architecture, enabling asynchronous scalability and reducing cross-team coordination overhead.

- Designed AWS-based event architecture (Lambda, EventBridge, SQS).
- Introduced AI-assisted automation agents integrated with workflow engines.
- Defined technical roadmap and architecture principles adopted by engineering team.

### Senior Software Developer | FoodReady

_Nov 2023 – Nov 2024 · Remote (US)_

Fullstack development for compliance and regulatory systems.

- Built scalable data processing workflows.
- Implemented observability improvements and reliability enhancements.

---

## Education

- **Systems Technology** | FIAP | _2021–2023_
- **BA in Journalism, Philosophy & Technology** | FAPCOM | _2009–2013_

---

## Certifications

- **IA, Otimização e IoT para Indústrias e Negócios: Do Zero ao MLOps** | Universidade de São Paulo (ICMC) | _Sep 2026_
- **Statistical Learning with Python** | StanfordOnline | _Feb 2026_
- **Retrieval Augmented Generation (RAG)** | DeepLearning.AI | _Jan 2026_
- **Full Stack Applications** | FIAP | _Jul 2023_
- **Java Development** | FIAP | _Jul 2023_
- **TypeScript** | Codecademy | _Oct 2023_
- **Official ChatGPT Course** | Codecademy | _May 2023_
