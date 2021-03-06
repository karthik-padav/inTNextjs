import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Paper, Box } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import _get from "lodash/get";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import constants from "dataService/Constants";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { login } from "dataService/Services";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  ml1: {
    marginLeft: theme.spacing(1),
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
    boxShadow: theme.shadows[5],
  },
  mx_md: {
    width: "300px",
    maxWidth: "100%",
  },
}));

function LoginModal(props) {
  const classes = useStyles();
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
          props.toggleLoginModal(false);
          props.updateUser(userData);
          localStorage.setItem(
            "userDetails",
            JSON.stringify({
              accesstoken: userData.accesstoken,
              userId: userData.userId,
            })
          );
          props.updateToastMsg({
            msg: `Howdy ${userData.givenName} ${userData.familyName}`,
            type: "success",
          });
        }
      });
    } else {
      props.updateToastMsg({
        msg: "Something went wrong.",
        type: "error",
      });
    }
  };

  return (
    <Modal
      className={classes.modal}
      open={props.showLoginModal}
      closeAfterTransition
      onClose={() => props.toggleLoginModal(false)}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.showLoginModal}>
        <Paper className={classNames(classes.paper, classes.mx_md)}>
          <Box
            component="p"
            variant="body1"
            m={0}
            className={classes.mb2}
            fontWeight="fontWeightBold"
          >
            Login
          </Box>
          <GoogleLogin
            clientId={constants.clientId}
            className="loginBtn"
            onSuccess={responseGoogle}
            buttonText="Login with Google"
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Paper>
      </Fade>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginModal: _get(state, "ui.loginModal"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userDetails) => {
      dispatch({
        type: "UPDATE_USER",
        payload: userDetails,
      });
    },
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
    toggleLoginModal: (flag) => {
      dispatch({
        type: "SHOW_LOGIN_MODAL",
        payload: flag,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
