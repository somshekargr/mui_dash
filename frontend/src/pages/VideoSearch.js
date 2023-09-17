import React from "react";
import Breadcrums from "../components/Breadcrums";
import MediaUploadZone from "../components/MediaUploadZone";
import MediaUploadStepper from "../components/MediaUploadStepper";
function VideoSearch() {
  return (
    <>
      <Breadcrums title="Video Search" />
      <MediaUploadStepper />
    </>
  );
}

export default VideoSearch;
