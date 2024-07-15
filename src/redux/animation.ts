import { InitialAnimationState } from "../types/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialAnimationState = {
  completed: [],
};

export const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setCompletedAnimation: (
      state: InitialAnimationState,
      action: { payload: number }
    ) => {
      state.completed.push(action.payload);
      state.completed = [...new Set(state.completed)];
    },
  },
});

export const { setCompletedAnimation } = animationSlice.actions;

export default animationSlice.reducer;
