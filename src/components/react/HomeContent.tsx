import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const HomeContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { home: homeData } = data.home;
  return (
    <div className="row">
      {homeData.map((d: any) => (
        <div className="col-md-6 py-2" key={d.title} data-tina-field={tinaField(d, 'title')}>
          <div className="card h-100 text-center">
            {d.imgSrc && (
              <img
                width="400"
                height="200"
                src={d.imgSrc}
                className="card-img-top object-fit-cover"
                alt=""
                style={{ maxHeight: '200px' }}
              />
            )}
            <div className="card-body">
              {d.title && <h5 className="card-title">{d.title}</h5>}
              {d.description && <p className="card-text">{d.description}</p>}
            </div>
            <div className="text-center text-body-tertiary ms-2" style={{ fontSize: '0.75rem' }}>
              <TinaMarkdown content={d.caption}></TinaMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeContent;
