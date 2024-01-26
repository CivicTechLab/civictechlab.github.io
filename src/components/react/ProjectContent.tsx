import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const components = {
  ButtonWithText: ({ text, btnTxt, link }: { text: string; btnTxt: string; link: string }) => {
    const isLocalReport =
      link && (link.endsWith('.pdf') || link.endsWith('.doc') || link.endsWith('.docx')) && !link.startsWith('http');
    return (
      <div className="d-flex mb-3 pt-1 mx-auto justify-content-between align-items-center btn-with-text">
        {text && <h3 className="h4 m-0 me-3">{text}</h3>}
        {btnTxt && (
          <a
            href={isLocalReport ? `/reports/${link}` : link}
            target="_blank"
            className="btn btn-sm btn-outline-primary flex-shrink-0"
          >
            {btnTxt}
          </a>
        )}
      </div>
    );
  },
  Video: ({ src }: { src: string }) => {
    if (!src) {
      return <></>;
    }

    if (src.includes('https://')) {
      return <iframe width="100%" height="400px" className="mx-auto d-block" src={src}></iframe>;
    }

    return <video className="mx-auto d-block w-100" src={`/videos/${src}`} controls></video>;
  },
};

const ProjectContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { title, description, heroImgSrc, caption, content, sections } = data.projects;
  return (
    <div>
      <h1 data-tina-field={tinaField(data.projects, 'title')} className="text-center">
        Project: {title}
      </h1>
      {description && (
        <p data-tina-field={tinaField(data.projects, 'description')} className="h5 text-center mb-4">
          {description}
        </p>
      )}
      {heroImgSrc && (
        <>
          <p className={`${description ? '' : 'mt-4'}`}>
            <img data-tina-field={tinaField(data.projects, 'heroImgSrc')} src={heroImgSrc} alt="" />
          </p>
          <div className="text-center text-body-tertiary" style={{ fontSize: '0.75rem', opacity: 0.7 }}>
            <TinaMarkdown content={caption}></TinaMarkdown>
          </div>
        </>
      )}
      <div data-tina-field={tinaField(data.projects, 'content')}>
        <TinaMarkdown components={components} content={content}></TinaMarkdown>
      </div>
      {sections &&
        sections.map((section: any) => {
          const template = section.__typename;
          return (
            <div key={section.title} data-tina-field={tinaField(section, 'title')}>
              <h2 className="mt-4 pb-1 border-bottom mb-3">{section.title}</h2>
              <TinaMarkdown components={components} content={section.content}></TinaMarkdown>
              {template === 'ProjectsSectionsPartnerInstitutions' && section.logos && (
                <div className="d-flex align-items-center justify-content-center flex-wrap row-gap-4 column-gap-5 mt-4">
                  {section.logos &&
                    section.logos.map((logo: { name: string; imgSrc: string; link: string }, index: number) => {
                      if (!logo.imgSrc) {
                        return;
                      }

                      if (!logo.link) {
                        return (
                          <img
                            style={{ maxWidth: '300px', maxHeight: '150px' }}
                            key={logo.name || index}
                            src={logo.imgSrc}
                            alt={logo.name || ''}
                          />
                        );
                      }

                      return (
                        <a
                          data-tina-field={tinaField(logo, 'name')}
                          key={logo.name || index}
                          href={logo.link}
                          target="_blank"
                          rel="noopener noreferrer "
                        >
                          <img
                            src={logo.imgSrc}
                            style={{ maxWidth: '300px', maxHeight: '150px' }}
                            alt={logo.name || ''}
                          />
                        </a>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ProjectContent;
