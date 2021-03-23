import "../styles/globals.css";
import { store } from "redux/reducer";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { green, grey } from "@material-ui/core/colors";
import AppWrapper from "./AppWrapper";

import Header from "components/common/Header";
import UiComponents from "components/common/UiComponents";

const darkMode = createMuiTheme({
  palette: {
    secondary: {
      main: grey[800],
    },
    primary: {
      main: grey[800],
    },
    background: {
      paper: grey[800],
      dark: grey[900],
    },
  },
});

const redMode = createMuiTheme({
  palette: {
    // secondary: {
    //   main: grey[800],
    // },
    primary: {
      main: "#8a0303",
    },
    // background: {
    //   paper: grey[800],
    //   dark: grey[900],
    // },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <ThemeProvider theme={redMode}>
        <Header />
        <Component {...pageProps} />
        <UiComponents />
      </ThemeProvider> */}
      <AppWrapper Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyApp;
// export default connect(mapStateToProps)(MyApp);
