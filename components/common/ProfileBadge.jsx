import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import Icon from "@material-ui/core/Icon";
import { connect, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import Divider from "components/common/Divider";

import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";

import classNames from "classnames";
import constants from "dataService/Constants";
import menuLists from "dataService/MenuLists";
import { grey } from "@material-ui/core/colors";
import { useRouter } from "next/router";
import { loggedUserReducer } from "redux/slices/loggedUserSlice";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    "&:focus": {
      outline: "none",
    },
  },
  inline: {
    display: "inline",
  },
  activeDot: {
    backgroundColor: theme.palette.action.active,
    width: "15px",
    height: "15px",
    borderRadius: "50px",
    position: "absolute",
    right: 0,
  },
  avatarSize: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  avatar_s: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },

  btn: {
    borderRadius: theme.spacing(1),
  },
}));

function NotificationBadge(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loggedUser } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const fullName = `${_get(loggedUser, "givenName", "")} ${_get(
    loggedUser,
    "familyName",
    ""
  )}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {}, []);

  const logout = () => {
    dispatch(loggedUserReducer(null));
    localStorage.removeItem("inTulunadu_accesstoken");
  };

  const redirectTo = (item) => {
    if (_get(item, "redirect")) router.push(item.redirect);
    else if (_get(item, "cb")) item.cb();
    handleClose();
  };

  const profileMenu = [
    menuLists.PROFILE,
    menuLists.SETTINGS,
    {
      title: "Log Out",
      code: "logout",
      icon: "fas fa-sign-out-alt",
      iconSize: "20px",
      cb: logout,
      iconColor: grey[700],
    },
  ];

  return (
    <>
      <Avatar
        onClick={handleClick}
        src={_get(loggedUser, "profilePicture", "")}
        className={classes.avatarSize}
      />

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List
          className={classes.root}
          component="nav"
          subheader={
            <>
              <Box p={2} display="flex" alignItems="center">
                <Box mr={1}>
                  <Avatar
                    src={_get(loggedUser, "profilePicture", "")}
                    className={classes.avatarSize}
                  />
                </Box>
                <div>
                  <Typography variant="body1">
                    <b>{fullName}</b>
                  </Typography>
                  <Typography variant="caption">
                    {_get(loggedUser, "email", "")}
                  </Typography>
                </div>
              </Box>
              <Divider />
            </>
          }
        >
          <Box>
            {profileMenu.map((item, index) => {
              return (
                <ListItem
                  button
                  key={index}
                  onClick={() => redirectTo(item)}
                  className={classNames(classes.btn)}
                >
                  {_get(item, "icon") && (
                    <Box px={1}>
                      <Avatar
                        className={classes.avatar_s}
                        style={{
                          backgroundColor: "transparent",
                        }}
                      >
                        <Icon
                          className={classNames(item.icon)}
                          style={{
                            width: "auto",
                            color: grey[700],
                            fontSize: item.iconSize,
                          }}
                        />
                      </Avatar>
                    </Box>
                  )}
                  <ListItemText
                    primary={
                      <Typography variant="body1">{item.title}</Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </Box>
        </List>
      </StyledMenu>
    </>
  );
}

export default NotificationBadge;
