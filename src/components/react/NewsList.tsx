import React, { useEffect, useState } from 'react';
import Global from '../../content/global/global.json';
import NewsTag from './NewsTag';
import { useStore } from '@nanostores/react';
import { tagQuery, sortOrder } from '../../store';

type NewsProps = {
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

const NewsList = ({ news }: any) => {
  const tagList = Global.tags.tag;
  const $tagQuery = useStore(tagQuery);
  const $sortOrder = useStore(sortOrder);
  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setReload(true);
  }, []);

  const sorters = {
    latest: (a: NewsProps, b: NewsProps) => {
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

    earliest: (a: NewsProps, b: NewsProps) => {
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

  const [searchQuery, setSearchQuery] = useState('');
  const newsToShow = news
    .filter((n: NewsProps) => n.data.tags.some((v: string) => $tagQuery.includes(v)))
    .filter((n: NewsProps) => n.data.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort(sorters[$sortOrder]);

  return (
    <>
      {!reload ? (
        <svg id="spinner" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM3.6 24C3.6 35.2666 12.7334 44.4 24 44.4C35.2666 44.4 44.4 35.2666 44.4 24C44.4 12.7334 35.2666 3.6 24 3.6C12.7334 3.6 3.6 12.7334 3.6 24Z"
            fill="#F5F5F5"
          />
          <path
            d="M1.8 24C0.805887 24 -0.00702475 24.807 0.0674576 25.7983C0.376514 29.9117 1.74178 33.8871 4.04473 37.3337C6.68188 41.2805 10.4302 44.3566 14.8156 46.1731C19.201 47.9896 24.0266 48.4649 28.6822 47.5388C33.3377 46.6128 37.6141 44.327 40.9706 40.9706C44.327 37.6141 46.6128 33.3377 47.5388 28.6822C48.4649 24.0266 47.9896 19.201 46.1731 14.8156C44.3566 10.4302 41.2805 6.68188 37.3337 4.04473C33.8871 1.74179 29.9117 0.376515 25.7984 0.067458C24.807 -0.00702458 24 0.805887 24 1.8V1.8C24 2.79411 24.8075 3.59175 25.7977 3.67935C29.1982 3.98016 32.4793 5.13079 35.3336 7.03802C38.6884 9.2796 41.3031 12.4656 42.8471 16.1933C44.3912 19.9209 44.7952 24.0226 44.008 27.9798C43.2209 31.9371 41.278 35.572 38.425 38.425C35.572 41.278 31.9371 43.2209 27.9798 44.008C24.0226 44.7952 19.9209 44.3912 16.1933 42.8471C12.4656 41.3031 9.2796 38.6884 7.03802 35.3336C5.13078 32.4793 3.98016 29.1982 3.67935 25.7977C3.59175 24.8075 2.79411 24 1.8 24V24Z"
            fill="black"
          />
        </svg>
      ) : (
        <>
          <div className="mx-auto d-flex column-gap-4 row-gap-1 flex-sm-row flex-column justify-content-between">
            <input
              className="form-control"
              type="text"
              placeholder="Search news"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="d-flex justify-content-between gap-1">
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  Tags <span className="badge text-bg-primary rounded-pill">{$tagQuery.length}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-start">
                  <ul className="list-group" style={{ width: '200px' }}>
                    <li className="list-group-item" style={{ border: 'none' }}>
                      <button
                        className="btn btn-sm btn-outline-primary w-100"
                        onClick={() => {
                          if ($tagQuery.length != tagList.length) {
                            tagQuery.set([...tagList.map((t: { name: string }) => t.name)]);
                          } else {
                            tagQuery.set([]);
                          }
                        }}
                      >
                        {$tagQuery.length != tagList.length ? 'Select All' : 'Clear'}
                      </button>
                    </li>
                    {tagList.map((tag) => {
                      return (
                        <li className="list-group-item" style={{ border: 'none' }} key={tag.name}>
                          <input
                            className="form-check-input me-1"
                            type="checkbox"
                            checked={$tagQuery.includes(tag.name)}
                            value={tag.name}
                            id={tag.name}
                            onChange={(e) =>
                              e.target.checked
                                ? tagQuery.set([...$tagQuery, e.target.value])
                                : tagQuery.set([...$tagQuery.filter((t) => t !== e.target.value)])
                            }
                          />
                          <label className="form-check-label" htmlFor={tag.name}>
                            <NewsTag tag={tag.name}></NewsTag>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {$sortOrder === 'latest' ? 'Latest First' : 'Earliest First'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className={`dropdown-item ${$sortOrder === 'latest' ? 'active' : ''}`}
                      onClick={() => sortOrder.set('latest')}
                    >
                      Latest First
                    </button>
                    <button
                      className={`dropdown-item ${$sortOrder === 'earliest' ? 'active' : ''}`}
                      onClick={() => sortOrder.set('earliest')}
                    >
                      Earliest First
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-2">
            {searchQuery && (
              <p>
                Searching '<b>{searchQuery}</b>'
              </p>
            )}
            {newsToShow.length === 0 && <p>No news found.</p>}
          </div>
          {newsToShow.map((n: NewsProps) => {
            return (
              <div className="d-flex justify-content-center mt-2" key={n.slug}>
                <div className="card" style={{ width: '100%' }}>
                  <div className="card-body">
                    {n.data.tags &&
                      n.data.tags.map((tag: string) => {
                        return <NewsTag tag={tag} key={tag} setTag></NewsTag>;
                      })}
                    <a
                      href={`/news/${n.slug}`}
                      className="link-dark link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    >
                      <h2 className="h5 card-title">{n.data.title}</h2>
                    </a>
                    <p className="card-subtitle text-body-secondary" style={{ fontSize: '0.875rem' }}>
                      {!n.data.otherDates &&
                        n.data.dateFrom &&
                        new Date(n.data.dateFrom).toLocaleString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          timeZone: 'Asia/Singapore',
                        })}
                      {!n.data.otherDates &&
                        (!n.data.dateTo ||
                          new Date(n.data.dateTo).getFullYear() !== new Date(n.data.dateFrom).getFullYear()) &&
                        `, ${new Date(n.data.dateFrom).getFullYear()}`}
                      {n.data.dateTo &&
                        ` - ${new Date(n.data.dateTo).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Singapore' })}`}
                      {n.data.otherDates &&
                        formatter.format(
                          [{ date: n.data.dateFrom }]
                            .concat(n.data.otherDates)
                            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                            .map((d: { date: string }, index: number) => {
                              if (
                                index < n.data.otherDates.length &&
                                new Date(n.data.otherDates[index].date).getFullYear() === new Date(d.date).getFullYear()
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
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default NewsList;
