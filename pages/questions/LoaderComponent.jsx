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
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function LoaderComponent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item>
            <Skeleton variant="circle" animation="wave">
              <Avatar className={classes.large} />
            </Skeleton>
          </Grid>
          <Grid item xs>
            <Box ml={1}>
              <Skeleton width="30%" animation="wave" />
              <Skeleton width="20%" animation="wave" />
            </Box>
          </Grid>
        </Grid>

        <Box my={1}>
          <Skeleton width="100%" animation="wave" />
          <Skeleton width="80%" animation="wave" />
        </Box>

        <Box my={1}>
          <Grid container>
            {[1, 2, 3].map((item, index) => (
              <Grid md={4} xs={12} key={index}>
                <Box px={0.3}>
                  <Skeleton
                    variant="rect"
                    width="100%"
                    height={118}
                    animation="wave"
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </div>
  );
}

export default LoaderComponent;
