import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Check if a token exists in localStorage
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // trying to manually save/clear token in redux store for immediate access
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state, action) {
      state.token = null;
      localStorage.removeItem("token");
    },

    // login
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // register
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // logout
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  setToken,
  clearToken,
} = authSlice.actions;
export default authSlice.reducer;
