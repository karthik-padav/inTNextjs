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
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "dataService/Api";
import DialogBox from "components/common/dialogBoxWrapper/DialogBox";
import ButtonWrapper from "components/common/ButtonWrapper";
import colors from "themes/ThemeColors";
import {
  showLoginModal,
  updateToastMsg,
  toggleLoginModal,
} from "redux/slices/uiSlice";
import { loggedUserReducer } from "redux/slices/loggedUserSlice";

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
  const { toggleDeactivatedModal } = props;
  const isOpen = useSelector(showLoginModal);
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    if (_get(response, "googleId")) {
      const params = {
        providerId: response.googleId,
        email: response.profileObj.email,
        profilePicture: response.profileObj.imageUrl,
        familyName: response.profileObj.familyName,
        givenName: response.profileObj.givenName,
        provider: "Google",
      };
      const { data, error } = await login(params);
      if (error) {
        dispatch(
          updateToastMsg({ msg: "Something went wrong.", type: "error" })
        );
        return;
      }
      if (data?.status) {
        const loggedUser = _get(data, "data");
        if (
          _get(loggedUser, "activeAccount") === 0 ||
          _get(loggedUser, "status") === 0
        ) {
          dispatch(toggleLoginModal());
          toggleDeactivatedModal(true, {
            ...loggedUser,
            message: data.message,
          });
        } else {
          dispatch(toggleLoginModal());
          dispatch(loggedUserReducer(loggedUser));
          localStorage.setItem(
            "inTulunadu_accesstoken",
            JSON.stringify(loggedUser.accesstoken)
          );
          dispatch(
            updateToastMsg({
              msg: `Howdy ${loggedUser.givenName} ${loggedUser.familyName}`,
              type: "success",
            })
          );
        }
      }
    } else {
      dispatch(updateToastMsg({ msg: "Something went wrong.", type: "error" }));
    }
  };

  return (
    <DialogBox
      isModalOpen={isOpen}
      fullWidth
      onClose={() => dispatch(toggleLoginModal())}
      body={
        <>
          <Box className={classes.blueWrapper}>
            <Box display="flex" justifyContent="flex-end">
              <ButtonWrapper
                type="IconButton"
                bgColor={colors.blue}
                color="#fff"
                onClick={() => dispatch(toggleLoginModal())}
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

export default LoginModal;
