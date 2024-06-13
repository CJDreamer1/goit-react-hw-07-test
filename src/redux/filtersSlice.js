import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    text: "",
  },
  reducers: {
    changeTextFilter(state, action) {
      state.text = action.payload;
    },
  },
});

// це селектор, бестпрактіс називати його як selectМісце яке треба вказати в стані
export const selectTextFilter = (state) => state.filters.text;

export const { changeTextFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
