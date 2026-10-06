"use client";

import type { ReactNode } from "react";
import { Chip, PillButton, Reveal, SectionHeader, SectionShell } from "../../components/ui/primitives";

/* --------------------------------------------------------------- icons ---- */

function Glyph({ children, size = 16 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <Glyph>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Glyph>
  );
}

/* ---------------------------------------------------- proof of concepts ---- */

interface ConceptEntry {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
}

/** Placeholder experiments — replace with your own entries. */
const CONCEPTS: ConceptEntry[] = [
  {
    title: "Placeholder concept title",
    category: "Category label",
    year: "2026",
    description:
      "Placeholder description of this proof of concept. One or two sentences on the idea being tested, what you were trying to learn, and how the experiment turned out.",
    tags: ["Tech one", "Tech two", "Tech three"],
  },
  {
    title: "Another placeholder title",
    category: "Category label",
    year: "2025",
    description:
      "A second placeholder description. Keep it short: what the prototype demonstrates, which constraint it explores, and whether it turned into something larger.",
    tags: ["Tech one", "Tech two"],
  },
];

/** Experiments section: two cards with a tech row and a Visit action. */
export function ProofOfConcepts() {
  return (
    <SectionShell id="proof-of-concepts" ariaLabel="Proof of Concepts">
      <SectionHeader
        eyebrow="Proof of Concepts"
        heading="Quick builds and experiments to test ideas"
        description="A short description of this section goes here — a line about how you use small experiments to validate ideas."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {CONCEPTS.map((concept, index) => (
          <Reveal key={concept.title} delay={index * 0.08} className="h-full">
            <article className="hs-card hs-card--lift flex h-full flex-col gap-4 p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow eyebrow--plain">{concept.category}</span>
                <span className="text-muted text-xs font-semibold tracking-wider">
                  {concept.year}
                </span>
              </div>

              <h3 className="h-card break-words">{concept.title}</h3>

              <p className="text-soft">{concept.description}</p>

              <div
                className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex flex-wrap gap-2">
                  {concept.tags.map((tag) => (
                    <Chip key={tag} size="sm">
                      {tag}
                    </Chip>
                  ))}
                </div>

                <PillButton variant="outline" size="sm" href="#" trailingIcon={<ArrowUpRightIcon />}>
                  Visit
                </PillButton>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
