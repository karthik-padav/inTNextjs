import React, { useState, useEffect } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { getUserDetails } from "dataService/Api";

import Header from "components/common/Header";
import UiComponents from "components/common/UiComponents";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getTheme } from "themes/Theme";

import _get from "lodash/get";
import constants from "dataService/Constants";
import Menu from "components/common/Menu";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedUser, loggedUserReducer } from "redux/slices/loggedUserSlice";
import {
  getThemeState,
  updateToastMsg,
  updateTheme,
} from "redux/slices/uiSlice";

function AppWrapper(props) {
  const { Component, pageProps } = props;

  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  const [loader, setLoader] = useState(true);
  const themeObj = getTheme(theme);
  const loggedUser = useSelector(getLoggedUser);
  const prevLoggedUser = usePrevious(loggedUser);
  const mounted = React.useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (_get(prevLoggedUser, "_id") !== _get(loggedUser, "_id")) {
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
        }, 1);
      }
    }
  });

  const getUserData = async () => {
    setLoader(true);
    let accesstoken = localStorage.getItem("inTulunadu_accesstoken");
    if (accesstoken) {
      accesstoken = JSON.parse(accesstoken);
      const { data, error } = await getUserDetails();
      if (error) {
        dispatch(
          updateToastMsg({ msg: "Something went wrong.", type: "error" })
        );
        setLoader(false);
        return;
      }
      if (data?.status) {
        const loggedUser = _get(data, "data");
        dispatch(loggedUserReducer(loggedUser));
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    getUserData();
    let theme = localStorage.getItem("theme");
    if (theme) {
      theme = JSON.parse(theme);
      if (_get(theme, "themeData.mode") === constants.THEME.DARK) {
        dispatch(updateTheme(constants.THEME.DARK));
      }
    }
  }, []);

  console.log(loader, "loader123");
  return (
    <ThemeProvider theme={themeObj}>
      <CssBaseline />
      {!loader && (
        <>
          <Header />
          <Grid container spacing={0}>
            <Grid item sm={12} md={3}>
              <div className="stickyWrapper">
                <Box p={0.5}>
                  <Menu />
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box p={0.5}>
                <Component {...pageProps} />
              </Box>
            </Grid>
          </Grid>
          <UiComponents />
        </>
      )}
    </ThemeProvider>
  );
}

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default AppWrapper;
