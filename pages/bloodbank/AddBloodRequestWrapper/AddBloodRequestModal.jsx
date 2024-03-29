import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Fade,
  Backdrop,
  Modal,
  Box,
  IconButton,
  Typography,
  Icon,
} from "@material-ui/core";
import Divider from "components/common/Divider";
import { connect } from "react-redux";
import classNames from "classnames";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";
import RequestBloodForm from "pages/bloodbank/AddBloodRequestWrapper/RequestBloodForm";
import DialogBox from "components/common/dialogBoxWrapper/DialogBox";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
  },
  mx_md: {
    width: "568px",
    maxWidth: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function AddBloodRequestModal(props) {
  const { isModalOpen = false, toggleBloodModal = () => {} } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DialogBox
        isModalOpen={isModalOpen}
        fullWidth
        onClose={() => toggleBloodModal(false)}
        headerTitle={"Create Post"}
        body={
          <Box>
            <RequestBloodForm />
          </Box>
        }
      />
    </div>
  );
}

export default AddBloodRequestModal;
