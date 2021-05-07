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
import { isLoggedIn } from "Function/Common";
import LoaderComponent from "pages/questions/LoaderComponent";
// import { getAllQuestions } from "actions/questions";
import PostCardWrapper from "components/common/PostCard/PostCardWrapper";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import { deletePostFeed } from "dataService/Services";
import NoDataFound from "components/common/NoDataFound";
import ButtonWrapper from "components/common/ButtonWrapper";
import InfiniteScroll from "components/common/InfiniteScroll";
import LoadMore from "components/common/LoadMore";
import Typography from "@material-ui/core/Typography";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "Themes/ThemeColors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
    list,
    setList,
    postedBy,
    showAddPost = true,
  } = props;
  const [listStartIndex, setListStartIndex] = useState(0);
  const [hasMoreListToLoad, setHasMoreListToLoad] = useState(true);
  const [showConfirmBox, setConfirmAlert] = useState(false);

  const [limit, setLimit] = useState(15);

  const [querry, setQuerry] = useState(null);

  const [listLoader, setListLoader] = useState(false);

  const userId = _get(userDetails, "userId");

  const LoadMoreList = async () => {
    if (hasMoreListToLoad) {
      setListStartIndex((prev) => (prev ? prev : 0 + limit));
    }
  };

  useEffect(() => {
    setList(null);
  }, []);

  useEffect(() => {
    let querryString = `?offset=${
      listStartIndex ? listStartIndex : 0
    }&limit=${limit}`;
    if (postedBy) querryString += `&postedBy=${postedBy}`;
    // if (userId) querryString += `&userId=${userId}`;
    if (querry) querryString += `${querry}`;
    getListFnc(querryString, listStartIndex ? listStartIndex : 0 > 0);
  }, [listStartIndex]);

  const getListFnc = (querryString, isAppend = true) => {
    setListLoader(true);
    getQuestions(querryString)
      .then((res) => {
        if (_get(res, "status")) {
          if (!_isEmpty(res.data)) {
            if (isAppend) setList({ data: [...list, ...res.data] });
            else setList({ data: res.data });
          } else {
            if (!isAppend) {
              setList({ data: res.data });
            }
            setHasMoreListToLoad(false);
          }
        }
        setListLoader(false);
      })
      .catch((err) => {
        setListLoader(false);
      });
  };

  const editClicked = (value) => {
    togglePostModal(true, value);
  };

  const deletePost = (data) => {
    const feedId = _get(data, "feedId");
    if (feedId) {
      deletePostFeed(feedId)
        .then((res) => {
          if (_get(res, "status")) {
            let newList = list.filter((item) => {
              return item.feedId !== feedId;
            });
            setList({ data: newList });
            setConfirmAlert(false);
            updateToastMsg({ msg: res.message, type: "success" });
          } else {
            updateToastMsg({ msg: res.message, type: "error" });
          }
        })
        .catch((err) => {
          updateToastMsg({ msg: "Something went wrong", type: "error" });
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
      cb: deletePost,
    },
  ];

  return (
    <div className={classes.root}>
      {showAddPost && (
        <Box mb={2} mt={2}>
          <ButtonWrapper
            variant="contained"
            onClick={() => {
              if (isLoggedIn()) {
                togglePostModal(true);
              } else toggleLoginModal(true);
            }}
          >
            <Typography variant="button">What's on your mind?</Typography>
          </ButtonWrapper>
        </Box>
      )}
      {list.map((item, index) => {
        let menuItem = [];
        const userId = _get(userDetails, "userId");
        const postedBy = _get(item, "user_details.userId");
        const feedId = _get(item, "feedId");
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
            <PostCardWrapper
              data={item}
              menuItem={menuItem}
              redirect_href={`/questions/${feedId}`}
              showRating={false}
            >
              <CardWrapper data={item} />
            </PostCardWrapper>
          </Box>
        );
      })}

      {listLoader ? (
        <LoaderComponent />
      ) : _isEmpty(list) ? (
        <Box display="flex" justifyContent="center" m={3}>
          <NoDataFound />
        </Box>
      ) : hasMoreListToLoad ? (
        <Box display="flex" justifyContent="center" my={2}>
          <LoadMore
            label="Load More"
            loader={listLoader}
            onTrigger={LoadMoreList}
            width="30%"
          />
        </Box>
      ) : null}

      <ConfirmAlertBox
        menu={confirmAlertButtons}
        title={<Typography variant="h1">Delete Post</Typography>}
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
    list: _get(state, "questionList.data", []),
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
    setList: (payload) => {
      dispatch({
        type: "ADD_Q",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsWrapper);
