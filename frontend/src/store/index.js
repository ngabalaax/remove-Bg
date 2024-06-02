import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './apiSlices/apiSlice';
// import authReducer from './apiSlices/authSlice'; // Ensure the correct path
import { authSlice } from './apiSlices/authSlice';

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(apiSlice.middleware)
  .concat(authSlice.middleware),
});

setupListeners(store.dispatch);
