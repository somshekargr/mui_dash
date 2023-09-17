import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as MuiLink } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Copyright from "../components/footer/Copyright";
import Logo from "../assets/Logo.svg";
import { Form, Link, useNavigation, useActionData } from "react-router-dom";
import Alert from "@mui/material/Alert";
import SimpleBackdrop from "../components/SimpleBackdrop";

function SignUp() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useActionData();

  return (
    <>
      {isSubmitting && <SimpleBackdrop />}
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
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
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </Button>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Link to="/login">
                    <MuiLink variant="body2" fontSize="12px">
                      {"Already have an account? Sign in"}
                    </MuiLink>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Copyright sx={{ mt: 5 }} />
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;
