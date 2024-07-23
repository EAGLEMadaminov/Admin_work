import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isForgotPassword: false,
    isShowNextRegister: false,
    showPhoneVerify: false,
    verifyPhoneNumber: '',
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
    getPhoneNumber: (state, action) => {
      state.verifyPhoneNumber = action.payload;
    },
  },
});

export const {
  changePassword,
  constinueBtn,
  setShowPhoneVerify,
  getPhoneNumber,
} = authSlice.actions;
export default authSlice.reducer;
