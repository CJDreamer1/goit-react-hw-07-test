import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://goit-task-manager.herokuapp.com/";

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      // res - скорочення від response тобто відповідь з серва
      const res = await axios.post("/users/signup", newUser);
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", userInfo);
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post("users/logout");
    axios.defaults.headers.common.Authorization = "";
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
