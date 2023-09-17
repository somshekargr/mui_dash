import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, CardMedia, DialogContent , Dialog} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    
  }));

function VideoPreviewModel({files, previewIndex, close}) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    close()
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Video Review
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <CardMedia
          component="iframe"
          image={URL.createObjectURL(files[previewIndex])}
          autoPlay
          sx={{width: "100%", height:"56vh"}}
        />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
export default VideoPreviewModel