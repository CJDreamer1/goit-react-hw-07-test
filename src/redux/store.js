import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasksSlice";
import authReducer from "../redux/auth/slice";
// import filtersReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});
