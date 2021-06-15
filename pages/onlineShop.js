import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";

import { Grid, Paper, Badge } from "@material-ui/core";

import Menu from "components/common/Menu";
import { withStyles } from "@material-ui/core/styles";
import OnlineShopWrapper from "pages/onlineShop/OnlineShopWrapper";
import SEO from "SEO/shop";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import permission from "dataService/Permission";

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

function OnlineShop(props) {
  const classes = useStyles();

  const router = useRouter();

  useEffect(() => {
    if (!permission?.ONLINE_SHOP?.show) router.push("/");
  }, []);

  if (permission?.ONLINE_SHOP?.show)
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

  return null;
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
