import { Grid, Paper, Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ProfileMenu from "src/components/common/ProfileMenu";
import Menu from "src/components/common/Menu";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import WifiIcon from "@material-ui/icons/Wifi";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import Divider from "src/components/common/Divider";
import Theme from "src/pages/settings/Theme";
import BloodValunteer from "src/pages/settings/BloodValunteer";
import AccountSettings from "src/pages/settings/AccountSettings";
import { useRouter } from "next/router";
import { isLoggedIn } from "src/utils/Common";

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
  headerTitle: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.blue,
    padding: theme.spacing(1, 2),
  },
  p1: {
    padding: theme.spacing(1),
  },
}));

function Settings(props) {
  const { theme, updateTheme, userDetails } = props;
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    // console.log(userDetails, "userDetails123");
    // if (!userDetails) router.push("/");
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Menu />
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          <Paper className={classes.headerTitle}>
            <Typography variant="h1">Settings</Typography>
          </Paper>

          <Box mb={1}>
            <Paper className={classes.paper}>
              <Theme />
              {isLoggedIn() && <BloodValunteer />}
            </Paper>
          </Box>

          {isLoggedIn() && (
            <Box mb={1}>
              <Paper className={classes.paper}>
                <AccountSettings />
              </Paper>
            </Box>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
