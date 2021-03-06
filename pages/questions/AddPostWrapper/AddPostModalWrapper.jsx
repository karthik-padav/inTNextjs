import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Fade, Backdrop, Modal } from "@material-ui/core";
import { connect } from "react-redux";
import classNames from "classnames";
import AddPostComponent from "./AddPostComponent";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";

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

function AddPostModalWrapper(props) {
  const { isModalOpen } = props;
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
            <AddPostComponent />
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isModalOpen: _get(state, "ui.postQuestionModal.show"),
  };
};

export default connect(mapStateToProps)(AddPostModalWrapper);
