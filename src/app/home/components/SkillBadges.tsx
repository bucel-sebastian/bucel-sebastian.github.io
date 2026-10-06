"use client";

import { motion } from "motion/react";
import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
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

function Glyph({ children, size = 20 }: { children: ReactNode; size?: number }) {
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

function AwardIcon() {
  return (
    <Glyph size={28}>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.2 14 7 22l5-3 5 3-1.2-8" />
    </Glyph>
  );
}

/* ---------------------------------------------------------- skill badges -- */

/** Placeholder issuers behind the filter tabs — swap for the real ones later. */
const ISSUERS = ["Provider One", "Provider Two", "Provider Three"] as const;

type Issuer = (typeof ISSUERS)[number];

interface SkillBadge {
  id: string;
  title: string;
  issuer: Issuer;
  date: string;
}

const BADGES: SkillBadge[] = [
  { id: "skill-badge-01", title: "Placeholder Badge Title One", issuer: "Provider One", date: "Jan 2026" },
  { id: "skill-badge-02", title: "Placeholder Badge Title Two", issuer: "Provider One", date: "Feb 2026" },
  { id: "skill-badge-03", title: "Placeholder Badge Title Three", issuer: "Provider Two", date: "Mar 2026" },
  { id: "skill-badge-04", title: "Placeholder Badge Title Four", issuer: "Provider Three", date: "Apr 2026" },
];

function countFor(issuer: Issuer): number {
  return BADGES.filter((badge) => badge.issuer === issuer).length;
}

const TAB_INDICATOR: CSSProperties = {
  borderRadius: "var(--radius-pill)",
  background: "var(--card)",
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow-1)",
};

/**
 * Verified micro-credentials: issuer tabs filter a responsive grid of badge
 * cards. Tabs follow the ARIA tabs pattern (roving tabindex + arrow keys) and
 * the active pill slides with a shared `layoutId`.
 */
export function SkillBadges() {
  const prefersReduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIssuer = ISSUERS[activeIndex];
  const visible = BADGES.filter((badge) => badge.issuer === activeIssuer);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (activeIndex + 1) % ISSUERS.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (activeIndex - 1 + ISSUERS.length) % ISSUERS.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = ISSUERS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <SectionShell id="skill-badges" ariaLabel="Skill Badges">
      <SectionHeader
        eyebrow="Skill Badges"
        heading="Verified micro-credentials and achievements"
        description="A short description of this section goes here."
      />

      <Reveal>
        <div
          role="tablist"
          aria-label="Skill Badges"
          onKeyDown={handleTabKeyDown}
          className="inline-flex flex-wrap items-center gap-1"
          style={{
            padding: "0.25rem",
            borderRadius: "var(--radius-pill)",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
          }}
        >
          {ISSUERS.map((issuer, index) => {
            const selected = index === activeIndex;

            return (
              <button
                key={issuer}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`skill-badges-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="skill-badges-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-sm transition-[color,opacity] duration-200 hover:opacity-80"
                style={{
                  borderRadius: "var(--radius-pill)",
                  color: selected ? "var(--primary-text)" : "var(--foreground-soft)",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                {selected
                  ? prefersReduced
                    ? (
                        <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={TAB_INDICATOR} />
                      )
                    : (
                        <motion.span
                          layoutId="skill-badges-tab-indicator"
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0"
                          style={TAB_INDICATOR}
                          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                        />
                      )
                  : null}

                <span className="relative">{issuer}</span>
                <span
                  className="relative inline-flex items-center justify-center px-2 py-0.5 text-xs"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    background: selected ? "var(--primary-glow)" : "var(--surface)",
                    color: selected ? "var(--primary-text)" : "var(--muted)",
                    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                  }}
                >
                  {countFor(issuer)}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        id="skill-badges-panel"
        role="tabpanel"
        aria-labelledby={`skill-badges-tab-${activeIndex}`}
        style={{ marginTop: "clamp(1.75rem, 3vw, 2.5rem)" }}
      >
        <motion.div
          key={activeIssuer}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
          initial={prefersReduced ? false : { opacity: 0.001, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
        >
          {visible.map((badge, index) => (
            <Reveal key={badge.id} delay={index * 0.08} className="h-full">
              <Card hover padding="none" className="h-full overflow-hidden">
                <div className="flex h-full flex-col">
                  {/* Placeholder artwork — replace with the real badge image. */}
                  <div
                    aria-hidden="true"
                    className="grid place-items-center"
                    style={{ minHeight: "9.5rem", background: "var(--accent-gradient)" }}
                  >
                    <span
                      className="grid place-items-center"
                      style={{
                        width: "4.5rem",
                        height: "4.5rem",
                        borderRadius: "var(--radius-pill)",
                        background: "rgba(255, 255, 255, 0.94)",
                        color: "var(--primary-text)",
                        boxShadow: "0 12px 30px rgba(16, 17, 22, 0.22)",
                      }}
                    >
                      <AwardIcon />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="h-card">{badge.title}</h3>

                    <div className="flex flex-wrap items-center gap-3">
                      <Chip size="sm">{badge.issuer}</Chip>
                      <span style={{ fontSize: "0.8125rem", color: "var(--muted)" }}>{badge.date}</span>
                    </div>

                    <div className="mt-auto pt-1">
                      <PillButton variant="outline" size="sm" href="#">
                        Verify Badge
                      </PillButton>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
