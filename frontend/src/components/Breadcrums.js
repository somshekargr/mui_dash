import React from "react";
import { Typography } from "@mui/material";
function Breadcrums(props) {
  return (
    <>
      <Typography
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: "white",
          borderRadius: "10px",
          boxSizing: "border-box",
          boxShadow: "0px 0px 10px silver",
          textDecoration:"underline"
        }}
        component="p"
        variant="div"
      >
        {props.title}
      </Typography>
    </>
  );
}

export default Breadcrums;
