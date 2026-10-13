"use client";

import { useEffect, useState, type ReactNode } from "react";
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

/* ------------------------------------------------------------- npm data ---- */

/** npm user whose packages are listed — newly published packages appear with no code changes. */
const NPM_USER = "z0rg3d";
const NPM_PROFILE_URL = `https://www.npmjs.com/~${NPM_USER}`;
const NPM_SEARCH_URL = `https://registry.npmjs.org/-/v1/search?text=maintainer:${NPM_USER}&size=250`;

/** Most tags rendered per card. */
const MAX_TAGS = 4;

/** Empty grid cells rendered while the first fetch is in flight. */
const SKELETONS = [0, 1, 2];

/** One `package` object inside the npm registry search response. */
interface NpmSearchPackage {
  name: string;
  version?: string;
  description?: string;
  keywords?: string[];
  /** ISO timestamp of the latest publish. */
  date?: string;
  links?: {
    npm?: string;
    homepage?: string;
    repository?: string;
    bugs?: string;
  };
}

interface NpmSearchResponse {
  objects?: Array<{ package?: NpmSearchPackage }>;
}

interface PackageEntry {
  name: string;
  /** Registry version — the chip renders it as `v<version>`. */
  version: string;
  description: string;
  tags: string[];
  downloads: number;
  /** Formatted publish date, e.g. "Jan 14, 2026". */
  updated: string;
  href: string;
}

type LoadState =
  | { status: "loading" }
  | { status: "ready"; packages: PackageEntry[] }
  | { status: "error" };

/** "Jan 14, 2026" from an ISO timestamp. */
function formatUpdated(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/** Last-month downloads for one package — falls back to `0` so one bad call can't break the section. */
async function fetchMonthlyDownloads(name: string): Promise<number> {
  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(name)}`,
    );
    if (!response.ok) return 0;
    const data = (await response.json()) as { downloads?: unknown };
    return typeof data.downloads === "number" ? data.downloads : 0;
  } catch {
    return 0;
  }
}

/** Open-source section: live package cards with version, tags and downloads. */
export function NpmPackages() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(NPM_SEARCH_URL);
        if (!response.ok) {
          throw new Error(`npm search responded with ${response.status}`);
        }
        const data = (await response.json()) as NpmSearchResponse;

        const found = (Array.isArray(data.objects) ? data.objects : [])
          .map((object) => object?.package)
          .filter((pkg): pkg is NpmSearchPackage => Boolean(pkg?.name))
          .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

        const packages = await Promise.all(
          found.map(async (pkg) => ({
            name: pkg.name,
            version: pkg.version ?? "",
            description: pkg.description?.trim() || "No description provided.",
            tags: (pkg.keywords ?? []).slice(0, MAX_TAGS),
            downloads: await fetchMonthlyDownloads(pkg.name),
            updated: formatUpdated(pkg.date),
            href: pkg.links?.npm ?? `https://www.npmjs.com/package/${pkg.name}`,
          })),
        );

        if (cancelled) return;
        setState({ status: "ready", packages });
      } catch {
        if (cancelled) return;
        setState({ status: "error" });
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  let content: ReactNode;
  if (state.status === "loading") {
    content = SKELETONS.map((id) => <div key={id} className="hs-placeholder" aria-hidden="true" />);
  } else if (state.status === "error") {
    content = <div className="hs-placeholder">Couldn&apos;t load packages right now.</div>;
  } else if (state.packages.length === 0) {
    content = <div className="hs-placeholder">No packages published yet — check back soon.</div>;
  } else {
    content = state.packages.map((pkg, index) => (
      <Reveal key={pkg.name} delay={index * 0.08} className="h-full">
        <article className="hs-card hs-card--lift flex h-full flex-col gap-4 p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <Chip variant="accent" size="sm">
              v{pkg.version}
            </Chip>
            <PillButton
              variant="outline"
              size="sm"
              href={pkg.href}
              ariaLabel={`View ${pkg.name} on npm`}
              trailingIcon={<ArrowUpRightIcon />}
            />
          </div>

          <h3 className="h-card break-words">{pkg.name}</h3>

          <p className="text-soft">{pkg.description}</p>

          {pkg.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {pkg.tags.map((tag) => (
                <Chip key={tag} size="sm">
                  {tag}
                </Chip>
              ))}
            </div>
          ) : null}

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
    ));
  }

  return (
    <SectionShell id="npm-packages" ariaLabel="NPM Packages">
      <SectionHeader
        eyebrow="Open Source"
        heading="NPM Packages"
        description="Open-source packages I publish on npm."
        action={
          <PillButton variant="outline" href={NPM_PROFILE_URL} trailingIcon={<ArrowUpRightIcon />}>
            View NPM Profile
          </PillButton>
        }
      />

      <div
        className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
        aria-busy={state.status === "loading"}
      >
        {content}
      </div>
    </SectionShell>
  );
}
