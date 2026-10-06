"use client";

import type { ReactNode } from "react";
import { CountUp, Reveal } from "../../components/ui/primitives";

/* --------------------------------------------------------------- icons ---- */

function Glyph({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function LayersIcon() {
  return (
    <Glyph>
      <path d="M12 2 2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </Glyph>
  );
}

function AwardIcon() {
  return (
    <Glyph>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.2 14 7 22l5-3 5 3-1.2-8" />
    </Glyph>
  );
}

function BadgeIcon() {
  return (
    <Glyph>
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
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

/* ------------------------------------------------------------- highlights -- */

interface Stat {
  value: number;
  label: string;
  sub: string;
  icon: ReactNode;
}

const STATS: Stat[] = [
  { value: 120, label: "Projects", sub: "Most built with [Your Stack]", icon: <LayersIcon /> },
  { value: 15, label: "Certificates", sub: "Top issuer: [Issuer Name]", icon: <AwardIcon /> },
  { value: 8, label: "Badges", sub: "Including [Provider]", icon: <BadgeIcon /> },
  { value: 6, label: "Years Experience", sub: "Shipping since [Year]", icon: <CalendarIcon /> },
];

/** Four animated counters in a bordered 2×2 grid. */
export function Highlights() {
  return (
    <section id="highlights" className="hs-section hs-section--tight hs-section--lines" aria-label="Highlights">
      <div className="hs-container">
        <ul className="hs-stats">
          {STATS.map((stat, index) => (
            <li key={stat.label}>
              <Reveal className="hs-stat" delay={index * 0.08}>
                <span className="hs-stat__icon">{stat.icon}</span>
                <p className="hs-stat__value">
                  <CountUp value={stat.value} />
                  <span className="hs-stat__plus">+</span>
                </p>
                <p className="hs-stat__label">{stat.label}</p>
                <p className="hs-stat__sub">{stat.sub}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
