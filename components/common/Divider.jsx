import { makeStyles } from "@material-ui/core/styles";
import { grey, red, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  divider: (props) => ({
    backgroundColor: grey[200],
    marginTop: theme.spacing(props.mt ? props.mt : 0),
    marginBottom: theme.spacing(props.mb ? props.mb : 0),
    borderBottomWidth: 1,
    borderBottomColor: grey[200],
    borderBottomStyle: "solid",
  }),
}));

function Divider(props) {
  const classes = useStyles(props);

  return <div className={classes.divider} />;
}

export default Divider;
