export type NewsProps = {
  body: string;
  data: {
    title: string;
    tags: string[];
    dateFrom: string;
    dateTo: string;
    otherDates: any;
  };
  id: string;
  slug: string;
};
