import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { getQuestions } from "dataService/Services";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Icon } from "@material-ui/core";
import { connect } from "react-redux";

import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import classNames from "classnames";
import CardWrapper from "pages/questions/CardWrapper";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import { isLoggedIn } from "dataService/Utils";
import LoaderComponent from "pages/questions/LoaderComponent";
// import { getAllQuestions } from "actions/questions";
import PostCardWrapper from "components/common/PostCard/PostCardWrapper";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import { deletePostFeed } from "dataService/Services";
import NoDataFound from "components/common/NoDataFound";
import ButtonWrapper from "components/common/ButtonWrapper";
import InfiniteScroll from "components/common/InfiniteScroll";
import LoadMore from "components/common/LoadMore";

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
  p1: {
    padding: theme.spacing(1),
  },
  mx_md: {
    width: "568px",
    maxWidth: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mt2: {
    paddingTop: theme.spacing(2),
  },
}));

function QuestionsWrapper(props) {
  const classes = useStyles();
  const {
    togglePostModal,
    toggleLoginModal,
    updateToastMsg,
    userDetails,
    questionList,
    setQuestionList,
    postedBy,
    showAddPost = true,
  } = props;
  const [questionStartIndex, setQuestionStartIndex] = useState(0);
  const [hasMoreQuestionToLoad, setHasMoreQuestionToLoad] = useState(true);
  const [showConfirmBox, setConfirmAlert] = useState(false);

  const [limit, setLimit] = useState(15);

  const [querry, setQuerry] = useState(null);

  const [questionLoader, setQuestionLoader] = useState(false);

  const LoadMoreQuestion = async () => {
    if (hasMoreQuestionToLoad) {
      setQuestionStartIndex((prev) => prev + limit);
    }
  };

  useEffect(() => {
    setQuestionList({ data: [] });
  }, []);

  useEffect(() => {
    let querryString = `?offset=${questionStartIndex}&limit=${limit}`;
    if (postedBy) querryString += `&postedBy=${postedBy}`;
    if (querry) querryString += `${querry}`;
    getQuestionFnc(querryString);
  }, [questionStartIndex]);

  // useEffect(() => {
  //   let querryString = `?offset=${questionStartIndex}&limit=${limit}`;
  //   if (querry) querryString += `${querry}`;
  //   setHasMoreQuestionToLoad(true);
  //   setQuestionStartIndex(0);
  //   getQuestionFnc(querryString, false);
  // }, [querry]);

  const getQuestionFnc = (querryString, isAppend = true) => {
    setQuestionLoader(true);
    getQuestions(querryString)
      .then((res) => {
        if (_get(res, "status")) {
          if (!_isEmpty(res.data)) {
            if (isAppend)
              setQuestionList({ data: [...questionList, ...res.data] });
            else setQuestionList({ data: res.data });
          } else {
            if (!isAppend) {
              setQuestionList({ data: res.data });
            }
            setHasMoreQuestionToLoad(false);
          }
        }
        setQuestionLoader(false);
      })
      .catch((err) => {
        setQuestionLoader(false);
      });
  };

  const editClicked = (value) => {
    togglePostModal(true, value);
  };

  const deletePost = (data) => {
    const feedId = _get(data, "feedId");
    if (feedId) {
      deletePostFeed(data.feedId).then((res) => {
        if (_get(res, "status")) {
          let newList = questionList.filter((item) => {
            return item.feedId !== data.feedId;
          });
          setQuestionList({ data: newList });
          setConfirmAlert(false);
          updateToastMsg({ msg: res.message, type: "success" });
        } else {
          updateToastMsg({ msg: res.message, type: "error" });
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
      cb: deletePost,
    },
  ];

  return (
    <div className={classes.root}>
      {showAddPost && (
        <Box mb={2} mt={2}>
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
        </Box>
      )}
      {questionList.map((item, index) => {
        let menuItem = [];
        const userId = _get(userDetails, "userId");
        const postedBy = _get(item, "user_details.userId");
        if (userId && userId === postedBy)
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
        return (
          <Box key={index} mb={2}>
            <PostCardWrapper data={item} menuItem={menuItem}>
              <CardWrapper data={item} />
            </PostCardWrapper>
          </Box>
        );
      })}

      {questionLoader ? (
        <LoaderComponent />
      ) : _isEmpty(questionList) ? (
        <Box display="flex" justifyContent="center" m={3}>
          <NoDataFound />
        </Box>
      ) : hasMoreQuestionToLoad ? (
        <Box display="flex" justifyContent="center" my={2}>
          <LoadMore
            label="Load More"
            loader={questionLoader}
            onTrigger={LoadMoreQuestion}
            width="30%"
          />
        </Box>
      ) : null}

      <ConfirmAlertBox
        menu={confirmAlertButtons}
        title="Delete Post"
        subtitle="Are You Sure You Want To Delete This Post?"
        data={showConfirmBox}
        isModalOpen={showConfirmBox}
      />
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsWrapper);
