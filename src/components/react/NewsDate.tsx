import React, { useEffect, useState } from 'react';
import type { NewsProps } from '../../types';

const NewsDate = ({ news }: { news: NewsProps }) => {
  const [reload, setReload] = useState(false);
  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
  useEffect(() => {
    setReload(true);
  }, []);
  return (
    <p className="card-subtitle opacity-75" style={{ fontSize: '0.875rem', height: '22px' }}>
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
  );
};

export default NewsDate;
