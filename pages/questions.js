import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Icon } from "@material-ui/core";
import { connect } from "react-redux";

import Menu from "components/common/Menu";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import QuestionsWrapper from "pages/questions/QuestionsWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  p1: {
    padding: theme.spacing(1),
  },
}));

function Questions(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Menu />
          </div>
        </Grid>
        <Grid item xs={6} className={classes.p1}>
          <QuestionsWrapper />
        </Grid>
        <Grid item xs={3} className={classes.p1}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    questionList: _get(state, "questionList.data", []),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoginModal: (flag) => {
      dispatch({
        type: "SHOW_LOGIN_MODAL",
        payload: flag,
      });
    },
    togglePostModal: (show, data) => {
      dispatch({
        type: "SHOW_Q_MODAL",
        payload: { show, data },
      });
    },
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
    setQuestionList: (payload) => {
      dispatch({
        type: "ADD_Q",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
