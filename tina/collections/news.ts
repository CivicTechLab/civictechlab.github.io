import type { Collection } from 'tinacms';
import Globals from '../../src/content/global/global.json';
const tags = Globals.tags.tag.map((t: { name: string; color: string }) => t.name);

const News: Collection = {
  name: 'news',
  label: 'News',
  format: 'mdx',
  path: 'src/content/news',
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
      ui: {
        component: 'date',
      },
    },
    {
      type: 'string',
      label: 'Date To',
      name: 'dateTo',
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
    },
    {
      type: 'rich-text',
      label: 'Body',
      name: 'body',
      isBody: true,
    },
  ],
};

export default News;
