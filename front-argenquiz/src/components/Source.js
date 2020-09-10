import React from "react";
import videoBorder from "../images/videoBorder.png";
import cerrarButton from "../images/cerrar.png";



const Source = ({ sourceType, source, videoClosed, closeVideo }) => (
  
  <div>

    {sourceType === "text" ? (
      <p className="sourceContainer">
        Fuente:
        {
          <a
            href={`https://${source}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Link
          </a>
        }
      </p>
    ) : (
      !videoClosed && (
        <div className="videoContainer">
          <img className="videoBorder" src={videoBorder} />
          <iframe
            className="video"
            src={`https://www.youtube.com/embed/${
              source.split("=")[1]
            }?modestbranding=1&rel=0&fs=0&color=white&controls=0`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            modestbranding="0"
          />
          <img id="closeVideoButton" onClick={closeVideo} src={cerrarButton}/>
        </div>
      )
    )}
  </div>
);

export default Source;
