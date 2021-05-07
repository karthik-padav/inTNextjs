import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import { placeCodeToTitle } from "Function/Common";
import locationList from "dataService/Json/LocationList.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  pt2: {
    paddingTop: theme.spacing(2),
  },
  wordBreak: {
    wordBreak: "break-all",
  },
}));

function BloodDetailsCard({
  bloodType = null,
  contactName = null,
  contactNumber = null,
  state = null,
  district = null,
  taluk = null,
  description = null,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center" className={classes.pt2}>
        {bloodType && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography className={classes.wordBreak} variant="caption">
              Blood Required:
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{bloodType}</b>
            </Typography>
          </Grid>
        )}
        {contactName && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography className={classes.wordBreak} variant="caption">
              Contact Name:
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{contactName}</b>
            </Typography>
          </Grid>
        )}
        {contactNumber && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography className={classes.wordBreak} variant="caption">
              Contact Number:
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{contactNumber}</b>
            </Typography>
          </Grid>
        )}
        {state && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography className={classes.wordBreak} variant="caption">
              State:
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{state}</b>
            </Typography>
          </Grid>
        )}
        {district && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography className={classes.wordBreak} variant="caption">
              District:
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{district}</b>
            </Typography>
          </Grid>
        )}
        {taluk && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography className={classes.wordBreak} variant="caption">
              Taluk:
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{taluk}</b>
            </Typography>
          </Grid>
        )}
        {description && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography className={classes.wordBreak} variant="caption">
              Description:
            </Typography>
            <Typography className={classes.wordBreak} variant="body1">
              <b>{description}</b>
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default BloodDetailsCard;
