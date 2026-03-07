import { blockType } from "../sidebat-content";

export const transformerObject: blockType[] = [
  {
    type: "metadata",
    id: "transformer",
    name: "Transformer",
    title:
      "TRANSFORMER ARCHITECTURE * TEXT GENERATION * TRANSFORMER ARCHITECTURE * TEXT GENERATION *",
    activeState: "#ECFDF8",
    fontActiveState: "#00CD95",
    overview: "/arch",
    githublnk: "https://github.com/VaidehiLodhi/Transformer_generation",
  },
  {
    title: "What is it?",
    content: [
      {
        type: "paragraph",
        text: "A decoder-only Transformer built from scratch in PyTorch — trained on Shakespeare for character-level text generation.",
      },
      {
        type: "paragraph",
        text: "We're not doing translation here. We shine light on the decoder block — autoregressive generation, one token at a time.",
      },
    ],
  },
  {
    title: "The Journey",
    content: [
      {
        type: "paragraph",
        text: "We start with a bigram model — averaging past context with for loops. The weakest form of aggregation. It's our baseline, and everything we build after is measured against it.",
      },
      {
        type: "paragraph",
        text: "From there, we layer in a single self-attention block. Already on the road to a better loss than before.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Causal self-attention — a lower triangular mask applied before softmax, so each token only attends to itself and what came before it. Autoregressive property preserved. Lots of words, but it's fun :3",
          "Multi-head attention — instead of one attention function, we've got multiple heads running in parallel, each learning a different aspect of the text. Outputs concatenated, projected back to model dimension via a linear layer.",
          "Per-head projections — each head independently maps the input into queries, keys, and values using weight matrices (no bias). What to search for. What to expose. What to aggregate.",
          "Full Transformer blocks — self-attention first so tokens can talk to each other, then a position-wise feedforward network so each token can independently process what it gathered.",
        ],
      },
      {
        type: "paragraph",
        text: "And we're good to go.",
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
          "Python and PyTorch for building and training the full architecture from scratch",
          "Character-level tokenization on the Shakespeare dataset",
        ],
      },
    ],
  },
  {
    title: "GitHub",
    content: [
      {
        type: "link",
        text: "https://github.com/VaidehiLodhi/Transformer_generation",
      },
    ],
  },
];
