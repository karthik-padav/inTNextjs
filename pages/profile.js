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
  console.log(props, "asd123");
  const classes = useStyles();

  const editClicked = () => {
    console.log("we are in editClicked");
  };
  const menuItem = [
    {
      title: "Home",
      icon: "fa fa-hand-holding-heart",
      iconSize: "small",
      iconColor: "red",
      redirect: "/",
    },
    {
      title: "About",
      icon: "fa fa-hand-holding-heart",
      iconSize: "small",
      iconColor: "red",
      redirect: "/about",
    },
    {
      title: "Show Menu",
      icon: "fa fa-hand-holding-heart",
      iconSize: "small",
      iconColor: "red",
      cb: editClicked,
    },
    {
      title: "Settings",
      icon: "fa fa-hand-holding-heart",
      iconSize: "small",
      iconColor: "red",
      redirect: "/settings",
    },
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
            <Paper className={classes.paper}>
              <MyPostCard />
            </Paper>
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
