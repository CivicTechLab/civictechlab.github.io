import type { Collection } from 'tinacms';

const People: Collection = {
  name: 'people',
  label: 'People',
  format: 'json',
  path: 'src/content/people',
  fields: [
    {
      type: 'object',
      name: 'people',
      label: 'People',
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
          required: true,
        },
        {
          type: 'string',
          label: 'Description',
          name: 'description',
          required: true,
        },
        {
          type: 'image',
          label: 'Image',
          name: 'imgSrc',
        },
        {
          type: 'string',
          label: 'Website',
          name: 'website',
          ui: {
            validate(value) {
              const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
              const regex = new RegExp(expression);
              if (!value.match(regex)) {
                return "Invalid website. Website should begin with either http or https."
              }
            },
          }
        }
      ],
    },
  ],
};

export default People;
