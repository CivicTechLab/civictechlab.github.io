import { TextArea, type Collection } from 'tinacms';

const Team: Collection = {
  name: 'team',
  label: 'Team',
  format: 'json',
  path: 'src/content/team',
  ui: {
    router: () => {
      return '/team';
    },
  },
  fields: [
    {
      type: 'object',
      name: 'team',
      label: 'Team',
      description: 'Drag to reorder the order of appearance on the page.',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: `${item?.name} (${item?.status})` };
        },
      },
      fields: [
        {
          type: 'string',
          label: 'Name',
          name: 'name',
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
          type: 'string',
          label: 'Status',
          name: 'status',
          options: ['Director', 'Current', 'Alumni'],
        },
        {
          type: 'string',
          label: 'Website',
          name: 'website',
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
};

export default Team;
