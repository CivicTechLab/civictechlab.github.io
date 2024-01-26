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
    content: z.string().optional(),
    sections: z
      .array(
        z.object({
          title: z.string().optional(),
          content: z.string().optional(),
          name: z.string().optional(),
          imgSrc: z.string().optional(),
          link: z.string().url().optional(),
          logos: z
            .array(
              z.object({
                name: z.string().optional(),
                imgSrc: z.string().optional(),
                link: z.string().optional(),
              }),
            )
            .optional(),
          _template: z.string(),
        }),
      )
      .optional(),
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

const globalCollection = defineCollection({
  type: 'data',
  schema: z.object({
    header: z.object({
      nav: z.array(
        z.object({
          label: z.string(),
        }),
      ),
    }),
    footer: z.object({
      first: z.object({
        title: z.string(),
        description: z.string(),
      }),
      second: z.object({
        title: z.string(),
        description: z.string(),
      }),
      third: z.object({
        title: z.string(),
        links: z.array(
          z.object({
            label: z.string(),
            href: z.string(),
          }),
        ),
      }),
    }),
  }),
});

const joinUsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    jobs: z.array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        sections: z.array(
          z.object({
            title: z.string().optional(),
            content: z.string().optional(),
          }),
        ),
      }),
    ),
  }),
});

export const collections = {
  blog: blogCollection,
  home: homeCollection,
  projects: projectsCollection,
  people: peopleCollection,
  joinus: joinUsCollection,
  global: globalCollection,
};
