import React from "react";

const Source = ({ sourceType, source, videoClosed,closeVideo }) => (
  <div>
     {sourceType === "text" ? (
      <p>
        Fuente:
        {
          <a  href={`https://${source}`} rel="noopener noreferrer" target="_blank">
            Link
          </a>
        }
      </p>
    ) : ( !videoClosed &&
    <div className="videoContainer">
      <iframe
        className="video"
        src={`https://www.youtube.com/embed/${source.split("=")[1]}?modestbranding=1&rel=0&fs=0&color=white&controls=0`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
        modestbranding="0"

      />
<button onClick={closeVideo}>X</button>      
    </div>
     )} 
  </div>
);

export default Source;
