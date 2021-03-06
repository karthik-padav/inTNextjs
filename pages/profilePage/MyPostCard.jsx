import { getQuestions } from "dataService/Services";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Box,
  Icon,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { connect } from "react-redux";

import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import classNames from "classnames";
import CardWrapper from "../questions/CardWrapper";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import { isLoggedIn } from "dataService/Utils";
import LoaderComponent from "pages/questions/LoaderComponent";

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

  const [questionList, setQuestionList] = useState([]);
  const [questionStartIndex, setQuestionStartIndex] = useState(0);
  const [hasMoreQuestionToLoad, setHasMoreQuestionToLoad] = useState(true);

  const [limit, setLimit] = useState(15);

  const [querry, setQuerry] = useState(null);

  const [questionLoader, setQuestionLoader] = useState(false);

  const LoadMoreQuestion = async () => {
    if (hasMoreQuestionToLoad) {
      setQuestionStartIndex((prev) => prev + limit);
    }
  };

  useEffect(() => {
    let querryString = `?offset=${questionStartIndex}&limit=${limit}`;
    if (querry) querryString += `${querry}`;
    getQuestionFnc(querryString);
  }, [questionStartIndex]);

  useEffect(() => {
    let querryString = `?offset=${questionStartIndex}&limit=${limit}`;
    if (querry) querryString += `${querry}`;
    setHasMoreQuestionToLoad(true);
    setQuestionStartIndex(0);
    getQuestionFnc(querryString, false);
  }, [querry]);

  const getQuestionFnc = (querryString, isAppend = true) => {
    setQuestionLoader(true);
    getQuestions(querryString)
      .then((res) => {
        if (_get(res, "status")) {
          if (!_isEmpty(res.data)) {
            if (isAppend) setQuestionList((prev) => [...prev, ...res.data]);
            else setQuestionList(res.data);
          } else {
            if (!isAppend) {
              setQuestionList(res.data);
            }
            setHasMoreQuestionToLoad(false);
          }
        }
        setQuestionLoader(false);
      })
      .catch((err) => {
        setQuestionLoader(false);
      });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6">My Posts</Typography>
      <Divider mt={1} mb={1} color="primary" />
      {!_isEmpty(questionList) && (
        <>
          <CardWrapper questionList={questionList} />
        </>
      )}
      {questionLoader && <LoaderComponent />}
      <button onClick={LoadMoreQuestion}>
        {questionLoader ? "loading more..." : "Load More"}
      </button>

      {!questionLoader && _isEmpty(questionList) && (
        <Box display="flex" justifyContent="center" m={3}>
          No Data Found.
        </Box>
      )}
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
