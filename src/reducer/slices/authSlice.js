import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("dobby_token") ? JSON.parse(localStorage.getItem("dobby_token")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const {  setToken } = authSlice.actions;

export default authSlice.reducer;