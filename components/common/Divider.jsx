import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  divider: (props) => ({
    backgroundColor:
      props.color === "primary" ? theme.palette.primary.main : "#fff",
    marginTop: theme.spacing(props.mt ? props.mt : 0),
    marginBottom: theme.spacing(props.mb ? props.mb : 0),
  }),
}));

function Divider(props) {
  const classes = useStyles(props);

  const {} = props;
  const styles = {
    height: 2,
  };
  return <div className={classes.divider} style={styles} />;
}

export default Divider;
