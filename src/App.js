import React from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AppBar from "./view/AppBar";
import { connect } from "react-redux";
import { SnackbarProvider } from "notistack";
import { get } from "lodash";
import Home from "./view/Home";
import SignIn from "./view/SignIn";
import User from "./view/User";
import TaskPage from "./view/TaskPage";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({});

function App({ isLoggedIn }) {
  let history = useHistory();
  const classes = useStyles();

  React.useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  return (
    <div className={classes.container}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        preventDuplicate
      >
        <AppBar />
        {isLoggedIn ? (
          <Switch>
            <Route exact from="/" render={(props) => <Home {...props} />} />
            <Route exact from="/user" render={(props) => <User {...props} />} />
            <Route
              exact
              from="/taskPage"
              render={(props) => <TaskPage {...props} />}
            />
          </Switch>
        ) : (
          <Switch>
            <Route exact from="/" render={(props) => <SignIn {...props} />} />
          </Switch>
        )}
      </SnackbarProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: get(state, "userData.isLoggedIn"),
});

export default connect(mapStateToProps, {})(App);
