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
import { orange, grey } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import classNames from "classnames";
import ButtonWrapper from "components/common/ButtonWrapper";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import { getUserDetails, updateUserDetails } from "dataService/Api";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function AccountSettings(props) {
  const { updateUser } = props;
  const classes = useStyles();
  const [confirmAlertButtons, setAlertBoxPayload] = useState([]);
  const [deactivateFlag, setDeactivateFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [loader, setLoader] = useState(false);

  const generateConfirmAlertButtons = (event, flag) => {
    let payload = false;
    if (event.target.checked) {
      switch (flag) {
        case "DEACTIVATE":
          payload = {
            title: "Deactivate Account",
            subTitle: "Are you sure you want to deactivate your account?",
            menuItem: [
              {
                title: "No",
                code: "no",
                cb: () => {
                  setAlertBoxPayload(false);
                  setDeactivateFlag(false);
                },
                mr: 2,
                color: colors.blue,
                bgColor: grey[100],
              },
              {
                title: "Yes",
                code: "yes",
                cb: () => confirmAlertBox({ status: 0 }),
              },
            ],
          };
          break;

        case "DELETE":
          payload = {
            title: "Delete Account",
            subTitle: "Are you sure you want to delete your account?",
            menuItem: [
              {
                title: "No",
                code: "no",
                cb: () => {
                  setAlertBoxPayload(false);
                  setDeleteFlag(false);
                },
                mr: 2,
                color: colors.blue,
                bgColor: grey[100],
              },
              {
                title: "Yes",
                code: "yes",
                cb: () => confirmAlertBox({ activeAccount: 0 }),
              },
            ],
          };
          break;

        default:
          break;
      }
      setAlertBoxPayload(payload);
    } else {
      switch (flag) {
        case "DEACTIVATE":
          setDeactivateFlag(false);
          break;
        case "DELETE":
          setDeleteFlag(false);
          break;

        default:
          break;
      }
    }
  };

  const confirmAlertBox = (obj) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("data", JSON.stringify(obj));
    updateUserDetails(formData).then((res) => {
      const userData = _get(res, "data");
      if (_get(res, "status") && userData) {
        updateUser(null);
        localStorage.removeItem("userDetails");
      } else {
        updateToastMsg({
          msg: "Something went wrong.",
          type: "error",
        });
      }
      setLoader(false);
    });
    setAlertBoxPayload(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h3">Account:</Typography>
      <Divider mt={1} mb={1} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body1">Deactivate Account</Typography>
          <Typography variant="caption">
            Auto adjust according to Day/Night.
          </Typography>
        </Box>
        {console.log(deactivateFlag, "deactivateFlag123")}
        <Switch
          edge="end"
          onChange={(e) => {
            setDeactivateFlag(true);
            generateConfirmAlertButtons(e, "DEACTIVATE");
          }}
          checked={deactivateFlag}
          color="primary"
        />
      </Box>
      <Divider mt={1} mb={1} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body1">Delete Account</Typography>
          <Typography variant="caption">
            Auto adjust according to Day/Night.
          </Typography>
        </Box>
        {console.log(deleteFlag, "deleteFlag123")}
        <Switch
          edge="end"
          onChange={(e) => {
            setDeleteFlag(true);
            generateConfirmAlertButtons(e, "DELETE");
          }}
          checked={deleteFlag}
          color="primary"
        />
      </Box>

      <ConfirmAlertBox
        menu={confirmAlertButtons.menuItem}
        loader={loader}
        title={
          <Typography variant="h1">{confirmAlertButtons.title}</Typography>
        }
        subtitle={confirmAlertButtons.subTitle}
        // data={modalData}
        isModalOpen={!_isEmpty(confirmAlertButtons)}
      />
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
    updateUser: (userDetails) => {
      dispatch({
        type: "UPDATE_USER",
        payload: userDetails,
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
