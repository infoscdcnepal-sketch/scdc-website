import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
const siteUrl = site.url;

const routes = [
  "",
  "/services",
  "/services/shop-drawings",
  "/services/structural-drawings",
  "/services/bim-support",
  "/why-scdc",
  "/portfolio",
  "/service-plan",
  "/service-flowchart",
  "/about",
  "/contact",
];

const locales = ["en", "ja"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route.startsWith("/services") ? 0.9 : 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/en${route}`,
          ja: `${siteUrl}/ja${route}`,
          "x-default": `${siteUrl}/en${route}`,
        },
      },
    })),
  );
}
