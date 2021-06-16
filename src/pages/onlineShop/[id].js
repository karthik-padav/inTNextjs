import Link from "next/link";
import { getAllShop } from "src/dataService/Services";
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

import ProfileMenu from "src/components/common/ProfileMenu";
import Menu from "src/components/common/Menu";
import NoDataFound from "src/components/common/NoDataFound";
import CardWrapper from "./CardWrapper";
import PostCardWrapper from "src/components/common/postCard/PostCardWrapper";

import ConfirmAlertBox from "src/components/common/ConfirmAlertBox";
import { deletePostFeed } from "src/dataService/Services";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import { isLoggedIn } from "src/utils/Common";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "src/themes/themeColors";
import { NextSeo } from "next-seo";
import { getSeoDetails } from "src/seo/getSEO";

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

function Post(props) {
  const classes = useStyles();
  const {
    userDetails,
    toggleShopModal,
    updateToastMsg,
    shopObj,
    setList,
    SEO = {},
  } = props;
  const feedResp = _get(props, "shopList[0]");
  const userId = _get(userDetails, "userId");
  const postedBy = _get(feedResp, "user_details.userId");

  const [showConfirmBox, setConfirmAlert] = useState(false);
  const [loader, setLoader] = React.useState(false);
  const { query } = useRouter();

  useEffect(() => {
    setList({ data: _get(shopObj, "data", []) });
  }, [shopObj]);

  useEffect(() => {
    const id = _get(query, "id");
    if (id && isLoggedIn()) {
      getAllShop(`?id=${id}`)
        .then((res) => {
          if (_get(res, "status")) {
            if (!_isEmpty(res.data)) {
              setList({ data: _get(res, "data", []) });
            }
          }
        })
        .catch((err) => {});
    }
  }, []);

  const editClicked = (value) => {
    toggleShopModal(true, value);
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
    const postId = _get(data, "postId");
    if (postId) {
      setLoader(true);
      deleteShop(data.postId).then((res) => {
        if (_get(res, "status")) {
          setList({ data: [] });
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
      color: colors.blue,
      bgColor: grey[100],
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
              menuItem={moreMenuItem}
              showCommentList={true}
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

Post.getInitialProps = async function (ctx) {
  const { id } = ctx.query;
  const { pathname } = ctx;
  let shopObj = [];
  const query = `?id=${id}`;
  shopObj = await getAllShop(query);
  let SEO = await getSeoDetails({
    title: `${_get(shopObj, "data[0].shopName")}`,
    description: _get(shopObj, "data[0].description"),
  });
  return { shopObj, SEO };
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    shopList: _get(state, "shopList.data", []),
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
    toggleShopModal: (show, data) => {
      dispatch({
        type: "SHOW_SHOP_MODAL",
        payload: { show, data },
      });
    },
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
    setList: (payload) => {
      dispatch({
        type: "ADD_SHOP",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
