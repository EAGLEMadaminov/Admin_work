import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
const headerSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
});

export const { checkOptions } = headerSlice.actions;
export default headerSlice.reducer;
