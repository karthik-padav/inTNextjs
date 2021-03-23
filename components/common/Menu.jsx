import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import _get from "lodash/get";

import constants from "dataService/Constants";

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
  constants.MENU.PROFILE,
  constants.MENU.QUESTIONS,
  constants.MENU.BLOODBANK,
  constants.MENU.ABOUT,
  constants.MENU.SETTINGS,
];

const handleClick = (item) => {
  if (_get(item, "cb")) item.cb(item);
};

function Menu(props) {
  const classes = useStyles();
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {_get(props, "menuItem", menuItem).map((item, index) => (
        <Link href={_get(item, "redirect", "")}>
          <ListItem button key={index} onClick={() => handleClick(item)}>
            {_get(item, "icon") && (
              <ListItemIcon style={{ color: item.iconColor }}>
                <Icon className={item.icon} fontSize="small" />
              </ListItemIcon>
            )}
            <ListItemText primary={item.title} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

export default Menu;
