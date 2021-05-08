import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import _get from "lodash/get";
import Link from "next/link";
import BloodDetailsCard from "./BloodDetailsCard";
import Divider from "components/common/Divider";
import UserHeaderCard from "components/common/UserHeaderCard";
import Skeleton from "@material-ui/lab/Skeleton";
import PostCardWrapper from "components/common/PostCard/PostCardWrapper";
import { connect } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
  },
  primaryBorder: {
    borderColor: theme.palette.primary.main,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  pl1: {
    paddingLeft: theme.spacing(1),
  },
  pt2: {
    paddingTop: theme.spacing(2),
  },
  pt1: {
    paddingTop: theme.spacing(1),
  },
}));

function SimpleTabs(props) {
  const {
    LoadMoreBloodReceiver,
    receiverList = [],
    scrollLoader,
    LoadMoreBloodDonor,
    donorList = [],
    userDetails,
    editRequest,
    setConfirmAlert,
  } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [deleteRequestId, setDeleteRequestId] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loader = () => {
    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item>
            <Skeleton variant="circle" animation="wave">
              <Avatar className={classes.large} />
            </Skeleton>
          </Grid>
          <Grid item xs>
            <Box ml={1}>
              <Skeleton width="30%" animation="wave" />
              <Skeleton width="20%" animation="wave" />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box mt={2}>
              <Grid container>
                {[1, 2, 3].map((item, index) => (
                  <Grid md={4} xs={12} key={index}>
                    <Skeleton width="80%" animation="wave" />
                    <Skeleton width="80%" animation="wave" />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs"
          centered
          variant="fullWidth"
        >
          <Tab label="receiver" {...a11yProps(0)} />
          <Tab label="donor" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {receiverList.map((item, index) => {
          let menuItem = [];
          const userId = _get(userDetails, "userId");
          const postedBy = _get(item, "user_details.userId");
          if (userId && userId === postedBy)
            menuItem.push(
              {
                title: "Edit",
                authCheck: true,
                code: "edit",
                cb: editRequest,
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

        {scrollLoader &&
          [1, 2].map((item, index) => <Box key={index}>{loader()}</Box>)}
        <button onClick={LoadMoreBloodReceiver}>
          {scrollLoader ? "loading more..." : "Load More"}
        </button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {[1, 3].map((item, index) => {
          return (
            <Paper key={index} className={classes.paper}>
              asdads
            </Paper>
          );
        })}
        <button onClick={LoadMoreBloodDonor}>
          {scrollLoader ? "loading more..." : "Load More"}
        </button>
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    bReciverList: _get(state, "bReciverList.data", []),
    bDonnerList: _get(state, "bDonnerList.data", []),
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleTabs);
