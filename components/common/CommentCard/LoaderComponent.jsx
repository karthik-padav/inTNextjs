import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.common.color7,
    borderRadius: theme.spacing(2),
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function LoaderComponent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {[1, 2].map((item, index) => (
        <Box key={index} mt={1}>
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <Skeleton variant="circle" animation="wave">
                <Avatar className={classes.small} />
              </Skeleton>
            </Grid>
            <Grid item xs>
              <Box ml={1}>
                <Skeleton width="20%" animation="wave" />
                <Skeleton width="10%" animation="wave" />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={0} alignItems="center">
            <Grid item>
              <Avatar className={classes.small} style={{ opacity: 0 }} />
            </Grid>
            <Grid item xs>
              <Box ml={1} mt={1}>
                <Paper className={classes.paper}>
                  {["80%", "70%", "50%"].map((item, index) => (
                    <Skeleton key={index} width={item} animation="wave" />
                  ))}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </div>
  );
}

export default LoaderComponent;
