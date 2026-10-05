import type { NextConfig } from "next";

// Set by actions/configure-pages in CI (e.g. "/bucel-sebastian", or "" for a
// user/organization site or a custom domain). Empty locally, so `pnpm dev`
// and a plain `pnpm build` keep serving from the root.
const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves directory indexes: `/route/` -> `/route/index.html`,
  // and uses the exported `404.html` as the site-wide not-found page.
  trailingSlash: true,
  ...(basePath ? { basePath } : {}),
  // `next/image` with `output: "export"` emits the raw `src` for public-folder
  // assets (no basePath applied), so pages need the prefix themselves.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
