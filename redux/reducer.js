import { createStore, combineReducers } from "redux";

const userDetails = (userDetails = null, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      userDetails = action.payload;
      break;
    default:
      return userDetails;
  }
  return userDetails;
};

const questionList = (questionList = {}, action) => {
  switch (action.type) {
    case "ADD_Q":
      questionList = action.payload;
      break;
    default:
      return questionList;
  }
  return questionList;
};

const bRequestList = (bRequestList = {}, action) => {
  switch (action.type) {
    case "ADD_B":
      bRequestList = action.payload;
      break;
    default:
      return bRequestList;
  }
  return bRequestList;
};

const ui = (ui = {}, action) => {
  switch (action.type) {
    case "UPDATE_TOAST":
      ui = { ...ui, toast: action.payload };
      break;
    case "SHOW_LOGIN_MODAL":
      ui = { ...ui, loginModal: action.payload };
      break;
    case "SHOW_Q_MODAL":
      ui = { ...ui, postQuestionModal: action.payload };
      break;
    case "SHOW_B_MODAL":
      ui = { ...ui, postBloodModal: action.payload };
      break;
    case "UPDATE_THEME":
      ui = { ...ui, theme: action.payload };
      break;
    default:
      return ui;
  }
  return ui;
};

export const store = createStore(
  combineReducers({
    userDetails,
    ui,
    questionList,
    bRequestList,
  })
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
