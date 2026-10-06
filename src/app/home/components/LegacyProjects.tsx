"use client";

import type { ReactNode } from "react";
import { Chip, Reveal, SectionHeader, SectionShell } from "../../components/ui/primitives";

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

/* ------------------------------------------------------ legacy projects ---- */

interface LegacyEntry {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
}

/** Placeholder older projects — replace with your own entries. */
const LEGACY_PROJECTS: LegacyEntry[] = [
  {
    title: "Placeholder project title",
    category: "Category label",
    year: "2023",
    description:
      "Placeholder description for this older project — a couple of sentences covering what it was, which stack it used, and what you took away from building it.",
    tags: ["Tech one", "Tech two", "Tech three"],
  },
  {
    title: "Another placeholder title",
    category: "Category label",
    year: "2023",
    description:
      "A second placeholder description. Explain the goal in one sentence and the outcome in another, keeping the tone factual and easy to scan.",
    tags: ["Tech one", "Tech two"],
  },
  {
    title: "Third placeholder title",
    category: "Category label",
    year: "2022",
    description:
      "A third placeholder description. Mention the audience, the main feature, and anything you would do differently if you rebuilt it today.",
    tags: ["Tech one", "Tech two", "Tech three"],
  },
];

/** Archive section: three project cards in the shared card pattern. */
export function LegacyProjects() {
  return (
    <SectionShell id="legacy-projects" ariaLabel="Legacy Projects">
      <SectionHeader
        eyebrow="Legacy Projects"
        heading="Older experiments and personal builds"
        description="A short description of this section goes here — a line about the work that came before the current one."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {LEGACY_PROJECTS.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08} className="h-full">
            <a href="#" className="hs-card hs-card--lift group flex h-full flex-col overflow-hidden">
              <span
                className="relative flex aspect-video w-full items-center justify-center"
                style={{ backgroundImage: "var(--accent-gradient)" }}
                aria-hidden="true"
              >
                <span
                  className="px-4 text-center text-xs uppercase tracking-widest"
                  style={{ color: "rgba(255, 255, 255, 0.88)" }}
                >
                  Placeholder project image
                </span>
              </span>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="eyebrow eyebrow--plain">{project.category}</span>
                  <span className="text-muted text-xs font-semibold tracking-wider">
                    {project.year}
                  </span>
                </div>

                <h3 className="h-card break-words">{project.title}</h3>

                <p className="text-soft">{project.description}</p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Chip key={tag} size="sm">
                        {tag}
                      </Chip>
                    ))}
                  </div>

                  <span
                    className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{
                      border: "1px solid var(--border-strong)",
                      backgroundColor: "var(--surface-2)",
                      color: "var(--primary-text)",
                    }}
                    aria-hidden="true"
                  >
                    <ArrowUpRightIcon />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
