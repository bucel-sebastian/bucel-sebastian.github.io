"use client";

import "./Header.css";

import { AnimatePresence, motion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  EASE_OUT_EXPO,
  PillButton,
  usePrefersReducedMotion,
} from "./ui/primitives";

/* --------------------------------------------------------------- icons ---- */

function Glyph({
  children,
  size = 18,
}: {
  children: ReactNode;
  size?: number;
}) {
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

function MoonIcon() {
  return (
    <Glyph>
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </Glyph>
  );
}

function SunIcon() {
  return (
    <Glyph>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </Glyph>
  );
}

/** Both glyphs share one grid cell so the swap can crossfade in place. */
const GLYPH_SLOT: CSSProperties = {
  display: "grid",
  placeItems: "center",
  width: 18,
  height: 18,
};

/**
 * The visitor's explicit choice, or `null` when they never made one (or
 * storage is unavailable) — in which case the OS preference is allowed to win.
 */
function readStoredTheme(): "light" | "dark" | null {
  try {
    const value = localStorage.getItem("hs-theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

/**
 * `.home` is the single source of truth for the theme: the layout's inline
 * script writes `data-theme` before first paint, the toggle writes it on
 * click, and the OS-follow path writes it on preference changes. The header
 * just mirrors it back — same subscription GithubSection uses for the
 * calendar, so state can never drift from the DOM.
 */
function subscribeTheme(onStoreChange: () => void): () => void {
  const root = document.querySelector(".home");
  if (!root) return () => {};
  const observer = new MutationObserver(onStoreChange);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function readTheme(): "light" | "dark" {
  return document.querySelector(".home")?.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** Server/static snapshot: the baked markup ships with no attribute → light. */
function readServerTheme(): "light" | "dark" {
  return "light";
}

function GlobeIcon() {
  return (
    <Glyph>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 4 9 15 15 0 0 1-4 9 15 15 0 0 1-4-9 15 15 0 0 1 4-9z" />
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

function PhoneIcon() {
  return (
    <Glyph>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </Glyph>
  );
}

function MenuIcon() {
  return (
    <Glyph>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Glyph>
  );
}

function CloseIcon() {
  return (
    <Glyph>
      <path d="M6 6l12 12M18 6L6 18" />
    </Glyph>
  );
}

/** In-page section anchors surfaced by the menu (ids live on each section). */
const MENU_LINKS = [
  "highlights",
  "about",
  "projects",
  "services",
  "companies",
  "github",
  "skills",
  "npm-packages",
  "games",
  "proof-of-concepts",
  "legacy-projects",
  "certifications",
  "skill-badges",
  "volunteering",
  "testimonials",
  "contact",
] as const;

const MENU_LABELS: Record<(typeof MENU_LINKS)[number], string> = {
  highlights: "Highlights",
  about: "About",
  projects: "Projects",
  services: "Services",
  companies: "Companies",
  github: "GitHub",
  skills: "Skills",
  "npm-packages": "NPM Packages",
  games: "Games",
  "proof-of-concepts": "Proof of Concepts",
  "legacy-projects": "Legacy Projects",
  certifications: "Certifications",
  "skill-badges": "Skill Badges",
  volunteering: "Volunteering",
  testimonials: "Testimonials",
  contact: "Contact",
};

function Header() {
  const prefersReduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolledOut, setScrolledOut] = useState(false);
  /* Mirrors `.home[data-theme]`: the server snapshot is `light`, so the static
     HTML (no attribute → light tokens) hydrates without a mismatch, then the
     value the inline script already applied shows up one frame later. */
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    readServerTheme,
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  /* Follow the OS live — but only while the visitor never made an explicit
     choice: once `hs-theme` holds a value, the stored theme wins and OS
     changes are ignored. Writing the attribute is enough; the store above
     picks the flip up and moves the icon. */
  useEffect(() => {
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onSchemeChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme() !== null) return;
      document
        .querySelector(".home")
        ?.setAttribute("data-theme", event.matches ? "dark" : "light");
    };

    scheme.addEventListener("change", onSchemeChange);
    return () => scheme.removeEventListener("change", onSchemeChange);
  }, []);

  /* Hide-on-scroll-down / reveal-on-scroll-up. The sticky WRAP moves — a
     transform keeps it in flow, so layout, hero offsets and the skip link all
     keep depending on the header still taking its space. A signed accumulator
     absorbs jitter: a direction change restarts the run and every state flip
     resets it, so re-hiding always needs a fresh 6px of deliberate travel. */
  useEffect(() => {
    const HIDE_SCROLL_ZONE = 80; // the wrap's own flow height — never hide near the top
    const DIRECTION_THRESHOLD = 6; // px of committed movement per state change
    let lastY = window.scrollY;
    let accumulated = 0;
    let frame = 0;

    const evaluate = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      if (y <= HIDE_SCROLL_ZONE) {
        // At/near the top (or after an anchor jump home) always show.
        accumulated = 0;
        setScrolledOut(false);
        return;
      }
      if (openRef.current) {
        // Menu open pins the header visible; closing resumes normal rules.
        accumulated = 0;
        return;
      }
      if ((delta > 0 && accumulated < 0) || (delta < 0 && accumulated > 0)) {
        accumulated = 0;
      }
      accumulated += delta;

      if (accumulated >= DIRECTION_THRESHOLD) {
        accumulated = 0;
        setScrolledOut(true);
      } else if (accumulated <= -DIRECTION_THRESHOLD) {
        accumulated = 0;
        setScrolledOut(false);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Keyboard reveal. While hidden the wrap is `visibility: hidden` — outside
     the tab order, so `focusin` can never fire on its own and Tab has to lift
     the header BEFORE the browser moves focus. Focusing a mid-slide rect makes
     Chrome jump-scroll to the top (measured: 800 → 0), so this path reveals
     with transitions suppressed (instant); scroll-driven reveals still slide.
     focusin stays as the safety net for focus entering by any other route. */
  useEffect(() => {
    const revealForFocus = () => {
      const wrap = wrapRef.current;
      if (!wrap || !wrap.classList.contains("is-hidden")) return;
      wrap.style.transition = "none";
      setScrolledOut(false);
      requestAnimationFrame(() => {
        wrap.style.transition = "";
      });
    };

    const isFocusableInFlow = (node: Element): boolean => {
      const style = window.getComputedStyle(node);
      return style.display !== "none" && style.visibility !== "hidden";
    };

    /** True when `active` is the last stop before the header (Shift+Tab). */
    const isFirstOutsideHeader = (active: Element | null): boolean => {
      if (!active) return false;
      const wrap = wrapRef.current;
      if (!wrap || wrap.contains(active)) return false;
      const candidates = document.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      for (const candidate of candidates) {
        if (wrap.contains(candidate)) continue;
        if (!isFocusableInFlow(candidate)) continue;
        return candidate === active;
      }
      return false;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const active = document.activeElement;
      const atRoot =
        !active || active === document.body || active === document.documentElement;
      const inHeader = wrapRef.current?.contains(active) ?? false;
      if (atRoot || inHeader || (event.shiftKey && isFirstOutsideHeader(active))) {
        revealForFocus();
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (target instanceof Node && wrapRef.current?.contains(target)) {
        setScrolledOut(false);
      }
    };

    const wrap = wrapRef.current;
    window.addEventListener("keydown", onKeyDown);
    wrap?.addEventListener("focusin", onFocusIn);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      wrap?.removeEventListener("focusin", onFocusIn);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (
        wrapRef.current?.contains(
          event.target instanceof Node ? event.target : null,
        )
      )
        return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  /* Flip the route root's `data-theme` (what the CSS contract keys off), then
     remember the explicit choice so OS changes stop overriding it. No setState
     here: the MutationObserver store above repaints the icon from the attribute
     itself. `.home` may be absent if this header ever renders without the route
     wrapper — the optional chaining keeps the button harmless there. */
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.querySelector(".home")?.setAttribute("data-theme", next);
    try {
      localStorage.setItem("hs-theme", next);
    } catch {
      /* storage unavailable (private mode) — the in-page theme still applies */
    }
  };

  return (
    <header>
      <div
        className={`hs-nav-wrap${scrolledOut ? " is-hidden" : ""}`}
        ref={wrapRef}
      >
        <motion.nav
          className="hs-nav"
          aria-label="Primary navigation"
          initial={prefersReduced ? false : { opacity: 0.001, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            className="hs-logo"
            href="#home-hero"
            aria-label="Ion-Sebastian Bucel — Homepage"
          >
            <span aria-hidden="true">[BIS]</span>
          </a>

          <div className="hs-nav__right">
            <div className="hs-nav__cluster">
              <button
                type="button"
                className="hs-icon-btn"
                aria-label={
                  theme === "light"
                    ? "Switch to dark theme"
                    : "Switch to light theme"
                }
                onClick={toggleTheme}
              >
                <span style={GLYPH_SLOT} aria-hidden="true">
                  {prefersReduced ? (
                    theme === "light" ? <MoonIcon /> : <SunIcon />
                  ) : (
                    <AnimatePresence initial={false}>
                      <motion.span
                        key={theme}
                        style={{ gridArea: "1 / 1" }}
                        initial={{ opacity: 0, rotate: -75, scale: 0.6 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{
                          opacity: 0,
                          rotate: 75,
                          scale: 0.6,
                          transition: { duration: 0.18, ease: EASE_OUT_EXPO },
                        }}
                        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      >
                        {theme === "light" ? <MoonIcon /> : <SunIcon />}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </span>
              </button>

              <a
                className="hs-icon-btn hs-icon-btn--accent"
                href="#"
                aria-label="Contact by phone"
              >
                <PhoneIcon />
              </a>
            </div>

            <button
              type="button"
              ref={toggleRef}
              className={`hs-icon-btn${open ? " is-open" : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="hs-menu"
              onClick={() => {
                setScrolledOut(false);
                setOpen((value) => !value);
              }}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {open && (
            <motion.div
              id="hs-menu"
              className="hs-nav__menu"
              initial={prefersReduced ? false : { opacity: 0.001, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="hs-nav__menu-list">
                {MENU_LINKS.map((id, index) => (
                  <li key={id}>
                    <a
                      className="hs-nav__menu-link"
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="hs-nav__menu-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{MENU_LABELS[id]}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.nav>
      </div>
    </header>
  );
}

export default Header;
