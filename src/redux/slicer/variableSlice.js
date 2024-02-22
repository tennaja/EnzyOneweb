import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  solarHour_cost: 0,
  solarService_cost: 0,
  service_cost: 0,
  ft_cost: 0,
  peakDemand_cost: 0,
  onPeak_cost: 0,
  offPeak_cost: 0,
};

const variableSlice = createSlice({
  name: "variableData",
  initialState,
  reducers: {
    setSolarHourCost: (state, action) => {
      state.solarHour_cost = action.payload;
    },
    setSolarServiceCost: (state, action) => {
      state.solarService_cost = action.payload;
    },
    setServiceCost: (state, action) => {
      state.service_cost = action.payload;
    },
    setFTCost: (state, action) => {
      state.ft_cost = action.payload;
    },
    setPeakDemandCost: (state, action) => {
      state.peakDemand_cost = action.payload;
    },
    setOnPeakCost: (state, action) => {
      state.onPeak_cost = action.payload;
    },
    setOffPeakCost: (state, action) => {
      state.offPeak_cost = action.payload;
    },
    clearData: (state, action) => {
      return initialState;
    },
  },
});

export const {
  setSolarHourCost,
  setSolarServiceCost,
  setServiceCost,
  setFTCost,
  setPeakDemandCost,
  setOnPeakCost,
  setOffPeakCost,
  clearData,
} = variableSlice.actions;

export default variableSlice.reducer;
