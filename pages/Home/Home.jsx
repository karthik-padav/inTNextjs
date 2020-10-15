import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TabsComponent from "./TabsComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  p1: {
    padding: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={3} className={classes.p1}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6} className={classes.p1}>
          <Paper className={classes.paper}>
            <TabsComponent />
          </Paper>
        </Grid>
        <Grid item xs={3} className={classes.p1}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
