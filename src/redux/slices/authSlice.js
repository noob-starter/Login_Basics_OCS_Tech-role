// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    isNewUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.isNewUser = action.payload.isNewUser;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isNewUser = null;
    },
  },
});

const persistConfig = {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const { login, logout } = authSlice.actions;
export default persistedReducer;
