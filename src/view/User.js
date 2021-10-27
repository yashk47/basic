import * as React from "react";
import Paper from "@mui/material/Paper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Grid, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import get from "lodash/get";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSnackbar } from "notistack";
import { connect } from "react-redux";
import Validations from "../helpers/Validations";
import Typography from "@mui/material/Typography";
import { setCurrentUserData, loginStatus, addNewUser } from "../action/user";

function User({
  setCurrentUserData,
  currentUser,
  loginStatus,
  userList,
  addNewUser,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const windowWidth = useMediaQuery("(min-width:600px)");
  const setUserUpdatedData = (values) => {
    const updateValues = { ...currentUser };
    updateValues.password = values.password;
    setCurrentUserData(updateValues);
    const newList = [...userList];
    newList.forEach((x) => {
      if (x.userName === currentUser.userName) {
        x.password = values.password;
      }
    });
    addNewUser([...newList]);
    enqueueSnackbar("Password changed successfully", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const onLogOut = () => {
    setCurrentUserData({});
    loginStatus(false);
  };

  return (
    <div style={{ marginTop: "10%" }}>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Paper
          elevation={3}
          sx={{
            width: !windowWidth ? "80%" : "30%",
            overflow: "hidden",
            padding: "3%",
            borderRadius: "3%",
          }}
        >
          <Formik
            initialValues={{
              userName: currentUser.userName || "",
              password: "",
            }}
            enableReinitialize={true}
            validationSchema={Validations.changePassword}
            onSubmit={setUserUpdatedData}
          >
            {() => {
              return (
                <Form>
                  <Grid
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                    container
                  >
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="username"
                        label="UserName"
                        disabled
                        name="userName"
                        autoComplete="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                      />
                      <ErrorMessage name="firstName">
                        {(msg) => (
                          <Typography
                            component="span"
                            color="error"
                            variant="body2"
                          >
                            {msg}
                          </Typography>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Change Password
                      </Button>

                      <Button
                        fullWidth
                        onClick={onLogOut}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        LogOut
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: get(state, "userData.currentUser"),
  userList: get(state, "userData.userList"),
});

export default connect(mapStateToProps, {
  setCurrentUserData,
  loginStatus,
  addNewUser,
})(User);
