"use client";

/* ============================================================================
   Shared UI primitives for the /home route.
   Every export here is intentionally neutral so the sections that other agents
   build can reuse the same visual language (tokens live in ../home.css).
   ========================================================================== */

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, ReactNode } from "react";

/** Signature easing for every entrance on this route: ease-out-expo. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/* -------------------------------------------------------------------------- */
/* usePrefersReducedMotion                                                    */
/* -------------------------------------------------------------------------- */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return typeof window === "undefined" ? false : window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

/**
 * `true` when the visitor asked the OS to reduce motion.
 *
 * Built on `useSyncExternalStore` so the server render and the hydration pass
 * both use the same (server) snapshot — no hydration mismatch — and the real
 * preference only kicks in from the first client render on. Use it to swap an
 * entrance animation for its resting state.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

/* -------------------------------------------------------------------------- */
/* SectionShell                                                               */
/* -------------------------------------------------------------------------- */

export interface SectionShellProps {
  /** Section content. */
  children: ReactNode;
  /** Anchor id, e.g. `id="projects"` so `#projects` links resolve. */
  id?: string;
  /** Accessible name for the landmark, e.g. "Highlights". */
  ariaLabel?: string;
  /** Alternative to `ariaLabel` — id of a heading rendered inside. */
  ariaLabelledBy?: string;
  /** Extra classes appended to the shell (space separated). */
  className?: string;
  /** Wrap children in the standard max-width container. Default `true`. */
  contained?: boolean;
  /** Vertical rhythm: `default` (generous) or `tight`. Default `default`. */
  padding?: "default" | "tight";
}

/**
 * Consistent vertical section container: full-width band with the standard
 * block padding, optionally wrapping children in `.hs-container`.
 */
export function SectionShell({
  children,
  id,
  ariaLabel,
  ariaLabelledBy,
  className,
  contained = true,
  padding = "default",
}: SectionShellProps) {
  const classes = cx("hs-section", padding === "tight" && "hs-section--tight", className);
  return (
    <section id={id} aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} className={classes}>
      {contained ? <div className="hs-container">{children}</div> : children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* SectionHeader                                                              */
/* -------------------------------------------------------------------------- */

export interface SectionHeaderProps {
  /** Uppercase mono label above the heading. Omit for a heading-only header. */
  eyebrow?: string;
  /** Heading copy. Rendered as `<h2>` unless `level` says otherwise. */
  heading: string;
  /** Optional supporting sentence under the heading. */
  description?: string;
  /** Right-hand slot — usually a `PillButton` link. */
  action?: ReactNode;
  /** Heading level. Default `2`. */
  level?: 2 | 3;
  /** Id for the heading, so the section can `aria-labelledby` it. */
  headingId?: string;
  /** Draw the short rule before the eyebrow. Default `true`. */
  showRule?: boolean;
  /** Extra classes on the header row. */
  className?: string;
}

/** Eyebrow + heading + optional description, with an optional right slot. */
export function SectionHeader({
  eyebrow,
  heading,
  description,
  action,
  level = 2,
  headingId,
  showRule = true,
  className,
}: SectionHeaderProps) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <div className={cx("hs-head", className)}>
      <div className="hs-head__text">
        {eyebrow ? (
          <span className={cx("eyebrow", !showRule && "eyebrow--plain")}>{eyebrow}</span>
        ) : null}
        <Heading className="h-section" id={headingId}>
          {heading}
        </Heading>
        {description ? <p className="hs-head__desc">{description}</p> : null}
      </div>
      {action ? <div className="hs-head__action">{action}</div> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Chip                                                                       */
/* -------------------------------------------------------------------------- */

export interface ChipProps {
  children: ReactNode;
  /** `subtle` = outlined (default), `solid` = filled surface, `accent` = tinted. */
  variant?: "subtle" | "solid" | "accent";
  size?: "sm" | "md";
  className?: string;
}

/** Pill tag with a border — used for tech stacks, categories, metadata. */
export function Chip({ children, variant = "subtle", size = "md", className }: ChipProps) {
  return (
    <span className={cx("hs-chip", `hs-chip--${variant}`, `hs-chip--${size}`, className)}>
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* PillButton                                                                 */
/* -------------------------------------------------------------------------- */

export interface PillButtonProps {
  children?: ReactNode;
  /** Renders an `<a>`. Without it, a `<button>` is rendered instead. */
  href?: string;
  variant?: "primary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md";
  /** Icon before the label (decorative — hidden from assistive tech). */
  leadingIcon?: ReactNode;
  /** Icon after the label (decorative — hidden from assistive tech). */
  trailingIcon?: ReactNode;
  className?: string;
  /** Required when the button carries no visible text. */
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  /** Only meaningful with `href`: opens in a new tab with `rel="noreferrer"`. */
  external?: boolean;
}

/** Pill link/button: `primary` (accent) | `outline` | `ghost` | `dark`. */
export function PillButton({
  children,
  href,
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  className,
  ariaLabel,
  type = "button",
  onClick,
  disabled,
  external,
}: PillButtonProps) {
  const classes = cx("hs-btn", `hs-btn--${variant}`, `hs-btn--${size}`, className);
  const content = (
    <>
      {leadingIcon ? (
        <span className="hs-btn__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {trailingIcon ? (
        <span className="hs-btn__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      ) : null}
    </>
  );

  if (href !== undefined) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={ariaLabel}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

export interface CardProps {
  children: ReactNode;
  className?: string;
  /** Lift + shadow on hover. Default `false`. */
  hover?: boolean;
  /** Inner padding. Default `md`. */
  padding?: "none" | "sm" | "md" | "lg";
}

/** Surface card: 1rem radius, hairline border, optional hover lift. */
export function Card({ children, className, hover = false, padding = "md" }: CardProps) {
  const padClass = padding === "none" ? undefined : `hs-card--pad-${padding}`;
  return (
    <div className={cx("hs-card", padClass, hover && "hs-card--lift", className)}>{children}</div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reveal                                                                     */
/* -------------------------------------------------------------------------- */

export interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element animates (stagger). Default `0`. */
  delay?: number;
  /** Duration in seconds. Default `0.6`. */
  duration?: number;
  /** Starting offset in px. Default `24`. */
  y?: number;
  /** Animate only the first time it enters the viewport. Default `true`. */
  once?: boolean;
  /** How much of the element must be visible to trigger (0–1). Default `0.2`. */
  amount?: number;
  style?: CSSProperties;
}

/**
 * Fade + rise while entering the viewport (ease-out-expo). Falls back to an
 * instantly visible wrapper when the user prefers reduced motion.
 *
 * The `.hs-reveal` class is always present so CSS can target reveal wrappers
 * (e.g. the no-JS fallback in `home.css`).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 24,
  once = true,
  amount = 0.2,
  style,
}: RevealProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <div className={cx("hs-reveal", className)} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cx("hs-reveal", className)}
      style={style}
      initial={{ opacity: 0.001, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* CountUp                                                                    */
/* -------------------------------------------------------------------------- */

export interface CountUpProps {
  /** Final value reached when the element scrolls into view. */
  value: number;
  /** Animation length in seconds. Default `1.4`. */
  duration?: number;
  /** Delay before counting starts, in seconds. Default `0`. */
  delay?: number;
  /** Value shown before the animation runs. Default `0`. */
  start?: number;
  prefix?: string;
  /** Usually `"+"`. */
  suffix?: string;
  /** Decimal places to keep. Default `0`. */
  decimals?: number;
  className?: string;
}

/** Number that counts from `start` up to `value` the first time it is in view.
 *  Server-renders `value`, so the real figure is shown without JavaScript. */
export function CountUp({
  value,
  duration = 1.4,
  delay = 0,
  start = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || prefersReduced) return;

    let frame = 0;
    let startedAt = 0;
    const delayMs = delay * 1000;
    const durationMs = Math.max(1, duration * 1000);

    const step = (now: number) => {
      if (startedAt === 0) startedAt = now;
      // First frame lands on `start` (even while the delay elapses), so the
      // server-rendered final value never lingers before the count begins.
      const t = Math.min(1, Math.max(0, (now - startedAt - delayMs) / durationMs));
      const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
      setDisplay(start + (value - start) * eased);
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [inView, prefersReduced, value, duration, delay, start]);

  // Reduced motion: show the final value straight away (no counter run).
  const shown = prefersReduced ? value : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}
