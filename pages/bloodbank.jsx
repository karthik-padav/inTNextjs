import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FilterWrapper from "pages/bloodbank/FilterWrapper";

import classNames from "classnames";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";

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
  Modal,
  Typography,
} from "@material-ui/core";

import {
  getBloodReceiver,
  getBloodDonor,
  postBloodRequest,
  deleteBloodRequest,
} from "dataService/Services";
import constants from "dataService/Constants";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import { redMode, darkMode } from "dataService/Theme";

import RequestBloodForm from "pages/bloodbank/AddBloodRequestWrapper/RequestBloodForm";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import UserHeaderCard from "components/common/UserHeaderCard";
import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import SimpleTabs from "pages/bloodbank/SimpleTabs";
import { isLoggedIn } from "Function/Common";
import Link from "next/link";
import { withStyles } from "@material-ui/core/styles";

import PostCardWrapper from "components/common/PostCard/PostCardWrapper";

import BloodDetailsCard from "pages/bloodbank/BloodDetailsCard";
import BloodWrapper from "pages/bloodbank/BloodWrapper";
import LoaderComponent from "pages/bloodbank/LoaderComponent";
import ButtonWrapper from "components/common/ButtonWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

function BloodBank(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={3}>
          <Box p={1}>
            <div className="stickyWrapper">
              <Menu />
            </div>
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <Box p={1}>
            <BloodWrapper />
          </Box>
        </Grid>
        <Grid item sm={12} md={3}>
          <Box p={1}>
            <div className="stickyWrapper">
              <Paper className={classes.paper}>xs=6</Paper>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    bRequestList: _get(state, "bRequestList.data", []),
    state,
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

export default connect(mapStateToProps, mapDispatchToProps)(BloodBank);
