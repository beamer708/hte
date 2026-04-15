import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://howtoerlc.xyz/sitemap.xml",
    host: "https://howtoerlc.xyz",
  };
}
