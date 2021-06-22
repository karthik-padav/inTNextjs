import Head from "next/head";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Paper, Box } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import _get from "lodash/get";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import constants from "dataService/Constants";
import { GoogleLogin } from "react-google-login";
import { connect, useDispatch, useSelector } from "react-redux";
import { login } from "dataService/Api";
import { bindActionCreators } from "redux";
import DialogBox from "components/common/dialogBoxWrapper/DialogBox";
import ButtonWrapper from "components/common/ButtonWrapper";
import { grey, red, blue } from "@material-ui/core/colors";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import colors from "themes/ThemeColors";
import { getUserDetails, updateUserDetails } from "dataService/Api";
import {
  updateToastMsg,
  getDeactivateModal,
  toggleDeactivateUserModal,
} from "redux/slices/uiSlice";
import { loggedUserReducer } from "redux/slices/loggedUserSlice";

const useStyles = makeStyles((theme) => ({}));

function UserDeactivated(props) {
  const dispatch = useDispatch();
  const { flag: showModal = false, data: modalData = null } =
    useSelector(getDeactivateModal);
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const message = _get(modalData, "message", "Account has been delete");
  const status = _get(modalData, "status");
  const activeAccount = _get(modalData, "activeAccount");
  let confirmAlertButtons = [];

  const updateUserStatus = async (value) => {
    setLoader(true);
    // dispatch(loggedUserReducer({ accesstoken: value.accesstoken }));

    const formData = new FormData();
    formData.append("data", JSON.stringify({ status: 1 }));
    updateUserDetails(formData).then((res) => {
      const userData = _get(res, "data");
      if (_get(res, "status") && userData) {
        dispatch(toggleDeactivateUserModal({ flag: false, data: null }));
        dispatch(loggedUserReducer(userData));
        localStorage.setItem(
          "inTulunadu_accesstoken",
          JSON.stringify(value.accesstoken)
        );
      } else {
        dispatch(toggleDeactivateUserModal({ flag: false, data: null }));
        dispatch(loggedUserReducer(null));
        dispatch(
          updateToastMsg({
            msg: "Something went wrong.",
            type: "error",
          })
        );
      }
      setLoader(false);
    });
  };

  if (activeAccount === 0) {
    confirmAlertButtons = [
      {
        title: "Ok",
        code: "yes",
        cb: () =>
          dispatch(toggleDeactivateUserModal({ flag: false, data: null })),
      },
    ];
  } else if (status === 0) {
    confirmAlertButtons = [
      {
        title: "No",
        code: "no",
        cb: () =>
          dispatch(toggleDeactivateUserModal({ flag: false, data: null })),
        mr: 2,
        color: colors.blue,
        bgColor: grey[100],
      },
      {
        title: "Yes",
        code: "yes",
        cb: updateUserStatus,
      },
    ];
  } else {
    dispatch(toggleDeactivateUserModal({ flag: false, data: null }));
  }

  return (
    <ConfirmAlertBox
      menu={confirmAlertButtons}
      loader={loader}
      title={<Typography variant="h1">Account</Typography>}
      subtitle={message}
      data={modalData}
      isModalOpen={showModal}
    />
  );
}

export default UserDeactivated;
