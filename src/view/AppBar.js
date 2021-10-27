import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import get from "lodash/get";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import HomeIcon from "@mui/icons-material/Home";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";

function NavBar({ isLoggedIn, currentUser }) {
  const [state, setState] = React.useState({
    left: false,
  });

  let history = useHistory();
  const windowWidth = useMediaQuery("(min-width:600px)");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem style={{ cursor: "pointer" }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              history.push("/");
            }}
            primary={"Home"}
          />
        </ListItem>
        {isLoggedIn && (
          <>
            <ListItem style={{ cursor: "pointer" }}>
              <ListItemIcon>
                <PlaylistAddCheckIcon />
              </ListItemIcon>
              <ListItemText
                onClick={() => {
                  history.push("/taskPage");
                }}
                primary={"Task"}
              />
            </ListItem>
            <ListItem style={{ cursor: "pointer" }}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                onClick={() => {
                  history.push("/user");
                }}
                primary={"User"}
              />
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={
              state.left
                ? toggleDrawer("left", false)
                : toggleDrawer("left", true)
            }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {isLoggedIn
              ? `Welcome "${currentUser.firstName || ""} ${
                  currentUser.lastName || ""
                }"`
              : "Welcome"}
          </Typography>
          {isLoggedIn && windowWidth && (
            <>
              <Button
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={() => {
                  history.push("/");
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/taskPage");
                }}
              >
                Task
              </Button>
              <Button
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/user");
                }}
              >
                User
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: get(state, "userData.isLoggedIn"),
  currentUser: get(state, "userData.currentUser"),
});

export default connect(mapStateToProps, {})(NavBar);
