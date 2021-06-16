import React, { useState, useEffect } from "react";

import { ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getUserDetails } from "src/dataService/Api";

import Header from "src/components/common/Header";
import UiComponents from "src/components/common/UiComponents";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getTheme } from "src/themes/Theme";

import _get from "lodash/get";
import constants from "src/dataService/Constants";

function AppWrapper(props) {
  const {
    Component,
    pageProps,
    theme,
    userDetails,
    updateUser = () => {},
    updateTheme = () => {},
  } = props;

  const [loader, setLoader] = useState(true);
  const [userDetailsLoaderLoader, setUserDetailsLoader] = useState(false);

  const themeObj = getTheme(theme);
  // console.log(themeObj, "theme1123", theme);
  // console.log(props, "props1213");

  const prevUserDetails = usePrevious(userDetails);
  const mounted = React.useRef();
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (_get(prevUserDetails, "userId") !== _get(userDetails, "userId")) {
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
        }, 1);
      }
    }
  });

  useEffect(() => {
    getUserData();
    // SET THEME
    let theme = localStorage.getItem("theme");
    if (theme) {
      theme = JSON.parse(theme);
      if (_get(theme, "themeData.mode") === constants.THEME.DARK) {
        updateTheme(constants.THEME.DARK);
      }
    }
  }, []);

  const getUserData = async () => {
    setLoader(true);
    let localstorageUserData = localStorage.getItem("userDetails");
    if (localstorageUserData) {
      localstorageUserData = JSON.parse(localstorageUserData);
      if (localstorageUserData.accesstoken)
        await updateUser({
          accesstoken: localstorageUserData.accesstoken,
        });
    }
    if (
      !_get(userDetails, "userId") &&
      _get(localstorageUserData, "accesstoken")
    ) {
      getUserDetails()
        .then((res) => {
          const userData = _get(res, "data");
          if (_get(res, "status") && userData) {
            updateUser({
              ...userData,
              accesstoken: localstorageUserData.accesstoken,
            });
          }
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  };

  return (
    <ThemeProvider theme={themeObj}>
      <CssBaseline />
      {!loader && (
        <>
          <Header />
          <Component {...pageProps} />
          <UiComponents />
        </>
      )}
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    userDetails: state.userDetails,
    theme: state.ui.theme,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (userDetails) => {
      dispatch({
        type: "UPDATE_USER",
        payload: userDetails,
      });
    },
    updateTheme: (mode) => {
      dispatch({
        type: "UPDATE_THEME",
        payload: mode,
      });
    },
  };
};

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
