import type { Collection } from 'tinacms';

const Projects: Collection = {
  name: 'projects',
  label: 'Projects',
  format: 'json',
  path: 'src/content/projects',
  ui: {
    router: ({ document }) => {
      return `/projects/${document._sys.filename.toLowerCase()}`;
    },
  },
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
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
            defaultItem: {
              title: 'Partner Institutions',
            },
          },
          fields: [
            {
              type: 'string',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'rich-text',
              label: 'Description',
              name: 'content',
            },
            {
              type: 'object',
              label: 'Partner Institutions',
              name: 'logos',
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
                  ui: {
                    validate: (value, data) => {
                      const nameCount = data.sections
                        .filter((section: { _template: string }) => section._template === 'partnerInstitutions')
                        .flatMap((partners: { logos: { name: string } }) => partners.logos)
                        .map((logo: { name: string }) => logo.name.trim())
                        .filter((name: string) => name === value.trim()).length;

                      if (nameCount > 1) {
                        return 'The name must be unique.';
                      }
                    },
                  },
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
