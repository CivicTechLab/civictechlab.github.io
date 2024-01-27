import React from 'react';

const TinaComponents = {
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
  a: (props: any) => {
    if (!props.url) {
      return <></>;
    }

    if (props.url.startsWith('http')) {
      return (
        <a href={props.url} target="_blank" rel="noopener">
          {props.children}
        </a>
      );
    }
    return <a href={props.url}>{props.children}</a>;
  },
};

export default TinaComponents;
