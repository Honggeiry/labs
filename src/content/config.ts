import { defineCollection, z } from "astro:content";

const blogauthors = defineCollection({
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			jobTitle: z.string().optional(),
			avatar: image().optional(),
			url: z.string().optional(),
		}),
	type: "data",
});

const blog = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			shortTitle: z.string().optional(),
			description: z.string(),
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			authors: z.array(z.string()),
			heroImage: image().optional(),
			featured: z.boolean().default(false),
			tags: z.array(z.enum(["Cheerp", "CheerpJ", "CheerpX"])).optional(),
		}),
});

const docs = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		// TODO: optional short title (for navigation)
		// TODO: description (for SEO)
	}),
});

export const collections = { docs, blog, blogauthors };
