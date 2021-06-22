import { createSlice } from "@reduxjs/toolkit";

export const askListSlice = createSlice({
  name: "askList",
  initialState: { data: [] },
  reducers: {
    updateAskList(state, action) {
      state.data = [...action.payload, ...state.data];
    },
    createNewAskList(state, action) {
      state.data = action.payload;
    },
  },
});

export const { updateAskList, createNewAskList } = askListSlice.actions;

export const getAskList = (state) => state.askList.data;

export default askListSlice.reducer;
