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
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import SEO from "SEO/shop";
import { NextSeo } from "next-seo";
import Menu from "components/common/Menu";
import ProfileCard from "./profilePage/ProfileCard";
import ScrollableTabsButtonAuto from "./profilePage/ScrollableTabsButtonAuto";

import PhoneAuthentication from "./profilePage/PhoneAuthentication";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  p1: {
    padding: theme.spacing(1),
  },
}));

function Profile(props) {
  const { userDetails, togglePhoneAuthModal } = props;
  const router = useRouter();

  const classes = useStyles();

  useEffect(() => {
    if (!userDetails) router.push("/");
  }, [userDetails]);

  return (
    <div className={classes.root}>
      <NextSeo {...SEO} />
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Menu />
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          <Paper className={classes.paper}>
            <ProfileCard />
          </Paper>
          <Box mt={1}>
            <PhoneAuthentication />
          </Box>

          <Box mt={1}>
            <ScrollableTabsButtonAuto />
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
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
