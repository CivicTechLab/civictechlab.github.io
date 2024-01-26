import React from 'react';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown, type TinaMarkdownContent } from 'tinacms/dist/rich-text';

type JobProps = {
  title: string;
  description: TinaMarkdownContent;
  sections: Array<{
    title: string;
    content: TinaMarkdownContent;
  }>;
};

const JobContent = (props: { query: string; variables: object; data: any }) => {
  const { data } = useTina(props);
  const jobList = data.joinus.jobs;
  return (
    <>
      {jobList.map((job: JobProps) => {
        return (
          <div data-tina-field={tinaField(job)} className="card" style={{ marginTop: '20px' }}>
            <div className="card-body">
              <h2>{job.title}</h2>
              <TinaMarkdown content={job.description}></TinaMarkdown>
              {job.sections.map((section) => {
                return (
                  <div data-tina-field={tinaField(section)}>
                    <h3 className="h4">{section.title}</h3>
                    <TinaMarkdown content={section.content}></TinaMarkdown>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default JobContent;
