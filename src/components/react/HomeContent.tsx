import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';

const HomeContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { home: homeData } = data.home;
  return (
    <div className="row">
      {homeData.map((d: { imgSrc?: string; title?: string; description?: string }) => (
        <div className="col-md-6 py-2" key={d.title} data-tina-field={tinaField(d, 'title')}>
          <div className="card h-100 text-center">
            {d.imgSrc && (
              <img src={d.imgSrc} className="card-img-top object-fit-cover" alt="" style={{ maxHeight: '200px' }} />
            )}
            <div className="card-body">
              {d.title && <h5 className="card-title">{d.title}</h5>}
              {d.description && <p className="card-text">{d.description}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeContent;
