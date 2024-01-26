import type { Collection } from 'tinacms';

const Global: Collection = {
  name: 'global',
  label: 'Global',
  format: 'json',
  path: 'src/content/global',
  ui: {
    global: true,
  },
  fields: [
    {
      type: 'object',
      label: 'Header',
      name: 'header',
      description: 'Controls the top navigation in the application.',
      fields: [
        {
          type: 'object',
          label: 'Nav Links',
          description: 'WARNING: Changing or deleting any of these fields might break the navigation on the website.',
          name: 'nav',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          fields: [
            {
              type: 'string',
              label: 'Label',
              name: 'label',
            },
            {
              type: 'string',
              label: 'Link',
              name: 'href',
            },
            {
              type: 'boolean',
              label: 'Is project list?',
              name: 'isProjectList',
            },
          ],
        },
      ],
    },
    {
      type: 'object',
      label: 'Footer',
      name: 'footer',
      description: 'Controls the content displayed in the footer.',
      fields: [
        {
          type: 'object',
          label: 'First Section',
          name: 'first',
          fields: [
            {
              type: 'string',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'rich-text',
              label: 'Description',
              name: 'description',
              description:
                "To link to an email, prepend the email with 'mailto'. For example, if linking to civictechlabnus@gmail.com, highlight the corresponding text and add a link with the URL 'mailto:civictechlabnus@gmail.com'.",
            },
          ],
        },
        {
          type: 'object',
          label: 'Second Section',
          name: 'second',
          fields: [
            {
              type: 'string',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'rich-text',
              label: 'Description',
              name: 'description',
              description:
                "To link to an email, prepend the email with 'mailto'. For example, if linking to civictechlabnus@gmail.com, highlight the corresponding text and add a link with the URL 'mailto:civictechlabnus@gmail.com'.",
            },
          ],
        },
        {
          type: 'object',
          label: 'Third Section',
          name: 'third',
          fields: [
            {
              type: 'string',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'object',
              label: 'Quick Links',
              name: 'links',
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
              },
              fields: [
                {
                  type: 'string',
                  label: 'Label',
                  name: 'label',
                  ui: {
                    validate: (value, data) => {
                      const labelCount = data.footer.third.links
                        .map((link: { label: string }) => link.label && link.label.trim())
                        .filter((name: string) => name === (value || '').trim()).length;

                      if (labelCount > 1) {
                        return 'The label must be unique.';
                      }
                    },
                  },
                },
                {
                  type: 'string',
                  label: 'Link',
                  description:
                    'Enter the page to link to, must begin with a slash. The home page is denoted by a single slash.',
                  name: 'href',
                  ui: {
                    validate: (value, data) => {
                      if (value && !value.startsWith('/')) {
                        return 'Link to page must begin with a slash.';
                      }
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'News Tags',
      name: 'tags',
      type: 'object',
      description: 'Controls the tags available when creating a news article.',
      fields: [
        {
          label: 'Tag',
          name: 'tag',
          type: 'object',
          description:
            'WARNING: Deleting a tag may cause the news page to not function correctly. Only delete a tag when you are sure it is not in use.',
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.name };
            },
          },
          fields: [
            {
              type: 'string',
              name: 'name',
              label: 'Tag Name',
            },
            {
              type: 'string',
              name: 'color',
              label: 'Color',
              ui: {
                component: 'color',
              },
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
