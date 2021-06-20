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
import EditProfile from "pages/profilePage/EditProfile";
import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import Divider from "components/common/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import Switch from "@material-ui/core/Switch";
import constants from "dataService/Constants";
import { orange } from "@material-ui/core/colors";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Theme(props) {
  const { theme, updateTheme } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Avatar
            style={{
              color: orange[500],
              backgroundColor: orange[100],
            }}
          >
            <Icon
              className={classNames("fas fa-palette")}
              style={{ color: orange[500], width: "auto" }}
              fontSize="small"
            />
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
          color="primary"
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
            <Icon className={classNames("fas fa-moon")} fontSize="small" />
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
          onChange={(e) => {
            const mode = e.target.checked
              ? constants.THEME.DARK
              : constants.THEME.LIGHT;
            updateTheme(mode);
            localStorage.setItem(
              "theme",
              JSON.stringify({
                themeData: {
                  mode,
                },
              })
            );
          }}
          checked={theme === constants.THEME.DARK}
          color="primary"
        />
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state, "state123");
  return {
    toastMsg: state.toastMsg,
    userDetails: state.userDetails,
    theme: state.ui.theme,
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
