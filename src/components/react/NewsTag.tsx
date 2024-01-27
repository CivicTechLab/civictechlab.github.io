import React from 'react';
import Global from '../../content/global/global.json';
import tinycolor from 'tinycolor2';
import { tagQuery } from '../../store';

const NewsTag = ({ tag, isLink = false }: { tag: string; isLink?: boolean }) => {
  const tagToColor: any = Global.tags.tag.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: curr.color,
    };
  }, {});

  if (!isLink) {
    return (
      <span
        className={`${tinycolor(tagToColor[tag]).isDark() ? 'link-light' : 'link-dark'} badge mb-1 me-1`}
        style={{ backgroundColor: `${tagToColor[tag]}` }}
      >
        {tag}
      </span>
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
