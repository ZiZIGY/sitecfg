import { createSlice } from "@reduxjs/toolkit";

const initialState: Object = {};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    setItem: (state: Object, action: { payload: any }) => {},
  },
});

export const { setItem } = itemSlice.actions;

export default itemSlice.reducer;
