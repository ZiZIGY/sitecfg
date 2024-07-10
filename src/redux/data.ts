import { InitialDataState } from "../types/store";
import { Item } from "../types/item";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialDataState = {
  loading: true,
  defaultTab: 0,
  item: undefined,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setItem: (state: InitialDataState, action: { payload: Item }) => {
      state.loading = false;
      state.item = action.payload;
    },
    setDefaultTab: (state: InitialDataState, action: { payload: number }) => {
      state.defaultTab = action.payload;
    },
  },
});

export const { setItem, setDefaultTab } = dataSlice.actions;

export default dataSlice.reducer;
