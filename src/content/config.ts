import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const homeCollection = defineCollection({
  type: 'data',
  schema: z.object({
    home: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        imgSrc: z.string().optional(),
      }),
    ),
  }),
});

const peopleCollection = defineCollection({
  type: 'data',
  schema: z.object({
    people: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        imgSrc: z.string().optional(),
        website: z.string().url().optional(),
      }),
    ),
  }),
});

const joinUsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
  home: homeCollection,
  people: peopleCollection,
  joinus: joinUsCollection,
};
