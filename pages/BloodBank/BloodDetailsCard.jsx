import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { loadCSS } from "fg-loadcss";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import moment from "moment";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  raiseRequestBtn: {
    borderRadius: "50px",
  },
  closeBtn: {
    padding: theme.spacing(1),
  },
  p1: {
    padding: theme.spacing(1),
  },
  pl1: {
    paddingLeft: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mx_md: {
    width: "568px",
    maxWidth: "100%",
  },
  pt2: {
    paddingTop: theme.spacing(2),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
  extendedIcon: {
    marginLeft: theme.spacing(1),
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
            <Typography variant="caption">Blood Required:</Typography>
            <Box
              component="p"
              m={0}
              variant="body1"
              fontWeight="fontWeightBold"
            >
              {bloodType}
            </Box>
          </Grid>
        )}
        {contactName && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography variant="caption">Contact Name:</Typography>
            <Box
              component="p"
              m={0}
              variant="body1"
              fontWeight="fontWeightBold"
            >
              {contactName}
            </Box>
          </Grid>
        )}
        {contactNumber && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography variant="caption">Contact Number:</Typography>
            <Box
              component="p"
              m={0}
              variant="body1"
              fontWeight="fontWeightBold"
            >
              {contactNumber}
            </Box>
          </Grid>
        )}
        {state && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography variant="caption">State:</Typography>
            <Box
              component="p"
              m={0}
              variant="body1"
              fontWeight="fontWeightBold"
            >
              {state}
            </Box>
          </Grid>
        )}
        {district && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography variant="caption">District:</Typography>
            <Box
              component="p"
              m={0}
              variant="body1"
              fontWeight="fontWeightBold"
            >
              {district}
            </Box>
          </Grid>
        )}
        {taluk && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography variant="caption">Taluk:</Typography>
            <Box
              component="p"
              m={0}
              variant="body1"
              fontWeight="fontWeightBold"
            >
              {taluk}
            </Box>
          </Grid>
        )}
        {description && (
          <Grid item sm={12} md={4} className={classes.pt1}>
            <Typography variant="caption">Description:</Typography>
            <Box
              component="p"
              m={0}
              variant="body1"
              fontWeight="fontWeightBold"
            >
              {description}
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default BloodDetailsCard;
