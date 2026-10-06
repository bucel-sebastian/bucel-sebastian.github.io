"use client";

import type { ReactNode } from "react";

/* --------------------------------------------------------------- icons ---- */

function Glyph({ children, size = 18 }: { children: ReactNode; size?: number }) {
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

function GitHubIcon() {
  return (
    <Glyph>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
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

function WhatsAppIcon() {
  return (
    <Glyph>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
    </Glyph>
  );
}

function EmailIcon() {
  return (
    <Glyph>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6l-10 7L2 6" />
    </Glyph>
  );
}

/* ---------------------------------------------------------------- footer --- */

interface SocialLink {
  label: string;
  icon: ReactNode;
}

/** Placeholder social destinations — every href is "#" until you fill them in. */
const SOCIALS: SocialLink[] = [
  { label: "GitHub", icon: <GitHubIcon /> },
  { label: "LinkedIn", icon: <LinkedInIcon /> },
  { label: "WhatsApp", icon: <WhatsAppIcon /> },
  { label: "Email", icon: <EmailIcon /> },
];

/** Compact closing band: social links first, legal line second. */
export function Footer() {
  return (
    <footer className="hs-footer" aria-label="Site footer" style={{ background: "var(--surface-2)" }}>
      <div className="hs-container flex flex-wrap items-center justify-between gap-5">
        <nav aria-label="Social links" className="hs-footer__inner">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href="#"
              aria-label={social.label}
              className="hs-icon-btn hs-icon-btn--round"
            >
              {social.icon}
            </a>
          ))}
        </nav>

        <p className="hs-footer__note m-0 flex flex-wrap items-center gap-2">
          <span>© 2026 [Your Name]. All rights reserved.</span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span aria-hidden="true">•</span>
            <a href="#" className="transition-colors hover:underline underline-offset-4 hover:[color:var(--primary-text)]">
              Privacy Policy
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
