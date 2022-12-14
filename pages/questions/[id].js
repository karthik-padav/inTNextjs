import Link from "next/link";
import { getQuestions } from "dataService/Api";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useSelector } from "react-redux";

import classNames from "classnames";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";
import _includes from "lodash/includes";

import { Grid, Paper, Box, Icon } from "@material-ui/core";

import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import NoDataFound from "components/common/NoDataFound";
import CardWrapper from "../../components/questions/CardWrapper";
import PostCardWrapper from "components/common/postCard/PostCardWrapper";

import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import { deletePostFeed } from "dataService/Api";
import ButtonWrapper from "components/common/ButtonWrapper";
import { isLoggedIn } from "redux/selector";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";
import { NextSeo } from "next-seo";
import { getSeoDetails } from "seo/getSEO";
import { toggleLoginModal, updateToastMsg } from "redux/slices/uiSlice";
import { getLoggedUser } from "redux/slices/loggedUserSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  raiseRequestBtn: {
    borderRadius: "50px",
  },
  p1: {
    padding: theme.spacing(1),
  },
  pt2: {
    paddingTop: theme.spacing(2),
  },
}));

function FeedPost(props) {
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUser);
  const {
    togglePostModal = () => {},
    questionObj,
    setQuestionList = () => {},
    questionList = [],
    SEO = {},
  } = props;
  const feedResp = _get(questionList, "[0]");
  const userId = _get(loggedUser, "_id");
  const postedBy = _get(feedResp, "user._id");

  const [showConfirmBox, setConfirmAlert] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const { query } = useRouter();

  useEffect(() => {
    setQuestionList({ data: _get(questionObj, "data", []) });
  }, [questionObj]);

  useEffect(() => {
    const id = _get(query, "id");
    if (id && isLoggedIn()) {
      getQuestions(`?id=${id}`)
        .then((res) => {
          if (_get(res, "status")) {
            if (!_isEmpty(res.data)) {
              setQuestionList({ data: _get(res, "data", []) });
            }
          }
        })
        .catch((err) => {});
    }
  }, []);

  const editClicked = (value) => {
    togglePostModal(true, value);
  };

  const menuItem = [];
  if (userId && userId === postedBy) {
    menuItem.push(
      {
        title: "Edit",
        authCheck: true,
        code: "edit",
        cb: editClicked,
      },
      {
        title: "Delete",
        authCheck: true,
        code: "delete",
        cb: (data) => setConfirmAlert(data),
      }
    );
  }

  const deletePost = (data) => {
    const postId = _get(data, "_id");
    if (postId) {
      setLoader(true);
      deletePostFeed(postId).then((res) => {
        if (_get(res, "status")) {
          setQuestionList({ data: [] });
          setConfirmAlert(false);
          dispatch(updateToastMsg({ msg: res.message, type: "success" }));
          setLoader(false);
        } else {
          dispatch(updateToastMsg({ msg: res.message, type: "error" }));
          setLoader(false);
        }
      });
    }
  };

  const confirmAlertButtons = [
    {
      title: "No",
      code: "no",
      cb: () => setConfirmAlert(false),
      mr: 2,
      color: colors.blue,
      bgColor: grey[100],
    },
    {
      title: "Yes",
      authCheck: true,
      code: "yes",
      hasLoader: true,
      cb: deletePost,
    },
  ];

  return (
    <div className={classes.root}>
      <NextSeo {...SEO} />
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Menu />
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          {feedResp && (
            <PostCardWrapper
              data={feedResp}
              menuItem={menuItem}
              showCommentList={true}
              showRating={false}
            >
              <CardWrapper data={feedResp} />
            </PostCardWrapper>
          )}

          <ConfirmAlertBox
            menu={confirmAlertButtons}
            title={<Typography variant="h1">Delete Post</Typography>}
            loader={loader}
            subtitle="Are You Sure You Want To Delete This Post?"
            data={showConfirmBox}
            isModalOpen={showConfirmBox}
          />

          {_isEmpty(feedResp) && (
            <Box display="flex" justifyContent="center" m={3}>
              <NoDataFound title="Post Not Found." />
            </Box>
          )}
        </Grid>
        <Grid item sm={12} md={3} className={classes.p1}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

FeedPost.getInitialProps = async function (ctx) {
  const { id } = ctx.query;
  const { pathname } = ctx;
  let questionObj = {};
  let SEO = {};
  const query = `?_id=${id}`;
  // if (_includes(pathname.split("/"), "questions")) {
  questionObj = await getQuestions(query);
  SEO = await getSeoDetails({
    title: _get(questionObj, "data[0].content"),
    description: _get(questionObj, "data[0].content"),
  });
  // }
  return { questionObj, SEO };
};

export default FeedPost;
