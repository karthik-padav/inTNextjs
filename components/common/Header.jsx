import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { loadCSS } from "fg-loadcss";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Link from "next/link";
import MuiAlert from "@material-ui/lab/Alert";

import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

import Snackbar from "@material-ui/core/Snackbar";
import LoginModal from "components/common/LoginModal";
import ButtonWrapper from "components/common/ButtonWrapper";
import NotificationBadge from "components/common/NotificationBadge";
import ProfileBadge from "components/common/ProfileBadge";

import { isLoggedIn } from "Function/Common";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
    // color: theme.palette.text.secondary,
  },
  logo: {
    height: "45px",
    width: "auto",
  },
  xSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function Header(props) {
  const { toggleLoginModal } = props;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link href="/">
              <img
                // src="/images/INT_logo.png"
                src="/images/Logo_full.png"
                alt="in Tulunadu"
                className={classes.logo}
              />
            </Link>
            <Box>
              {isLoggedIn() ? (
                <Box display="flex" alignItems="center">
                  <NotificationBadge />
                  <ProfileBadge />
                </Box>
              ) : (
                <ButtonWrapper onClick={() => toggleLoginModal(true)}>
                  <Typography variant="button">Login</Typography>
                </ButtonWrapper>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    toastMsg: state.toastMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userDetails) => {
      dispatch({
        type: "UPDATE_USER",
        payload: userDetails,
      });
    },
    toggleLoginModal: (flag) => {
      dispatch({
        type: "SHOW_LOGIN_MODAL",
        payload: flag,
      });
    },
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
