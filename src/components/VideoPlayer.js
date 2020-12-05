// import "~video-react/dist/video-react.css"; // import css
import React from "react";
import { Player } from "video-react";

const VideoPlayer = ({ videoUrl }) => {
  const player = {
    margin: 10,
    marginTop: -10,
    marginBottom: -5,
  };
  // console.log(props.videoUrl);
  return (
    <div style={player}>
      <Player src={videoUrl}></Player>
    </div>
  );
};

export default VideoPlayer;
