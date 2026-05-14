/**
 * Prefix internal paths for GitHub Pages "project" sites (`base` in astro.config).
 * In local dev, `import.meta.env.BASE_URL` is `/` so paths stay unchanged.
 */
export function withBase(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return path;
  const trimmed = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${trimmed}${path}`;
}
