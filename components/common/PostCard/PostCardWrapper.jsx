import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import Divider from "components/common/Divider";
import RatingWrapper from "components/common/RatingWrapper";
import Icon from "@material-ui/core/Icon";
import OptionMenuV2 from "components/common/OptionMenuV2";
import CommentCard from "components/common/CommentCard/index";
import UserHeaderCard from "components/common/UserHeaderCard";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ButtonWrapper from "components/common/ButtonWrapper";
import Link from "next/link";
import { isLoggedIn, getPostTypeFromURL } from "Function/Common";
import { handleLike } from "dataService/Services";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    // padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[1],
  },
}));

function PostCardWrapper(props) {
  const classes = useStyles(props);
  const {
    children,
    updateToastMsg,
    data,
    showCommentList = false,
    menuItem = [],
    redirect_href = null,
    showLike = true,
    showComment = true,
    showRating = true,
  } = props;
  const hasLiked = _get(data, "hasLiked", 0) > 0;
  const [liked, setLike] = useState(hasLiked ? 1 : 0);
  const [likeCount, setLikeCount] = useState(_get(data, "likes", 0));

  const postId = _get(data, "postId");
  const userDetails = _get(props, "data.user_details");
  const createdAt = _get(data, "createdAt");

  const router = useRouter();

  useEffect(() => {
    setLike(liked === 1 ? liked : hasLiked ? 1 : 0);
  }, [hasLiked]);

  const onLike = (postId) => {
    const postType = getPostTypeFromURL(router.pathname);
    handleLike({ postId, postType })
      .then((resp) => {
        if (_get(resp, "status")) {
          const likeStatus = _get(resp, "data.status", 0);
          setLike(likeStatus);
        } else {
          updateToastMsg({
            msg: "Something went wrong.",
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Paper className={classes.paper} elevation={1}>
      {userDetails && (
        <Box px={2} pt={2} pb={1}>
          <UserHeaderCard {...userDetails} createdAt={createdAt}>
            {!_isEmpty(menuItem) && (
              <OptionMenuV2 menuItem={menuItem} data={data} />
            )}
          </UserHeaderCard>
        </Box>
      )}

      {children && (
        <Box px={2} py={1}>
          {children}
        </Box>
      )}

      <Divider />
      <Box
        display="flex"
        px={1}
        py={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex">
          {showLike && (
            <Box display="flex" alignItems="center" mr={2}>
              <ButtonWrapper
                type="IconButton"
                color={red[500]}
                onClick={() => {
                  if (isLoggedIn()) {
                    postId && onLike(postId);
                  } else props.toggleLoginModal(true);
                }}
              >
                <Icon
                  className={
                    isLoggedIn()
                      ? liked === 1
                        ? "fas fa-heart"
                        : "far fa-heart"
                      : "far fa-heart"
                  }
                  style={{ fontSize: "18px" }}
                />
              </ButtonWrapper>
              <Box ml={0.5}>
                <Typography variant="body1">{likeCount}</Typography>
              </Box>
            </Box>
          )}
          {showComment && (
            <Box
              display="flex"
              alignItems="center"
              mr={2}
              onClick={() => {
                if (redirect_href) router.push(redirect_href);
              }}
            >
              <ButtonWrapper type="IconButton">
                <Icon className="far fa-comment" style={{ fontSize: "18px" }} />
              </ButtonWrapper>
              <Box ml={0.5}>
                <Typography variant="body1">
                  {_get(data, "comments", 0)}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <div>{showRating && <RatingWrapper />}</div>
      </Box>
      {showComment && showCommentList && (
        <>
          <Divider />
          <Box px={2} py={1}>
            <CommentCard id={data.postId} />
          </Box>
        </>
      )}
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: _get(state, "userDetails"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
    toggleLoginModal: (flag) => {
      dispatch({
        type: "SHOW_LOGIN_MODAL",
        payload: flag,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCardWrapper);
