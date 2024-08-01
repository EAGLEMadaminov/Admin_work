import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import headerReducer from './slices/header';
import postReducer from './slices/post';

const store = configureStore({
  reducer: {
    auth: authReducer,
    header: headerReducer,
    post: postReducer,
  },
});

export default store;
