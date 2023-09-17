import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./MediaUploadZone.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import VideoPreviewModel from "./VideoPreviewModel";
import FileList from "./FileList";
import CardActions from "@mui/material/CardActions";
import SimpleBackdrop from "./SimpleBackdrop";
import SimpleSnackbar from "./SimpleSnackbar";
const MediaUploadZone = ({ stepIndex, sendDataToParent }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(-1);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isUploaded, setisUploaded] = useState(false);
  const [isUploading, setisUploading] = useState();

  const handleFileDrop = (event) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    handleFiles(newFiles);
  };

  const handleFileInput = (event) => {
    const newFiles = Array.from(event.target.files);
    handleFiles(newFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(isAudioOrVideoFile);
    setSelectedFiles([...selectedFiles, ...validFiles]);
  };

  const isAudioOrVideoFile = (file) => {
    const mediaTypes = [
      "audio/mp3",
      "audio/mpeg",
      "audio/wav",
      "video/mp4",
      "video/webm",
    ];
    return mediaTypes.includes(file.type);
  };

  const togglePreview = (index) => {
    if (index === previewIndex) {
      setPreviewIndex(-1);
    } else {
      setPreviewIndex(index);
    }
  };

  const handleClosePreview = () => {
    setPreviewIndex(-1);
  };

  const handleDeleteFile = (index) => {
    setDeleteIndex(index);
    setDeleteConfirmationOpen(true);
  };

  const handleUpload = async () => {
    setisUploading(true);
    debugger;
    var formdata = new FormData();
    selectedFiles.forEach((file) => {
      formdata.append("file", file);
    });

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8080/upload/multiple",
      requestOptions
    );
    if (response.status === 422 || response.status === 401) {
      console.log(response);
    }

    if (response.ok) {
      const resData = await response.json();
      console.log(resData)
      setisUploading(false);
      setisUploaded(true);
    } else {
      console.log(response);
      setisUploaded(false);
    }
  };

  const handleConfirmDelete = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    if (index === previewIndex) {
      setPreviewIndex(-1);
    }
    setDeleteConfirmationOpen(false);
  };

  useEffect(() => {
    let hasFile = false;
    if (selectedFiles.length > 0) {
      hasFile = true;
    }
    sendDataToParent(hasFile, isUploaded);
  }, [selectedFiles, sendDataToParent, isUploaded]);

  useEffect(() => {
    if (selectedFiles.length === 0) {
      setisUploaded(false);
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (stepIndex === 0) {
      setSelectedFiles([]);
      setPreviewIndex(-1);
    }
  }, [stepIndex]);

  return (
    <>
      {isUploading && <SimpleBackdrop />}
      {isUploaded && (
        <SimpleSnackbar message="File Upload Success" type="success" />
      )}
      {stepIndex === 0 && (
        <>
          <div
            className="drop-zone"
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <h4>Drag & drop audio or video files here</h4>
            <h6>Choose media files only...</h6>

            <br />
            <input
              type="file"
              accept="audio/*, video/*"
              onChange={handleFileInput}
              multiple
            />
          </div>

          {selectedFiles.length > 0 ? (
            <>
              <div className="file-list">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>Sl No</th>
                      <th>File Name</th>
                      <th style={{ width: "15%" }}>File Type</th>
                      <th style={{ width: "12%" }}>Size</th>
                      <th style={{ width: "15%" }}>Modified Date</th>
                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFiles.map((file, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="fixed-cell">{file.name}</td>
                        <td>{file.type}</td>
                        <td>{`${(file.size / (1024 * 1024)).toFixed(
                          2
                        )} MB`}</td>
                        <td>
                          {new Date(file.lastModified).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>

                        <td
                          style={{
                            display: "flex",
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <button
                            className="preview-button"
                            onClick={() => togglePreview(index)}
                          >
                            <PlayArrowIcon />
                          </button>
                          <button
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#eceff1",
                              color: "#d50000",
                              border: "1px solid #d50000",
                              borderRadius: "5px",
                            }}
                            onClick={() => handleDeleteFile(index)}
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {previewIndex !== -1 && (
                <VideoPreviewModel
                  files={selectedFiles}
                  previewIndex={previewIndex}
                  close={handleClosePreview}
                />
              )}
              <Dialog
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
                aria-labelledby="delete-dialog-title"
              >
                <DialogTitle id="delete-dialog-title">
                  Confirm Deletion
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this file?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleConfirmDelete(deleteIndex)}>
                    Confirm
                  </Button>
                  <Button onClick={() => setDeleteConfirmationOpen(false)}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <p style={{ textAlign: "center" }}>no media added</p>
          )}
        </>
      )}
      {stepIndex === 1 && (
        <>
          {selectedFiles.length > 0 && <FileList files={selectedFiles} />}
          <CardActions>
            {!isUploaded ? (
              <Button onClick={handleUpload} variant="contained" size="medium">
                {selectedFiles.length === 1 ? "Upload" : "Upload All"}
              </Button>
            ) : (
              <Button
                sx={{ background: "green" }}
                disabled={true}
                variant="contained"
                size="medium"
              >
                Uploaded
              </Button>
            )}
          </CardActions>
        </>
      )}

      {stepIndex === 2 && (
        <>
          <p style={{ textAlign: "center", fontWeight: "600" }}>
            Search feature, Comming Soon ...
          </p>
          <FileList files={selectedFiles} />
        </>
      )}
    </>
  );
};

export default MediaUploadZone;
