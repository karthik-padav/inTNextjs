import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import FilterWrapper from "pages/bloodbank/FilterWrapper";

import classNames from "classnames";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";

import {
  Grid,
  Paper,
  Box,
  IconButton,
  Icon,
  Button,
  Badge,
  Fade,
  Backdrop,
  Modal,
} from "@material-ui/core";

import {
  getBloodReceiver,
  getBloodDonor,
  postBloodRequest,
  deleteBloodRequest,
} from "dataService/Services";
import constants from "dataService/Constants";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { redMode, darkMode } from "dataService/Theme";

import RequestBloodForm from "pages/bloodbank/AddBloodRequestWrapper/RequestBloodForm";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import UserHeaderCard from "components/common/UserHeaderCard";
import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import SimpleTabs from "pages/bloodbank/SimpleTabs";
import { isLoggedIn } from "dataService/Utils";
import Link from "next/link";

import PostCardWrapper from "components/common/PostCard/PostCardWrapper";

import BloodDetailsCard from "pages/bloodbank/BloodDetailsCard";
import LoaderComponent from "pages/bloodbank/LoaderComponent";

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
  raiseRequestBtn: {
    borderRadius: "50px",
  },
  closeBtn: {
    padding: theme.spacing(1.5),
  },
  p1: {
    padding: theme.spacing(1),
  },
  pl1: {
    paddingLeft: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mx_md: {
    width: "568px",
    maxWidth: "100%",
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function BloodBank(props) {
  const classes = useStyles();
  const {
    bRequestList = [],
    setBloodReqList,
    toggleBloodModal,
    userDetails,
  } = props;
  const [receiverStartIndex, setReceiverStartIndex] = useState(0);
  const [hasMoreReceiverToLoad, setHasMoreReceiverToLoad] = useState(true);

  const [scrollLoader, setScrollLoader] = useState(false);
  const [limit, setLimit] = useState(1);

  const [querry, setQuerry] = useState(null);

  const [isConfirmAlertBox, setConfirmAlert] = useState(null);

  const [badgeContent, setBadgeContent] = useState(0);
  const [isFilterShow, setFilterToggle] = useState(false);

  const LoadMoreBloodReceiver = async () => {
    if (hasMoreReceiverToLoad) {
      setReceiverStartIndex((prev) => prev + limit);
    }
  };

  useEffect(() => {
    let querryString = `?offset=${receiverStartIndex}&limit=${limit}`;
    if (querry) querryString += `${querry}`;
    getBloodReceiverFnc(querryString);
  }, [receiverStartIndex]);

  useEffect(() => {
    let querryString = `?offset=${receiverStartIndex}&limit=${limit}`;
    if (querry) querryString += `${querry}`;
    setHasMoreReceiverToLoad(true);
    setReceiverStartIndex(0);
    getBloodReceiverFnc(querryString, false);
  }, [querry]);

  const getBloodReceiverFnc = (querryString, isAppend = true) => {
    setScrollLoader(true);
    getBloodReceiver(querryString)
      .then((res) => {
        if (_get(res, "status")) {
          if (!_isEmpty(res.data)) {
            if (isAppend) setBloodReqList([...res.data, ...bRequestList]);
            else setBloodReqList({ data: res.data });
          } else {
            if (!isAppend) {
              setBloodReqList({ data: res.data });
            }
            setHasMoreReceiverToLoad(false);
          }
        }
        setScrollLoader(false);
      })
      .catch((err) => {
        setScrollLoader(false);
      });
  };

  const deleteRequest = (data) => {
    const id = _get(data, "bloodRequestId");
    deleteBloodRequest(id)
      .then((res) => {
        console.log(res, "response");
        if (_get(res, "status")) {
          let newList = bRequestList.filter((item) => {
            return item.bloodRequestId !== id;
          });
          setBloodReqList({ data: newList });
          setConfirmAlert(false);
          props.updateToastMsg({ msg: res.message, type: "success" });
        } else {
          setConfirmAlert(null);
          props.updateToastMsg({ msg: res.message, type: "error" });
        }
      })
      .catch((err) => {
        props.updateToastMsg({ msg: "Something went wrong", type: "error" });
      });
  };

  const applyFilter = (querry) => {
    setQuerry(querry);
  };

  const confirmAlertMenu = [
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
      color: "primary",
      variant: "contained",
      cb: deleteRequest,
    },
  ];

  const editClicked = (value) => {
    toggleBloodModal(true, value);
  };
  const redTheme = createMuiTheme(redMode());

  console.log(props, "props123");
  return (
    // <ThemeProvider theme={redTheme}>
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Paper className={classes.paper}>
              <ProfileMenu />
            </Paper>
            <Box pt={2}>
              <Paper className={classes.paper}>
                <Menu />
              </Paper>
            </Box>
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          <Box
            justifyContent="space-between"
            display="flex"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.raiseRequestBtn}
              onClick={() => {
                if (isLoggedIn()) {
                  toggleBloodModal(true);
                } else props.toggleLoginModal(true);
              }}
            >
              Add
              <Icon
                className={classNames("fa fa-plus", classes.extendedIcon)}
                fontSize="small"
              />
            </Button>

            <IconButton
              variant="contained"
              className={classes.closeBtn}
              size="medium"
              color="primary"
              onClick={() => setFilterToggle(!isFilterShow)}
            >
              <Badge badgeContent={badgeContent}>
                <Icon className="fa fa-filter" style={{ fontSize: 15 }} />
              </Badge>
            </IconButton>
          </Box>

          <Box my={1}>
            <FilterWrapper
              showBloodType
              showState
              applyFilter={applyFilter}
              setBadgeContent={setBadgeContent}
              isFilterShow={isFilterShow}
            />
          </Box>

          {bRequestList.map((item, index) => {
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
                  <Link
                    href="/bloodbank/[id]"
                    as={`/bloodbank/${item.bloodRequestId}`}
                  >
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

          {scrollLoader && <LoaderComponent />}

          <button onClick={LoadMoreBloodReceiver}>
            {scrollLoader ? "loading more..." : "Load More"}
          </button>
        </Grid>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Paper className={classes.paper}>xs=6</Paper>
          </div>
        </Grid>
      </Grid>

      {isConfirmAlertBox && (
        <ConfirmAlertBox menu={confirmAlertMenu} data={isConfirmAlertBox} />
      )}
    </div>
    // </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    bRequestList: _get(state, "bRequestList.data", []),
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
    setBloodReqList: (payload) => {
      dispatch({
        type: "ADD_B",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BloodBank);
