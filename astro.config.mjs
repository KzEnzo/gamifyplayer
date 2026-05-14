import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * GitHub Actions sets PUBLIC_SITE_URL + BASE_PATH (see .github/workflows/deploy.yml).
 * Local dev: leave unset → example site URL and no base path.
 */
const site = process.env.PUBLIC_SITE_URL || "https://gamifyplayer.example";
const rawBase = process.env.BASE_PATH?.trim() || "";
const base =
  rawBase && rawBase !== "/"
    ? rawBase.startsWith("/")
      ? rawBase
      : `/${rawBase}`
    : undefined;

/** Fix Markdown links like `/guides/foo/` when site is served under `/repo/`. */
function rehypeAppendBasePath() {
  const raw = process.env.BASE_PATH?.trim() || "";
  const prefix =
    raw && raw !== "/"
      ? (raw.startsWith("/") ? raw : `/${raw}`).replace(/\/$/, "")
      : "";

  function walk(node, fn) {
    if (!node || typeof node !== "object") return;
    fn(node);
    if (Array.isArray(node.children)) {
      for (const c of node.children) walk(c, fn);
    }
  }

  return (tree) => {
    if (!prefix) return;
    walk(tree, (node) => {
      if (node?.type !== "element") return;
      if (node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href !== "string" || !href.startsWith("/") || href.startsWith("//")) return;
        node.properties.href = `${prefix}${href}`;
      }
      if (node.tagName === "img") {
        const src = node.properties?.src;
        if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//")) return;
        node.properties.src = `${prefix}${src}`;
      }
    });
  };
}

export default defineConfig({
  site,
  ...(base ? { base } : {}),
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
    rehypePlugins: [rehypeAppendBasePath],
  },
});
