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

import Snackbar from "@material-ui/core/Snackbar";
import LoginModal from "components/common/LoginModal";

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
}));

function Header(props) {
  const logout = () => {
    props.updateUser(null);
    localStorage.removeItem("userDetails");
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography variant="h6" className={classes.title}>
              MIM
            </Typography>
          </Link>
          {_get(props, "userDetails") && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
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
