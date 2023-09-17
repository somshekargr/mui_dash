import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Logo from "../../assets/Logo.svg";
import Divider from "@mui/material/Divider";
import FooterData from "./FooterData";
import Copyright from "./Copyright";

export default function StickyFooter() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#cfd8dc" : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {/* <Grid item xs={4}>
              <Logo isLight={false} />
            </Grid>
            <Divider
              sx={{ px: 2, margin: "16px auto" }}
              orientation="vertical"
              variant="middle"
              flexItem
            /> */}
            <Grid item xs={7.5} sx={{ margin: "10px auto" }}>
              <Copyright />
              {/* <FooterData /> */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
