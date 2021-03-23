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
import Divider from "components/common/Divider";

import ButtonWrapper from "components/common/ButtonWrapper";

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
  const classes = useStyles();
  const { updateUser } = props;
  const givenName = _get(props, "userDetails.givenName", "");
  const familyName = _get(props, "userDetails.familyName", "");
  const email = _get(props, "userDetails.email", "");
  const dpImage = _get(props, "userDetails.profilePicture", "");

  const [isEdit, toggleEdit] = useState(false);
  const [newGivenName, setNewGivenName] = useState(givenName);
  const [newFamilyName, setNewFamilyName] = useState(familyName);
  const [newDpImage, setNewDp] = useState({});
  const [loader, setLoader] = useState(false);

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
    setLoader(true);
    const formdata = await generateFinalFormData();
    updateUserDetails(formdata)
      .then((res) => {
        if (_get(res, "status")) {
          setLoader(false);
          updateUser(_get(res, "data"));
          setNewGivenName(_get(res, "data.givenName"));
          setNewFamilyName(_get(res, "data.familyName"));
          toggleEdit(false);
        } else {
          setLoader(false);
          updateToastMsg({ msg: res.message, type: "error" });
        }
      })
      .catch((err) => {
        setLoader(false);
      });
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h1">Profile</Typography>
        <Box display="flex" justifyContent="flex-end">
          {isEdit ? (
            <>
              <ButtonWrapper
                bgColor="color3"
                hoverBgColor="color2"
                mr={1}
                color="color1"
                onClick={() => toggleEdit(false)}
                disabled={loader}
              >
                <Typography variant="button">Cancel</Typography>
              </ButtonWrapper>

              <ButtonWrapper
                bgColor="color3"
                hoverBgColor="color2"
                color="color1"
                onClick={updateUserProfile}
                disabled={
                  _isEmpty(newFamilyName) || _isEmpty(newGivenName) || loader
                }
                loader={loader}
              >
                <Typography variant="button">Save</Typography>
              </ButtonWrapper>
            </>
          ) : (
            <ButtonWrapper
              bgColor="color3"
              hoverBgColor="color2"
              color="color1"
              onClick={() => {
                setNewGivenName(givenName);
                setNewFamilyName(familyName);
                setNewDp({});
                toggleEdit(true);
              }}
            >
              <Typography variant="button">Edit</Typography>
            </ButtonWrapper>
          )}
        </Box>
      </Box>
      <Divider mt={2} mb={2} />
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
                    disabled={loader}
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
          <Box display="flex">
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
          </Box>
        ) : (
          <>
            <Typography className={classes.userName}>
              <b>
                {givenName} {familyName}
              </b>
            </Typography>
          </>
        )}
        <Typography variant="body1">{email}</Typography>
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // toastMsg: state.toastMsg,
    userDetails: state.userDetails,
    // theme: state.theme,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userDetails) => {
      dispatch({
        type: "UPDATE_USER",
        payload: userDetails,
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
