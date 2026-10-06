"use client";

import type { ReactNode } from "react";
import { Chip, CountUp, PillButton, Reveal, SectionHeader, SectionShell } from "../../components/ui/primitives";

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

/* -------------------------------------------------------- npm packages ---- */

interface PackageEntry {
  name: string;
  version: string;
  description: string;
  tags: string[];
  downloads: number;
  updated: string;
}

/** Placeholder packages — swap for your own before shipping. */
const PACKAGES: PackageEntry[] = [
  {
    name: "placeholder-package-one",
    version: "v1.0.0",
    description:
      "Placeholder description for this package. A few lines explaining what it does, who it is for, and why someone would install it. Replace this copy with your own summary.",
    tags: ["tag one", "tag two", "tag three"],
    downloads: 142,
    updated: "Jan 14, 2026",
  },
  {
    name: "placeholder-package-two",
    version: "v0.4.2",
    description:
      "Another placeholder description. Describe the main API, the problem it solves, and any noteworthy trade-offs in three or four sentences so the card feels complete.",
    tags: ["tag one", "tag two", "tag three", "tag four"],
    downloads: 86,
    updated: "Nov 03, 2025",
  },
  {
    name: "placeholder-package-three",
    version: "v2.1.0",
    description:
      "A third placeholder description. Keep it short and scannable — one sentence for the purpose, one for the audience, and an optional line about the install size or status.",
    tags: ["tag one", "tag two", "tag three"],
    downloads: 57,
    updated: "Aug 27, 2025",
  },
];

/** Open-source section: three package cards with version, tags and downloads. */
export function NpmPackages() {
  return (
    <SectionShell id="npm-packages" ariaLabel="NPM Packages">
      <SectionHeader
        eyebrow="Open Source"
        heading="NPM Packages"
        description="A short description of this section goes here — a line about what you publish and how often."
        action={
          <PillButton variant="outline" href="#" trailingIcon={<ArrowUpRightIcon />}>
            View NPM Profile
          </PillButton>
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {PACKAGES.map((pkg, index) => (
          <Reveal key={pkg.name} delay={index * 0.08} className="h-full">
            <article className="hs-card hs-card--lift flex h-full flex-col gap-4 p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <Chip variant="accent" size="sm">
                  {pkg.version}
                </Chip>
                <PillButton
                  variant="outline"
                  size="sm"
                  href="#"
                  aria-label={`View ${pkg.name} on npm`}
                  trailingIcon={<ArrowUpRightIcon />}
                />
              </div>

              <h3 className="h-card break-words">{pkg.name}</h3>

              <p className="text-soft">{pkg.description}</p>

              <div className="flex flex-wrap gap-2">
                {pkg.tags.map((tag) => (
                  <Chip key={tag} size="sm">
                    {tag}
                  </Chip>
                ))}
              </div>

              <div
                className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-4"
                style={{ borderColor: "var(--border)" }}
              >
                <p className="text-sm">
                  <CountUp value={pkg.downloads} className="font-semibold" />{" "}
                  <span className="text-muted">monthly downloads</span>
                </p>
                <span className="text-muted text-xs">{pkg.updated}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
