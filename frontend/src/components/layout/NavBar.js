import React from "react";
import Logo from "../../assets/Logo.svg";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useSubmit, useRouteLoaderData } from "react-router-dom";
import { Chip } from "@mui/material";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Person2Icon from "@mui/icons-material/Person2";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function NavBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const submit = useSubmit();
  const token = useRouteLoaderData("root");
  var decoded = jwt_decode(token);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (type) => {
    setAnchorEl(null);

    if (type === "logout") {
      submit(null, { action: "/logout", method: "POST" });
    }
  };
  return (
    <>
      <AppBar position="absolute" open={props.open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(props.open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {/* the Digitialworkers svg logo here  */}
            <Logo isLight={true} />
          </Typography>

          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Chip
              sx={{ color: "white", fontWeight: 600 }}
              avatar={<AccountCircle />}
              label={decoded?.name}
              variant="outlined"
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link to={`/${decoded.id}`}>
              <MenuItem onClick={handleClose}>
                <Person2Icon />
                &nbsp; Profile
              </MenuItem>
            </Link>

            <MenuItem onClick={() => handleClose("logout")}>
              <PowerSettingsNewIcon />
              &nbsp; Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
