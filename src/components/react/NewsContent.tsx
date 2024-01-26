import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import NewsTag from './NewsTag';
import TinaComponents from './TinaComponents';

const NewsContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { title, body, dateFrom, dateTo, tags } = data.news;
  return (
    <>
      <h1 data-tina-field={tinaField(data.news, 'title')} className="text-center">
        {title}
      </h1>
      <p data-tina-field={tinaField(data.news, 'dateFrom')} className="text-body-secondary text-center h6 mb-4">
        {dateFrom && new Date(dateFrom).toLocaleString('en-US', { day: 'numeric', month: 'long' })}
        {(!dateTo || new Date(dateTo).getFullYear() !== new Date(dateFrom).getFullYear()) &&
          `, ${new Date(dateFrom).getFullYear()}`}
        {dateTo && ` - ${new Date(dateTo).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`}
      </p>
      <div data-tina-field={tinaField(data.news, 'body')}>
        <TinaMarkdown components={TinaComponents} content={body}></TinaMarkdown>
      </div>
      {(!tags || tags.length !== 0) && <hr></hr>}
      {tags &&
        tags.map((tag: string) => (
          <span data-tina-field={tinaField(data.news, 'tags')} key={tag}>
            <NewsTag tag={tag}></NewsTag>
          </span>
        ))}
    </>
  );
};

export default NewsContent;
