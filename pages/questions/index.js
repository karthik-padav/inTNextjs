import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Icon } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";

import Menu from "components/common/Menu";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import QuestionsWrapper from "components/questions/QuestionsWrapper";
import { getQuestions } from "dataService/Api";
import { updateAskList } from "redux/slices/askListSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

function Questions(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <QuestionsWrapper />
    </div>
  );
}

export default Questions;
