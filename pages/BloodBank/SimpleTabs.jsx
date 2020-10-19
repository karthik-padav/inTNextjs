import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function SimpleTabs(props) {
  const {
    LoadMoreBloodReceiver,
    receiverList = [],
    scrollLoader,
    LoadMoreBloodDonor,
    donorList = [],
  } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs"
          centered
          variant="fullWidth"
        >
          <Tab label="receiver" {...a11yProps(0)} />
          <Tab label="donor" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {receiverList.map((item, index) => {
          return (
            <Paper key={index} className={classes.paper}>
              <Typography align="left" variant="body1">
                title: {item.title}
              </Typography>
              <Typography align="left" variant="body1">
                post_date: {item.post_date}
              </Typography>
              <Typography align="left" variant="body1">
                post_author name: {item.post_author.name}
              </Typography>
              <Typography align="left" variant="body1">
                post_author email: {item.post_author.email}
              </Typography>
              <Typography align="left" variant="body1">
                content: {item.content}
              </Typography>
              <Typography align="left" variant="body1">
                Comments: {item.comment_count}
              </Typography>
              <Typography align="left" variant="body1">
                likes: {item.likes.length}
              </Typography>
            </Paper>
          );
        })}
        <button onClick={LoadMoreBloodReceiver}>
          {scrollLoader ? "loading more..." : "Load More"}
        </button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {donorList.map((item, index) => {
          return (
            <Paper key={index} className={classes.paper}>
              <Typography align="left" variant="body1">
                title: {item.title}
              </Typography>
              <Typography align="left" variant="body1">
                post_date: {item.post_date}
              </Typography>
              <Typography align="left" variant="body1">
                post_author name: {item.post_author.name}
              </Typography>
              <Typography align="left" variant="body1">
                post_author email: {item.post_author.email}
              </Typography>
              <Typography align="left" variant="body1">
                content: {item.content}
              </Typography>
              <Typography align="left" variant="body1">
                Comments: {item.comment_count}
              </Typography>
              <Typography align="left" variant="body1">
                likes: {item.likes.length}
              </Typography>
            </Paper>
          );
        })}
        <button onClick={LoadMoreBloodDonor}>
          {scrollLoader ? "loading more..." : "Load More"}
        </button>
      </TabPanel>
    </div>
  );
}
export default SimpleTabs;
