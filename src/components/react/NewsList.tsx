import React, { useEffect, useState } from 'react';
import Global from '../../content/global/global.json';
import NewsTag from './NewsTag';
import { useStore } from '@nanostores/react';
import { tagQuery } from '../../store';

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
  const [sortOrder, setSortOrder] = useState<'latest' | 'earliest'>('latest');
  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

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
    .sort(sorters[sortOrder]);

  return (
    <>
      <h1 className="text-center">What's New</h1>
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
              {sortOrder === 'latest' ? 'Latest First' : 'Earliest First'}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className={`dropdown-item ${sortOrder === 'latest' ? 'active' : ''}`}
                  onClick={() => setSortOrder('latest')}
                >
                  Latest First
                </button>
                <button
                  className={`dropdown-item ${sortOrder === 'earliest' ? 'active' : ''}`}
                  onClick={() => setSortOrder('earliest')}
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
                    return <NewsTag tag={tag} key={tag} isLink></NewsTag>;
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
                    new Date(n.data.dateFrom).toLocaleString('en-US', { day: 'numeric', month: 'long' })}
                  {!n.data.otherDates &&
                    (!n.data.dateTo ||
                      new Date(n.data.dateTo).getFullYear() !== new Date(n.data.dateFrom).getFullYear()) &&
                    `, ${new Date(n.data.dateFrom).getFullYear()}`}
                  {n.data.dateTo &&
                    ` - ${new Date(n.data.dateTo).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                  {n.data.otherDates &&
                    formatter.format(
                      [{ date: n.data.dateFrom }]
                        .concat(n.data.otherDates)
                        .map((d: { date: string }, index: number) => {
                          if (
                            index < n.data.otherDates.length &&
                            new Date(n.data.otherDates[index].date).getFullYear() === new Date(d.date).getFullYear()
                          ) {
                            return new Date(d.date).toLocaleString('en-US', { day: 'numeric', month: 'long' });
                          }
                          return new Date(d.date).toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
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
  );
};

export default NewsList;
