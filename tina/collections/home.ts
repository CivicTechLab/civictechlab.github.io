import type { Collection } from 'tinacms';

const Home: Collection = {
  name: 'home',
  label: 'Home',
  format: 'json',
  path: 'src/content/home',
  ui: {
    router: () => {
      return '/';
    },
  },
  fields: [
    {
      type: 'object',
      name: 'home',
      label: 'Home',
      description: 'Drag to reorder the sections on the page.',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
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
          type: 'image',
          label: 'Image',
          name: 'imgSrc',
        },
        {
          type: 'rich-text',
          label: 'Caption',
          name: 'caption',
          description: 'Displays a caption below the image.',
        },
      ],
    },
  ],
};

export default Home;
