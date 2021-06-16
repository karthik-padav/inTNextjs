import Head from "next/head";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import Paper from "@material-ui/core/Paper";

import Icon from "@material-ui/core/Icon";
import Link from "next/link";
import _get from "lodash/get";

import constants from "src/dataService/Constants";
import menuLists from "src/dataService/MenuLists";

import { isLoggedIn, getPageCode } from "src/utils/Common";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    width: "auto",
  },
  avatar_s: {
    width: theme.spacing(constants.AVATAR.sm),
    height: theme.spacing(constants.AVATAR.sm),
  },
  btn: {
    borderRadius: theme.spacing(1),
  },
  btnSelected: {
    color: theme.palette.common.white,
    backgroundColor: `${theme.palette.common.blue} !important`,
  },
}));

function Menu(props) {
  const classes = useStyles();
  const router = useRouter();

  const { userDetails } = props;

  const getMenuList = () => {
    let menuItem = [];
    if (_get(menuLists, "QUESTIONS.show")) menuItem.push(menuLists.QUESTIONS);
    if (_get(menuLists, "BLOODBANK.show")) menuItem.push(menuLists.BLOODBANK);
    if (_get(menuLists, "BLOG.show")) menuItem.push(menuLists.BLOG);
    if (_get(menuLists, "RECIPES.show")) menuItem.push(menuLists.RECIPES);
    if (_get(menuLists, "ONLINE_SHOP.show"))
      menuItem.push(menuLists.ONLINE_SHOP);
    if (_get(menuLists, "PROFILE.show") && isLoggedIn())
      menuItem.push(menuLists.PROFILE);
    if (_get(menuLists, "SETTINGS.show")) menuItem.push(menuLists.SETTINGS);

    return menuItem;
  };

  const handleClick = (item) => {
    if (_get(item, "cb")) item.cb(item);
    if (_get(item, "redirect"))
      router.push(item.redirect, undefined, { shallow: true });
  };

  // console.log(getPageCode(router), "getPageCode123");

  return (
    <Paper>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {_get(props, "menuItem", getMenuList()).map((item, index) => {
          const isSelected = getPageCode(router) === item.code;
          return (
            <ListItem
              key={index}
              button
              onClick={() => handleClick(item)}
              className={classNames(
                classes.btn,
                isSelected ? classes.btnSelected : ""
              )}
              selected={isSelected}
            >
              {_get(item, "icon") && (
                <ListItemIcon>
                  <Avatar
                    className={classes.avatar_s}
                    style={{
                      color: item.iconColor,
                      backgroundColor: "transparent",
                    }}
                  >
                    <Icon
                      className={classNames(item.icon)}
                      style={{
                        color: isSelected ? "#fff" : item.iconColor,
                        width: "auto",
                        fontSize: item.iconSize,
                      }}
                    />
                  </Avatar>
                </ListItemIcon>
              )}
              <ListItemText
                primary={<Typography variant="body1">{item.title}</Typography>}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    toastMsg: state.toastMsg,
    userDetails: state.userDetails,
    theme: state.theme,
  };
};
export default connect(mapStateToProps)(Menu);
