import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  avatarSize: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

function UserHeaderCard(props) {
  const {
    profilePicture = null,
    email = null,
    familyName = null,
    givenName = null,
    createdAt = null,
    avatarClass = null,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0} alignItems="center">
        <Grid item>
          <Avatar
            src={profilePicture}
            className={avatarClass ? avatarClass : classes.avatarSize}
          />
        </Grid>

        <Grid item xs>
          <Box
            display="flex"
            ml={1}
            justifyContent="space-between"
            alignContent="center"
          >
            <Box display="flex" flexDirection="column">
              <Typography component="p" variant="body1" m={0}>
                <b>
                  {givenName} {familyName}
                </b>
              </Typography>
              {createdAt && (
                <Typography variant="caption">
                  {moment(createdAt).fromNow()}
                </Typography>
              )}
            </Box>
            {_get(props, "children") && <div>{props.children}</div>}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserHeaderCard;
