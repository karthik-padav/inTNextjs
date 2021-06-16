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
import EditProfile from "src/pages/profilePage/EditProfile";
import ProfileMenu from "src/components/common/ProfileMenu";
import Menu from "src/components/common/Menu";
import Divider from "src/components/common/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Icon from "@material-ui/core/Icon";
import Switch from "@material-ui/core/Switch";
import constants from "src/dataService/Constants";
import { red } from "@material-ui/core/colors";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function BloodValunteer(props) {
  const { theme, updateTheme } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            style={{
              color: red[500],
              backgroundColor: red[100],
            }}
          >
            <Icon
              className={classNames("fas fa-tint")}
              style={{ color: red[500], width: "auto" }}
              fontSize="small"
            />
          </Avatar>
          <Box ml={2}>
            <Typography variant="body1">Become a blood volunteer</Typography>
            <Typography variant="subtitle1">
              You will get notification.
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

export default connect(mapStateToProps, mapDispatchToProps)(BloodValunteer);
