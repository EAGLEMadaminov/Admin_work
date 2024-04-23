import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isForgotPassword: false,
    isShowNextRegister: false,
  },
  reducers: {
    changePassword: (state, action) => {
      state.isForgotPassword = action.payload;
    },
    constinueBtn: (state, action) => {
      state.isShowNextRegister = action.payload;
    },
  },
});

export const { changePassword, constinueBtn } = authSlice.actions;
export default authSlice.reducer;
