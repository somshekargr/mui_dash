import React from "react";
import Breadcrums from "../components/Breadcrums";
import { Typography, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VideoSearchSvg from "../assets/VideoSearch.svg";

function Dashboard() {
  return (
    <>
      <Breadcrums title="Home" />

      <Tooltip title="Nagivate to Video Search" arrow placement="right">
        <Typography
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: "white",
            borderRadius: "10px",
            boxSizing: "border-box",
            boxShadow: "0px 0px 10px silver",
            width: "20%",
            cursor: "pointer",
            textAlign: "center",
          }}
          component="div"
          variant="div"
        >
          <Link to="/video-search">
            <div style={{ margin: "20px" }}>
              <VideoSearchSvg />
            </div>
            <p style={{ fontWeight: "600" }}>Video Search</p>
          </Link>
        </Typography>
      </Tooltip>
    </>
  );
}

export default Dashboard;
