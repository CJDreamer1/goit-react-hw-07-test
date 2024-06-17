import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://62584f320c918296a49543e7.mockapi.io";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    try {
      // fulfilled payload буде response.data тобто відпорвідь з сервера
      const response = await axios.get("/tasks");
      return response.data;
    } catch (error) {
      // rejected payload і значенням payload буде те що в дужках rejectWithValue(error.message)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  // newTask - сюди приходить об`єкт із TaskForm value із handleSubmit
  // його ми і відправляємо ан сервекр щоб створити там таск
  async (newTask, thunkAPI) => {
    try {
      const response = await axios.post("/tasks", newTask);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
