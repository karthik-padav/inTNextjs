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
import _findIndex from "lodash/isEmpty";
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  primaryBorder: {
    borderColor: theme.palette.primary.main,
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function CommentCard(props) {
  const { id } = props;
  const classes = useStyles();
  const [comments, setComments] = useState("");

  const [commentList, setCommentList] = useState([]);
  const [scrollLoader, setScrollLoader] = useState(false);
  const [postCommentLoader, setPostCommentLoader] = useState(false);
  const [limit, setLimit] = useState(20);
  const [receiverStartIndex, setReceiverStartIndex] = useState(0);
  const [hasMoreReceiverToLoad, setHasMoreReceiverToLoad] = useState(true);
  const [editId, setEditId] = useState(null);
  const [isConfirmAlertBox, setConfirmAlert] = React.useState(null);

  const LoadMoreBloodReceiver = async () => {
    if (hasMoreReceiverToLoad) {
      setReceiverStartIndex((prev) => prev + limit);
    }
  };

  useEffect(
    (props) => {
      setScrollLoader(true);

      console.log(id, "asdasd");
      if (id) {
        let querry = `?id=${id}&&offset=${receiverStartIndex}&limit=${limit}`;
        getAllComments(querry)
          .then((res) => {
            if (_get(res, "status")) {
              if (!_isEmpty(res.data))
                setCommentList((prev) => [...prev, ...res.data]);
              else {
                setHasMoreReceiverToLoad(false);
              }
            }
            setScrollLoader(false);
          })
          .catch((err) => {
            setScrollLoader(false);
          });
      }
    },
    [receiverStartIndex]
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
      setPostCommentLoader(true);
      postComments(data).then((res) => {
        console.log(res, "response");
        if (_get(res, "status")) {
          setCommentList([{ ...res.data }, ...commentList]);
          setEditId(null);
          setComments("");
        } else props.updateToastMsg({ msg: res.message, type: "error" });
        setPostCommentLoader(false);
      });
    }
  };

  const deleteRequest = () => {
    console.log(isConfirmAlertBox, "isConfirmAlertBox");
    if (isConfirmAlertBox) {
      const index = _findIndex(commentList, (item) => {
        return item.commentId === isConfirmAlertBox;
      });
      if (index > -1) {
        deleteComment(isConfirmAlertBox).then((res) => {
          console.log(res, "response");
          if (_get(res, "status")) {
            props.updateToastMsg({ msg: res.message, type: "success" });
            commentList.splice(index, 1);
            setCommentList(commentList);
            setConfirmAlert(null);
          } else {
            setConfirmAlert(null);
            props.updateToastMsg({ msg: res.message, type: "error" });
          }
        });
      }
    }
  };

  const editClicked = (value) => {
    console.log(value, "editClicked123");
    setEditId(value.commentId);
  };

  const deleteConfirmed = (value) => {
    setConfirmAlert(value.commentId);
  };

  const menuItem = [
    { title: "Edit", authCheck: true, code: "edit", cb: editClicked },
    { title: "Delete", authCheck: true, code: "delete", cb: deleteConfirmed },
  ];

  return (
    <div className={classes.root}>
      {console.log(props, "props.location123")}
      <Box mt={2}>
        <Grid container display="flex" justify="center">
          <Grid item>
            <Avatar src={"profilePicture"} />
          </Grid>
          <Grid item xs>
            <Box pl={1}>
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
                  endAdornment: (
                    <IconButton
                      variant="contained"
                      size="medium"
                      color="primary"
                      disabled={postCommentLoader}
                      onClick={() => {
                        if (isLoggedIn()) {
                          sumbmitComment();
                        } else props.toggleLoginModal(true);
                      }}
                    >
                      <Icon
                        className="fa fa-chevron-right"
                        style={{ fontSize: 15 }}
                      />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {commentList.map((item, index) => (
        <>
          <Divider color="primary" />
          <Box my={2} key={index}>
            <UserHeaderCard
              profilePicture={_get(item, "user_details.profilePicture", "")}
              avatarClass={classes.small}
              givenName={_get(item, "user_details.givenName")}
              familyName={_get(item, "user_details.familyName")}
              createdAt={_get(item, "createdAt")}
            >
              {editId === item.commentId ? null : (
                <OptionMenuV2 menuItem={menuItem} data={item} />
              )}
            </UserHeaderCard>
            <Box mt={1}>
              {editId === item.commentId ? (
                <TextEditor
                  data={item}
                  onCancel={() => setEditId(null)}
                  onSave={sumbmitComment}
                />
              ) : (
                <Typography gutterBottom variant="body1" component="p">
                  {item.content}
                </Typography>
              )}
            </Box>
          </Box>
        </>
      ))}
      <button onClick={LoadMoreBloodReceiver}>
        {scrollLoader ? "loading more..." : "Load More Comments"}
      </button>

      <ConfirmAlertBox
        isConfirmAlertBox={isConfirmAlertBox}
        title="Confirm Delete"
        onConfirm={deleteRequest}
        onCancel={() => {
          setConfirmAlert(null);
        }}
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
