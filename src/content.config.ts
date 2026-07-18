import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/projects' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        author: z.string().optional(),
        affiliation: z.union([z.string(), z.array(z.string())]).optional(),
        toc: z.boolean().optional(),
        thumbnail: image().optional(),
        thumbnailAlt: z.string().optional(),
        updatedDate: z.coerce.date().optional(),
        draft: z.boolean().optional(),
    }),
});

export const collections = { projects };
