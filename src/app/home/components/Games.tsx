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

/* --------------------------------------------------------------- games ---- */

interface GameEntry {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
}

/** Placeholder fun projects — replace with your own entries. */
const GAMES: GameEntry[] = [
  {
    title: "Placeholder game title",
    category: "Category label",
    year: "2026",
    description:
      "Placeholder description for this game — one or two sentences about the idea, the mechanics, and why you built it. Keep it light and human, this section is all about having fun.",
    tags: ["Engine", "Language", "Tool"],
  },
];

/** Fun-projects section: one large cover card in the shared project style. */
export function Games() {
  return (
    <SectionShell id="games" ariaLabel="Games">
      <SectionHeader
        eyebrow="Games & Fun Projects"
        heading="Games and experiments I built just for fun"
        description="A short description of this section goes here — a line about what you play with outside of client work."
      />

      <div className="grid grid-cols-1 gap-6">
        {GAMES.map((game, index) => (
          <Reveal key={game.title} delay={index * 0.08} className="h-full">
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
                  Placeholder cover image
                </span>
              </span>

              <div className="flex flex-1 flex-col gap-4 p-5 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="eyebrow eyebrow--plain">{game.category}</span>
                  <span className="text-muted text-xs font-semibold tracking-wider">
                    {game.year}
                  </span>
                </div>

                <h3 className="h-card break-words">{game.title}</h3>

                <p className="text-soft">{game.description}</p>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
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
