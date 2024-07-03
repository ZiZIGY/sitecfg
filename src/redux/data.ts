import { ConfigJSON } from "./../types/config";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Object = {
  loading: true,
  items: [] as ConfigJSON,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state: Object, action: { payload: ConfigJSON }) => {
      return action.payload ? [...action.payload] : [];
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
