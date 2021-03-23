import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  button: (props) => ({
    width: props.width ? props.width : "auto",

    marginTop: theme.spacing(props.mt ? props.mt : 0),
    marginBottom: theme.spacing(props.mb ? props.mb : 0),
    marginRight: theme.spacing(props.mr ? props.mr : 0),
    marginLeft: theme.spacing(props.ml ? props.ml : 0),

    paddingTop: theme.spacing(props.pt ? props.pt : "inherit"),
    paddingBottom: theme.spacing(props.pb ? props.pb : "inherit"),
    paddingRight: theme.spacing(props.pr ? props.pr : "inherit"),
    paddingLeft: theme.spacing(props.pl ? props.pl : "inherit"),

    borderRadius: props.borderRadius ? props.borderRadius : "50px",

    backgroundColor: props.bgColor
      ? theme.palette.common[props.bgColor]
      : theme.palette.common.color1,
    color: props.color
      ? theme.palette.common[props.color]
      : theme.palette.common.color3,
    "&:hover": {
      backgroundColor: props.hoverBgColor
        ? theme.palette.common[props.hoverBgColor]
        : props.bgColor
        ? theme.palette.common[props.bgColor]
        : theme.palette.common.color1,
    },
  }),

  buttonProgress: {
    position: "absolute",
  },
}));

function ButtonWrapper(props) {
  const classes = useStyles(props);
  const {
    onClick,
    variant = "contained",
    size = "medium",
    type = "",
    fullWidth = false,
    disabled = false,
    loader = false,
  } = props;

  let button = null;
  switch (type) {
    case "IconButton":
      button = (
        <IconButton
          variant={variant}
          size={size}
          className={classes.button}
          onClick={onClick}
          disabled={disabled}
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
          className={classes.button}
          onClick={onClick}
          disabled={disabled}
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
