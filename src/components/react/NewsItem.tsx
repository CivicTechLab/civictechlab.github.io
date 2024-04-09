import React, { useEffect, useState } from 'react';
import NewsTag from './NewsTag';
import type { NewsProps } from '../../types';
import NewsDate from './NewsDate';

const NewsItem = ({ news, isLink = false }: { news: NewsProps; isLink?: boolean }) => {
  const [reload, setReload] = useState(false);
  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
  useEffect(() => {
    setReload(true);
  }, []);

  return (
    <div className="d-flex justify-content-center mt-2" key={news.slug}>
      <div className="card" style={{ width: '100%' }}>
        <div className="card-body">
          {news.data.tags &&
            news.data.tags.map((tag: string) => {
              return <NewsTag tag={tag} key={tag} setTag isLink={isLink}></NewsTag>;
            })}
          <a
            href={`/news/${news.slug}`}
            className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          >
            <h2 className="h5 card-title">{news.data.title}</h2>
          </a>
          <NewsDate news={news}></NewsDate>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
