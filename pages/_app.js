import "../styles/globals.css";
import store from "redux/store";
import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper";
import { DefaultSeo } from "next-seo";
import SEO from "next.seo.config";
import Menu from "components/common/Menu";
import Header from "components/common/Header";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <DefaultSeo {...SEO} />
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
      {/* <AppWrapper Component={Component} pageProps={pageProps} /> */}
    </Provider>
  );
}

export default MyApp;
