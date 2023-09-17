import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import StickyFooter from "./footer/StickyFooter";
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';
function Content() {
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: 4,
            display: "flex",
            flexDirection: "column",
            minHeight: "calc(100% - 64px)",
          }}
        >
            <Toolbar/>
            <Outlet />
          <StickyFooter />
        </Container>
      </Box>
    </>
  );
}

export default Content;
