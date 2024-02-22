import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    toggleDarkMode: (state, action) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = appConfigSlice.actions;

export default appConfigSlice.reducer;
