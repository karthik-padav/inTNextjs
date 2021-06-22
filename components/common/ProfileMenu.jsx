import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Paper, Box } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { login } from "dataService/Api";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import { connect, useDispatch, useSelector } from "react-redux";
import _get from "lodash/get";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditProfile from "pages/profilePage/EditProfile";
import Link from "next/link";
import { updateToastMsg } from "redux/slices/uiSlice";
import { getLoggedUser, loggedUserReducer } from "redux/slices/loggedUserSlice";

const clientId =
  "142327848430-tmf4l94t5a7f6kcepvjhm6rqng02u6ga.apps.googleusercontent.com";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  p1: {
    padding: theme.spacing(1),
  },
  pl1: {
    paddingLeft: theme.spacing(1),
  },
  pt2: {
    paddingTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
  },
  mx_md: {
    width: "568px",
    maxWidth: "100%",
  },
}));

function ProfileMenu(props) {
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUser);
  const classes = useStyles();

  const [isEdit, toggleEditProfileModal] = React.useState(false);

  const responseGoogle = (response) => {
    if (_get(response, "googleId")) {
      const params = {
        providerId: response.googleId,
        email: response.profileObj.email,
        profilePicture: response.profileObj.imageUrl,
        familyName: response.profileObj.familyName,
        givenName: response.profileObj.givenName,
        provider: "Google",
      };
      login(params).then((res) => {
        if (_get(res, "status")) {
          const userData = _get(res, "data", null);
          dispatch(loggedUserReducer(userData));
          localStorage.setItem(
            "inTulunadu_accesstoken",
            JSON.stringify(userData.accesstoken)
          );
          dispatch(
            updateToastMsg({
              msg: `Howdy ${userData.givenName} ${userData.familyName}`,
              type: "success",
            })
          );
        }
      });
    } else {
      dispatch(
        updateToastMsg({
          msg: "Something went wrong.",
          type: "error",
        })
      );
    }
  };

  return (
    <>
      {loggedUser ? (
        <Link href="/profile">
          <a>
            <Grid container spacing={0} alignItems="center">
              <Grid item>
                <Avatar
                  src={_get(loggedUser, "profilePicture", "")}
                  className={classes.large}
                />
              </Grid>
              <Grid item className={classes.pl1}>
                <Typography align="left" variant="body1">
                  {_get(loggedUser, "givenName", "")}{" "}
                  {_get(loggedUser, "familyName", "")}
                </Typography>
                <Typography align="left" variant="body1">
                  {_get(loggedUser, "email", "")}
                </Typography>
              </Grid>
              {_get(loggedUser, "bio") && (
                <Grid item xs={12}>
                  <Typography align="left" variant="body1">
                    Bio: {loggedUser.bio}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </a>
        </Link>
      ) : (
        <Grid container spacing={0} alignItems="center">
          <Grid item xs={12}>
            <GoogleLogin
              clientId={clientId}
              className="loginBtn"
              onSuccess={responseGoogle}
              buttonText="Login with Google"
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Grid>
        </Grid>
      )}
      <Modal
        className={classes.modal}
        open={isEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isEdit}>
          <Paper className={classNames(classes.paper, classes.mx_md)}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className={classes.mb2}
            >
              <Typography variant="body1">Edit Profile</Typography>
              <IconButton
                variant="contained"
                className={classes.closeBtn}
                size="medium"
                color="primary"
                onClick={() => toggleEditProfileModal(false)}
              >
                <Icon className={"fa fa-times"} style={{ fontSize: 15 }} />
              </IconButton>
            </Box>
            <EditProfile toggleEditProfileModal={toggleEditProfileModal} />
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}

export default ProfileMenu;
