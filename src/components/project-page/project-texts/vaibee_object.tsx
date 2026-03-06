import { blockType } from "../sidebat-content";

export const vaibeeIncObject: blockType[] = [
  {
    type: "metadata",
    id: "vaibee_inc",
    name: "Vaibee.inc",
    title: "VAIBEE.INC * A LABOUR OF LOVE * VAIBEE.INC * A LABOUR OF LOVE *",
    activeState: "#F8EAFF",
    fontActiveState: "#2B0C7D",
    overview: "/vaibee.inc",
    githublnk: "https://github.com/your-username/rag-chat-interface",
  },
  {
    title: "What is it?",
    content: [
      {
        type: "paragraph",
        text: 'while watching dead poets society i was struck by the words : "the powerful play goes on and on, and you may contribute a verse" : what would your verse be',
      },
      {
        type: "paragraph",
        text: "i have always introspected things, and all the findings, thoughts, tid bits of words i find, i tuck them into my journal, and when things go unsavoury, i often find myself going back to them.",
      },
      {
        type: "paragraph",
        text: "the inspiration behind the portfolio was to put, a piece of those afternoons i spend in my room figuring out how i wanna shape my story, the messiness of a filled journal, the variance of my study table, the make up brushes my vanity holds, to the pages books and pencils i reach for.",
      },
      {
        type: "paragraph",
        text: "my portfolio - vaibee.inc is an ode to my room, and how it shaped me",
      },
    ],
  },
  {
    title: "Visual Identity",
    content: [
      {
        type: "paragraph",
        text: "A room for a person sometimes serves everything — a diner, a workshop, a comfort nook. Diaries do the same. They pull you in with their ability to suppress years into pages.",
      },
      {
        type: "paragraph",
        text: "The visuals were intended to feel like stumbling onto a friend's room — exploring their antics and possessions, letting their personality slip through. Pixel art, hand-drawn doodles, and a stacked-page layout built to make that feeling palpable.",
      },
      {
        type: "paragraph",
        text: "The playthrough with fonts suggests how different aspects of life ask for different aesthetics. Bold when required, playful otherwise.",
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
          "Handcrafted visual identity — pixel art, hand-drawn doodles, and a stacked-page layout evoking the intimacy of a personal diary",
          "GSAP-powered smooth scrolling with multi-element animations, parallax, and a horizontal scroll project showcase",
          "Shadcn/UI components extended and restyled from the ground up to serve a deliberate, bespoke visual language",
          "Live-connected footer backed by a Neon serverless PostgreSQL database for dynamic content persistence",
          "Full design-to-code pipeline — prototyped in Figma with typography shifting tone intentionally across sections",
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
          "Next.js with TypeScript for a type-safe, full-stack foundation styled with Tailwind CSS",
          "GSAP for scroll-driven animations, parallax effects, and the horizontal showcase sequence",
          "Shadcn/UI as a base component system — heavily customised to match the handcrafted visual language",
          "Neon serverless PostgreSQL accessed via Prisma for dynamic data persistence",
          "Figma for end-to-end design prototyping before any code was written",
        ],
      },
    ],
  },
  {
    title: "GitHub",
    content: [
      {
        type: "paragraph",
        text: "https://github.com/your-username/vaibee-inc",
      },
    ],
  },
];
