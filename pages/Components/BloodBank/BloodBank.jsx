import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box } from "@material-ui/core";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Profile from "../Common/Profile";
import Menu from "../Common/Menu";
import classNames from "classnames";
import { getBloodReceiver, getBloodDonor } from "../../DataService/Services";
import SimpleTabs from "./SimpleTabs";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  p1: {
    padding: theme.spacing(1),
  },
  mt2: {
    paddingTop: theme.spacing(2),
  },
}));

function BloodBank() {
  const classes = useStyles();
  const [receiverList, setReceiverList] = useState([]);
  const [receiverStartIndex, setReceiverStartIndex] = useState(0);
  const [hasMoreReceiverToLoad, setHasMoreReceiverToLoad] = useState(true);

  const [donorList, setDonorList] = useState([]);
  const [donorStartIndex, setDonorStartIndex] = useState(0);
  const [hasMoreDonorToLoad, setHasMoreDonorToLoad] = useState(true);

  const [scrollLoader, setScrollLoader] = useState(false);
  const [limit, setLimit] = useState(2);
  const [bloodType, setBloodType] = useState(null);

  const LoadMoreBloodReceiver = async () => {
    if (hasMoreReceiverToLoad) {
      setReceiverStartIndex((prev) => prev + limit);
    }
  };

  useEffect(() => {
    setScrollLoader(true);
    const querry = `?offset=${receiverStartIndex}&limit=${limit}`;
    getBloodReceiver(querry)
      .then((res) => {
        if (_.isArray(res)) {
          if (!_.isEmpty(res)) setReceiverList((prev) => [...prev, ...res]);
          else {
            setHasMoreReceiverToLoad(false);
          }
        }
        setScrollLoader(false);
      })
      .catch((err) => {
        setScrollLoader(false);
      });
  }, [receiverStartIndex]);

  const LoadMoreBloodDonor = async () => {
    if (hasMoreDonorToLoad) {
      setDonorStartIndex((prev) => prev + limit);
    }
  };

  useEffect(() => {
    setScrollLoader(true);
    const querry = `?offset=${donorStartIndex}&limit=${limit}`;
    getBloodDonor(querry)
      .then((res) => {
        if (_.isArray(res)) {
          if (!_.isEmpty(res)) setDonorList((prev) => [...prev, ...res]);
          else {
            setHasMoreDonorToLoad(false);
          }
        }
        setScrollLoader(false);
      })
      .catch((err) => {
        setScrollLoader(false);
      });
  }, [donorStartIndex]);

  const toggleBloodType = (bloodType) => {
    setBloodType(_.get(bloodType, "target.value", null));
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={3} className={classes.p1}>
          <Paper className={classes.paper}>
            <Profile />
          </Paper>
          <Box className={classes.mt2}>
            <Paper className={classes.paper}>
              <Menu />
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={6} className={classes.p1}>
          <Paper className={classes.paper}>
            {bloodType ? (
              <Chip
                variant="outlined"
                color="primary"
                label={bloodType}
                onDelete={toggleBloodType}
              />
            ) : (
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  value={bloodType ? bloodType : ""}
                  onChange={toggleBloodType}
                  input={<Input id="select-multiple-chip" />}
                >
                  {["A+", "Van Henry", "April Tucker"].map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Paper>
          <SimpleTabs
            receiverList={receiverList}
            LoadMoreBloodReceiver={LoadMoreBloodReceiver}
            donorList={donorList}
            LoadMoreBloodDonor={LoadMoreBloodDonor}
            scrollLoader={scrollLoader}
          />
        </Grid>
        <Grid item xs={3} className={classes.p1}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default BloodBank;
