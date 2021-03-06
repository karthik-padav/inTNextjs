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
import AddPostModalWrapper from "pages/questions/AddPostWrapper/AddPostModalWrapper";
import AddBloodRequestModal from "pages/bloodbank/AddBloodRequestWrapper/AddBloodRequestModal";

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

function UiComponents(props) {
  React.useEffect(() => {
    let localstorageUserData = localStorage.getItem("userDetails");
    if (localstorageUserData)
      localstorageUserData = JSON.parse(localstorageUserData);
    if (!props.userDetails && _get(localstorageUserData, "userId")) {
      getUserDetails(localstorageUserData.userId).then((res) => {
        const userData = _get(res, "data");
        if (_get(res, "status") && userData) {
          props.updateUser(userData);
        }
      });
    }

    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.updateToastMsg({ msg: "", type: "" });
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar
        open={!_isEmpty(_get(props, "toastMsg.msg", ""))}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={_get(props, "toastMsg.type", "success")}>
          {_get(props, "toastMsg.msg", "Something went wrong!")}
        </Alert>
      </Snackbar>

      <LoginModal />
      <AddPostModalWrapper />
      <AddBloodRequestModal />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    toastMsg: _get(state, "ui.toast"),
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

export default connect(mapStateToProps, mapDispatchToProps)(UiComponents);
