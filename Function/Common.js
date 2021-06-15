import { store } from "redux/reducer";
import constants from "DataService/Constants";

import _get from "lodash/get";
import _split from "lodash/split";
import _includes from "lodash/includes";
import _map from "lodash/map";
import _trim from "lodash/trim";
import _isArray from "lodash/isArray";
import _find from "lodash/find";

import menuLists from "dataService/MenuLists";

export const isLoggedIn = () => {
  const state = store.getState();
  console.log({ state });
  return _get(state, "userDetails", false);
};

export const getPostTypeFromURL = (url) => {
  let urlArray = url;
  urlArray = _split(urlArray, "/");
  urlArray = _map(urlArray, _trim);
  console.log(urlArray, "componentType123");
  let postType = null;
  for (const item of urlArray) {
    switch (item) {
      case "questions":
        postType = constants.POST_TYPES.QUESTION;
        break;
      case "onlineShop":
        postType = constants.POST_TYPES.SHOP;
        break;
      case "bloodbank":
        postType = constants.POST_TYPES.BLOOD_BANK;
        break;

      default:
        break;
    }
    if (postType) break;
  }
  return postType;
};

export const getPageCode = (router) => {
  let { pathname } = router;
  let array = _split(pathname, "/");
  if (_includes(array, menuLists.QUESTIONS.code))
    return menuLists.QUESTIONS.code;

  if (_includes(array, menuLists.SETTINGS.code)) return menuLists.SETTINGS.code;

  if (_includes(array, menuLists.BLOODBANK.code))
    return menuLists.BLOODBANK.code;

  if (_includes(array, menuLists.PROFILE.code)) return menuLists.PROFILE.code;

  if (_includes(array, menuLists.ONLINE_SHOP.code))
    return menuLists.ONLINE_SHOP.code;

  return false;
};

export const codeToName = (list, code) => {
  const obj = _find(list, (item) => {
    return _get(item, "code") && item.code === code;
  });
  return _get(obj, "name", "");
};
export const nameToCode = (list, name) => {
  const obj = _find(list, (item) => {
    return _get(item, "name") && item.name === name;
  });
  return _get(obj, "code", "");
};
