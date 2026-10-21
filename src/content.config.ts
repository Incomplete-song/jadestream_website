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

// 2. ★ 新增：更新日志集合
const updatelog = defineCollection({
	// 告诉 Astro 去 src/content/updatelog 文件夹找 md 文件
	loader: glob({ base: './src/content/updatelog', pattern: '**/*.md' }),
	// 日志不需要复杂的封面图，只需要标题、摘要和日期
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
	}),
});

// 3. ★ 把 updatelog 导出，让页面可以读取
export const collections = { blog, updatelog };