import React from 'react';
import Global from '../../content/global/global.json';
import tinycolor from 'tinycolor2';
import { tagQuery } from '../../store';

const NewsTag = ({ tag, isLink = false, setTag = false }: { tag: string; isLink?: boolean; setTag?: boolean }) => {
  const tagToColor: any = Global.tags.tag.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: curr.color,
    };
  }, {});

  if (!isLink && !setTag) {
    return (
      <span
        className={`${tinycolor(tagToColor[tag]).isDark() ? 'link-light' : 'link-dark'} badge mb-1 me-1`}
        style={{ backgroundColor: `${tagToColor[tag]}` }}
      >
        {tag}
      </span>
    );
  }

  if (!isLink && setTag) {
    return (
      <span
        className={`${tinycolor(tagToColor[tag]).isDark() ? 'link-light' : 'link-dark'} badge mb-1 me-1`}
        style={{ backgroundColor: `${tagToColor[tag]}`, cursor: 'pointer' }}
        onClick={() => tagQuery.set([tag])}
      >
        {tag}
      </span>
    );
  }

  if (isLink && !setTag) {
    return (
      <a
        href={'/news'}
        className={`btn ${tinycolor(tagToColor[tag]).isDark() ? 'link-light' : 'link-dark'} badge mb-1 me-1`}
        style={{ backgroundColor: `${tagToColor[tag]}` }}
      >
        {tag}
      </a>
    );
  }

  return (
    <a
      href={'/news'}
      className={`btn ${tinycolor(tagToColor[tag]).isDark() ? 'link-light' : 'link-dark'} badge mb-1 me-1`}
      style={{ backgroundColor: `${tagToColor[tag]}` }}
      onClick={() => tagQuery.set([tag])}
    >
      {tag}
    </a>
  );
};

export default NewsTag;
