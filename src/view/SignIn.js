import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useSnackbar } from "notistack";
import { Formik, Form, Field, ErrorMessage } from "formik";
import get from "lodash/get";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { connect } from "react-redux";
import Validations from "../helpers/Validations";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginStatus, addNewUser, setCurrentUserData } from "../action/user";

function OtherInfo(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Demo User Name "demo" and password is "P@ssword123", New credintials will
      store in redux on refresh/reload they will be lost.
    </Typography>
  );
}

const theme = createTheme();
function SignIn({ userList, loginStatus, addNewUser, setCurrentUserData }) {
  const [componentState, setComponentState] = React.useState("login");
  const { enqueueSnackbar } = useSnackbar();

  const switchComponentState = (event) => {
    let state = event.currentTarget.attributes["data-id"].value;
    if (state === "login") {
      setComponentState("login");
    } else {
      setComponentState("signUp");
    }
  };

  const onSignIn = (values) => {
    // eslint-disable-next-line array-callback-return
    userList.map((user) => {
      if (user.userName === values.userName) {
        if (user.password === values.password) {
          setCurrentUserData(user);
          loginStatus(true);
        } else {
          enqueueSnackbar("Password does not match with the user name", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        }
      } else if (user.userName === values.userName) {
        enqueueSnackbar("No user found with this User Name.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    });
  };

  const onSignUp = (values) => {
    addNewUser([...userList, { ...values }]);
    enqueueSnackbar(
      "You have successfully registered, Please loging to continue.",
      {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      }
    );
    setComponentState("login");
  };

  return (
    <div style={{ height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          {componentState === "login" ? (
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#f3f2ff",
                borderRadius: "2%",
                padding: "10%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Formik
                  initialValues={{ userName: "", password: "" }}
                  enableReinitialize={true}
                  onSubmit={onSignIn}
                >
                  {() => {
                    return (
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              fullWidth
                              id="userName"
                              label="User Name"
                              name="userName"
                              autoComplete="userName"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                            />
                          </Grid>
                        </Grid>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Login
                          </Button>
                          <Typography>Or Create a New Account</Typography>
                          <Button
                            onClick={switchComponentState}
                            data-id={"signUp"}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Sign Up
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#f3f2ff",
                borderRadius: "2%",
                padding: "10%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    userName: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  enableReinitialize={true}
                  onSubmit={onSignUp}
                  validationSchema={Validations.signUp}
                >
                  {() => {
                    return (
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Field
                              as={TextField}
                              autoComplete="given-name"
                              name="firstName"
                              fullWidth
                              id="firstName"
                              label="First Name"
                              autoFocus
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
                          <Grid item xs={12} sm={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              id="lastName"
                              label="Last Name"
                              name="lastName"
                              autoComplete="family-name"
                            />
                            <ErrorMessage name="lastName">
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
                            <Field
                              as={TextField}
                              fullWidth
                              name="userName"
                              label="User Name"
                              type="text"
                              id="text"
                              autoComplete="userName"
                            />
                            <ErrorMessage name="userName">
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
                            <Field
                              as={TextField}
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                            />
                            <ErrorMessage name="password">
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
                            <Field
                              as={TextField}
                              fullWidth
                              name="confirmPassword"
                              label="Confirm Password"
                              type="password"
                              id="confirmPassword"
                              autoComplete="new-password"
                            />
                            <ErrorMessage name="confirmPassword">
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
                        </Grid>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Sign Up
                          </Button>
                          <Typography>Or Have An Account</Typography>
                          <Button
                            onClick={switchComponentState}
                            fullWidth
                            data-id={"login"}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                          >
                            Login In
                          </Button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </Box>
            </Box>
          )}
          <OtherInfo sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userList: get(state, "userData.userList"),
});

export default connect(mapStateToProps, {
  loginStatus,
  addNewUser,
  setCurrentUserData,
})(SignIn);
