import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, addTask, deleteTask } from "../redux/tasksOps";

const slice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  // штука нижче обробляє результат taskOps (нашої апішки)
  extraReducers: (builder) => {
    builder
      // обробляємо fetchTasks ==================================================================
      .addCase(fetchTasks.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // обробляємо addTask ======================================================================
      .addCase(addTask.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        // тут ми додаємо до масиву об`єкт, тому .push (це не є мутацією адже ми працюємо із копією)
        // також тут працює і .slice
        state.items.push(action.payload);
        state.loading.false;
      })
      .addCase(addTask.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // тут обробляємо deleteTask =================================================================
      .addCase(deleteTask.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default slice.reducer;
