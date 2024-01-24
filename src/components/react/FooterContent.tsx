import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const Footer = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { first, second, third } = data.global.footer;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 pe-md-4 py-2">
          <p data-tina-field={tinaField(first, 'title')} className="h4">
            {first.title}
          </p>
          <div data-tina-field={tinaField(first, 'description')}>
            <TinaMarkdown content={first.description}></TinaMarkdown>
          </div>
        </div>
        <div className="col-md-4 px-md-4 py-2">
          <p data-tina-field={tinaField(second, 'title')} className="h4">
            {second.title}
          </p>
          <div data-tina-field={tinaField(second, 'description')}>
            <TinaMarkdown content={second.description}></TinaMarkdown>
          </div>
        </div>
        <div className="col-md-4 ps-md-4 py-2">
          <p data-tina-field={tinaField(third, 'title')} className="h4">
            {third.title}
          </p>
          <nav className="nav flex-column">
            {third.links &&
              third.links.map((link: { label: string; href: string }) => {
                return (
                  <a key={link.label} data-tina-field={tinaField(link, 'label')} className="nav-link" href={link.href}>
                    {link.label}
                  </a>
                );
              })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Footer;
