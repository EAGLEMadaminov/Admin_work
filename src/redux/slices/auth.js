import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isForgotPassword: false,
    isShowNextRegister: false,
    showPhoneVerify: false,
  },
  reducers: {
    changePassword: (state, action) => {
      state.isForgotPassword = action.payload;
    },
    constinueBtn: (state, action) => {
      state.isShowNextRegister = action.payload;
    },
    setShowPhoneVerify: (state, action) => {
      state.showPhoneVerify = action.payload;
    },
  },
});

export const { changePassword, constinueBtn, setShowPhoneVerify } =
  authSlice.actions;
export default authSlice.reducer;
