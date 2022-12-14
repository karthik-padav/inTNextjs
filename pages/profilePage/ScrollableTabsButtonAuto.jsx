import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect, useSelector } from "react-redux";
import _get from "lodash/get";
import { grey, red, blue } from "@material-ui/core/colors";
import colors from "themes/ThemeColors";
import QuestionsWrapper from "components/questions/QuestionsWrapper";
import BloodWrapper from "pages/bloodbank/BloodWrapper";
import OnlineShopWrapper from "components/onlineShop/OnlineShopWrapper";
import permission from "dataService/Permission";
import { getLoggedUser } from "redux/slices/loggedUserSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box mt={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  tabWrapper: {
    backgroundColor: theme.palette.common.tabs.bgColor,
    color: theme.palette.common.tabs.bgColor.color,
    borderRadius: 4,
  },
  activeTab: {
    borderRadius: 4,
  },
  inActiveTab: {
    borderRadius: 4,
  },
}));

function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUser);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.tabWrapper}>
        {console.log(value, "value123")}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          // textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {permission?.ASK?.show && (
            <Tab
              className={value === 0 ? classes.activeTab : classes.inActiveTab}
              label="My Post"
              {...a11yProps(0)}
            />
          )}
          {permission?.BLOODBANK?.show && (
            <Tab
              className={value === 1 ? classes.activeTab : classes.inActiveTab}
              label="Blood Bank"
              {...a11yProps(1)}
            />
          )}
          {permission?.ONLINE_SHOP?.show && (
            <Tab
              className={value === 2 ? classes.activeTab : classes.inActiveTab}
              label="My Shop"
              {...a11yProps(2)}
            />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <QuestionsWrapper
          postedBy={_get(loggedUser, "_id")}
          showAddPost={false}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BloodWrapper postedBy={_get(loggedUser, "_id")} showAddPost={false} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OnlineShopWrapper
          postedBy={_get(loggedUser, "_id")}
          showAddPost={false}
        />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </div>
  );
}

export default ScrollableTabsButtonAuto;
