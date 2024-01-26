import type { Collection } from 'tinacms';

const JoinUs: Collection = {
  name: 'joinus',
  label: 'Join Us',
  format: 'json',
  path: 'src/content/joinus',
  ui: {
    router: () => {
      return `/join-us`;
    },
  },
  fields: [
    {
      type: 'object',
      name: 'jobs',
      label: 'Jobs',
      list: true,
      description: 'Drag to reorder the jobs, the first item will be displayed first.',
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Job Title',
        },
        {
          type: 'rich-text',
          name: 'description',
          label: 'Job Description',
        },
        {
          type: 'object',
          name: 'sections',
          label: 'Job Sections',
          list: true,
          description: 'Drag to reorder the sections.',
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
          },
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Job Section Title',
            },
            {
              type: 'rich-text',
              name: 'content',
              description:
                "To link to an email, prepend the email with 'mailto'. For example, if linking to civictechlabnus@gmail.com, highlight the corresponding text and add a link with the URL 'mailto:civictechlabnus@gmail.com'.",
              label: 'Job Section Content',
            },
          ],
        },
      ],
    },
  ],
};

export default JoinUs;
