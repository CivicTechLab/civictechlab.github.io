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
      description: 'The event start date.',
      ui: {
        component: 'date',
      },
    },
    {
      type: 'string',
      label: 'Date To',
      name: 'dateTo',
      description: 'The event end date.',
      ui: {
        component: 'date',
      },
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
