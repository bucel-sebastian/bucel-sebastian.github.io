"use client";

import { motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Chip, EASE_OUT_EXPO, PillButton, Reveal, SectionHeader, SectionShell, usePrefersReducedMotion } from "../../components/ui/primitives";

/* -------------------------------------------------------- certifications --- */

interface CertificateEntry {
  title: string;
  issuer: string;
  year: string;
}

/** Placeholder issuers — the tabs are generated from the certificate list. */
const ISSUERS = ["Provider One", "Provider Two", "Provider Three"] as const;

/** Placeholder certificates — replace titles, issuers and years with real data. */
const CERTIFICATES: CertificateEntry[] = [
  { title: "Placeholder certificate title one", issuer: "Provider One", year: "2025" },
  { title: "Placeholder certificate title two", issuer: "Provider One", year: "2024" },
  { title: "Placeholder certificate title three", issuer: "Provider Two", year: "2026" },
  { title: "Placeholder certificate title four", issuer: "Provider Two", year: "2025" },
  { title: "Placeholder certificate title five", issuer: "Provider Two", year: "2023" },
  { title: "Placeholder certificate title six", issuer: "Provider Three", year: "2024" },
];

function countForIssuer(issuer: string): number {
  return CERTIFICATES.filter((certificate) => certificate.issuer === issuer).length;
}

/** Credentials section: issuer tabs filtering a two-column certificate grid. */
export function Certifications() {
  const prefersReduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIssuer = ISSUERS[activeIndex];
  const visible = CERTIFICATES.filter((certificate) => certificate.issuer === activeIssuer);

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (activeIndex + 1) % ISSUERS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (activeIndex - 1 + ISSUERS.length) % ISSUERS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = ISSUERS.length - 1;
    }
    if (next < 0) return;

    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <SectionShell id="certifications" ariaLabel="Certifications">
      <SectionHeader
        eyebrow="Certifications"
        heading="Professional Credentials"
        description="A short description of this section goes here — a line about how you keep learning and verifying new skills."
      />

      <div
        className="mb-7 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Certifications"
        onKeyDown={handleTabKeyDown}
      >
        {ISSUERS.map((issuer, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={issuer}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`cert-tab-${index}`}
              aria-controls="cert-panel"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-[color,opacity] duration-200 hover:opacity-80"
              style={{ color: selected ? "var(--primary-text)" : "var(--foreground-soft)" }}
            >
              {selected ? (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: "var(--primary-glow)",
                    border: "1px solid rgba(109, 94, 252, 0.35)",
                  }}
                  layoutId="cert-issuer-indicator"
                  transition={{ duration: prefersReduced ? 0 : 0.4, ease: EASE_OUT_EXPO }}
                />
              ) : null}
              <span className="relative">{issuer}</span>
              <Chip variant="solid" size="sm" className="relative">
                {countForIssuer(issuer)}
              </Chip>
            </button>
          );
        })}
      </div>

      <div id="cert-panel" role="tabpanel" aria-labelledby={`cert-tab-${activeIndex}`}>
        <motion.div
          key={activeIssuer}
          initial={prefersReduced ? false : { opacity: 0.001, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"
        >
          {visible.map((certificate, index) => (
            <Reveal key={certificate.title} delay={index * 0.08} className="h-full">
              <article className="hs-card hs-card--lift flex h-full flex-col gap-4 p-4 md:p-5">
                <button
                  type="button"
                  aria-label={`${certificate.title} — full view`}
                  className="block w-full overflow-hidden rounded-[var(--radius-sm)]"
                >
                  <span
                    className="flex aspect-[16/10] w-full items-center justify-center"
                    style={{ backgroundImage: "var(--accent-gradient)" }}
                  >
                    <span
                      className="rounded-full px-3 py-1 text-xs tracking-wide"
                      style={{
                        border: "1px solid rgba(255, 255, 255, 0.45)",
                        color: "rgba(255, 255, 255, 0.92)",
                      }}
                    >
                      Certificate image
                    </span>
                  </span>
                </button>

                <div className="flex flex-wrap items-end justify-between gap-3 px-1 pb-1">
                  <div className="flex min-w-0 flex-col gap-1">
                    <h3 className="h-card break-words">{certificate.title}</h3>
                    <span className="text-muted text-sm">{certificate.year}</span>
                  </div>

                  <PillButton variant="outline" size="sm" href="#">
                    Verify Certificate
                  </PillButton>
                </div>
              </article>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
