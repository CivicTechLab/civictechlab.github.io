import React from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';
import NewsTag from './NewsTag';

const NewsContentFooter = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { tags } = data.news;
  return (
    <>
      {(!tags || tags.length !== 0) && <hr></hr>}
      {tags &&
        tags.map((tag: string) => (
          <span data-tina-field={tinaField(data.news, 'tags')} key={tag}>
            <NewsTag isLink setTag tag={tag}></NewsTag>
          </span>
        ))}
    </>
  );
};

export default NewsContentFooter;
