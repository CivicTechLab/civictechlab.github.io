import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const ProjectContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const { title, description, heroImgSrc, content, sections } = data.projects;
  return (
    <>
      <h1>Projects: {title}</h1>
      <p className="h5">{description}</p>
      <p>
        <img src={heroImgSrc} />
      </p>
      <TinaMarkdown content={content}></TinaMarkdown>
      {sections &&
        sections.map((section: any) => {
          const template = section.__typename;
          return (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <TinaMarkdown content={section.content}></TinaMarkdown>
              {template === 'ProjectsSectionsPartnerInstitutions' && section.logos && (
                <div className="d-flex align-items-center justify-content-center flex-wrap gap-3">
                  {section.logos.map((logo: { name: string; imgSrc: string; link: string }) => {
                    if (!logo.link) {
                      return <img style={{ maxWidth: '300px' }} key={logo.name} src={logo.imgSrc}></img>;
                    }
                    return (
                      <a key={logo.name} href={logo.link} target="_blank" rel="noopener noreferrer ">
                        <img src={logo.imgSrc} style={{ maxWidth: '300px' }} />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default ProjectContent;
