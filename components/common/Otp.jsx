import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Box, TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { connect } from "react-redux";
import { postFeed } from "dataService/Services";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonWrapper from "components/common/ButtonWrapper";
import Dialog from "@material-ui/core/Dialog";
import DialogBox from "components/common/DialogBoxWrapper/DialogBox";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "Themes/ThemeColors";

const useStyles = makeStyles((theme) => ({
  submitLoaderBtn: {
    position: "absolute",
  },
}));

function Otp(props) {
  const classes = useStyles();
  const { toggleOtpModal, isModalOpen } = props;
  const [submitLoader, setSubmitLoader] = React.useState(false);

  const handleSubmit = async () => {};

  return (
    <DialogBox
      isModalOpen={isModalOpen}
      onClose={toggleOtpModal}
      fullWidth
      headerTitle={<Typography variant="h1">Change Phone Number</Typography>}
      body={<Box>Phone number</Box>}
      footer={
        <Box px={1} py={1} display="flex" justifyContent="flex-end">
          <ButtonWrapper
            variant="contained"
            onClick={handleSubmit}
            disabled={submitLoader}
          >
            <Typography variant="button">Sumbit</Typography>
            {submitLoader && (
              <CircularProgress size={24} className={classes.submitLoaderBtn} />
            )}
          </ButtonWrapper>
        </Box>
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isModalOpen: _get(state, "ui.otpModal.show"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
    toggleOtpModal: (show) => {
      dispatch({
        type: "SHOW_OTP_MODAL",
        payload: { show },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Otp);
