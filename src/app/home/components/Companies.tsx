"use client";

import { Card, Chip, CountUp, PillButton, Reveal, SectionHeader, SectionShell } from "../../components/ui/primitives";

/* ---------------------------------------------------------------- data ---- */

type CompanyStat = {
  label: string;
  /** Animated value — rendered with `CountUp` when present. */
  value?: number;
  suffix?: string;
  /** Static text for figures that should not animate (e.g. "99.9%"). */
  text?: string;
};

const STATS: CompanyStat[] = [
  { label: "Completed Projects", value: 120, suffix: "+" },
  { label: "Uptime SLA", text: "99.9%" },
  { label: "Established", text: "Est. 2026" },
];

/** Placeholder roles — swap for your real titles. */
const ROLES: string[] = ["Role One", "Role Two"];

/** Placeholder offerings shown as chips under "What We Offer". */
const OFFERS: string[] = [
  "Offer One",
  "Offer Two",
  "Offer Three",
  "Offer Four",
  "Offer Five",
  "Offer Six",
];

const DISPLAY_FONT = "var(--font-display), ui-sans-serif, system-ui, sans-serif";
const MONO_FONT = "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace";

/* ------------------------------------------------------------- component --- */

/** Company registry: one rich article card plus a reserved second slot. */
export function Companies() {
  return (
    <SectionShell id="companies" ariaLabel="Companies">
      <SectionHeader
        eyebrow="My Companies"
        heading="Your companies headline goes here"
        description="A short description of this section goes here — replace it with a sentence or two about the ventures you run."
      />

      <div className="grid gap-6">
        {/* ---------------------------------------------------------- 01 -- */}
        <Reveal>
          <Card padding="lg">
            <article
              className="grid gap-6 md:grid-cols-[4.5rem_1fr] md:gap-10"
              aria-labelledby="companies-name-01"
            >
              <span
                aria-hidden="true"
                className="text-4xl leading-none tabular-nums md:text-5xl"
                style={{
                  fontFamily: MONO_FONT,
                  fontWeight: 500,
                  color: "var(--muted)",
                  letterSpacing: "-0.03em",
                }}
              >
                01
              </span>

              <div className="grid gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex min-w-0 flex-wrap items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="grid h-14 w-14 flex-none place-items-center text-xl"
                      style={{
                        borderRadius: "var(--radius)",
                        background:
                          "linear-gradient(135deg, var(--primary) 0%, var(--primary-strong) 100%)",
                        color: "var(--primary-foreground)",
                        fontFamily: DISPLAY_FONT,
                        fontWeight: 600,
                        boxShadow: "0 10px 24px var(--primary-glow)",
                      }}
                    >
                      P
                    </span>

                    <div className="grid gap-2">
                      <h3 id="companies-name-01" className="h-card">
                        Placeholder Company Name
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {ROLES.map((role) => (
                          <Chip key={role} size="sm">
                            {role}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span
                    className="inline-flex flex-none items-center gap-2 rounded-[var(--radius-pill)] px-3 py-1.5 text-xs font-semibold"
                    style={{
                      background: "color-mix(in srgb, var(--success) 16%, transparent)",
                      color: "color-mix(in srgb, var(--success) 70%, var(--foreground))",
                      border: "1px solid color-mix(in srgb, var(--success) 45%, transparent)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--success)" }}
                    />
                    Active
                  </span>
                </div>

                <p
                  className="max-w-[60ch] text-lg leading-relaxed"
                  style={{ color: "var(--primary-text)" }}
                >
                  Your tagline goes here — one short line under the company name.
                </p>

                <p className="max-w-[70ch]" style={{ color: "var(--foreground-soft)" }}>
                  A longer placeholder paragraph describing what this company does, who it serves,
                  and why it exists. Replace it with two or three sentences of real copy.
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="grid gap-1 px-4 py-4"
                      style={{
                        borderRadius: "var(--radius-sm)",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <p
                        className="text-2xl leading-none tabular-nums"
                        style={{
                          fontFamily: DISPLAY_FONT,
                          fontWeight: 500,
                          letterSpacing: "-0.03em",
                          color: "var(--foreground)",
                        }}
                      >
                        {stat.value !== undefined ? (
                          <CountUp value={stat.value} suffix={stat.suffix} />
                        ) : (
                          stat.text
                        )}
                      </p>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3">
                  <span className="eyebrow eyebrow--plain">What We Offer</span>
                  <div className="flex flex-wrap gap-2">
                    {OFFERS.map((offer) => (
                      <Chip key={offer} size="sm">
                        {offer}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div
                  className="flex flex-wrap items-center justify-between gap-4 border-t pt-5"
                  style={{ borderColor: "var(--border)" }}
                >
                  <a
                    href="#"
                    className="text-sm underline-offset-4 hover:underline"
                    style={{ fontFamily: MONO_FONT, color: "var(--primary-text)" }}
                  >
                    your-domain.com
                  </a>
                  <PillButton variant="outline" size="sm" href="#">
                    Visit
                  </PillButton>
                </div>
              </div>
            </article>
          </Card>
        </Reveal>

        {/* ---------------------------------------------------------- 02 -- */}
        <Reveal delay={0.1}>
          <Card padding="lg">
            <div className="grid gap-4 md:grid-cols-[4.5rem_1fr] md:gap-10">
              <span
                aria-hidden="true"
                className="text-4xl leading-none tabular-nums md:text-5xl"
                style={{
                  fontFamily: MONO_FONT,
                  fontWeight: 500,
                  color: "var(--muted)",
                  letterSpacing: "-0.03em",
                }}
              >
                02
              </span>

              <div className="grid gap-3">
                <p className="h-card" style={{ color: "var(--foreground-soft)" }}>
                  Next venture — in orbit
                </p>
                <p className="max-w-[70ch]" style={{ color: "var(--muted)" }}>
                  A new placeholder paragraph for this reserved slot. Add the next company here and
                  the registry grows on its own.
                </p>
                <div>
                  <span
                    className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border px-3 py-1.5 text-xs font-medium"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--surface-2)",
                      color: "var(--muted)",
                    }}
                  >
                    Slot 02 reserved
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </SectionShell>
  );
}
