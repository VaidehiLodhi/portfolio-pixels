import { blockType } from "../sidebat-content";

export const hiveObject: blockType[] = [
  {
    type: "metadata",
    id: "hive",
    name: "Hive",
    title: "HIVE * KANBAN COLLABORATION * HIVE * KANBAN COLLABORATION *",
    activeState: "#F5F4C7",
    fontActiveState: "#FAC206",
  },
  {
    title: "What is it?",
    content: [
      {
        type: "paragraph",
        text: "Using our platform, we allow teams to collaborate using a Kanban structure.",
      },
      {
        type: "paragraph",
        text: "Kanban (かんばん) is a Japanese system originally developed for manufacturing that uses cards to visualize work and manage flow. It promotes an agile, limit-driven framework.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "Your teammate begins work on the frontend of a project",
          "You are assigned to design the UI/UX",
          "If your work is unfinished, your teammate’s progress halts",
          "At the same time, you are constrained by a work-in-progress limit",
        ],
      },
      {
        type: "paragraph",
        text: "Kanban-style collaboration marks this and makes the process smoother.",
      },
    ],
  },
  {
    title: "Features",
    content: [
      {
        type: "list",
        ordered: false,
        items: [
          "Invite members for collaboration with admin or member-level permissions",
          "Set up boards for projects and create cards for individual objectives",
          "Fully drag-and-drop supported cards for flexible workflow management",
          "Expandable cards that allow descriptions and contextual actions",
          "All activities including creation, deletion, and updates are recorded and displayed within each card",
          "A dedicated activity panel that summarizes progress across all teammates",
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
          "Next.js–based stack with TypeScript to maintain strict type safety throughout the application, styled using Tailwind CSS",
          "Neon serverless PostgreSQL database accessed via Prisma ORM for data modeling and queries",
        ],
      },
    ],
  },
  {
    title: "GitHub",
    content: [
      {
        type: "paragraph",
        text: "https://github.com/your-username/hive",
      },
    ],
  },
];
