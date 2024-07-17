import { Item } from "./item";
import { PriceType } from "./config";

export type InitialDataState = {
  loading?: boolean;
  defaultTab?: number;
  item?: Item | undefined;
  config: SelectedConfig;
};

export type SelectedConfig = {
  sections?: SelectedConfigSection[];
  price: number;
  defaultPrice: number;
  prevPrice: number;
};
export type InitialAnimationState = {
  completed: number[];
};

export type SelectedConfigSection = {
  id?: number;
  name?: string;
  value?: string;
  picture?: any;
  count?: number;
  price?: {
    type?: PriceType;
    value?: string | number;
  };
};
