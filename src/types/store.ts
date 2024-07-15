import { Item } from "./item";

export type InitialDataState = {
  loading?: boolean;
  defaultTab?: number;
  item?: Item | undefined;
};

export type InitialAnimationState = {
  completed: number[];
};
