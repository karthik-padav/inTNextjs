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
import constants from "src/dataService/Constants";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { login } from "src/dataService/Services";
import { bindActionCreators } from "redux";
import DialogBox from "src/components/common/dialogBoxWrapper/DialogBox";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import { grey, red, blue } from "@material-ui/core/colors";
import ConfirmAlertBox from "src/components/common/ConfirmAlertBox";
import colors from "src/themes/themeColors";
import { getUserDetails, updateUserDetails } from "src/dataService/Services";

const useStyles = makeStyles((theme) => ({}));

function UserDeactivated(props) {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const { showModal, toggleModal, modalData, updateUser, updateToastMsg } =
    props;
  const message = _get(modalData, "message", "Account has been delete");
  const status = _get(modalData, "status");
  const activeAccount = _get(modalData, "activeAccount");
  let confirmAlertButtons = [];

  const updateUserStatus = async (value) => {
    setLoader(true);
    console.log(value, "value123321");
    await updateUser({ accesstoken: value.accesstoken });

    const formData = new FormData();
    formData.append("data", JSON.stringify({ status: 1 }));
    updateUserDetails(formData).then((res) => {
      const userData = _get(res, "data");
      if (_get(res, "status") && userData) {
        toggleModal(false, null);
        updateUser(userData);
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            accesstoken: value.accesstoken,
            userId: value.userId,
          })
        );
      } else {
        toggleModal(false, null);
        updateUser(null);
        updateToastMsg({
          msg: "Something went wrong.",
          type: "error",
        });
      }
      setLoader(false);
    });
  };

  if (activeAccount === 0) {
    confirmAlertButtons = [
      {
        title: "Ok",
        code: "yes",
        cb: () => toggleModal(false, null),
      },
    ];
  } else if (status === 0) {
    confirmAlertButtons = [
      {
        title: "No",
        code: "no",
        cb: () => toggleModal(false, null),
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
    toggleModal(false, null);
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

const mapStateToProps = (state) => {
  return {
    showModal: _get(state, "ui.deactivatedModal.show", false),
    modalData: _get(state, "ui.deactivatedModal.data"),
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
    toggleModal: (show, data) => {
      dispatch({
        type: "SHOW_USER_DEACTIVATED_MODAL",
        payload: { show, data },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDeactivated);
