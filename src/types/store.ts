import { Item } from "./item";

export type InitialDataState = {
  loading?: boolean;
  defaultTab?: number | undefined;
  item?: Item | undefined;
};
