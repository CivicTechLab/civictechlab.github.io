import React, { useEffect, useState } from 'react';
import NewsTag from './NewsTag';
import type { NewsProps } from '../../types';

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
          <p className="card-subtitle text-body-secondary" style={{ fontSize: '0.875rem', height: '22px' }}>
            {reload && (
              <>
                {!news.data.otherDates &&
                  news.data.dateFrom &&
                  new Date(news.data.dateFrom).toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    timeZone: 'Asia/Singapore',
                  })}
                {!news.data.otherDates &&
                  (!news.data.dateTo ||
                    new Date(news.data.dateTo).getFullYear() !== new Date(news.data.dateFrom).getFullYear()) &&
                  `, ${new Date(news.data.dateFrom).getFullYear()}`}
                {news.data.dateTo &&
                  ` - ${new Date(news.data.dateTo).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Singapore' })}`}
                {news.data.otherDates &&
                  formatter.format(
                    [{ date: news.data.dateFrom }]
                      .concat(news.data.otherDates)
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .map((d: { date: string }, index: number) => {
                        if (
                          index < news.data.otherDates.length &&
                          new Date(news.data.otherDates[index].date).getFullYear() === new Date(d.date).getFullYear()
                        ) {
                          return new Date(d.date).toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            timeZone: 'Asia/Singapore',
                          });
                        }
                        return new Date(d.date).toLocaleString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          timeZone: 'Asia/Singapore',
                        });
                      }),
                  )}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
