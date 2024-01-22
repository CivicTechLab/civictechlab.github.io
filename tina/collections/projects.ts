import type { Collection } from 'tinacms';

const Projects: Collection = {
  name: 'projects',
  label: 'Projects',
  format: 'json',
  path: 'src/content/projects',
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      isTitle: true,
      required: true,
    },
    {
      type: 'image',
      label: 'Hero Image',
      name: 'heroImgSrc',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
    },
    {
      type: 'rich-text',
      label: 'Main Content',
      name: 'content',
    },
    {
      type: 'object',
      label: 'Page Sections',
      name: 'sections',
      list: true,
      templates: [
        {
          label: 'Content Block',
          name: 'content',
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
          },
          fields: [
            {
              type: 'string',
              label: 'Section Title',
              name: 'title',
            },
            {
              type: 'rich-text',
              label: 'Section Content',
              name: 'content',
            },
          ],
        },
        {
          label: 'Partner Institutions',
          name: 'partnerInstitutions',
          fields: [
            {
              type: 'object',
              label: 'Partner Institutions',
              name: 'logo',
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.name };
                },
              },
              fields: [
                {
                  type: 'string',
                  label: 'Name',
                  name: 'name',
                },
                {
                  type: 'image',
                  label: 'Logo',
                  name: 'imgSrc',
                  required: true,
                },
                {
                  type: 'string',
                  label: 'Link',
                  name: 'link',
                  ui: {
                    validate(value) {
                      const expression =
                        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                      const regex = new RegExp(expression);
                      if (value && !value.match(regex)) {
                        return 'Invalid website. Website should begin with either http or https.';
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
  ],
};

export default Projects;
