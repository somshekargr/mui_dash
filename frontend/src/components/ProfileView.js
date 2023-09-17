import React from "react";
// import classes from "./Profile.module.css";
import ProfileIcon from "../assets/ProfileIcon.svg";
import { Box, Grid, Stack, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

function ProfileView({ profile }) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid
            item
            md={3.8}
            sx={{
              p: 2,
              my: 3,
              mx: 2,
              backgroundColor: "white",
              borderRadius: "5%",
              boxSizing: "border-box",
              boxShadow: "0px 0px 10px silver",
            }}
          >
            <Stack spacing={2}>
              <Item>
                <ProfileIcon />
              </Item>
              <Item sx={{ m: 0 }}>
                <Typography component="p" variant="h4">
                  {`${profile.firstName} ${profile.lastName}`}
                </Typography>
              </Item>
              <Item>
                <Typography component="p" variant="p">
                  {`Email Id : ${profile.email}`}
                </Typography>
                <Typography component="p" variant="p">
                  Bengaluru, Karnataka, India
                </Typography>
              </Item>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ProfileView;
