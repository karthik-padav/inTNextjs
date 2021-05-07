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
import OnlineShopWrapper from "pages/onlineShop/OnlineShopWrapper";
import LoaderComponent from "pages/bloodbank/LoaderComponent";
import ButtonWrapper from "components/common/ButtonWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  raiseRequestBtn: {
    borderRadius: "50px",
  },
  closeBtn: {
    padding: theme.spacing(1.5),
  },
  p1: {
    padding: theme.spacing(1),
  },
  pl1: {
    paddingLeft: theme.spacing(1),
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
  mx_md: {
    width: "568px",
    maxWidth: "100%",
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -5,
    top: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function OnlineShop(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Menu />
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          <OnlineShopWrapper />
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
    userDetails: state.userDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineShop);
