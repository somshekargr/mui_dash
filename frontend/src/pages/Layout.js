import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import NavBar from "../components/layout/NavBar";
import SideBar from "../components/layout/SideBar";
import Content from "../components/Content";
import { useEffect } from 'react';
import { useLoaderData, useSubmit } from 'react-router-dom';
import { getTokenDuration } from '../util/auth';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Layout() {
  const [open, setOpen] = React.useState(true);
  const token = useLoaderData();
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);
  }, [token, submit]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar open={open} toggleDrawer={toggleDrawer} />

        <SideBar open={open} toggleDrawer={toggleDrawer} />

        <Content />
      </Box>
    </ThemeProvider>
  );
}
