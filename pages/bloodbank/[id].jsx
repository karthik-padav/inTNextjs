import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";

import classNames from "classnames";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";
import _includes from "lodash/includes";

import {
  Grid,
  Paper,
  Box,
  Backdrop,
  Modal,
  Fade,
  Button,
  IconButton,
  Icon,
} from "@material-ui/core";

import ProfileMenu from "components/common/ProfileMenu";
import Menu from "components/common/Menu";
import RequestBloodForm from "pages/bloodbank/AddBloodRequestWrapper/RequestBloodForm";
import UserHeaderCard from "components/common/UserHeaderCard";
import ConfirmAlertBox from "components/common/ConfirmAlertBox";
import BloodDetailsCard from "pages/bloodbank/BloodDetailsCard";

import { getBloodReceiver, postBloodRequest } from "dataService/Api";
import { isLoggedIn } from "redux/selector";
import CommentCard from "components/common/commentCard/index";
import Divider from "components/common/Divider";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";
import { toggleLoginModal, updateToastMsg } from "redux/slices/uiSlice";
import { getLoggedUser } from "redux/slices/loggedUserSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  primaryBorder: {
    borderColor: theme.palette.primary.main,
  },
  paper: {
    padding: theme.spacing(2),
  },
  raiseRequestBtn: {
    borderRadius: "50px",
  },
  closeBtn: {
    padding: theme.spacing(1),
  },
  p1: {
    padding: theme.spacing(1),
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
  pt2: {
    paddingTop: theme.spacing(2),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function BloodPost(props) {
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUser);
  const classes = useStyles();
  const router = useRouter();

  const [isModalOpen, toggleModal] = React.useState(false);
  const [raiseRequestLoader, setRaiseRequestLoader] = React.useState(false);

  const [isEditRequest, setEditRequest] = React.useState({});

  const [isConfirmAlertBox, setConfirmAlert] = React.useState(null);

  const raiseRequest = (values) => {
    setRaiseRequestLoader(true);
    const isEdit = !_isEmpty(isEditRequest);
    let data = {};
    if (isEdit) data = { ...values, postId: isEditRequest.postId };
    else data = values;
    postBloodRequest(data, isEdit).then((res) => {
      console.log(res, "response");
      if (_get(res, "status")) {
        dispatch(updateToastMsg({ msg: res.message, type: "success" }));
        toggleModal(false);
        setEditRequest({});
      } else dispatch(updateToastMsg({ msg: res.message, type: "error" }));
      setRaiseRequestLoader(false);
    });
  };

  const editRequest = (value) => {
    setEditRequest(value);
    toggleModal(true);
  };

  const deleteRequest = () => {
    if (isConfirmAlertBox) {
      deleteBloodRequest(isConfirmAlertBox).then((res) => {
        console.log(res, "response");
        if (_get(res, "status")) {
          dispatch(updateToastMsg({ msg: res.message, type: "success" }));
          setConfirmAlert(null);
          router.push("/bloodbank");
        } else {
          setConfirmAlert(null);
          dispatch(updateToastMsg({ msg: res.message, type: "error" }));
        }
      });
    }
  };

  const bloodReceiver = _get(props, "bloodReceiver.data[0]");
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item sm={12} md={3} className={classes.p1}>
          <div className="stickyWrapper">
            <Menu />
          </div>
        </Grid>
        <Grid item sm={12} md={6} className={classes.p1}>
          <Box
            justifyContent="space-between"
            display=" flex"
            alignItems="center"
            mb={2}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              className={classes.raiseRequestBtn}
              onClick={() => {
                if (isLoggedIn()) {
                  toggleModal(true);
                  setEditRequest({});
                } else dispatch(toggleLoginModal());
              }}
            >
              Add
              <Icon
                className={classNames("fa fa-plus", classes.extendedIcon)}
                fontSize="small"
              />
            </Button>
            <Modal
              className={classes.modal}
              open={isModalOpen}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={isModalOpen}>
                <Paper className={classNames(classes.paper, classes.mx_md)}>
                  <UserHeaderCard
                    profilePicture={_get(loggedUser, "profilePicture", "")}
                    email={_get(loggedUser, "email")}
                    givenName={_get(loggedUser, "givenName")}
                    familyName={_get(loggedUser, "familyName")}
                  >
                    <IconButton
                      variant="contained"
                      className={classes.closeBtn}
                      size="medium"
                      color="primary"
                      onClick={() => {
                        toggleModal(false);
                        setEditRequest({});
                      }}
                    >
                      <Icon
                        className={"fa fa-times"}
                        style={{ fontSize: 15 }}
                      />
                    </IconButton>
                  </UserHeaderCard>
                  <RequestBloodForm
                    raiseRequest={raiseRequest}
                    submitLoader={raiseRequestLoader}
                    isEditRequest={isEditRequest}
                  />
                </Paper>
              </Fade>
            </Modal>
          </Box>

          {bloodReceiver ? (
            <Paper className={classes.paper}>
              <UserHeaderCard
                profilePicture={_get(
                  bloodReceiver,
                  "user_details.profilePicture",
                  ""
                )}
                email={_get(bloodReceiver, "user_details.email")}
                givenName={_get(bloodReceiver, "user_details.givenName")}
                familyName={_get(bloodReceiver, "user_details.familyName")}
                createdAt={_get(bloodReceiver, "createdAt")}
              >
                {/* <OptionMenu
                  item={bloodReceiver}
                  editRequest={editRequest}
                  setConfirmAlert={setConfirmAlert}
                /> */}
              </UserHeaderCard>
              <BloodDetailsCard
                bloodType={_get(bloodReceiver, "bloodType")}
                contactName={_get(bloodReceiver, "contactName")}
                contactNumber={_get(bloodReceiver, "contactNumber")}
                state={_get(bloodReceiver, "state")}
                district={_get(bloodReceiver, "district")}
                taluk={_get(bloodReceiver, "taluk")}
                description={_get(bloodReceiver, "description")}
              />
              <Divider mt={1.5} mb={1.5} />
              Comments: {_get(bloodReceiver, "comments", 0)}
              <Divider mt={1.5} mb={1.5} />
              {_get(bloodReceiver, "postId") && (
                <CommentCard id={bloodReceiver.postId} />
              )}
            </Paper>
          ) : (
            <Box display="flex" justifyContent="center" m={3}>
              No Data Found.
            </Box>
          )}
        </Grid>
        <Grid item sm={12} md={3} className={classes.p1}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>

      <ConfirmAlertBox
        isConfirmAlertBox={isConfirmAlertBox}
        title={<Typography variant="h1">Delete Post</Typography>}
        onConfirm={deleteRequest}
        onCancel={() => {
          setConfirmAlert(null);
        }}
      />
    </div>
  );
}

BloodPost.getInitialProps = async function (ctx) {
  const { id } = ctx.query;
  const { pathname } = ctx;
  let bloodReceiver = {};
  const query = `?id=${id}`;
  // if (_includes(pathname.split("/"), "bloodbank")) {
  bloodReceiver = await getBloodReceiver(query);
  // }
  return { bloodReceiver };
};

export default BloodPost;
