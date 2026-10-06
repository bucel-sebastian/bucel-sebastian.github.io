"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { PillButton, usePrefersReducedMotion } from "../../components/ui/primitives";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* --------------------------------------------------------------- icons ---- */

function Glyph({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
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

function CalendarIcon() {
  return (
    <Glyph>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </Glyph>
  );
}

/* ----------------------------------------------------------------- hero ---- */

/**
 * First screen: eyebrow row, two-line headline (second line gradient), short
 * subtitle, three calls to action and an "explore" scroll cue.
 * Entrance is a staggered timeline; reduced motion renders everything in place.
 */
export function Hero() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="home-hero" className="hs-hero" aria-labelledby="home-hero-title">
      <div className="hs-container hs-hero__inner">
        <motion.p
          className="hs-hero__eyebrow"
          initial={prefersReduced ? false : { opacity: 0.001, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
        >
          <span className="hs-dot" aria-hidden="true" />
          <span>Available for selected work</span>
          <span className="hs-hero__dash" aria-hidden="true">
            —
          </span>
          <span className="hs-hero__mono">Independent developer / [City]</span>
        </motion.p>

        <h1 className="h-display hs-hero__title" id="home-hero-title">
          <span className="hs-line-mask">
            <motion.span
              className="hs-line"
              initial={prefersReduced ? false : { y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
            >
              Your headline{" "}
            </motion.span>
          </span>
          <span className="hs-line-mask">
            <motion.span
              className="hs-line gradient-text"
              initial={prefersReduced ? false : { y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.36, ease: EASE }}
            >
              goes here.
            </motion.span>
          </span>
        </h1>

        <motion.p
          className="hs-hero__sub"
          initial={prefersReduced ? false : { opacity: 0.001, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          Web · Mobile · AI · Product thinking
        </motion.p>

        <motion.div
          className="hs-hero__actions"
          initial={prefersReduced ? false : { opacity: 0.001, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
        >
          <PillButton variant="primary" href="#projects" trailingIcon={<ArrowUpRightIcon />}>
            View Projects
          </PillButton>
          <PillButton variant="outline" href="#" leadingIcon={<CalendarIcon />}>
            Book a call
          </PillButton>
          <PillButton variant="ghost" href="/Ion-Sebastian_Bucel_CV.pdf">
            Download CV
          </PillButton>
        </motion.div>

        <motion.a
          className="hs-hero__cue"
          href="#projects"
          initial={prefersReduced ? false : { opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        >
          <span>Explore the work</span>
        </motion.a>
      </div>
    </section>
  );
}
