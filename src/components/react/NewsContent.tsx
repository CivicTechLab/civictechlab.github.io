import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import NewsTag from './NewsTag';

const NewsContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { title, body, dateFrom, dateTo, tags } = data.news;
  return (
    <>
      <h1 className="text-center">{title}</h1>
      <p className="text-body-secondary text-center h6 mb-4">
        {dateFrom && new Date(dateFrom).toLocaleString('en-US', { day: 'numeric', month: 'long' })}
        {(!dateTo || new Date(dateTo).getFullYear() !== new Date(dateFrom).getFullYear()) &&
          `, ${new Date(dateFrom).getFullYear()}`}
        {dateTo && ` - ${new Date(dateTo).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`}
      </p>
      <TinaMarkdown content={body}></TinaMarkdown>
      <hr></hr>
      {tags.map((tag: string) => (
        <NewsTag tag={tag} key={tag}></NewsTag>
      ))}
    </>
  );
};

export default NewsContent;
