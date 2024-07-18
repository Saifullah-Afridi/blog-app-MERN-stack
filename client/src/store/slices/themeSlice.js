import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "light",
  },
  reducers: {
    toggleTheme: (state, aciton) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
