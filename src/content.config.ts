import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 1. 原有的博客集合
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

// 2. 生活板块集合
const life = defineCollection({
	loader: glob({ base: './src/content/life', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		category: z.enum(['game', 'anime', 'photo', 'other']),
		cover: z.string(),
		tags: z.array(z.string()).optional(),
	}),
});

// ★ 3. 找回的更新日志集合
const updatelog = defineCollection({
	loader: glob({ base: './src/content/updatelog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
	}),
});

// ★ 必须把 updatelog 加进导出列表！
export const collections = { blog, life, updatelog };