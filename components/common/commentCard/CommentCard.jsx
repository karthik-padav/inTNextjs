import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";

import { connect, useDispatch } from "react-redux";
import { getAllComments, postComments, deleteComment } from "dataService/Api";
import UserHeaderCard from "components/common/UserHeaderCard";
import OptionMenuV2 from "components/common/OptionMenuV2";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import Divider from "components/common/Divider";
import TextEditor from "./TextEditor";
import ButtonWrapper from "components/common/ButtonWrapper";
import LoadMore from "components/common/LoadMore";
import LoaderComponent from "./LoaderComponent";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";
import { toggleLoginModal, updateToastMsg } from "redux/slices/uiSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.gray,
    borderRadius: theme.spacing(2),
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function CommentCard(props) {
  const dispatch = useDispatch();
  const { data, loggedUser } = props;
  const { _id: postId, collectionName = null } = data;
  const classes = useStyles();
  const [comments, setComments] = useState("");

  const [commentList, setCommentList] = useState([]);
  const [scrollLoader, setScrollLoader] = useState(false);
  const [limit, setLimit] = useState(15);
  const [commentStartIndex, setCommentStartIndex] = useState(0);
  const [hasMoreCommentToLoad, setHasMoreComments] = useState(true);
  const [editId, setEditId] = useState(null);
  const [isConfirmAlertBox, setConfirmAlert] = React.useState(null);
  const [loader, setLoader] = React.useState(false);

  const router = useRouter();

  const LoadMoreComments = async () => {
    if (hasMoreCommentToLoad) {
      setCommentStartIndex((prev) => prev + limit);
    }
  };

  useEffect(
    (props) => {
      setScrollLoader(true);
      if (postId) {
        let querry = `/${postId}?offset=${commentStartIndex}&limit=${limit}`;
        getAllComments(querry)
          .then((res) => {
            if (_get(res, "status")) {
              if (!_isEmpty(res.data)) {
                setCommentList((prev) => [...prev, ...res.data]);
              } else {
                setHasMoreComments(false);
              }
            }
            setScrollLoader(false);
          })
          .catch((err) => {
            setScrollLoader(false);
          });
      }
    },
    [commentStartIndex]
  );

  const handleChange = (event) => {
    setComments(event.target.value);
  };

  const sumbmitComment = (value) => {
    let params = {};
    if (value)
      params = {
        _id: _get(value, "commentId"),
        content: _get(value, "content"),
      };
    else
      params = {
        postId,
        content: comments,
        collectionName,
      };
    if ((params.postId || params._id) && !_isEmpty(params.content)) {
      setLoader(true);
      postComments(params).then((res) => {
        if (_get(res, "status")) {
          if (editId) {
            const commentIndex = _findIndex(commentList, (item) => {
              return item._id === editId;
            });
            if (commentIndex > -1) {
              commentList[commentIndex] = res.data;
              setCommentList(commentList);
            }
          } else {
            setCommentList([{ ...res.data }, ...commentList]);
          }
          setEditId(null);
          setComments("");
        } else dispatch(updateToastMsg({ msg: res.message, type: "error" }));
        setLoader(false);
      });
    }
  };

  const editClicked = (value) => {
    console.log(value, "editClicked123");
    setEditId(value._id);
  };

  const deleteConfirmAlert = (value) => {
    setConfirmAlert(value._id);
  };

  const deleteConfirmed = () => {
    setLoader(true);
    deleteComment(isConfirmAlertBox).then((res) => {
      if (_get(res, "status")) {
        let newList = commentList.filter((item) => {
          return item._id !== isConfirmAlertBox;
        });
        setCommentList(newList);
        setConfirmAlert(false);
        setLoader(false);
      } else {
        setLoader(false);
        dispatch(updateToastMsg({ msg: res.message, type: "error" }));
      }
    });
  };

  const menuItem = [
    { title: "Edit", authCheck: true, code: "edit", cb: editClicked },
    {
      title: "Delete",
      authCheck: true,
      code: "delete",
      cb: deleteConfirmAlert,
    },
  ];

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
      cb: deleteConfirmed,
    },
  ];

  return (
    <div className={classes.root}>
      {loggedUser._id && (
        <Box mt={2}>
          <Grid container display="flex" justify="center">
            <Grid item>
              <Avatar
                src={_get(loggedUser, "profilePicture", "")}
                className={classes.small}
              />
            </Grid>
            <Grid item xs>
              <Box pl={1}>
                <Paper className={classes.paper}>
                  <TextField
                    id="standard-name"
                    value={comments}
                    fullWidth
                    placeholder="Your a comments..."
                    multiline
                    rowsMax={4}
                    rows={4}
                    InputProps={{
                      disableUnderline: true,
                      onChange: (e) => {
                        handleChange(e);
                      },
                    }}
                  />
                  <Box display="flex" justifyContent="flex-end">
                    <ButtonWrapper
                      variant="contained"
                      loader={loader}
                      onClick={() => {
                        if (loggedUser._id) {
                          sumbmitComment();
                        } else dispatch(toggleLoginModal());
                      }}
                    >
                      <Typography variant="button">Comment</Typography>
                    </ButtonWrapper>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
      {commentList.map((item, index) => (
        <Box mt={2} key={index}>
          <UserHeaderCard
            profilePicture={_get(item, "user.profilePicture", "")}
            givenName={_get(item, "user.givenName")}
            familyName={_get(item, "user.familyName")}
            createdAt={_get(item, "createdAt")}
            avatarClass={classes.small}
          >
            {loggedUser._id === item.user._id ? (
              <OptionMenuV2 menuItem={menuItem} data={item} />
            ) : null}
          </UserHeaderCard>

          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <Avatar
                src={_get(item, "user.profilePicture", "")}
                className={classes.small}
                style={{ opacity: 0 }}
              />
            </Grid>
            <Grid item xs>
              <Box mt={1}>
                <Paper className={classes.paper}>
                  {editId === item._id ? (
                    <TextEditor
                      data={item}
                      onCancel={() => setEditId(null)}
                      onSave={sumbmitComment}
                    />
                  ) : (
                    <Typography variant="body1" component="p">
                      {item.content}
                    </Typography>
                  )}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}

      {scrollLoader && <LoaderComponent />}

      {!_isEmpty(commentList) && hasMoreCommentToLoad && (
        <Box display="flex" justifyContent="center" my={2}>
          <LoadMore
            label="Load more comments"
            loader={loader}
            onTrigger={LoadMoreComments}
            // width="30%"
          />
        </Box>
      )}

      <ConfirmAlertBox
        menu={confirmAlertButtons}
        loader={loader}
        title={<Typography variant="h1">Delete Post</Typography>}
        subtitle="Are you sure you want to delete this comment?"
        data={isConfirmAlertBox}
        isModalOpen={isConfirmAlertBox}
      />
    </div>
  );
}

export default CommentCard;
