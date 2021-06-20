import {
  Grid,
  Paper,
  Box,
  IconButton,
  Icon,
  Button,
  Badge,
  Fade,
  Backdrop,
  Avatar,
  Typography,
  Modal,
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Divider from "components/common/Divider";

import ButtonWrapper from "components/common/ButtonWrapper";
import EditProfile from "pages/profilePage/EditProfile";

import { updateUserDetails } from "dataService/Api";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
  },
  xlarge: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  p1: {
    padding: theme.spacing(1),
  },
  inputFile: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
  userName: {
    fontSize: theme.spacing(4),
    textAlign: "center",
  },
  givenName: {
    fontSize: theme.spacing(4),
    textAlign: "right",
    paddingRight: theme.spacing(1),
  },
  familyName: {
    fontSize: theme.spacing(4),
    textAlign: "left",
    paddingLeft: theme.spacing(1),
  },
}));

function ProfileCard(props) {
  const classes = useStyles();
  const { updateUser } = props;
  const givenName = _get(props, "userDetails.givenName", "");
  const familyName = _get(props, "userDetails.familyName", "");
  const email = _get(props, "userDetails.email", "");
  const dpImage = _get(props, "userDetails.profilePicture", "");
  const bio = _get(props, "userDetails.bio");

  const [isEdit, toggleEdit] = useState(false);
  return (
    <div className={classes.root}>
      {isEdit ? (
        <EditProfile toggleEdit={toggleEdit} />
      ) : (
        <>
          <Box display="flex" justifyContent="flex-end">
            <ButtonWrapper
              onClick={() => {
                toggleEdit(true);
              }}
            >
              <Typography variant="button">Edit</Typography>
            </ButtonWrapper>
          </Box>
          <Box display="flex" justifyContent="center">
            <Avatar
              src="https://material-ui.com/static/images/avatar/1.jpg"
              className={classes.xlarge}
            />
          </Box>
          <Box
            display="flex"
            mt={1}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography className={classes.userName}>
              <b>
                {givenName} {familyName}
              </b>
            </Typography>
            <Typography variant="body1">{email}</Typography>
            {bio && <Typography variant="body1">{bio}</Typography>}
          </Box>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // toastMsg: state.toastMsg,
    userDetails: state.userDetails,
    // theme: state.theme,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
