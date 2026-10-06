"use client";

import GithubActivity, { type YearSelectorProps } from "@/app/components/GithubActivity";
import type { ThemeInput } from "react-activity-calendar";
import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { Card, EASE_OUT_EXPO, Reveal, SectionHeader, SectionShell, usePrefersReducedMotion } from "../../components/ui/primitives";

/* ------------------------------------------------------------- theming ---- */

/**
 * Contribution heat scale for the `.home` violet system — five levels,
 * light scheme pale-lavender → deep violet (reads on white cards),
 * dark scheme deep indigo → light violet (reads on dark cards).
 * Plain hex, not `var()`: the calendar writes colours into SVG `fill`
 * attributes, where custom properties are not substituted.
 */
const VIOLET_THEME: ThemeInput = {
  light: ["#ebe8fd", "#cdc5ff", "#a799fb", "#7f6df8", "#5546d6"],
  dark: ["#1e1d2e", "#372e78", "#5143c7", "#7b6bfb", "#a497ff"],
};

/** `.home` subscriber — re-renders when the route root's `data-theme` flips. */
function subscribeTheme(callback: () => void): () => void {
  const root = document.querySelector(".home");
  if (!root) return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function readTheme(): "light" | "dark" {
  return document.querySelector(".home")?.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** Matches the calendar's colour scheme to `.home[data-theme]` (SSR-safe). */
function useHomeColorScheme(): "light" | "dark" {
  return useSyncExternalStore(subscribeTheme, readTheme, () => "light" as const);
}

/* ---------------------------------------------------- year tab selector ---- */

/** Site-styled year tabs: violet pill indicator + soft-foreground inactive state. */
function YearSelector({ years, selectedYear, selectYear }: YearSelectorProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="hs-gh-years" role="group" aria-label="Contribution year">
      {years.map((year) => {
        const active = year === selectedYear;
        return (
          <button
            key={year}
            type="button"
            className="hs-gh-year"
            aria-pressed={active}
            onClick={() => selectYear(year)}
          >
            {active ? (
              <motion.span
                aria-hidden="true"
                className="hs-gh-year__indicator"
                layoutId="gh-year-indicator"
                transition={{ duration: reduced ? 0 : 0.4, ease: EASE_OUT_EXPO }}
              />
            ) : null}
            <span className="hs-gh-year__label">{year}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------- section ---- */

/** Real GitHub contribution calendar, restyled for the `.home` design system. */
export function GithubSection() {
  const colorScheme = useHomeColorScheme();

  return (
    <SectionShell id="github" ariaLabel="GitHub Activity">
      <SectionHeader
        eyebrow="Contributions"
        heading="GitHub Activity"
        description="A short description of this section goes here."
      />

      <Reveal>
        <Card padding="md">
          <GithubActivity
            className="hs-gh"
            theme={VIOLET_THEME}
            colorScheme={colorScheme}
            animateYearChange
            renderSelector={(selector) => <YearSelector {...selector} />}
          />
        </Card>
      </Reveal>
    </SectionShell>
  );
}
