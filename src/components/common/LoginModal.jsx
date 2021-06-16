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
import constants from "src/dataService/Constants";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { login } from "src/dataService/Services";
import { bindActionCreators } from "redux";
import DialogBox from "src/components/common/dialogBoxWrapper/DialogBox";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "src/themes/ThemeColors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mx_md: {
    width: "300px",
    maxWidth: "100%",
  },
  blueWrapper: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
  },
  logo: {
    height: "25px",
    width: "auto",
  },
  loginBtn: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
}));

function LoginModal(props) {
  const classes = useStyles();
  const {
    showLoginModal,
    toggleLoginModal,
    toggleDeactivatedModal,
    updateUser,
    updateToastMsg,
  } = props;

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
      console.log(JSON.stringify(params), "params123");
      login(params).then((res) => {
        if (_get(res, "status")) {
          if (
            _get(res, "data.activeAccount") === 0 ||
            _get(res, "data.status") === 0
          ) {
            toggleLoginModal(false);
            toggleDeactivatedModal(true, {
              ...res.data,
              message: res.message,
            });
          } else {
            const userData = _get(res, "data", null);
            toggleLoginModal(false);
            updateUser(userData);
            localStorage.setItem(
              "userDetails",
              JSON.stringify({
                accesstoken: userData.accesstoken,
                userId: userData.userId,
              })
            );
            updateToastMsg({
              msg: `Howdy ${userData.givenName} ${userData.familyName}`,
              type: "success",
            });
          }
        }
      });
    } else {
      updateToastMsg({
        msg: "Something went wrong.",
        type: "error",
      });
    }
  };

  return (
    <DialogBox
      isModalOpen={showLoginModal}
      fullWidth
      onClose={() => toggleLoginModal(false)}
      body={
        <>
          <Box className={classes.blueWrapper}>
            <Box display="flex" justifyContent="flex-end">
              <ButtonWrapper
                type="IconButton"
                bgColor={colors.blue}
                color="#fff"
                onClick={() => toggleLoginModal(false)}
              >
                <Icon className="fas fa-times" fontSize="small" />
              </ButtonWrapper>
            </Box>
            <Box px={2} mt={1} mb={5}>
              <Typography align="center" variant="body1">
                WELCONE TO
              </Typography>
              <Box display="flex" justifyContent="center">
                <img
                  src="/images/INT.png"
                  alt="in Tulunadu"
                  className={classes.logo}
                />
              </Box>
            </Box>
          </Box>

          <Box mt={-4} mx={2} mb={2}>
            {/* <Paper>
              <Box p={2}>
                <Typography align="center" variant="h2">
                  Login
                </Typography> */}
            <GoogleLogin
              clientId={constants.clientId}
              className={classes.loginBtn}
              onSuccess={responseGoogle}
              buttonText="Login with Google"
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            {/* </Box>
            </Paper> */}
          </Box>
        </>
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginModal: _get(state, "ui.loginModal", false),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoginModal: (flag) => {
      dispatch({
        type: "SHOW_LOGIN_MODAL",
        payload: flag,
      });
    },
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
    toggleDeactivatedModal: (show, data) => {
      dispatch({
        type: "SHOW_USER_DEACTIVATED_MODAL",
        payload: { show, data },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
