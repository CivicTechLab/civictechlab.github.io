import type { Collection } from 'tinacms';

const Home: Collection = {
  name: 'home',
  label: 'Home',
  format: 'json',
  path: 'src/content/home',
  fields: [
    {
      type: 'object',
      name: 'home',
      label: 'Home',
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
      ],
    },
  ],
};

export default Home;
