import { blockType } from "../sidebat-content";

export const ragChatInterface: blockType[] = [
  {
    type: "metadata",
    id: "rag_chat_interface",
    name: "RAG Chat Interface",
    title:
      "RAG Chat Interface * Reliable Knowledge * RAG Chat Interface * Reliable Knowledge *",
    activeState: "#F8EAFF",
    fontActiveState: "#2B0C7D",
    overview: "/ragChat",
    githublnk: "https://github.com/VaidehiLodhi/alibi_legal_assist"
  },
  {
    title: "What is it?",
    content: [
      {
        type: "paragraph",
        text: "Retrieval Augmented Generation — a buzzword we've heard all around. It is a technique for enhancing the accuracy and reliability of generative AI models with information fetched from specific and relevant data sources.",
      },
      {
        type: "paragraph",
        text: "The deep understanding — sometimes called parameterized knowledge — makes LLMs useful in responding to general prompts. However, when a user needs source-grounded answers rather than broad knowledge alone, standard generation falls short. RAG bridges that gap by grounding responses in retrieved, verifiable context.",
      },
    ],
  },
  {
    title: "Features",
    content: [
      {
        type: "paragraph",
        text: "We handle the full backend infrastructure — queueing, observability, and traceability:",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Automatic retries on error, while ensuring efficient runs via throttling, batching, and prioritization",
          "Fault-tolerant execution — if something breaks mid-run, we pick up exactly where it left off",
          "Full RAG pipeline traceability via Inngest traces and metrics for live observability",
          "Input validation and sanitization on every inbound and outbound message using Zod schema enforcement",
          "Proper database session setup for both the agent and the user, accessed via Prisma ORM",
          "Authentication and access control handled seamlessly using Clerk",
        ],
      },
    ],
  },
  {
    title: "Tech Used",
    content: [
      {
        type: "list",
        ordered: false,
        items: [
          "Next.js with TypeScript for a type-safe, full-stack architecture styled with Tailwind CSS",
          "Zod for end-to-end schema validation, forming the first layer of the reliability system",
          "Inngest for durable background job execution and async query traceability without dropped requests under load",
          "Neon serverless PostgreSQL with Prisma ORM for persisting messages, sessions, and query traces",
          "TanStack Query for client-side refetching and request queueing as the final reliability layer",
          "Clerk for authentication and session management",
        ],
      },
    ],
  },
  {
    title: "GitHub",
    content: [
      {
        type: "link",
        text: "https://github.com/VaidehiLodhi/alibi_legal_assist",
      },
    ],
  },
];
