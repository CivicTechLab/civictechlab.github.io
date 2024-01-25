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
      type: 'rich-text',
      label: 'Caption',
      name: 'caption',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'rich-text',
      label: 'Main Content',
      name: 'content',
      description: "To insert a video, select 'Video' from the 'Embed' dropdown.",
      parser: {
        type: 'mdx',
      },
      templates: [
        {
          name: 'Video',
          label: 'Video',
          ui: {
            itemProps: (item) => {
              return { label: item?.src };
            },
          },
          fields: [
            {
              name: 'src',
              label: 'Source',
              description:
                'Enter a YouTube embedded link e.g. https://www.youtube.com/embed/dQw4w9WgXcQ?si=8HOpMTZzMyY_3Op7 or the filename of a video stored in the videos folder e.g. video.mp4.',
              type: 'string',
            },
          ],
        },
      ],
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
              parser: {
                type: 'mdx',
              },
              templates: [
                {
                  name: 'Video',
                  label: 'Video',
                  fields: [
                    {
                      name: 'src',
                      label: 'Source',
                      description:
                        'Enter a YouTube embedded link e.g. https://www.youtube.com/embed/dQw4w9WgXcQ?si=8HOpMTZzMyY_3Op7 or the filename of a video stored in the videos folder e.g. video.mp4.',
                      type: 'string',
                      ui: {
                        validate: (value) => {
                          if (!value) {
                            return;
                          }

                          if (value.includes('youtube.com')) {
                            if (!value.startsWith('https://www.youtube.com/embed/')) {
                              return 'YouTube link should begin with https://www.youtube.com/embed/.';
                            }
                          } else {
                            if (!value.endsWith('.mp4') && !value.endsWith('.mov')) {
                              return 'The video filename should end with .mp4 or .mov and be stored in the videos folder.';
                            }
                          }
                        },
                      },
                    },
                  ],
                },
                {
                  name: 'ButtonWithText',
                  label: 'Button with Text',
                  fields: [
                    {
                      type: 'string',
                      label: 'Text',
                      name: 'text',
                    },
                    {
                      type: 'string',
                      label: 'Button Text',
                      name: 'btnTxt',
                    },
                    {
                      type: 'string',
                      label: 'Button Link',
                      description: 'Insert an external link, or the filename of a pdf file stored in reports.',
                      name: 'link',
                      ui: {
                        validate: (value) => {
                          if (!value) {
                            return;
                          }

                          if (
                            !value.includes('http') &&
                            !value.endsWith('.pdf') &&
                            !value.endsWith('.doc') &&
                            !value.endsWith('.docx')
                          ) {
                            return 'Invalid file. Filename should include .pdf, .doc or .docx, and be stored in the reports folder.';
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
              label: 'Section Title',
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
                      if (!value) {
                        return;
                      }

                      const nameCount = data.sections
                        .filter((section: { _template: string }) => section._template === 'partnerInstitutions')
                        .flatMap((partners: { logos: { name: string } }) => partners.logos)
                        .map((logo: { name: string }) => logo.name && logo.name.trim())
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
