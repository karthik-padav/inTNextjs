import Link from "next/link";
import {getQuestions} from "../DataService/Services";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box,Typography } from "@material-ui/core";

import Profile from "./Common/Profile";
import Menu from "./Common/Menu";
import classNames from "classnames";
import Header from './Common/Header'
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

function Questions() {
  const classes = useStyles();
  const [questions, setQuestionList] = useState([]);
  const [questionStartIndex, setQuestionStartIndex] = useState(0);
  const [hasMoreQuestionToLoad, setHasMoreQuestionToLoad] = useState(true);

  const [scrollLoader, setScrollLoader] = useState(false);
  const [limit, setLimit] = useState(2);

  const LoadMoreQuestion = async () => {
    if (hasMoreQuestionToLoad) {
      setQuestionStartIndex((prev) => prev + limit);
    }
  };

  useEffect(() => {
    setScrollLoader(true);
    const querry = `?offset=${questionStartIndex}&limit=${limit}`;
    getQuestions(querry)
      .then((res) => {
        if (_.isArray(res)) {
          if (!_.isEmpty(res)) setQuestionList((prev) => [...prev, ...res]);
          else {
            setHasMoreQuestionToLoad(false);
          }
        }
        setScrollLoader(false);
      })
      .catch((err) => {
        setScrollLoader(false);
      });
  }, [questionStartIndex]);

  return (
    <div className={classes.root}>
      <Header/>
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
          
        {questions.map((item, index) => {
          return (
            <Paper key={index} className={classes.paper}>
              <Link href="/questions/[id]" as={`/questions/${item.id}`}>
              <Typography align="left" variant="body1">
                title: {item.title} {item.id}
              </Typography>
              </Link>
              <Typography align="left" variant="body1">
                post_date: {item.post_date}
              </Typography>
              <Typography align="left" variant="body1">
                post_author name: {item.post_author.name}
              </Typography>
              <Typography align="left" variant="body1">
                post_author email: {item.post_author.email}
              </Typography>
              <Typography align="left" variant="body1">
                content: {item.content}
              </Typography>
              <Typography align="left" variant="body1">
                Comments: {item.comment_count}
              </Typography>
              <Typography align="left" variant="body1">
                likes: {item.likes.length}
              </Typography>
            </Paper>
          );
        })}
        <button onClick={LoadMoreQuestion}>
          {scrollLoader ? "loading more..." : "Load More"}
        </button>
        </Grid>
        <Grid item xs={3} className={classes.p1}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Questions;
