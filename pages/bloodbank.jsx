import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _findIndex from "lodash/findIndex";

import { Grid, Paper, Box } from "@material-ui/core";
import Menu from "components/common/Menu";
import BloodWrapper from "pages/bloodbank/BloodWrapper";
import permission from "dataService/Permission";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

function BloodBank(props) {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (!permission?.BLOODBANK?.show) router.push("/");
  }, []);

  if (permission?.BLOODBANK?.show)
    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item sm={12} md={3}>
            <Box p={1}>
              <div className="stickyWrapper">
                <Menu />
              </div>
            </Box>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box p={1}>
              <BloodWrapper />
            </Box>
          </Grid>
          <Grid item sm={12} md={3}>
            <Box p={1}>
              <div className="stickyWrapper">
                <Paper className={classes.paper}>xs=6</Paper>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    );

  return null;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BloodBank);
