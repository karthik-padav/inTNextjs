import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { loadCSS } from "fg-loadcss";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Link from "next/link";
import MuiAlert from "@material-ui/lab/Alert";

import Snackbar from "@material-ui/core/Snackbar";
import LoginModal from "components/common/LoginModal";
import UserDeactivated from "components/common/UserDeactivated";
import AddPostComponent from "components/questions/AddPostWrapper/AddPostComponent";
import AddShopComponent from "components/onlineShop/AddShopWrapper/AddShopComponent";
import AddBloodRequestModal from "pages/bloodbank/AddBloodRequestWrapper/AddBloodRequestModal";
import { toastMsgState, updateToastMsg } from "redux/slices/uiSlice";
import { connect, useDispatch, useSelector } from "react-redux";

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
  const { userDetails, deactivatedModal } = props;

  const dispatch = useDispatch();
  const toastMsg = useSelector(toastMsgState);
  console.log(toastMsg, "toastMsg123");
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
    if (reason === "clickaway") return;
    dispatch(updateToastMsg({ msg: "", type: "" }));
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {_get(toastMsg, "type") && (
        <Snackbar
          open={!_isEmpty(_get(toastMsg, "msg"))}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity={toastMsg.type}>
            {_get(toastMsg, "msg", "Something went wrong!")}
          </Alert>
        </Snackbar>
      )}

      <LoginModal />
      {/* <AddPostComponent />
      <AddBloodRequestModal />
      <AddShopComponent /> */}
      {/* <UserDeactivated /> */}
    </div>
  );
}

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default UiComponents;
