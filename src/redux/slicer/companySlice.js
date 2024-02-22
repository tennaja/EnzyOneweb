import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: ``,
  listCompany: [],
};

const companySlice = createSlice({
  name: "companyData",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setListCompany: (state, action) => {
      state.listCompany = action.payload;
    },
  },
});

export const { setCompany, setListCompany } = companySlice.actions;

export default companySlice.reducer;
