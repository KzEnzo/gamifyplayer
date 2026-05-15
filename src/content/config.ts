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
    /** Set `false` on template files so they are not built as pages. */
    publish: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  }),
});

const briefings = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    game: z.enum(["red-desert", "gta-6", "once-human"]).optional(),
    kind: z.enum(["official", "stream", "preview"]).optional(),
    freshness: z.string().optional(),
    /** Set `false` on template files so they are not built as pages. */
    publish: z.boolean().default(true),
  }),
});

export const collections = { guides, briefings };
