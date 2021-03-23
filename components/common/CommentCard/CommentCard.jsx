import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import {
  getAllComments,
  postComments,
  deleteComment,
} from "dataService/Services";
import { isLoggedIn } from "dataService/Utils";
import UserHeaderCard from "components/common/UserHeaderCard";
import OptionMenuV2 from "components/common/OptionMenuV2";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import Divider from "components/common/Divider";
import TextEditor from "./TextEditor";
import ButtonWrapper from "components/common/ButtonWrapper";
import LoadMore from "components/common/LoadMore";
import LoaderComponent from "./LoaderComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.color7,
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
  const { id, userDetails } = props;
  const classes = useStyles();
  const [comments, setComments] = useState("");

  const [commentList, setCommentList] = useState([]);
  const [scrollLoader, setScrollLoader] = useState(false);
  const [limit, setLimit] = useState(2);
  const [commentStartIndex, setCommentStartIndex] = useState(0);
  const [hasMoreCommentToLoad, setHasMoreComments] = useState(true);
  const [editId, setEditId] = useState(null);
  const [isConfirmAlertBox, setConfirmAlert] = React.useState(null);
  const [loader, setLoader] = React.useState(false);

  const LoadMoreComments = async () => {
    if (hasMoreCommentToLoad) {
      setCommentStartIndex((prev) => prev + limit);
    }
  };

  useEffect(
    (props) => {
      setScrollLoader(true);
      if (id) {
        let querry = `?id=${id}&&offset=${commentStartIndex}&limit=${limit}`;
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
    const postId = _get(props, "id");
    console.log(value, "value123321");
    let data = {};
    if (value)
      data = {
        commentId: _get(value, "commentId"),
        content: _get(value, "content"),
      };
    else
      data = {
        postId,
        content: comments,
      };
    if ((data.postId || data.commentId) && !_isEmpty(data.content)) {
      setLoader(true);
      postComments(data).then((res) => {
        if (_get(res, "status")) {
          if (editId) {
            const commentIndex = _findIndex(commentList, (item) => {
              return item.commentId === editId;
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
        } else props.updateToastMsg({ msg: res.message, type: "error" });
        setLoader(false);
      });
    }
  };

  const editClicked = (value) => {
    console.log(value, "editClicked123");
    setEditId(value.commentId);
  };

  const deleteConfirmAlert = (value) => {
    setConfirmAlert(value.commentId);
  };

  const deleteConfirmed = () => {
    setLoader(true);
    deleteComment(isConfirmAlertBox).then((res) => {
      if (_get(res, "status")) {
        let newList = commentList.filter((item) => {
          return item.commentId !== isConfirmAlertBox;
        });
        setCommentList(newList);
        setConfirmAlert(false);
        setLoader(false);
      } else {
        setLoader(false);
        updateToastMsg({ msg: res.message, type: "error" });
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
      <Box mt={2}>
        <Grid container display="flex" justify="center">
          <Grid item>
            <Avatar
              src={_get(userDetails, "profilePicture", "")}
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
                    // borderRadius="100px"
                    bgColor="color3"
                    hoverBgColor="color2"
                    color="color1"
                    disabled={loader}
                    onClick={() => {
                      if (isLoggedIn()) {
                        sumbmitComment();
                      } else props.toggleLoginModal(true);
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

      {commentList.map((item, index) => (
        <Box my={2} key={index}>
          <UserHeaderCard
            profilePicture={_get(item, "user_details.profilePicture", "")}
            givenName={_get(item, "user_details.givenName")}
            familyName={_get(item, "user_details.familyName")}
            createdAt={_get(item, "createdAt")}
            avatarClass={classes.small}
          >
            {editId === item.commentId ? null : (
              <OptionMenuV2 menuItem={menuItem} data={item} />
            )}
          </UserHeaderCard>

          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <Avatar
                src={_get(item, "user_details.profilePicture", "")}
                className={classes.small}
                style={{ opacity: 0 }}
              />
            </Grid>
            <Grid item xs>
              <Box mt={1}>
                <Paper className={classes.paper}>
                  {editId === item.commentId ? (
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
            label="Load More"
            loader={loader}
            onTrigger={LoadMoreComments}
            width="30%"
          />
        </Box>
      )}

      <ConfirmAlertBox
        menu={confirmAlertButtons}
        loader={loader}
        title="Delete Comment"
        subtitle="Are You Sure You Want To Delete This Comment?"
        data={isConfirmAlertBox}
        isModalOpen={isConfirmAlertBox}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);
