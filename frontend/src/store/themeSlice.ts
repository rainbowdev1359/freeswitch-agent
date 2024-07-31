import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  theme:"light" | "dark";
};
const initialState: ThemeState = {
  theme: localStorage.getItem("get-call-theme")?localStorage.getItem("get-call-theme")=="light"?"light":"dark":"dark",
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state: ThemeState) => {
     
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("get-call-theme",state.theme)
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
