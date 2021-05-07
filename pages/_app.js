import "../styles/globals.css";
import { store } from "redux/reducer";
import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppWrapper Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

export default MyApp;
