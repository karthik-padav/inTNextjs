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

import {
  Grid,
  Paper,
  Box,
  Backdrop,
  Modal,
  Fade,
  Button,
  IconButton,
  Icon,
} from "@material-ui/core";

import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import NoDataFound from "components/common/NoDataFound";
import CardWrapper from "./CardWrapper";
import PostCardWrapper from "components/common/PostCard/PostCardWrapper";

import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import { deletePostFeed } from "dataService/Services";
import { isLoggedIn } from "dataService/Utils";

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
  const { userDetails, togglePostModal, updateToastMsg } = props;
  const [feedResp, setFeedData] = useState(_get(props, "feedResp.data[0]"));
  const userId = _get(userDetails, "userId");
  const postedBy = _get(feedResp, "user_details.userId");

  const [showConfirmBox, setConfirmAlert] = useState(false);

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
      deletePostFeed(data.feedId).then((res) => {
        if (_get(res, "status")) {
          setFeedData(null);
          setConfirmAlert(false);
          updateToastMsg({ msg: res.message, type: "success" });
        } else {
          updateToastMsg({ msg: res.message, type: "error" });
        }
      });
    }
  };

  const confirmAlertMenu = [
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
      color: "primary",
      variant: "contained",
      cb: deletePost,
    },
  ];

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item sm={12} md={3} className={classes.p1}>
            <div className="stickyWrapper">
              <Paper className={classes.paper}>
                <ProfileMenu />
              </Paper>
              <Box className={classes.pt2}>
                <Paper className={classes.paper}>
                  <Menu />
                </Paper>
              </Box>
            </div>
          </Grid>
          <Grid item sm={12} md={6} className={classes.p1}>
            <Box
              justifyContent="space-between"
              display=" flex"
              alignItems="center"
              mb={2}
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.raiseRequestBtn}
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
              </Button>
            </Box>
            {feedResp && (
              <PostCardWrapper data={feedResp} menuItem={moreMenuItem}>
                <CardWrapper data={feedResp} />
              </PostCardWrapper>
            )}

            {showConfirmBox && (
              <ConfirmAlertBox menu={confirmAlertMenu} data={showConfirmBox} />
            )}

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
    </>
  );
}

FeedPost.getInitialProps = async function (ctx) {
  const { id } = ctx.query;
  const { pathname } = ctx;
  let feedResp = {};
  const query = `?id=${id}`;
  if (_includes(pathname.split("/"), "questions")) {
    feedResp = await getQuestions(query);
  }
  return { feedResp };
};

const mapStateToProps = (state) => {
  return {
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPost);
