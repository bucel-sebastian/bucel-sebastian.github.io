"use client";

import { Reveal, SectionHeader, SectionShell } from "../../components/ui/primitives";

/* ---------------------------------------------------------------- data ---- */

type Service = {
  number: string;
  title: string;
  description: string;
};

/** Four numbered service rows — copy drawn from real experience (CV). */
const SERVICES: Service[] = [
  {
    number: "01",
    title: "Full-stack web applications",
    description:
      "End-to-end product development with TypeScript, React, Next.js, and Laravel — from data model to production deploy, across SaaS platforms serving 600+ active clients.",
  },
  {
    number: "02",
    title: "APIs & third-party integrations",
    description:
      "RESTful APIs and integrations with platforms like Shopify, WooCommerce, and courier providers — connecting real services to production systems that process ~100K shipments a month.",
  },
  {
    number: "03",
    title: "Performance & scalability",
    description:
      "Caching, queues, and async processing to keep apps fast under load. A recent platform rebuild cut page load times from 10+ seconds to under 0.6.",
  },
  {
    number: "04",
    title: "Infrastructure & DevOps",
    description:
      "Docker, Kubernetes, and CI/CD for reliable deploys — including a fault-tolerant, Kafka-based notification system built for high-throughput message delivery.",
  },
  {
    number: "05",
    title: "Security & machine learning",
    description:
      "Security-minded engineering and data-driven features, backed by a Master's in Cyber Security and Machine Learning — from secure application design to practical ML integration.",
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
        heading="Full-stack development, end to end"
        description="Five years of building SaaS platforms, REST APIs, and web applications — from the database schema to the production deploy."
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
