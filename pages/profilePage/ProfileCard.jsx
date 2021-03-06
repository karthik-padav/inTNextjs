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

import TextField from "@material-ui/core/TextField";

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import EditProfile from "components/common/EditProfile";
import Menu from "components/common/Menu";
import Divider from "components/common/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ProfileMenu from "components/common/ProfileMenu";

import { updateUserDetails } from "dataService/Services";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

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
  xlarge: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  p1: {
    padding: theme.spacing(1),
  },
  inputFile: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
  userName: {
    fontSize: theme.spacing(4),
    textAlign: "center",
  },
  givenName: {
    fontSize: theme.spacing(4),
    textAlign: "right",
    paddingRight: theme.spacing(1),
  },
  familyName: {
    fontSize: theme.spacing(4),
    textAlign: "left",
    paddingLeft: theme.spacing(1),
  },
}));

function ProfileCard(props) {
  console.log(props, "asd123");
  const classes = useStyles();
  const givenName = _get(props, "userDetails.givenName", "");
  const familyName = _get(props, "userDetails.familyName", "");
  const email = _get(props, "userDetails.email", "");
  const dpImage = _get(props, "userDetails.profilePicture", "");

  const [isEdit, toggleEdit] = useState(false);
  const [newGivenName, setNewGivenName] = useState(givenName);
  const [newFamilyName, setNewFamilyName] = useState(familyName);
  const [newDpImage, setNewDp] = useState({});

  function handleUserName(e, type) {
    if (type === "givenName") setNewGivenName(e.target.value);
    if (type === "familyName") setNewFamilyName(e.target.value);
  }

  function setDp(e) {
    if (_get(e, "target.files")) {
      let files = Array.from(e.target.files);
      files.forEach((file, index) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          let previewImage = {
            file,
            imagesUrl: reader.result,
          };
          if (index + 1 === files.length) {
            setNewDp(previewImage);
            console.log(previewImage, "previewImage123");
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  async function updateUserProfile() {
    console.log(newFamilyName, "newFamilyName123");
    console.log(newGivenName, "newGivenName123");
    console.log(newDpImage, "newDpImage123");
    const formdata = await generateFinalFormData();

    updateUserDetails(formdata).then((res) => {});
  }

  function generateFinalFormData() {
    let formData = new FormData();
    if (_get(newDpImage, "file"))
      formData.append("newDpImage", newDpImage.file);
    const data = {
      givenName: newGivenName,
      familyName: newFamilyName,
    };
    formData.append("data", JSON.stringify(data));
    return formData;
  }

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Profile</Typography>
        <Box display="flex" justifyContent="flex-end">
          {isEdit ? (
            <>
              <Box mr={1}>
                <Button onClick={() => toggleEdit(false)}>Cancel</Button>
              </Box>
              <Button
                variant="contained"
                onClick={updateUserProfile}
                color="primary"
                disabled={_isEmpty(newFamilyName) || _isEmpty(newGivenName)}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              color="primary"
              onClick={() => {
                setNewGivenName(givenName);
                setNewFamilyName(familyName);
                setNewDp({});
                toggleEdit(true);
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>
      <Divider mt={1} mb={1} color="primary" />
      <Box display="flex" justifyContent="center">
        {isEdit ? (
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <Box position="relative">
                <Avatar>
                  <Icon className={"fa fa-camera"} style={{ fontSize: 20 }} />
                  <input
                    type="file"
                    name="myImage"
                    className={classes.inputFile}
                    accept="image/*"
                    onChange={setDp}
                  />
                </Avatar>
              </Box>
            }
          >
            <Avatar
              src={_get(newDpImage, "imagesUrl", dpImage)}
              className={classes.xlarge}
            />
          </Badge>
        ) : (
          <Avatar
            src="https://material-ui.com/static/images/avatar/1.jpg"
            className={classes.xlarge}
          />
        )}
      </Box>
      <Box
        display="flex"
        mt={2}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {isEdit ? (
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              InputProps={{
                classes: {
                  input: classes.givenName,
                },
              }}
              onChange={(e) => handleUserName(e, "givenName")}
              id="standard-basic"
              value={newGivenName}
            />
            <TextField
              InputProps={{
                classes: {
                  input: classes.familyName,
                },
              }}
              onChange={(e) => handleUserName(e, "familyName")}
              id="standard-basic"
              value={newFamilyName}
            />
          </form>
        ) : (
          <>
            <Typography className={classes.userName}>
              <b>
                {givenName} {familyName}
              </b>
            </Typography>
            <Typography variant="body1">
              <b>{email}</b>
            </Typography>
          </>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
