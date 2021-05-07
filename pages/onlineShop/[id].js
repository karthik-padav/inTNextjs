import Link from "next/link";
import { getQuestions } from "../../DataService/Services";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import classNames from "classnames";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";
import _includes from "lodash/includes";

import { Grid, Paper, Box, Icon } from "@material-ui/core";

import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import NoDataFound from "components/common/NoDataFound";
import CardWrapper from "./CardWrapper";
import PostCardWrapper from "components/common/PostCard/PostCardWrapper";

import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import { deletePostFeed } from "dataService/Services";
import ButtonWrapper from "components/common/ButtonWrapper";
import { isLoggedIn } from "Function/Common";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
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
  const {
    userDetails,
    togglePostModal,
    updateToastMsg,
    questionObj,
    setQuestionList,
  } = props;
  const feedResp = _get(props, "questionList[0]");
  const userId = _get(userDetails, "userId");
  const postedBy = _get(feedResp, "user_details.userId");

  const [showConfirmBox, setConfirmAlert] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const { query } = useRouter();

  useEffect(() => {
    setQuestionList({ data: _get(questionObj, "data", []) });
  }, [questionObj]);

  useEffect(() => {
    const id = _get(query, "id");
    if (id) {
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

  const moreMenuItem = [];
  if (userId && userId === postedBy) {
    moreMenuItem.push(
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
    const feedId = _get(data, "feedId");
    if (feedId) {
      setLoader(true);
      deletePostFeed(data.feedId).then((res) => {
        if (_get(res, "status")) {
          setQuestionList({ data: [] });
          setConfirmAlert(false);
          updateToastMsg({ msg: res.message, type: "success" });
          setLoader(false);
        } else {
          updateToastMsg({ msg: res.message, type: "error" });
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
    },
    {
      title: "Yes",
      authCheck: true,
      code: "yes",
      hasLoader: true,
      color: "primary",
      variant: "contained",
      cb: deletePost,
    },
  ];

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Menu />
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          {/* <Box mb={2} mt={2}>
            <ButtonWrapper
              onClick={() => {
                if (isLoggedIn()) {
                  togglePostModal(true);
                } else toggleLoginModal(true);
              }}
            >
              Add
              <Box ml={1} lineHeight="1">
                <Icon className={"fa fa-plus"} fontSize="small" />
              </Box>
            </ButtonWrapper>
          </Box> */}
          {feedResp && (
            <PostCardWrapper
              data={feedResp}
              menuItem={moreMenuItem}
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
  const query = `?id=${id}`;
  if (_includes(pathname.split("/"), "questions")) {
    questionObj = await getQuestions(query);
  }
  return { questionObj };
};

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

export default connect(mapStateToProps, mapDispatchToProps)(FeedPost);
