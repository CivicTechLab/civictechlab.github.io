import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import NewsTag from './NewsTag';
import TinaComponents from './TinaComponents';

const NewsContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { title, body, dateFrom, dateTo, otherDates, tags } = data.news;
  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
  return (
    <>
      <h1 data-tina-field={tinaField(data.news, 'title')} className="text-center">
        {title}
      </h1>
      <p data-tina-field={tinaField(data.news, 'dateFrom')} className="text-body-secondary text-center h6 mb-4">
        {!otherDates && dateFrom && new Date(dateFrom).toLocaleString('en-SG', { day: 'numeric', month: 'long' })}
        {!otherDates &&
          (!dateTo || new Date(dateTo).getFullYear() !== new Date(dateFrom).getFullYear()) &&
          `, ${new Date(dateFrom).getFullYear()}`}
        {dateTo && ` - ${new Date(dateTo).toLocaleString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })}`}
        {otherDates &&
          formatter.format(
            [{ date: dateFrom }].concat(otherDates).map((d: { date: string }, index: number) => {
              if (
                index < otherDates.length &&
                new Date(otherDates[index].date).getFullYear() === new Date(d.date).getFullYear()
              ) {
                return new Date(d.date).toLocaleString('en-SG', { day: 'numeric', month: 'long' });
              }
              return new Date(d.date).toLocaleString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' });
            }),
          )}
      </p>

      <div data-tina-field={tinaField(data.news, 'body')}>
        <TinaMarkdown components={TinaComponents} content={body}></TinaMarkdown>
      </div>
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

export default NewsContent;
