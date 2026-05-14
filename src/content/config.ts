import { defineCollection, z } from "astro:content";

const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    game: z.enum(["red-desert", "gta-6", "once-human"]),
    gameVersion: z.string(),
    lastVerified: z.coerce.date(),
    platforms: z.array(z.string()),
    hasAnimatedMedia: z.boolean().default(false),
    animatedMediaSrc: z.string().optional(),
    animatedMediaAlt: z.string().optional(),
  }),
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    game: z.enum(["red-desert", "gta-6", "once-human"]).optional(),
    published: z.coerce.date(),
    kind: z.enum(["official", "stream", "preview"]),
    freshness: z.string(),
  }),
});

export const collections = { guides, news };
