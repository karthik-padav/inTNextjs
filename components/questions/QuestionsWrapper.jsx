import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { getQuestions } from "dataService/Api";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Icon } from "@material-ui/core";

import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import classNames from "classnames";
import CardWrapper from "components/questions/CardWrapper";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _find from "lodash/find";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";

import LoaderComponent from "components/questions/LoaderComponent";
// import { getAllQuestions } from "actions/questions";
import PostCardWrapper from "components/common/postCard/PostCardWrapper";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import { deletePostFeed } from "dataService/Api";
import NoDataFound from "components/common/NoDataFound";
import ButtonWrapper from "components/common/ButtonWrapper";
import InfiniteScroll from "components/common/InfiniteScroll";
import LoadMore from "components/common/LoadMore";
import Typography from "@material-ui/core/Typography";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";
import AddPostComponent from "components/questions/AddPostWrapper/AddPostComponent";
import { getLoggedUser } from "redux/slices/loggedUserSlice";
import { getAskList, createNewAskList } from "redux/slices/askListSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLoginModal,
  toggleAskModal,
  updateToastMsg,
} from "redux/slices/uiSlice";

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
  const loggedUser = useSelector(getLoggedUser);
  const userId = loggedUser?._id;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { postedBy, showAddPost = true } = props;
  const [listStartIndex, setListStartIndex] = useState(0);
  const [hasMoreListToLoad, setHasMoreListToLoad] = useState(true);
  const list = useSelector(getAskList);
  // const [list, setList] = useState([]);
  const [showConfirmBox, setConfirmAlert] = useState(false);
  const [showAddModal, toggleAddModal] = useState({ flag: false, data: null });
  const [loader, setLoader] = useState(false);

  const LoadMoreList = async () => {
    // if (hasMoreListToLoad) {
    //   setListStartIndex((prev) => (prev ? prev : 0 + limit));
    // }
  };

  const initialLoad = async () => {
    setLoader(true);
    let querryString = `?skip=${list.length}&limit=${15}`;
    if (postedBy) querryString += `&postedBy=${postedBy}`;
    const { data, error } = await getQuestions(querryString);
    if (error)
      dispatch(updateToastMsg({ msg: "Something went wrong.", type: "error" }));
    else if (data?.status) {
      dispatch(createNewAskList(_get(data, "data", [])));
      // setList(_get(data, "data", []));
    } else
      dispatch(updateToastMsg({ msg: "Something went wrong.", type: "error" }));
    setLoader(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  const deletePost = (data) => {
    if (data?._id) {
      deletePostFeed(data._id)
        .then((res) => {
          if (_get(res, "status")) {
            let newList = list.filter((item) => {
              return item._id !== data._id;
            });
            // setList(newList);
            setConfirmAlert(false);
            dispatch(updateToastMsg({ msg: res.message, type: "success" }));
          } else {
            dispatch(updateToastMsg({ msg: res.message, type: "error" }));
          }
        })
        .catch((err) => {
          dispatch(
            updateToastMsg({ msg: "Something went wrong", type: "error" })
          );
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
      cb: deletePost,
    },
  ];

  const onSuccess = ({ data }) => {
    let newList = _cloneDeep(list);
    const index = _findIndex(list, (item) => {
      return item._id === data?._id;
    });
    if (index > -1) newList[index] = data;
    else newList = [data, ...newList];
    // setList(newList);
    toggleAddModal({ flag: false, data: null });
  };

  return (
    <div className={classes.root}>
      {showAddPost && (
        <Box mb={2} mt={2}>
          <ButtonWrapper
            variant="contained"
            onClick={() => {
              if (loggedUser) {
                toggleAddModal({ flag: true });
              } else dispatch(toggleLoginModal());
            }}
          >
            <Typography variant="button">What's on your mind?</Typography>
          </ButtonWrapper>
        </Box>
      )}
      {list.map((item, index) => {
        let menuItem = [];
        const postId = _get(item, "_id");
        if (userId && userId === _get(item, "user._id"))
          menuItem.push(
            {
              title: "Edit",
              authCheck: true,
              code: "edit",
              cb: (value) => toggleAddModal({ flag: true, data: value }),
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
              loggedUser={loggedUser}
              menuItem={menuItem}
              redirect_href={`/questions/${postId}`}
              showRating={false}
            >
              <CardWrapper data={item} />
            </PostCardWrapper>
          </Box>
        );
      })}

      {list.length === 0 && !loader && <NoDataFound />}
      {loader && <LoaderComponent />}
      {list.length > 1 && (
        <Box display="flex" justifyContent="center" my={2}>
          <LoadMore
            label="Load More"
            loader={loader}
            onTrigger={LoadMoreList}
            width="30%"
          />
        </Box>
      )}

      {showConfirmBox && (
        <ConfirmAlertBox
          menu={confirmAlertButtons}
          title={<Typography variant="h1">Delete Post</Typography>}
          subtitle="Are You Sure You Want To Delete This Post?"
          data={showConfirmBox}
          isModalOpen={showConfirmBox}
        />
      )}
      {showAddModal.flag && (
        <AddPostComponent
          actions={{
            onSuccess: onSuccess,
            onCancel: () => toggleAddModal({ flag: false, data: null }),
          }}
          showAddModal={showAddModal}
        />
      )}
    </div>
  );
}

export default QuestionsWrapper;
