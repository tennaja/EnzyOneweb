import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: ``,
  password: ``,
  name: ``,
  email: ``,
  groupId: ``,
  navigationItems: [],
  userModules: [],
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword : (state,action) => {
      state.password = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setGroupId: (state, action) => {
      state.groupId = action.payload;
    },
    setNavigationItems: (state, action) => {
      state.navigationItems = action.payload;
    },
    setUserModules: (state, action) => {
      state.userModules = action.payload;
    },
    clearData: (state, action) => {
      return initialState;
    },
  },
});

export const {
  setUsername,
  setPassword,
  setName,
  setEmail,
  setGroupId,
  setNavigationItems,
  setUserModules,
  clearData,
} = userSlice.actions;

export default userSlice.reducer;
