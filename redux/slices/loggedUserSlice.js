import { createSlice } from "@reduxjs/toolkit";

export const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: { data: null },
  reducers: {
    loggedUserReducer(state, action) {
      state.data = action.payload;
    },
  },
});

export const { loggedUserReducer, removeLoggedUser } = loggedUserSlice.actions;

export const getLoggedUser = (state) => state.loggedUser.data;

export default loggedUserSlice.reducer;
