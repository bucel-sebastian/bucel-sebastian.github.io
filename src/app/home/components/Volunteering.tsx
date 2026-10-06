"use client";

import { Chip, Reveal, SectionHeader, SectionShell } from "../../components/ui/primitives";

/* ------------------------------------------------------------ volunteering */

interface VolunteerRole {
  title: string;
  dateRange: string;
  description: string;
  metric: string;
}

/** Placeholder history — replace with real roles, dates and metrics later. */
const ROLES: VolunteerRole[] = [
  {
    title: "Placeholder Volunteer Role",
    dateRange: "Jan 2026 – Present",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Replace this paragraph with two or three sentences about what you contributed, who you worked with, and what shipped while you were there.",
    metric: "500+ Placeholder Metric",
  },
  {
    title: "Second Placeholder Role",
    dateRange: "Sep 2025 – Dec 2025",
    description:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A short description of the work, the team, and the outcome you are proudest of goes here.",
    metric: "250+ Placeholder Metric",
  },
  {
    title: "Third Placeholder Role",
    dateRange: "Mar 2025 – Aug 2025",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Keep this to a couple of lines so the list stays easy to scan.",
    metric: "50+ Placeholder Metric",
  },
];

/**
 * Chronological volunteering list: one bordered row per role with a large
 * muted index, dates, description and a metric chip. Rows tint on hover and
 * stagger in as they enter the viewport.
 */
export function Volunteering() {
  return (
    <SectionShell id="volunteering" ariaLabel="Volunteering">
      <SectionHeader
        eyebrow="Volunteer Work"
        heading="Volunteering"
        description="A short description of this section goes here."
      />

      <ol className="m-0 list-none p-0">
        {ROLES.map((role, index) => {
          const isLast = index === ROLES.length - 1;

          return (
            <li
              key={role.title}
              style={{
                borderTop: "1px solid var(--border)",
                borderBottom: isLast ? "1px solid var(--border)" : undefined,
              }}
            >
              <Reveal
                delay={index * 0.08}
                className="-mx-4 flex flex-col gap-3 px-4 py-7 transition-colors hover:bg-[var(--surface-2)]"
                style={{ borderRadius: "var(--radius)" }}
              >
                <div className="flex items-start justify-between gap-5">
                  <h3 className="h-card">{role.title}</h3>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 500,
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                      color: "var(--muted)",
                      opacity: 0.55,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="hs-index" style={{ margin: 0 }}>
                  {role.dateRange}
                </p>

                <p className="text-soft" style={{ margin: 0, maxWidth: "64ch" }}>
                  {role.description}
                </p>

                <div>
                  <Chip variant="accent">{role.metric}</Chip>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
