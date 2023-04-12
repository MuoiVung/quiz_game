import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";

type NumberStateType = {
  number: number;
};

const initialState: NumberStateType = {
  number: 0,
};

const numberSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateNumber: (state) => {
      state.number = state.number + 1;
    },
  },
});

export const { updateNumber } = numberSlice.actions;

export default numberSlice.reducer;

export const selectNumber = (state: RootState) => state.number;
