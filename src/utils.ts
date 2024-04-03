export const sorters = {
  latest: (a: any, b: any) => {
    if (!a.data.dateFrom) {
      return -1;
    }

    if (!b.data.dateFrom) {
      return 1;
    }

    if (new Date(a.data.dateFrom) < new Date(b.data.dateFrom)) {
      return 1;
    }

    if (new Date(a.data.dateFrom) > new Date(b.data.dateFrom)) {
      return -1;
    }

    return 0;
  },

  earliest: (a: any, b: any) => {
    if (!a.data.dateFrom) {
      return 1;
    }

    if (!b.data.dateFrom) {
      return -1;
    }

    if (new Date(a.data.dateFrom) < new Date(b.data.dateFrom)) {
      return -1;
    }

    if (new Date(a.data.dateFrom) > new Date(b.data.dateFrom)) {
      return 1;
    }

    return 0;
  },
};
