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

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    content: z.string(),
    sections: z.array(
      z.object({
        title: z.string().optional(),
        content: z.string().optional(),
        name: z.string().optional(),
        imgSrc: z.string().optional(),
        link: z.string().url().optional(),
        _template: z.string(),
      }),
    ),
  }),
});

const homeCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      home: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          imgSrc: image().optional(),
        }),
      ),
    }),
});

const peopleCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      people: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          imgSrc: image().optional(),
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
  projects: projectsCollection,
  people: peopleCollection,
  joinus: joinUsCollection,
};
