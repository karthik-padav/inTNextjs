import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divider: (props) => ({
    backgroundColor: theme.palette.common.color4,
    marginTop: theme.spacing(props.mt ? props.mt : 0),
    marginBottom: theme.spacing(props.mb ? props.mb : 0),
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.common.color4,
    borderBottomStyle: "solid",
  }),
}));

function Divider(props) {
  const classes = useStyles(props);

  return <div className={classes.divider} />;
}

export default Divider;
