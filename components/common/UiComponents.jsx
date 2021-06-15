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

import Snackbar from "@material-ui/core/Snackbar";
import LoginModal from "components/common/LoginModal";
import UserDeactivated from "components/common/UserDeactivated";
import AddPostComponent from "pages/questions/AddPostWrapper/AddPostComponent";
import AddShopComponent from "pages/onlineShop/AddShopWrapper/AddShopComponent";
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
  const {
    userDetails,
    postQuestionModal,
    shopModal,
    bloodRequestModal,
    deactivatedModal,
  } = props;

  const [loader, setLoader] = React.useState(false);

  React.useEffect(() => {
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
      {_get(props, "toastMsg.type") && (
        <Snackbar
          open={!_isEmpty(_get(props, "toastMsg.msg"))}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity={props.toastMsg.type}>
            {_get(props, "toastMsg.msg", "Something went wrong!")}
          </Alert>
        </Snackbar>
      )}

      <LoginModal />
      {postQuestionModal && <AddPostComponent />}
      {bloodRequestModal && <AddBloodRequestModal />}
      {shopModal && <AddShopComponent />}
      {deactivatedModal && <UserDeactivated />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    toastMsg: _get(state, "ui.toast"),
    postQuestionModal: _get(state, "ui.postQuestionModal.show"),
    bloodRequestModal: _get(state, "ui.postBloodModal.show", false),
    shopModal: _get(state, "ui.shopModal.show"),
    deactivatedModal: _get(state, "ui.deactivatedModal.show"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateToastMsg: (toastMsg) => {
      dispatch({
        type: "UPDATE_TOAST",
        payload: toastMsg,
      });
    },
    updateTheme: (mode) => {
      dispatch({
        type: "UPDATE_THEME",
        payload: mode,
      });
    },
  };
};

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default connect(mapStateToProps, mapDispatchToProps)(UiComponents);
