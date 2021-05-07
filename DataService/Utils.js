import _get from "lodash/get";
import { store } from "redux/reducer";

export const getToken = () => {
  let userDetails = localStorage.getItem("userDetails");
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    return _get(userDetails, "accesstoken", false);
  }
  return false;
};

export const isLoggedIn = () => {
  const state = store.getState();
  const userDetails = _get(state, "userDetails");
  // let userDetails = localStorage.getItem("userDetails");
  // userDetails = JSON.parse(userDetails);
  if (userDetails) return true;
  else return false;
};
