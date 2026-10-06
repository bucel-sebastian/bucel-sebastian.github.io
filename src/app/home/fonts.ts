import { Space_Grotesk } from "next/font/google";

/**
 * Display face for the `/home` route.
 *
 * Loaded here (inside the route) instead of the root layout so the existing
 * `/` route keeps rendering with its current fonts. The `variable` class is
 * applied on the `.home` root wrapper by `page.tsx`, which is what makes
 * `var(--font-display)` resolve inside `home.css`.
 *
 * Body text reuses Geist (`--font-geist-sans`) and eyebrows/labels reuse
 * Geist Mono (`--font-geist-mono`), both already loaded by the root layout.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/** Class list to put on the `.home` root wrapper (declares `--font-display`). */
export const homeFontClass = spaceGrotesk.variable;

/** The font loader itself, in case another route wants the same face. */
export const displayFont = spaceGrotesk;
