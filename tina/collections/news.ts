import type { Collection } from 'tinacms';
import Globals from '../../src/content/global/global.json';
const tags = Globals.tags.tag.filter((t) => !(!t || !t.color || !t.name)).map((t: any) => t.name);

const News: Collection = {
  name: 'news',
  label: 'News',
  format: 'mdx',
  path: 'src/content/news',
  ui: {
    router: ({ document }) => {
      return `/news/${document._sys.filename.toLowerCase()}`;
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
      type: 'string',
      label: 'Date From',
      name: 'dateFrom',
      description: 'At least one date must be here. Use this field for a single date or the start of a date range.',
      ui: {
        component: 'date',
        validate: (value) => {
          if (!value) {
            return;
          }

          if (isNaN(Date.parse(value))) {
            return 'Invalid date.';
          }
        },
      },
    },
    {
      type: 'string',
      label: 'Date To',
      name: 'dateTo',
      description: 'Use this field for the end of the date range.',
      ui: {
        component: 'date',
        validate: (value) => {
          if (!value) {
            return;
          }

          if (isNaN(Date.parse(value))) {
            return 'Invalid date.';
          }
        },
      },
    },
    {
      type: 'object',
      list: true,
      name: 'otherDates',
      label: 'Other Dates',
      description: 'Use this field for events on separate dates.',
      ui: {
        itemProps: (item) => {
          return {
            label:
              item?.date &&
              new Date(item?.date).toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'Asia/Singapore',
              }),
          };
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Date',
          name: 'date',
          description: 'Another date the event is held on.',
          ui: {
            component: 'date',
            validate: (value) => {
              if (!value) {
                return;
              }

              if (isNaN(Date.parse(value))) {
                return 'Invalid date.';
              }
            },
          },
        },
      ],
    },
    {
      type: 'string',
      label: 'Tags',
      name: 'tags',
      list: true,
      options: tags,
      description: 'Tags are displayed in the order they are selected.',
    },
    {
      type: 'image',
      label: 'Hero Image',
      name: 'heroImgSrc',
      description: 'Displays an image below the title.',
    },
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
      isBody: true,
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
  ],
};

export default News;
