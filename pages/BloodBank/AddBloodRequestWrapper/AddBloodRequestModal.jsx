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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
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
  const { isModalOpen, toggleBloodModal } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Modal
        className={classes.modal}
        open={isModalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Paper className={classNames(classes.paper, classes.mx_md)}>
            <Box alignItems="center" display="flex">
              <Box flexGrow={1}>
                <Typography variant="h1" align="center">
                  <b>Create Post</b>
                </Typography>
              </Box>
              <Box>
                <IconButton
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={() => toggleBloodModal(false)}
                >
                  <Icon className="fa fa-times" fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Divider mt={1} mb={1.5} />
            <RequestBloodForm />
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isModalOpen: _get(state, "ui.postBloodModal.show"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleBloodModal: (show, data) => {
      dispatch({
        type: "SHOW_B_MODAL",
        payload: { show, data },
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBloodRequestModal);
