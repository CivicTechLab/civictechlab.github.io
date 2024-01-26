import React from 'react';
import Global from '../../content/global/global.json';

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
      className="btn link-light badge mb-1"
      style={{ backgroundColor: `${tagToColor[tag]}` }}
    >
      {tag}
    </a>
  );
};

export default NewsTag;
