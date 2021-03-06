import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography, Box, Button } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import _get from "lodash/get";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  p1: {
    padding: theme.spacing(1),
  },
  pl1: {
    paddingLeft: theme.spacing(1),
  },
  pt2: {
    paddingTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const menuItem = [
  {
    title: "Questions",
    icon: "fa fa-hand-holding-heart",
    iconSize: "small",
    iconColor: "red",
    redirect: "/questions",
  },
  {
    title: "Blood Bank",
    icon: "fa fa-hand-holding-heart",
    iconSize: "small",
    iconColor: "red",
    redirect: "/bloodbank",
  },
  {
    title: "About",
    icon: "fa fa-hand-holding-heart",
    iconSize: "small",
    iconColor: "red",
    redirect: "/about",
  },
  {
    title: "Settings",
    icon: "fa fa-hand-holding-heart",
    iconSize: "small",
    iconColor: "red",
    redirect: "/settings",
  },
];
function Menu(props) {
  const classes = useStyles();
  return (
    <>
      {_get(props, "menuItem", menuItem).map((item, index) => (
        <Box py={1} key={index}>
          {_get(item, "redirect") && (
            <Link href={item.redirect}>
              <Button style={{ justifyContent: "flex-start" }} fullWidth>
                {item.title}
              </Button>
            </Link>
          )}
          {_get(item, "cb") && (
            <Button
              style={{ justifyContent: "flex-start" }}
              fullWidth
              onClick={item.cb}
            >
              {item.title}
            </Button>
          )}
        </Box>
      ))}
    </>
  );
}

export default Menu;
