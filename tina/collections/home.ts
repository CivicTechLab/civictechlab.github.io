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
          required: true,
        },
        {
          type: 'string',
          label: 'Description',
          name: 'description',
          required: true,
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
