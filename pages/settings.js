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
  Typography,
  Modal,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import EditProfile from "components/common/EditProfile";
import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import Divider from "components/common/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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

function Settings(props) {
  console.log(props, "asd123");
  const { theme, updateTheme } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Paper className={classes.paper}>
              <ProfileMenu />
            </Paper>
            <Box pt={2}>
              <Paper className={classes.paper}>
                <Menu />
              </Paper>
            </Box>
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Settings</Typography>
            <Divider mt={1} mb={1} color="primary" />
            <EditProfile />
            <Box
              component="p"
              // m={0}
              variant="body1"
              fontWeight="fontWeightBold"
            >
              Theme:
            </Box>
            <Grid container>
              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="top"
                    value={theme}
                    onChange={(e) => updateTheme(e.target.value)}
                  >
                    <FormControlLabel
                      value="default"
                      control={<Radio color="primary" />}
                      label="Default"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="dark"
                      control={<Radio color="primary" />}
                      label="Dark"
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Box>
              <Box
                component="p"
                // m={0}
                variant="body1"
                fontWeight="fontWeightBold"
              >
                Account:
              </Box>
              <Box
                component="p"
                // m={0}
                variant="body1"
                fontWeight="fontWeightBold"
              >
                Delete Account
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Paper className={classes.paper}>xs=6</Paper>
          </div>
        </Grid>
      </Grid>
    */}
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
