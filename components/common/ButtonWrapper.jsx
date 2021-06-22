import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  button: (props) => ({
    width: props.width ? props.width : "auto",
    marginTop: theme.spacing(props.mt ? props.mt : 0),
    marginBottom: theme.spacing(props.mb ? props.mb : 0),
    marginRight: theme.spacing(props.mr ? props.mr : 0),
    marginLeft: theme.spacing(props.ml ? props.ml : 0),
    paddingTop: theme.spacing(
      props.pt ? props.pt : props.type === "IconButton" ? 1.5 : 0.8
    ),
    paddingBottom: theme.spacing(
      props.pb ? props.pb : props.type === "IconButton" ? 1.5 : 0.8
    ),
    paddingRight: theme.spacing(props.pr ? props.pr : 1.5),
    paddingLeft: theme.spacing(props.pl ? props.pl : 1.5),
    borderRadius: props.borderRadius ? props.borderRadius : "50px",
    backgroundColor: props.bgColor
      ? props.bgColor
      : props.type === "IconButton"
      ? theme.palette.common.IconButton.bgColor
      : theme.palette.common.button.bgColor,
    color: props.color
      ? props.color
      : props.type === "IconButton"
      ? theme.palette.common.IconButton.color
      : theme.palette.common.button.color,
    "&:hover": {
      backgroundColor: props.bgColor
        ? props.bgColor
        : props.type === "IconButton"
        ? theme.palette.common.IconButton.bgColor
        : theme.palette.common.button.bgColor,
      color: props.color
        ? props.color
        : props.type === "IconButton"
        ? theme.palette.common.IconButton.color
        : theme.palette.common.button.color,
    },
  }),

  buttonProgress: {
    position: "absolute",
    color: theme.palette.common.loader,
  },
  buttonDisabled: (props) => ({
    opacity: "0.8",
    color: `${
      props.color
        ? props.color
        : props.type === "IconButton"
        ? theme.palette.common.IconButton.color
        : theme.palette.common.button.color
    } !important`,
  }),
}));

function ButtonWrapper(props) {
  const classes = useStyles(props);
  const {
    onClick,
    variant = "text",
    size = "small",
    type = "",
    fullWidth = false,
    disabled = false,
    loader = false,
    color = "inherit",
    ariaControls,
    ariaHaspopup,
  } = props;

  let button = null;
  const disabledBtn = disabled || loader;
  switch (type) {
    case "IconButton":
      button = (
        <IconButton
          variant={variant}
          size={size}
          className={classNames(
            classes.button,
            disabledBtn ? classes.buttonDisabled : ""
          )}
          onClick={onClick}
          disabled={disabledBtn}
          aria-controls={ariaControls ? ariaControls : undefined}
          aria-haspopup={ariaHaspopup ? "true" : undefined}
        >
          {props.children}
          {loader && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </IconButton>
      );
      break;

    default:
      button = (
        <Button
          variant={variant}
          size={size}
          fullWidth={fullWidth}
          className={classNames(
            classes.button,
            disabledBtn ? classes.buttonDisabled : ""
          )}
          onClick={onClick}
          disabled={disabledBtn}
        >
          {props.children}
          {loader && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </Button>
      );
      break;
  }
  return button;
}

export default ButtonWrapper;
