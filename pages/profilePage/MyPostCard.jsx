import { getQuestions } from "dataService/Api";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Icon, Button, Typography } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import Divider from "components/common/Divider";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import QuestionsWrapper from "pages/questions/QuestionsWrapper";
import { getLoggedUser } from "redux/slices/loggedUserSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.blue,
    padding: theme.spacing(1, 2),
  },
}));

function MyPostCard(props) {
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUser);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h1">My Post</Typography>
      </Paper>
      {/* <Divider /> */}
      <QuestionsWrapper
        postedBy={_get(loggedUser, "userId")}
        showAddPost={false}
      />
    </div>
  );
}

export default MyPostCard;
