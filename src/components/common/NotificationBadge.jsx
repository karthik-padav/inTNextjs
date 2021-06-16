import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import Icon from "@material-ui/core/Icon";
import Badge from "@material-ui/core/Badge";
import ButtonWrapper from "src/components/common/ButtonWrapper";
import { connect } from "react-redux";
import { getNotification, readNotification } from "src/dataService/Api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Box from "@material-ui/core/Box";
import Divider from "src/components/common/Divider";
import { isLoggedIn } from "src/utils/Common";

import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";
import _findIndex from "lodash/findIndex";

import constants from "src/dataService/Constants";
import { useRouter } from "next/router";

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
    // backgroundColor: theme.palette.background.paper,
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
}));

function ProfileBadge(props) {
  const classes = useStyles();
  const { setNotificationList, notificationList = [] } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getAllNotification();
  }, []);

  const getAllNotification = () => {
    // GET NOTIFICATION LIST
    getNotification().then((res) => {
      if (_get(res, "status")) setNotificationList({ data: res.data });
    });
  };

  const redirectTo = (url, { notificationId, unread }) => {
    router.push(url);
    if (unread)
      readNotification(notificationId).then((res) => {
        let list = _cloneDeep(notificationList);
        console.log(res, "asdasdasdasd");
        const obj = _get(res, "data[0]");
        if (obj) {
          const index = _findIndex(list, (item) => {
            return item.notificationId === notificationId;
          });
          if (index > -1) list[index] = obj;
          setNotificationList({ data: list });
        }
      });
  };

  return (
    <>
      <ButtonWrapper
        type="IconButton"
        mr={1}
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={0}>
          <Icon className={"far fa-bell"} fontSize="small" />
        </Badge>
      </ButtonWrapper>

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
              <Box p={2}>
                <Typography variant="h2">Notification</Typography>
              </Box>
              <Divider />
            </>
          }
        >
          {notificationList.length < 1 && (
            <Box p={2}>
              <Typography variant="body1">No Notification Found.</Typography>
            </Box>
          )}
          {notificationList.length > 0 &&
            notificationList.map((item, index) => {
              const fullName = `${_get(
                item,
                "user_details.givenName",
                ""
              )} ${_get(item, "user_details.familyName", "")}`;
              const profilePicture = _get(
                item,
                "user_details.profilePicture",
                ""
              );
              let title = "";
              if (item.type === constants.NOTIFICATION_TYPES.COMMENT)
                title = `Commented on your post.`;
              if (item.type === constants.NOTIFICATION_TYPES.LIKE)
                title = `Liked your post.`;

              let redirectUrl = "/";
              if (item.postType === "QUESTION")
                redirectUrl = `/questions/${item.postId}`;

              return (
                <ListItem
                  alignItems="flex-start"
                  onClick={() => redirectTo(redirectUrl, item)}
                  key={index}
                  className={classes.unreadBg}
                >
                  <Box position="relative" px={1} display="flex">
                    {item.unread > 0 && (
                      <Box className={classes.activeDot}></Box>
                    )}
                    <ListItemAvatar>
                      <Avatar alt={fullName} src={profilePicture} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          {fullName}
                          <Typography variant="subtitle1">{title}</Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography variant="caption">
                            {moment(item.createdAt).fromNow()}
                          </Typography>
                        </>
                      }
                    />
                  </Box>
                </ListItem>
              );
            })}
        </List>
      </StyledMenu>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    notificationList: _get(state, "notificationList.data", []),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setNotificationList: (payload) => {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBadge);
