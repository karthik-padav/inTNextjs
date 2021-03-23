import {
  Box,
  IconButton,
  Button,
  Badge,
  Fade,
  Backdrop,
  Typography,
  Avatar,
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
import Icon from "@material-ui/core/Icon";
import Switch from "@material-ui/core/Switch";

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

function Theme(props) {
  const { theme, updateTheme } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Typography variant="h1">Theme</Typography> */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Box display="flex" alignItems="center">
          <Avatar>
            <Icon className={"fas fa-palette"} fontSize="small" />
          </Avatar>
          <Box ml={2}>
            <Typography variant="body1">Theme</Typography>
            <Typography variant="subtitle1">
              Auto adjust according to Day/Night.
            </Typography>
          </Box>
        </Box>

        <Switch
          edge="end"
          // onChange={handleToggle('wifi')}
          // checked={checked.indexOf('wifi') !== -1}
          inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Box display="flex" alignItems="center">
          <Avatar>
            <Icon className={"fas fa-moon"} fontSize="small" />
          </Avatar>
          <Box ml={2}>
            <Typography variant="body1">Dark Mode</Typography>
            <Typography variant="subtitle1">
              Adjust the appearance of Facebook to reduce glare and give your
              eyes a break.
            </Typography>
          </Box>
        </Box>

        <Switch
          edge="end"
          // onChange={handleToggle('wifi')}
          // checked={checked.indexOf('wifi') !== -1}
          inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
        />
      </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
