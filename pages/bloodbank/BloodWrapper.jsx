import React, { useState, useEffect } from "react";
import Link from "next/link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import classNames from "classnames";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";

import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";

import { getBloodReceiver, deleteBloodRequest } from "dataService/Api";
import { isLoggedIn } from "utils/Common";

import FilterWrapper from "pages/bloodbank/FilterWrapper";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import PostCardWrapper from "components/common/postCard/PostCardWrapper";
import BloodDetailsCard from "pages/bloodbank/BloodDetailsCard";
import LoaderComponent from "pages/bloodbank/LoaderComponent";
import LoadMore from "components/common/LoadMore";
import ButtonWrapper from "components/common/ButtonWrapper";
import NoDataFound from "components/common/NoDataFound";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -5,
    top: -3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function BloodWrapper(props) {
  const classes = useStyles();
  const {
    list = [],
    setList,
    toggleBloodModal,
    updateToastMsg,
    toggleLoginModal,
    userDetails,
    showAddPost = true,
  } = props;
  const [listStartIndex, setListStartIndex] = useState(0);
  const [hasMoreListToLoad, setHasMoreListToLoad] = useState(true);

  const [listLoader, setListLoader] = useState(false);
  const [limit, setLimit] = useState(15);

  const [querry, setQuerry] = useState(null);

  const [isConfirmAlertBox, setConfirmAlert] = useState(null);

  const [badgeContent, setBadgeContent] = useState(0);
  const [isFilterShow, setFilterToggle] = useState(false);

  const LoadMoreList = async () => {
    if (hasMoreListToLoad) {
      setListStartIndex((prev) => (prev ? prev : 0 + limit));
    }
  };

  useEffect(() => {
    setList(null);
  }, []);

  useEffect(() => {
    let querryString = `?offset=${listStartIndex}&limit=${limit}`;
    if (querry) querryString += `${querry}`;
    getListFnc(querryString, listStartIndex ? listStartIndex : 0 > 0);
  }, [listStartIndex]);

  const getListFnc = (querryString, isAppend = true) => {
    setListLoader(true);
    getBloodReceiver(querryString)
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

  const deletePost = (data) => {
    const id = _get(data, "postId");
    if (id) {
      deleteBloodRequest(id)
        .then((res) => {
          if (_get(res, "status")) {
            let newList = list.filter((item) => {
              return item.postId !== id;
            });
            setList({ data: newList });
            setConfirmAlert(false);
            updateToastMsg({ msg: res.message, type: "success" });
          } else {
            setConfirmAlert(null);
            updateToastMsg({ msg: res.message, type: "error" });
          }
        })
        .catch((err) => {
          updateToastMsg({ msg: "Something went wrong", type: "error" });
        });
    }
  };

  const applyFilter = (querry) => {
    setQuerry(querry);
    let querryString = `?offset=${listStartIndex}&limit=${limit}`;
    if (querry) querryString += `${querry}`;
    setHasMoreListToLoad(true);
    setListStartIndex(0);
    getListFnc(querryString, false);
  };

  const confirmAlertMenu = [
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
      color: "primary",
      variant: "contained",
      cb: deletePost,
    },
  ];

  const editClicked = (value) => {
    toggleBloodModal(true, value);
  };

  return (
    <div className={classes.root}>
      {showAddPost && (
        <Box
          justifyContent="space-between"
          display="flex"
          alignItems="center"
          mb={1}
          mt={1}
        >
          <ButtonWrapper
            variant="contained"
            onClick={() => {
              if (isLoggedIn()) {
                toggleBloodModal(true);
              } else toggleLoginModal(true);
            }}
          >
            <Typography variant="button">Add</Typography>
            <Icon
              className={classNames("fa fa-plus", classes.extendedIcon)}
              style={{
                fontSize: "18px",
              }}
            />
          </ButtonWrapper>

          <ButtonWrapper
            type="IconButton"
            onClick={() => setFilterToggle(!isFilterShow)}
          >
            <StyledBadge badgeContent={badgeContent} color="secondary">
              <Icon className="fa fa-filter" style={{ fontSize: 15 }} />
            </StyledBadge>
          </ButtonWrapper>
        </Box>
      )}

      <Box my={1}>
        <FilterWrapper
          showBloodType
          showState
          applyFilter={applyFilter}
          setBadgeContent={setBadgeContent}
          isFilterShow={isFilterShow}
          setFilterToggle={setFilterToggle}
        />
      </Box>

      {list.map((item, index) => {
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
            <PostCardWrapper data={item} menuItem={menuItem} showRating={false}>
              <Link href="/bloodbank/[id]" as={`/bloodbank/${item.postId}`}>
                <a>
                  <BloodDetailsCard
                    bloodType={_get(item, "bloodType")}
                    contactName={_get(item, "contactName")}
                    contactNumber={_get(item, "contactNumber")}
                    state={_get(item, "state")}
                    district={_get(item, "district")}
                    taluk={_get(item, "taluk")}
                    description={_get(item, "description")}
                  />
                </a>
              </Link>
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
        isModalOpen={isConfirmAlertBox}
        title={<Typography variant="h1">Delete Post</Typography>}
        subtitle="Are You Sure You Want To Delete This Post?"
        menu={confirmAlertMenu}
        data={isConfirmAlertBox}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    list: _get(state, "bRequestList.data", []),
    state,
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
    toggleBloodModal: (show, data) => {
      dispatch({
        type: "SHOW_B_MODAL",
        payload: { show, data },
      });
    },
    setList: (payload) => {
      dispatch({
        type: "ADD_B",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BloodWrapper);
