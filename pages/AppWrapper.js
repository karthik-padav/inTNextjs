// import "../styles/globals.css";
import { store } from "redux/reducer";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { green, grey } from "@material-ui/core/colors";
import { theme2, theme1 } from "Themes/Theme";

import Header from "components/common/Header";
import UiComponents from "components/common/UiComponents";

console.log(theme2, "theme123");
function AppWrapper(props) {
  const { Component, pageProps } = props;
  console.log(theme2, "theme1123");
  console.log(props, "props1213");
  return (
    <ThemeProvider theme={theme1}>
      <Header />
      <Component {...pageProps} />
      <UiComponents />
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};
export default connect(mapStateToProps)(AppWrapper);
