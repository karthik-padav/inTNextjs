import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Avatar, Typography } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss";

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
    title: "Blood Bank",
    icon: "fa fa-hand-holding-heart",
    iconSize: "small",
    iconColor: "red",
    redirect: "",
  },
  {
    title: "Setting",
    icon: "fa fa-hand-holding-heart",
    iconSize: "small",
    iconColor: "red",
    redirect: "",
  },
];
function Menu() {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <>
      {menuItem.map((item, index) => (
        <Grid container spacing={0} key={index}>
          <Grid item xs={1}>
            <Icon
              className={item.icon}
              fontSize={item.iconSize}
              style={{ color: item.iconColor }}
            />
          </Grid>
          <Grid item xs={11} className={classes.pl1}>
            <Typography align="left" variant="body1">
              {item.title}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default Menu;
