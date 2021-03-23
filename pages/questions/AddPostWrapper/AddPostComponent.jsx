import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Box, TextField } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { connect } from "react-redux";
import { postFeed } from "dataService/Services";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonWrapper from "components/common/ButtonWrapper";
import Dialog from "@material-ui/core/Dialog";
import DialogBox from "components/common/DialogBoxWrapper/DialogBox";

const useStyles = makeStyles((theme) => ({
  imageSizeWrapper: {
    width: "100%",
    height: theme.spacing(20),
    objectFit: "cover",
    border: "1px solid",
    borderRadius: "10px",
  },
  fileInputWrapper: {
    border: "1px solid",
    borderRadius: "10px",
  },
  fileInput: {
    position: "absolute",
    left: "0",
    top: "0",
    right: "0",
    bottom: 0,
    width: "100%",
    opacity: "0",
    zIndex: "1",
    cursor: "pointer",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    maxWidth: "100%",
    width: theme.spacing(70),
  },
  submitLoaderBtn: {
    position: "absolute",
  },
}));

const maxImage = 10;
const postCharLength = 250;

function AddPostComponent(props) {
  const classes = useStyles();
  const {
    togglePostModal,
    isEditRequest,
    setQuestionList,
    questionList,
    isModalOpen,
  } = props;
  console.log(isEditRequest, "isEditRequest123");
  const [images, setImages] = React.useState(
    _get(isEditRequest, "contentImage", [])
  );
  const [postImages, setPostImages] = React.useState();
  const [submitLoader, setSubmitLoader] = React.useState(false);
  const [post, setPost] = React.useState(_get(isEditRequest, "content", ""));
  console.log(post, "post123");
  const placeholder = `${'Start your question with "What", "How", "Why", etc.'}`;

  const getPhoto = async (event) => {
    if (_get(event, "target.files")) {
      setPostImages(event.target.files[0]);
      let files = Array.from(event.target.files);
      console.log(typeof event.target.files[0], "123321");
      let previewImage = images;
      files.forEach((file, index) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          previewImage.push({
            file,
            imagesUrl: reader.result,
          });
          if (index + 1 === files.length) {
            setImages(previewImage);
          }
        };
        reader.readAsDataURL(file);
      });
      console.log(previewImage, "previewImage123");
    }
  };

  const removeImage = (index) => {
    let clonedImages = _cloneDeep(images);
    clonedImages.splice(index, 1);
    console.log(clonedImages, "clonedImages123");
    setImages(clonedImages);
  };

  const handleTextChange = (e) => {
    if (e.target.value.length > postCharLength) {
      let trimPost = e.target.value.substring(0, postCharLength);
      setPost(trimPost);
    } else {
      setPost(e.target.value);
    }
  };

  const handleSubmit = async () => {
    const { postAdded } = props;
    if (post) {
      const formData = await generateFinalFormData();
      setSubmitLoader(true);
      postFeed(
        formData,
        _get(isEditRequest, "feedId") ? "update" : "post"
      ).then((res) => {
        if (_get(res, "status")) {
          props.updateToastMsg({
            msg: "Success",
            type: "success",
          });
          togglePostModal(false);
          if (isEditRequest) {
            const feedIndex = _findIndex(questionList, (item) => {
              return item.feedId === res.data.feedId;
            });
            if (feedIndex > -1) {
              const newList = _cloneDeep(questionList);
              newList[feedIndex] = res.data;
              setQuestionList({ data: newList });
            }
          } else setQuestionList({ data: [res.data, ...questionList] });
        } else {
          props.updateToastMsg({
            msg: res.message,
            type: "error",
          });
        }
        setSubmitLoader(false);
      });
    }
  };

  const generateFinalFormData = () => {
    let formData = new FormData();
    if (images.length) {
      images.forEach((item, index) => {
        if (_get(item, "file")) formData.append("feedNewImages", item.file);
        else if (_get(item, "fileName"))
          formData.append("feedExistingImages", item.fileName);
        if (index + 1 === images.length) {
          formData.set("document", JSON.stringify(post));
        }
      });
    } else {
      formData.set("document", JSON.stringify(post));
    }
    if (_get(isEditRequest, "feedId"))
      formData.set("feedId", isEditRequest.feedId);
    console.log(formData, "formData123");
    return formData;
  };

  return (
    <>
      <DialogBox
        isModalOpen={isModalOpen}
        onClose={togglePostModal}
        headerTitle="Create Post"
        body={
          <>
            <GridList className={classes.gridList} cols={4.5}>
              <GridListTile>
                <Box
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                  className={classNames(
                    classes.fileInputWrapper,
                    classes.imageSizeWrapper
                  )}
                >
                  <input
                    type="file"
                    multiple
                    name="myImage"
                    accept="image/*"
                    onChange={getPhoto}
                    className={classes.fileInput}
                  />
                  <Icon className={"fa fa-plus"} fontSize="medium" />
                </Box>
              </GridListTile>
              {images.map((item, index) => (
                <GridListTile key={index}>
                  <Box position="relative" p={0.5}>
                    <Box position="absolute" top={-15} right={-15}>
                      <IconButton
                        variant="contained"
                        size="medium"
                        color="primary"
                        onClick={() => removeImage(index)}
                      >
                        <Icon className="fa fa-times" fontSize="small" />
                      </IconButton>
                    </Box>
                    {_get(item, "imagesUrl") && (
                      <img
                        src={item.imagesUrl}
                        className={classes.imageSizeWrapper}
                      />
                    )}
                    {_get(item, "fileName") && (
                      <img
                        src={item.fileName}
                        className={classes.imageSizeWrapper}
                      />
                    )}
                  </Box>
                </GridListTile>
              ))}
            </GridList>
            <Box>
              <TextField
                placeholder={placeholder}
                multiline
                fullWidth
                rows={4}
                rowsMax={10}
                value={post}
                InputProps={{
                  onChange: handleTextChange,
                }}
              />
              <Box display="flex" justifyContent="flex-end">
                <Typography variant="caption">
                  {post.length}/{postCharLength}
                </Typography>
              </Box>
            </Box>
          </>
        }
        footer={
          <>
            <ButtonWrapper
              // borderRadius="100px"
              bgColor="color3"
              hoverBgColor="color2"
              color="color1"
              onClick={() => togglePostModal(false)}
              disabled={submitLoader}
            >
              <Typography variant="button">Close</Typography>
            </ButtonWrapper>
            <ButtonWrapper
              // borderRadius="100px"
              bgColor="color3"
              hoverBgColor="color2"
              color="color1"
              onClick={handleSubmit}
              disabled={submitLoader}
            >
              Sumbit
              {submitLoader && (
                <CircularProgress
                  size={24}
                  className={classes.submitLoaderBtn}
                />
              )}
            </ButtonWrapper>
          </>
        }
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isEditRequest: _get(state, "ui.postQuestionModal.data"),
    questionList: _get(state, "questionList.data", []),
    isModalOpen: _get(state, "ui.postQuestionModal.show"),
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
    togglePostModal: (show, data = null) => {
      dispatch({
        type: "SHOW_Q_MODAL",
        payload: { show, data },
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

export default connect(mapStateToProps, mapDispatchToProps)(AddPostComponent);
