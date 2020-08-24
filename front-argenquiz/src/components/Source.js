import React from "react";

const Source = ({ sourceType, source }) => (
  <div>
    {sourceType === "text" ? (
      <p>
        Fuente:
        {
          <a href={`https://${source}`} target="_blank">
            Link
          </a>
        }
      </p>
    ) : (
      <iframe
        src="https://www.youtube.com/embed/GToxlmUzYI4"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    )}
  </div>
);

export default Source;
