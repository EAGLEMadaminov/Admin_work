import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotels: [],
};
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getHotels: (state, action) => {
      state.hotels = action.payload;
    },
  },
});

export const { getHotels } = postSlice.actions;

export default postSlice.reducer;
