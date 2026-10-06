"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { motion } from "motion/react";
import {
  Card,
  Chip,
  EASE_OUT_EXPO,
  PillButton,
  Reveal,
  SectionHeader,
  SectionShell,
  usePrefersReducedMotion,
} from "../../components/ui/primitives";

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

/* ---------------------------------------------------------------- data ---- */

type Project = {
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  gradient: string;
};

/** First tab — shows every card. */
const ALL_WORK = "All work";

/** Placeholder categories, one per filter tab (plus "All work"). */
const CATEGORIES: string[] = [
  "Category One",
  "Category Two",
  "Category Three",
  "Category Four",
  "Category Five",
  "Category Six",
  "Category Seven",
];

const TABS: string[] = [ALL_WORK, ...CATEGORIES];

/** Local, typed data — swap the strings for real project details later. */
const PROJECTS: Project[] = [
  {
    title: "Placeholder Project 01",
    category: "Category One",
    year: "2026",
    description:
      "A short placeholder description of this project — two lines keeps every card the same height.",
    tags: ["Interface", "State", "Styling"],
    gradient: "linear-gradient(135deg, var(--primary) 0%, var(--primary-strong) 100%)",
  },
  {
    title: "Placeholder Project 02",
    category: "Category Two",
    year: "2026",
    description:
      "Another placeholder paragraph describing the problem, your role, and the outcome in plain words.",
    tags: ["Frontend", "API", "Docs"],
    gradient:
      "linear-gradient(150deg, #4a86ff 0%, var(--primary) 50%, #2a1f6b 100%)",
  },
  {
    title: "Placeholder Project 03",
    category: "Category Three",
    year: "2026",
    description:
      "Lorem-style filler copy for the card body. Replace it with one or two sentences about the work.",
    tags: ["Design", "Prototype", "Testing"],
    gradient:
      "radial-gradient(110% 80% at 15% 10%, var(--primary-strong) 0%, transparent 65%), linear-gradient(200deg, #9d92ff 0%, #c9c1ff 100%)",
  },
  {
    title: "Placeholder Project 04",
    category: "Category Four",
    year: "2026",
    description:
      "A placeholder description that explains what was built and why it matters, without real data.",
    tags: ["Mobile", "Sync", "Storage"],
    gradient: "linear-gradient(120deg, #8b5cf6 0%, #4a86ff 100%)",
  },
  {
    title: "Placeholder Project 05",
    category: "Category Five",
    year: "2026",
    description:
      "More stand-in copy for the grid. Keep it short so the tags row and arrow stay aligned.",
    tags: ["Automation", "Scheduling", "Tooling"],
    gradient:
      "radial-gradient(80% 70% at 80% 20%, rgba(139, 92, 246, 0.75), transparent 60%), linear-gradient(180deg, #8e83f6 0%, var(--primary) 100%)",
  },
  {
    title: "Placeholder Project 06",
    category: "Category Six",
    year: "2026",
    description:
      "Two lines of placeholder text describing this piece of work and the stack it was built with.",
    tags: ["Search", "Indexing", "CLI"],
    gradient: "linear-gradient(90deg, var(--primary) 0%, #4a86ff 100%)",
  },
  {
    title: "Placeholder Project 07",
    category: "Category Seven",
    year: "2026",
    description:
      "Replace this filler with a sentence about the feature, the audience, and the result you shipped.",
    tags: ["Dashboard", "Charts", "Export"],
    gradient:
      "radial-gradient(60% 60% at 50% 45%, var(--primary-strong) 0%, transparent 70%), linear-gradient(160deg, #6f66d9 0%, #a99fff 100%)",
  },
  {
    title: "Placeholder Project 08",
    category: "Category One",
    year: "2026",
    description:
      "A final placeholder card — note that it shares a category with the first one, so filters can show two.",
    tags: ["Auth", "Payments", "Webhooks"],
    gradient:
      "linear-gradient(135deg, #2a1f6b 0%, var(--primary) 45%, var(--primary-strong) 100%)",
  },
];

/** Diagonal hairline pattern laid over every placeholder thumbnail. */
const THUMB_PATTERN =
  "repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0 1px, transparent 1px 14px)";

const DISPLAY_FONT = "var(--font-display), ui-sans-serif, system-ui, sans-serif";
const MONO_FONT = "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace";

/* ------------------------------------------------------------- component --- */

/**
 * Centrepiece of the route: filterable two-column project grid.
 * Tabs are a real `tablist` (roving tabindex + arrow keys) and the active tab
 * indicator slides between them with a shared `layoutId`.
 */
export function Projects() {
  const prefersReduced = usePrefersReducedMotion();
  const [active, setActive] = useState<string>(ALL_WORK);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = Math.max(0, TABS.indexOf(active));
  const visible =
    active === ALL_WORK ? PROJECTS : PROJECTS.filter((project) => project.category === active);

  const selectTab = (index: number, moveFocus: boolean) => {
    const next = (index + TABS.length) % TABS.length;
    setActive(TABS[next]);
    if (moveFocus) tabRefs.current[next]?.focus();
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let target = -1;
    if (event.key === "ArrowRight") target = index + 1;
    else if (event.key === "ArrowLeft") target = index - 1;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = TABS.length - 1;
    if (target < 0) return;
    event.preventDefault();
    selectTab(target, true);
  };

  return (
    <SectionShell id="projects" ariaLabel="Projects">
      <SectionHeader
        eyebrow="Latest Projects"
        heading="Your project headline goes here"
        description="A short description of this section goes here — one or two lines about the kind of work you chose to show."
        action={
          <PillButton variant="outline" href="#" trailingIcon={<ArrowUpRightIcon />}>
            View GitHub
          </PillButton>
        }
      />

      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap items-center gap-2">
        {TABS.map((tab, index) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`projects-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="projects-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(index, false)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className="relative cursor-pointer rounded-[var(--radius-pill)] px-4 py-2 text-sm font-medium transition-[color,opacity] duration-200 hover:opacity-80"
              style={{ color: isActive ? "var(--primary-text)" : "var(--foreground-soft)" }}
            >
              {isActive ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[var(--radius-pill)]"
                  style={{
                    background: "var(--primary-glow)",
                    border: "1px solid rgba(109, 94, 252, 0.35)",
                  }}
                  layoutId="projects-tab-indicator"
                  transition={{ duration: prefersReduced ? 0 : 0.4, ease: EASE_OUT_EXPO }}
                />
              ) : null}
              <span className="relative">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* Re-keyed on filter change so the cards re-run their staggered reveal. */}
      <div
        key={active}
        id="projects-panel"
        role="tabpanel"
        aria-labelledby={`projects-tab-${activeIndex}`}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
      >
        {visible.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.08} className="h-full">
            <a href="#" className="group block h-full">
              <Card hover padding="none" className="flex h-full flex-col overflow-hidden">
                <div
                  aria-hidden="true"
                  className="relative block aspect-[16/10] w-full overflow-hidden"
                  style={{ backgroundImage: project.gradient }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: THUMB_PATTERN, opacity: 0.55 }}
                  />
                  <div
                    className="absolute inset-0 grid place-items-center"
                    style={{
                      fontFamily: DISPLAY_FONT,
                      fontSize: "clamp(3rem, 9vw, 5.5rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.05em",
                      color: "rgba(255, 255, 255, 0.28)",
                    }}
                  >
                    {project.title.slice(-2)}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow eyebrow--plain">{project.category}</span>
                    <span
                      style={{
                        fontFamily: MONO_FONT,
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        color: "var(--muted)",
                      }}
                    >
                      {project.year}
                    </span>
                  </div>

                  <h3 className="h-card">{project.title}</h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--foreground-soft)" }}
                  >
                    {project.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Chip key={tag} size="sm">
                          {tag}
                        </Chip>
                      ))}
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 flex-none place-items-center rounded-[var(--radius-pill)] border transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      style={{
                        borderColor: "rgba(109, 94, 252, 0.35)",
                        background: "var(--primary-glow)",
                        color: "var(--primary-text)",
                      }}
                    >
                      <ArrowUpRightIcon />
                    </span>
                  </div>
                </div>
              </Card>
            </a>
          </Reveal>
        ))}

        {visible.length === 0 ? (
          <p className="hs-placeholder">No placeholder projects in this category yet.</p>
        ) : null}
      </div>
    </SectionShell>
  );
}
