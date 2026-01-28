import { MetadataRoute } from "next";

// Import de la liste des artistes pour générer les URLs
const ARTISTS = [
  { slug: "63og", name: "63OG" },
  { slug: "gouap-rttclan", name: "Gouap RTTCLAN" },
  { slug: "jeune-morty", name: "Jeune Morty" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://1-son-1-jour.vercel.app";

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Pages artistes dynamiques
  const artistPages: MetadataRoute.Sitemap = ARTISTS.map((artist) => ({
    url: `${baseUrl}/artiste/${artist.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...artistPages];
}
