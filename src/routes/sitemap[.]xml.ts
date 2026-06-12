import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { LAPTOPS } from "@/data/laptops";

const BASE_URL = "https://lapwise-ai.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/wizard", "/catalog", "/compare", "/insights"];
        const laptopPaths = LAPTOPS.map((l) => `/laptop/${l.id}`);
        const urls = [...staticPaths, ...laptopPaths].map(
          (p) =>
            `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
