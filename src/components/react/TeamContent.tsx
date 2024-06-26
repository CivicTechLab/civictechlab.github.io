import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';

const TeamContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { team: teamData } = data.team;
  return (
    <div className="row">
      {teamData
        .filter((p: any) => p.status === 'Director')
        .map((p: any) => {
          return (
            <div data-tina-field={tinaField(p, 'name')} className="mx-auto col-lg-3 col-md-4 col-6 p-2" key={p.name}>
              <div className="card h-100">
                <h2 className="h4 py-3 px-1 text-center">{p.name}</h2>
                <div className="ratio ratio-1x1">
                  <img className="card-img rounded-0 object-fit-scale" src={p.imgSrc} alt={p.name} />
                </div>
                <div className="card-body">
                  <p className="card-text">{p.description}</p>
                  {p.website && (
                    <a href={p.website} target="_blank" className="btn btn-outline-primary btn-sm">
                      {p.website.includes('linkedin.com') ? 'LinkedIn' : 'Website'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      <h1 className="text-center mt-4 w-100">Current Team</h1>
      {teamData
        .filter((p: any) => p.status === 'Current')
        .map((p: any) => {
          return (
            <div data-tina-field={tinaField(p, 'name')} className="col-lg-3 col-md-4 col-6 p-2" key={p.name}>
              <div className="card h-100">
                <h2 className="h4 py-3 px-1 text-center">{p.name}</h2>
                <div className="ratio ratio-1x1">
                  <img className="card-img rounded-0 object-fit-scale" src={p.imgSrc} alt={p.name} />
                </div>
                <div className="card-body">
                  <p className="card-text">{p.description}</p>
                  {p.website && (
                    <a href={p.website} target="_blank" className="btn btn-outline-primary btn-sm">
                      {p.website.includes('linkedin.com') ? 'LinkedIn' : 'Website'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      <h2 className="h1 text-center mt-4 w-100">Alumni</h2>
      {teamData
        .filter((p: any) => p.status === 'Alumni')
        .map((p: any) => {
          return (
            <div data-tina-field={tinaField(p, 'name')} className="col-lg-3 col-md-4 col-6 p-2" key={p.name}>
              <div className="card h-100">
                <h2 className="h4 py-3 px-1 text-center">{p.name}</h2>
                <div className="ratio ratio-1x1 bg-grey">
                  <img className="card-img rounded-0 object-fit-scale" src={p.imgSrc} alt={p.name} />
                </div>
                <div className="card-body">
                  <p className="card-text">{p.description}</p>
                  {p.website && (
                    <a href={p.website} target="_blank" className="btn btn-outline-primary btn-sm">
                      {p.website.includes('linkedin.com') ? 'LinkedIn' : 'Website'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TeamContent;
