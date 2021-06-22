import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoginModal: false,
  toastMsg: {},
  showAskModal: { flag: false, data: null },
  showDeactivateUserModal: { flag: false, data: null },
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleLoginModal(state) {
      state.showLoginModal = !state.showLoginModal;
    },
    toggleAskModal(state, action) {
      state.showAskModal = action.payload;
    },
    toggleDeactivateUserModal(state, action) {
      state.showDeactivateUserModal = action.payload;
    },
    updateToastMsg(state, action) {
      state.toastMsg = action.payload;
    },
    updateTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleLoginModal,
  updateToastMsg,
  toggleAskModal,
  updateTheme,
  toggleDeactivateUserModal,
} = uiSlice.actions;
export default uiSlice.reducer;

export const showLoginModal = (state) => state.ui.showLoginModal;
export const showAskModal = (state) => state.ui.showAskModal;
export const toastMsgState = (state) => state.ui.toastMsg;
export const getThemeState = (state) => state.ui.theme;
export const getDeactivateModal = (state) => state.ui.showDeactivateUserModal;
