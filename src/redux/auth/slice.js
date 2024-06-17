import { createSlice } from "@reduxjs/toolkit";
import { register, logIn } from "../auth/operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isLoading: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.panding, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        // state.isLoading = false;
        state.isLoggedIn = true;
      }),
});

export default authSlice.reducer;
