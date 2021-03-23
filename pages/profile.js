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

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import EditProfile from "components/common/EditProfile";
import Menu from "components/common/Menu";
import Divider from "components/common/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ProfileMenu from "components/common/ProfileMenu";
import ProfileCard from "./profilePage/ProfileCard";
import { profileMenu } from "dataService/MenuLists";
import MyPostCard from "./profilePage/MyPostCard";
import constants from "dataService/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  p1: {
    padding: theme.spacing(1),
  },
}));

function Profile(props) {
  const classes = useStyles();

  const handleClick = (item) => {
    console.log(item, "we are in handleClick");
  };

  const menuItem = [
    constants.MENU.HOME,
    {
      title: "My Post",
      code: "myPost",
      icon: "fa fa-hand-holding-heart",
      iconSize: "small",
      iconColor: "red",
      cb: handleClick,
    },
    constants.MENU.ABOUT,
    constants.MENU.SETTINGS,
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Paper className={classes.paper}>
              <Menu menuItem={menuItem} />
            </Paper>
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          <Paper className={classes.paper}>
            <ProfileCard />
          </Paper>

          <Box mt={1}>
            <MyPostCard />
          </Box>
        </Grid>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Paper className={classes.paper}>xs=6</Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    toastMsg: state.toastMsg,
    userDetails: state.userDetails,
    theme: state.theme,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateTheme: (mode) => {
      dispatch({
        type: "UPDATE_THEME",
        payload: mode,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
