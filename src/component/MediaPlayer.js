import React from "react";

const MediaPlayer = ({ url }) => {
  return (
    <video controls preload="auto" width="640" controlsList="nodownload">
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default MediaPlayer;
