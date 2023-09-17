import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as MuiLink } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../components/footer/Copyright";
import Logo from "../assets/Logo.svg";
import Alert from "@mui/material/Alert";
import { Form, Link, useNavigation, useActionData } from "react-router-dom";
import SimpleBackdrop from "../components/SimpleBackdrop";

function SignIn() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();

  useEffect(() => {
    // clear form data
  }, [data]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      {isSubmitting && <SimpleBackdrop />}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo isLight={false} />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          {data && data.message && (
            <Alert severity="error">{data.message}</Alert>
          )}
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <Alert severity="warning" key={err}>
                  {err}
                </Alert>
              ))}
            </ul>
          )}

          <Form method="post" noValidate={false}>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/signup">
                    <MuiLink variant="body2" fontSize="12px">
                      {"Don't have an account? Sign Up"}
                    </MuiLink>
                  </Link>
                </Grid>
                <Grid item>
                  <Copyright sx={{ mt: 5 }} />
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignIn;
