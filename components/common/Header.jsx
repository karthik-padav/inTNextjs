import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { loadCSS } from "fg-loadcss";
import { getUserDetails } from "dataService/Services";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Link from "next/link";
import MuiAlert from "@material-ui/lab/Alert";
import Icon from "@material-ui/core/Icon";

import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

import Snackbar from "@material-ui/core/Snackbar";
import LoginModal from "components/common/LoginModal";
import ButtonWrapper from "components/common/ButtonWrapper";

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
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.secondary,
  },
  logo: {
    height: "55px",
    width: "auto",
  },
  xSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function Header(props) {
  const logout = () => {
    props.updateUser(null);
    localStorage.removeItem("userDetails");
  };

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
              {_get(props, "userDetails") && (
                <>
                  <ButtonWrapper
                    type="IconButton"
                    borderRadius="100px"
                    bgColor="color3"
                    hoverBgColor="color2"
                    color="color1"
                    onClick={logout}
                    mr={1}
                  >
                    <Badge badgeContent={0}>
                      <Icon className={"far fa-bell"} fontSize="small" />
                    </Badge>
                  </ButtonWrapper>
                  <ButtonWrapper
                    // type="IconButton"
                    onClick={logout}
                    pt={0.5}
                    pr={2}
                    pb={0.5}
                    pl={0.5}
                  >
                    <Box mr={1}>
                      <Avatar
                        src={_get(props, "userDetails.profilePicture", "")}
                        className={classes.xSmall}
                      />
                    </Box>
                    Logout
                  </ButtonWrapper>
                </>
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
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
