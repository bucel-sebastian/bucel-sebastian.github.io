"use client";

import type { ReactNode } from "react";
import { PillButton, Reveal } from "../../components/ui/primitives";

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

function CodeIcon() {
  return (
    <Glyph>
      <path d="M16 18l6-6-6-6" />
      <path d="M8 6l-6 6 6 6" />
    </Glyph>
  );
}

function LinkedInIcon() {
  return (
    <Glyph>
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
      <path d="M10 21v-7a3 3 0 0 1 6 0v7" />
      <path d="M10 9v12" />
    </Glyph>
  );
}

function ChatIcon() {
  return (
    <Glyph>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
    </Glyph>
  );
}

function MailIcon() {
  return (
    <Glyph>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </Glyph>
  );
}

/* ----------------------------------------------------------------- about --- */

const CHANNELS: Array<{ label: string; icon: ReactNode }> = [
  { label: "GitHub", icon: <CodeIcon /> },
  { label: "LinkedIn", icon: <LinkedInIcon /> },
  { label: "WhatsApp", icon: <ChatIcon /> },
  { label: "Email", icon: <MailIcon /> },
];

/** Two-column intro: index + name on the left, longer copy + channels right. */
export function About() {
  return (
    <section id="about" className="hs-section" aria-labelledby="about-title">
      <div className="hs-container">
        <div className="hs-about">
          <Reveal className="hs-about__left">
            <span className="hs-index" aria-hidden="true">
              01 / 04
            </span>
            <span className="eyebrow">About</span>
            <h2 className="h-section" id="about-title">
              [Your Name]
            </h2>
            <p className="hs-about__role">Placeholder role title</p>
            <p className="hs-badge">
              <span className="hs-dot" aria-hidden="true" />
              Available for selected work
            </p>
          </Reveal>

          <Reveal className="hs-about__right" delay={0.12}>
            <p className="hs-about__lead">
              A short description of this section goes here. Replace this paragraph with two or
              three lines about what you build, how you like to work, and the kind of problems you
              enjoy solving.
            </p>

            <div className="hs-channels">
              <span className="eyebrow">Direct channels</span>
              <div className="hs-channels__list">
                {CHANNELS.map((channel) => (
                  <PillButton
                    key={channel.label}
                    variant="outline"
                    size="sm"
                    href="#"
                    leadingIcon={channel.icon}
                  >
                    {channel.label}
                  </PillButton>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
