import _get from "lodash/get";
export const getToken = () => {
  let userDetails = localStorage.getItem("userDetails");
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    return _get(userDetails, "accesstoken", false);
  }
  return false;
};

export const isLoggedIn = () => {
  let userDetails = localStorage.getItem("userDetails");
  userDetails = JSON.parse(userDetails);
  if (userDetails && _get(userDetails, "accesstoken")) return true;
  else return false;
};
