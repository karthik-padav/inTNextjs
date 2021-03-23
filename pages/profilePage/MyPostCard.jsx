import { getQuestions } from "dataService/Services";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Icon, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import Divider from "components/common/Divider";

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
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  p1: {
    padding: theme.spacing(1),
  },
}));

function MyPostCard(props) {
  const classes = useStyles();
  const { userDetails } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h1">My Post</Typography>
      </Paper>
      {/* <Divider /> */}
      <QuestionsWrapper
        postedBy={_get(userDetails, "userId")}
        showAddPost={false}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    toastMsg: state.toastMsg,
    userDetails: state.userDetails,
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
    togglePostModal: (flag, data) => {
      dispatch({
        type: "SHOW_ADD_POST",
        payload: { flag, data },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostCard);
