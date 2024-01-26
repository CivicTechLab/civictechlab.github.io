import React from 'react';
import Global from '../../content/global/global.json';
import tinycolor from 'tinycolor2';

const NewsTag = ({ tag }: { tag: string }) => {
  const tagToColor: any = Global.tags.tag.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: curr.color,
    };
  }, {});

  return (
    <a
      href={`/news?tag=${tag}`}
      className={`btn ${tinycolor(tagToColor[tag]).isDark() ? 'link-light' : 'link-dark'} badge mb-1 me-1`}
      style={{ backgroundColor: `${tagToColor[tag]}` }}
    >
      {tag}
    </a>
  );
};

export default NewsTag;
