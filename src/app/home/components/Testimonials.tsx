"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Card,
  EASE_OUT_EXPO,
  Reveal,
  SectionHeader,
  SectionShell,
  usePrefersReducedMotion,
} from "../../components/ui/primitives";

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

function StarIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.6l2.9 5.88 6.49.95-4.69 4.57 1.11 6.46L12 17.4l-5.81 3.06 1.11-6.46-4.69-4.57 6.49-.95L12 2.6z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <Glyph>
      <path d="M15 18l-6-6 6-6" />
    </Glyph>
  );
}

function ChevronRightIcon() {
  return (
    <Glyph>
      <path d="M9 18l6-6-6-6" />
    </Glyph>
  );
}

function ArrowUpRightIcon() {
  return (
    <Glyph size={14}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Glyph>
  );
}

/* ------------------------------------------------------------ testimonials */

interface Testimonial {
  id: string;
  name: string;
  initials: string;
  role: string;
  quote: string;
}

/** Placeholder quotes — swap for real client feedback before launch. */
const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-01",
    name: "Placeholder Client",
    initials: "PC",
    role: "Client",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Replace this quote with a few sentences from a happy client — two to four lines reads best in this card.",
  },
  {
    id: "testimonial-02",
    name: "Sample Client",
    initials: "SC",
    role: "Client",
    quote:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. A slightly longer placeholder quote shows how the card handles several lines of text.",
  },
  {
    id: "testimonial-03",
    name: "Example Client",
    initials: "EC",
    role: "Client",
    quote: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
  },
  {
    id: "testimonial-04",
    name: "Demo Client",
    initials: "DC",
    role: "Client",
    quote:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Another placeholder testimonial belongs in this slot.",
  },
  {
    id: "testimonial-05",
    name: "Another Client",
    initials: "AC",
    role: "Client",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Replace this with real feedback once you have it.",
  },
];

/** One card per track slot on mobile, two side by side from `lg` up. */
const TRACK: CSSProperties = {
  display: "grid",
  gap: "1.25rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 24rem), 1fr))",
};

const AVATAR: CSSProperties = {
  flex: "none",
  display: "grid",
  placeItems: "center",
  width: "3rem",
  height: "3rem",
  borderRadius: "var(--radius-pill)",
  background: "var(--accent-gradient)",
  color: "#ffffff",
  fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
  fontSize: "0.875rem",
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

/**
 * Rating summary plus a manual (never auto-playing) testimonial carousel.
 * One card on small screens, two from `lg` up; arrow buttons disable at the
 * ends and dot buttons jump straight to a slide.
 */
export function Testimonials() {
  const prefersReduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const lastIndex = TESTIMONIALS.length - 1;

  const goTo = (next: number) => {
    if (next < 0 || next > lastIndex || next === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const current = TESTIMONIALS[index];
  const following: Testimonial | undefined = TESTIMONIALS[index + 1];
  const visible: Testimonial[] = following ? [current, following] : [current];

  const cards = visible.map((testimonial, position) => (
    <Card
      key={testimonial.id}
      hover
      padding="lg"
      className={`${position === 0 ? "flex" : "hidden lg:flex"} flex-col gap-5`}
    >
      <div className="flex flex-wrap items-center gap-4">
        <span aria-hidden="true" style={AVATAR}>
          {testimonial.initials}
        </span>

        <div className="flex flex-col gap-0.5">
          <h3 className="h-card">{testimonial.name}</h3>
          <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--muted)" }}>{testimonial.role}</p>
        </div>

        <span
          className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1 text-xs"
          style={{
            borderRadius: "var(--radius-pill)",
            background: "color-mix(in srgb, var(--success) 16%, transparent)",
            border: "1px solid color-mix(in srgb, var(--success) 40%, transparent)",
            color: "var(--foreground-soft)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "0.4rem",
              height: "0.4rem",
              borderRadius: "var(--radius-pill)",
              background: "var(--success)",
            }}
          />
          Verified client
        </span>
      </div>

      <blockquote style={{ flex: 1, margin: 0 }}>
        <p
          style={{
            margin: 0,
            fontStyle: "italic",
            fontSize: "0.9375rem",
            lineHeight: 1.7,
            color: "var(--foreground-soft)",
          }}
        >
          {`“${testimonial.quote}”`}
        </p>
      </blockquote>

      <a
        href="#"
        className="inline-flex items-center gap-1.5 text-sm font-medium"
        style={{ color: "var(--primary-text)" }}
      >
        View Project
        <ArrowUpRightIcon />
      </a>
    </Card>
  ));

  return (
    <SectionShell id="testimonials" ariaLabel="Testimonials">
      <SectionHeader
        eyebrow="Testimonials"
        heading="What clients say about working with me"
        description="A short description of this section goes here."
        action={
          <Reveal className="flex items-center gap-4" delay={0.08}>
            <span
              style={{
                fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
                fontSize: "clamp(2.25rem, 4vw, 3rem)",
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              5.0
            </span>
            <span className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1" style={{ color: "var(--warning)" }}>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <span className="sr-only">Rated 5.0 out of 5</span>
              </span>
              <span className="text-muted" style={{ fontSize: "0.8125rem" }}>
                5 reviews · 4 clients
              </span>
            </span>
          </Reveal>
        }
      />

      <Reveal delay={0.1}>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Testimonials carousel"
          style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          {prefersReduced ? (
            <div style={TRACK}>{cards}</div>
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                style={TRACK}
                initial={{ opacity: 0.001, x: direction * 36 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0.001,
                  x: direction * -36,
                  transition: { duration: 0.18, ease: EASE_OUT_EXPO },
                }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
              >
                {cards}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((testimonial, dotIndex) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => goTo(dotIndex)}
                aria-label={`Show testimonial ${dotIndex + 1}`}
                aria-current={dotIndex === index}
                style={{
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  height: "0.5rem",
                  width: dotIndex === index ? "1.5rem" : "0.5rem",
                  borderRadius: "var(--radius-pill)",
                  background: dotIndex === index ? "var(--primary)" : "var(--border-strong)",
                  transition:
                    "width var(--dur-base) var(--ease-out-expo), background-color var(--dur-base) var(--ease-out-expo)",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hs-icon-btn"
              aria-label="Previous testimonials"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
              style={index === 0 ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className="hs-icon-btn"
              aria-label="Next testimonials"
              disabled={index === lastIndex}
              onClick={() => goTo(index + 1)}
              style={index === lastIndex ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
