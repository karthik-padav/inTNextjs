import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _includes from "lodash/includes";
import { connect, useDispatch } from "react-redux";
import Divider from "components/common/Divider";
import RatingWrapper from "components/common/RatingWrapper";
import SharePost from "components/common/SharePost";
import Icon from "@material-ui/core/Icon";
import OptionMenuV2 from "components/common/OptionMenuV2";
import CommentCard from "components/common/commentCard/index";
import UserHeaderCard from "components/common/UserHeaderCard";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ButtonWrapper from "components/common/ButtonWrapper";
import Link from "next/link";
import { handleLike } from "dataService/Api";
import { red } from "@material-ui/core/colors";
import constants from "dataService/Constants";
import { toggleLoginModal, updateToastMsg } from "redux/slices/uiSlice";

const useStyles = makeStyles((theme) => ({
  paper: {},
}));

function PostCardWrapper(props) {
  const classes = useStyles(props);
  const {
    children,
    data: postCardData = {},
    showCommentList = false,
    menuItem = [],
    redirect_href = null,
    showLike = true,
    showComment = true,
    showRating = true,
  } = props;
  const {
    review = 0,
    _id: postId,
    user: authorDetails,
    createdAt,
    collectionName,
    loggedUser = {},
    like = {},
    comment = {},
  } = postCardData;
  const dispatch = useDispatch();
  const { count: likeCount = 0, hasLiked = [] } = like;
  const { count: commentCount = 0 } = comment;
  const [liked, setLike] = useState(0);
  useEffect(() => {
    setLike(hasLiked.length);
  }, [hasLiked]);

  const router = useRouter();

  const onLike = ({ postId }) => {
    handleLike({ postId, collectionName })
      .then((resp) => {
        if (_get(resp, "status")) {
          // const likeStatus = _get(resp, "data.status", 0);
        } else {
          dispatch(
            updateToastMsg({
              msg: "Something went wrong.",
              type: "error",
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Paper className={classes.paper} elevation={1}>
      {authorDetails && (
        <Box px={2} pt={2} pb={1}>
          <UserHeaderCard {...authorDetails} createdAt={createdAt}>
            {!_isEmpty(menuItem) && (
              <OptionMenuV2
                menuItem={menuItem}
                loggedUser={loggedUser}
                data={postCardData}
              />
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
                  if (loggedUser) {
                    setLike(!liked);
                    postId && onLike({ postId });
                  } else dispatch(toggleLoginModal());
                }}
              >
                <Icon
                  className={
                    loggedUser && liked ? "fas fa-heart" : "far fa-heart"
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
                <Typography variant="body1">{commentCount}</Typography>
              </Box>
            </Box>
          )}
          <SharePost />
        </Box>
        <div>
          {showRating && <RatingWrapper postId={postId} review={review} />}
        </div>
      </Box>

      {showComment && showCommentList && (
        <>
          <Divider />
          <Box px={2} py={1}>
            <CommentCard data={postCardData} loggedUser={loggedUser} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default PostCardWrapper;
