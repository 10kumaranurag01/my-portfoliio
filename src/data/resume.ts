// Single source of resume content for the whole app. Every string here must
// trace back to docs/superpowers/plans/resume-source.tex — no invented
// metrics, technologies, or content from anywhere else.

export type ContactProtocol = {
  protocol: string; // "mailto" | "tel" | "geo" | "linkedin" | "github" | "https"
  label: string; // what is displayed
  value: string; // the address text
  href: string | null; // null for geo
};

export type ExperienceCluster = {
  id: string; // slug, stable, used as carousel key
  company: string;
  role: string;
  period: string;
  cluster: string; // the \subhead, or "" when the role has no subheads
  bullets: string[]; // verbatim resume bullets, whitespace-normalised to one line
  stack: string[]; // technologies named IN those bullets, no additions
};

export type SkillGroup = { id: string; label: string; items: string[] };

export type Credential = {
  title: string;
  org: string;
  period: string;
  note?: string;
};

export const profile = {
  name: "KUMAR ANURAG SAHU",
  title: "Software Engineer — GenAI / Agentic AI",
  location: "Bhubaneshwar, India",
};

export const summary =
  "Software Engineer specializing in Generative AI, LLM applications, and Agentic AI systems, with hands-on experience building production AI for enterprise freight and logistics workflows. Experienced in Mistral LLM integration, Retrieval-Augmented Generation (RAG), embeddings, vector search, semantic search, reranking, prompt engineering, structured function calling, tool calling, custom agent architectures, human-in-the-loop workflows, AI guardrails, and evaluation harnesses, backed by strong full-stack engineering in TypeScript, Node.js, React, MongoDB, REST APIs, event-driven systems, and AWS.";

export const protocols: readonly ContactProtocol[] = Object.freeze([
  {
    protocol: "mailto",
    label: "kumarkas1515@gmail.com",
    value: "kumarkas1515@gmail.com",
    href: "mailto:kumarkas1515@gmail.com",
  },
  {
    protocol: "tel",
    label: "+91 9078943749",
    value: "+91 9078943749",
    href: "tel:+91 9078943749",
  },
  {
    protocol: "geo",
    label: "Bhubaneshwar, India",
    value: "Bhubaneshwar, India",
    href: null,
  },
  {
    protocol: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/kumar-anurag-858948207",
    href: "https://www.linkedin.com/in/kumar-anurag-858948207/",
  },
  {
    protocol: "github",
    label: "GitHub",
    value: "github.com/10kumaranurag01",
    href: "https://github.com/10kumaranurag01/",
  },
  {
    protocol: "https",
    label: "Portfolio",
    value: "myportfolio.anuragg.top",
    href: "https://myportfolio.anuragg.top",
  },
]);

export const skillGroups: readonly SkillGroup[] = Object.freeze([
  {
    id: "genai-llms",
    label: "Generative AI & LLMs",
    items: [
      "Large Language Models (LLMs)",
      "Generative AI",
      "Mistral",
      "LLM Integration",
      "Prompt Engineering",
      "Structured Outputs",
      "Function Calling",
      "Tool Calling",
      "Context-Window Management",
      "AI Document Automation",
    ],
  },
  {
    id: "rag-retrieval",
    label: "RAG & Retrieval",
    items: [
      "Retrieval-Augmented Generation (RAG)",
      "Embeddings",
      "Semantic Search",
      "Vector Search",
      "kNN Retrieval",
      "Reranking",
      "MongoDB Atlas Vector Search",
      "Voyage Embeddings",
      "Voyage Reranking",
      "Few-Shot Retrieval",
      "LlamaParse",
    ],
  },
  {
    id: "agentic-reliability",
    label: "Agentic AI & Reliability",
    items: [
      "AI Agents",
      "Agentic Workflows",
      "Custom Agent Architecture",
      "Agent Loops",
      "Tool Registry",
      "Tool Dispatch",
      "Human-in-the-Loop",
      "Approval Workflows",
      "Capability Gates",
      "Action Gates",
      "AI Guardrails",
      "Evaluation Harnesses",
      "Golden Datasets",
      "Model Canaries",
      "Confidence Scoring",
      "Retry Logic",
      "Audit Logging",
      "Observability",
    ],
  },
  {
    id: "engineering-cloud",
    label: "Engineering & Cloud",
    items: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs",
      "Zod",
      "Server-Sent Events (SSE)",
      "Async Processing",
      "Event-Driven Architecture",
      "React 18",
      "Next.js",
      "Vite",
      "RTK Query",
      "AWS S3",
      "AWS SQS FIFO",
      "Docker",
      "Valkey",
      "CI/CD",
      "Jest",
    ],
  },
]);

export const experience: readonly ExperienceCluster[] = Object.freeze([
  {
    id: "genai-agentic",
    company: "REUDAN INTERNATIONAL",
    role: "Software Engineer — GenAI / Agentic AI",
    period: "November 2024 — Present",
    cluster: "Generative AI & Agentic AI",
    bullets: [
      "Designed and built Kandyr Copilot, a production AI agent platform embedded in a freight-operations application, enabling natural-language interaction with enterprise data, document workflows, artifact generation, and gated business actions.",
      "Built a custom agentic AI architecture with a server-side agent loop, policy-controlled execution (interactive and headless modes, bounded step limits), tool registry, tool dispatch, structured tool results, and SSE streaming; integrated Mistral LLMs for tool calling, structured function calls, and document extraction.",
      "Developed a natural-language-to-MongoDB query engine in which Mistral generates a constrained intermediate representation, validated server-side against a field/operator allow-list and organization scope before compilation into MongoDB aggregation pipelines.",
      "Designed reusable LLM tool-calling infrastructure with typed input schemas, capability checks, side-effect classification (read, write, external, artifact), preview/commit phases, and audit logging; built tools for querying, document extraction, file generation, email, entity drafts, and readiness checks.",
      "Implemented human-in-the-loop workflows where write and external actions produce an approval proposal and commit only after explicit approval, with commit-time re-resolution of facts and gate re-evaluation; added retries with exponential backoff, tool-call correlation, and context-window management via result summarization and compact history digests.",
    ],
    stack: ["Mistral", "MongoDB", "SSE"],
  },
  {
    id: "rag-vector-docai",
    company: "REUDAN INTERNATIONAL",
    role: "Software Engineer — GenAI / Agentic AI",
    period: "November 2024 — Present",
    cluster: "RAG, Vector Search & Document AI",
    bullets: [
      "Built an AI document-automation system using LlamaParse and Mistral to extract structured logistics and accounting data from PDFs, with multi-document extraction, file-type tagging, engineered prompt instructions, source-document preservation, and structured function-call schemas.",
      "Implemented semantic entity resolution using MongoDB Atlas Vector Search, embeddings, fuzzy-matching fallback, and Voyage reranking to match extracted vendors, charges, sites, and ports against master data; applied RAG with Voyage embeddings and kNN retrieval of similar historical questions as few-shot context.",
    ],
    stack: [
      "LlamaParse",
      "Mistral",
      "MongoDB Atlas Vector Search",
      "Voyage",
      "kNN",
      "RAG",
    ],
  },
  {
    id: "guardrails-eval",
    company: "REUDAN INTERNATIONAL",
    role: "Software Engineer — GenAI / Agentic AI",
    period: "November 2024 — Present",
    cluster: "AI Guardrails, Safety & Evaluation",
    bullets: [
      "Designed an AI-assisted purchase-invoice auto-conversion workflow with confidence thresholds, bank-account validation, duplicate detection, rate/quantity validation, provenance tracking, and human approval, plus a feedback loop converting validated corrections into vendor and charge aliases for future matching.",
      "Implemented fail-closed guardrails, capability and action gates, tenant-isolation controls, prompt-level domain grounding and refusal rules, and AI action audit logging capturing tool, side-effect type, gate decisions, latency, outcomes, and human corrections.",
      "Developed approximately 20 server-side and 12 client-side test suites for Copilot and AI workflows, plus a golden evaluation corpus, RAG seed corpus, and weekly real-Mistral canary to detect LLM regressions.",
    ],
    stack: ["Mistral", "RAG"],
  },
  {
    id: "fullstack-eventdriven",
    company: "REUDAN INTERNATIONAL",
    role: "Software Engineer — GenAI / Agentic AI",
    period: "November 2024 — Present",
    cluster: "Full-Stack AI Product & Event-Driven Platform",
    bullets: [
      "Built the React-based Copilot interface with streaming conversations, tool-call and approval cards, entity drafts, attachments, and generated artifacts; implemented 19 Copilot API routes including 3 SSE endpoints, consumed via 14 RTK Query client endpoints.",
      "Designed an event-driven ETL pipeline using Valkey and AWS SQS FIFO to process booking lifecycle events into a pre-aggregated daily MongoDB analytics cube, with frozen FX rates for financial correctness and full-rebuild/dry-run reconciliation workflows.",
    ],
    stack: ["React", "SSE", "RTK Query", "Valkey", "AWS SQS FIFO", "MongoDB"],
  },
  {
    id: "cleveratti-mern",
    company: "CLEVERATTI SKILLS PVT LIMITED",
    role: "Junior Full Stack Developer Intern",
    period: "May 2024 — August 2024",
    cluster: "",
    bullets: [
      "Analyzed an existing live codebase and independently built a complete web application, frontend and backend, using the MERN stack.",
    ],
    stack: ["MERN"],
  },
]);

export const credentials: readonly Credential[] = Object.freeze([
  {
    title: "Bachelor of Technology (B.Tech), Computer Science",
    org: "SIET, Dhenkanal",
    period: "2020 — 2024",
  },
  {
    title: "Full Stack Web Development Course",
    org: "100xDevs",
    period: "Issued September 2024",
    note: "Credential ID: 0FFKL29X",
  },
]);

export { default as resumeFile } from "../assets/Kumar_Anurag.pdf";
