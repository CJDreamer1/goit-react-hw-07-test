import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchTasks, addTask, deleteTask } from "../redux/tasksOps";
import { selectTextFilter } from "../redux/filtersSlice";

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

// це логіка читання стану, вона має знаходитись тут, в слайсі, а використовуємо в компонетах селектори
// вони також називаєтья "прості селектори"
export const selectTasks = (state) => state.tasks.items;

export const selectLoading = (state) => state.tasks.loading;

export const selectError = (state) => state.tasks.error;
// ===================================================================================================
// є ще складні селектори. Вони Виглядають так:

// export const selectSum = (state) => {
//   const a = state.tasks.a;
//   const b = state.task.b;
//   return a + b;
// };
// ===================================================================================================
// ця функція нижче мемоїзує значення стану, щоб не викликати часто рендеринг компонента. Рендеритись тепер буде тільки тоді, коли зміниться
//  або selectTasks, або selectTextFilter
export const selectVisibleTasks = createSelector(
  [selectTasks, selectTextFilter],
  (tasks, textFilter) => {
    console.log(selectVisibleTasks);
    return tasks.filter((task) =>
      task.text.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);
// мемоїзація виклику лічильника. Він викличеться тільки тоді, коли зміниться масив тасків.
// Якщо селектор складний - його обов`язково мемоїзувати
export const selectTaskCount = createSelector([selectTasks], (tasks) => {
  return tasks.reduce(
    (acc, task) => {
      if (task.completed) {
        acc.completed += 1;
      } else {
        acc.active += 1;
      }
      return acc;
    },

    {
      active: 0,
      completed: 0,
    }
  );
});
// ====================================================================================

// export const selectTaskCount = (state) => {
//   const tasks = selectTasks(state);
//   return tasks.reduce(
//     (acc, task) => {
//       if (task.completed) {
//         acc.completed += 1;
//       } else {
//         acc.active += 1;
//       }
//       return acc;
//     },

//     {
//       active: 0,
//       completed: 0,
//     }
//   );
// };

// =====================================================================================================
// export const selectVisibleTascs = (state) => {
//   const tasks = selectTasks(state);
//   const textFilter = selectTextFilter(state);

//   return tasks.filter((task) =>
//     task.text.toLowerCase().includes(textFilter.loLowerCase())
//   );
// };

export default slice.reducer;
