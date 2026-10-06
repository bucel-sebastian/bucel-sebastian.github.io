"use client";

import { Reveal, SectionHeader, SectionShell } from "../../components/ui/primitives";

/* ---------------------------------------------------------------- data ---- */

type Service = {
  number: string;
  title: string;
  description: string;
};

/** Placeholder rows — replace the strings with your real service offerings. */
const SERVICES: Service[] = [
  {
    number: "01",
    title: "Placeholder Service One",
    description:
      "A short placeholder paragraph describing this service — one or two sentences is plenty for the row layout.",
  },
  {
    number: "02",
    title: "Placeholder Service Two",
    description:
      "Another stand-in sentence explaining what you deliver, who it is for, and what outcome it produces.",
  },
  {
    number: "03",
    title: "Placeholder Service Three",
    description:
      "Lorem-style filler copy for the third row. Keep it under two lines so every row keeps the same rhythm.",
  },
  {
    number: "04",
    title: "Placeholder Service Four",
    description:
      "A final placeholder description — replace it with the details of your fourth offering.",
  },
];

const MONO_FONT = "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace";

/* ------------------------------------------------------------- component --- */

/** Four numbered rows separated by hairline rules, with a tinted hover state. */
export function Services() {
  return (
    <SectionShell id="services" ariaLabel="Services">
      <SectionHeader
        eyebrow="What I Do"
        heading="Your services headline goes here"
        description="A short description of this section goes here."
      />

      <ol className="mt-2">
        {SERVICES.map((service, index) => (
          <li key={service.number} className="border-t border-[color:var(--border)] last:border-b">
            <Reveal
              delay={index * 0.08}
              className="group -mx-4 grid gap-2 px-4 py-8 transition-colors duration-300 hover:bg-[color:var(--surface-2)] md:-mx-6 md:grid-cols-[5.5rem_1fr] md:gap-8 md:px-6 md:py-10"
            >
              <span
                aria-hidden="true"
                className="text-3xl leading-none tabular-nums text-[color:var(--muted)] transition-colors duration-300 group-hover:text-[color:var(--primary-text)] md:text-4xl"
                style={{
                  fontFamily: MONO_FONT,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {service.number}
              </span>

              <div className="grid gap-3">
                <h3 className="h-card">{service.title}</h3>
                <p className="max-w-[62ch]" style={{ color: "var(--foreground-soft)" }}>
                  {service.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
