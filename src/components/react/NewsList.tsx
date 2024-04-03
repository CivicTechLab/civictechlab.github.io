import React, { useState } from 'react';
import Global from '../../content/global/global.json';
import NewsTag from './NewsTag';
import { useStore } from '@nanostores/react';
import { tagQuery, sortOrder } from '../../store';
import { sorters } from '../../utils';
import type { NewsProps } from '../../types';
import NewsItem from './NewsItem';

const NewsList = ({ news }: any) => {
  const tagList = Global.tags.tag;
  const $tagQuery = useStore(tagQuery);
  const $sortOrder = useStore(sortOrder);

  const [searchQuery, setSearchQuery] = useState('');
  const newsToShow = news
    .filter((n: NewsProps) => n.data.tags.some((v: string) => $tagQuery.includes(v)))
    .filter((n: NewsProps) => n.data.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort(sorters[$sortOrder]);

  return (
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
            Searching '<b>{searchQuery}</b>'.
          </p>
        )}
        {newsToShow.length === 0 ? <p>No articles found.</p> : <p>{newsToShow.length} articles found.</p>}
      </div>
      {newsToShow.map((n: NewsProps) => {
        return <NewsItem news={n}></NewsItem>;
      })}
    </>
  );
};

export default NewsList;
