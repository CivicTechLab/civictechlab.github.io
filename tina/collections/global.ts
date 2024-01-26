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
      fields: [
        {
          type: 'object',
          label: 'Nav Links',
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
      fields: [
        {
          label: 'Tag',
          name: 'tag',
          type: 'object',
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
          ],
        },
      ],
    },
  ],
};

export default Global;
