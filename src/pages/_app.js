import "../styles/globals.css";
import { store } from "src/redux/reducer";
import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper";
import { DefaultSeo } from "next-seo";
import SEO from "next.seo.config";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <DefaultSeo {...SEO} />
      <AppWrapper Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyApp;
