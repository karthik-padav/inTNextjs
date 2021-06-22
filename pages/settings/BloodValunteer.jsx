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
import { red } from "@material-ui/core/colors";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function BloodValunteer(props) {
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
      </Box>
    </div>
  );
}

export default BloodValunteer;
