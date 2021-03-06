import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Box, Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({}));
function NoDataFound(props) {
  const classes = useStyles();
  const { title = "No data found" } = props;
  return (
    <>
      <p>{title}</p>
    </>
  );
}

export default NoDataFound;
