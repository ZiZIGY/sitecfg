import { InitialDataState } from "../types/store";
import { Item } from "../types/item";
import { PriceType } from "../types/config";
import { createBaseConfig } from "../lib";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialDataState = {
  loading: true,
  defaultTab: 0,
  item: undefined,
  config: {
    sections: [],
    prevPrice: 0,
    price: 0,
    defaultPrice: 0,
  },
  defaultConfig: undefined,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setItem: (state: InitialDataState, action: { payload: Item }) => {
      state.loading = false;
      state.item = action.payload;
      state.config = {
        sections: [],
        price: Number(action.payload.PRICE),
        defaultPrice: Number(action.payload.PRICE),
        prevPrice: Number(action.payload.PRICE),
      };
      state.defaultConfig = state.config;
      state.config.sections = createBaseConfig(state.item.CONFIG);
    },
    setDefaultTab: (state: InitialDataState, action: { payload: number }) => {
      state.defaultTab = action.payload;
    },
    changeList: (state: InitialDataState, action) => {
      console.log("action: ", action);
      let currentSectionName: string;
      if (action.payload.component.type === "list") {
        currentSectionName = action.payload.property.type
          ? action.payload.property.type
          : action.payload.section.name;
      } else {
        currentSectionName = action.payload.component.properties.name;
      }

      const currentSectionIndex = state.config?.sections?.findIndex(
        (section) => section.name === currentSectionName
      );
      const section = state.config?.sections?.[currentSectionIndex as number];

      if (section) {
        if (action.payload.component.type === "list") {
          section.picture = action.payload.property.picture;
        }
        section.value = action.payload.property.name;
        section.price = action.payload.property.price;
      }

      let newPrice = state.config.defaultPrice ? state.config.defaultPrice : 0;
      state.config?.sections?.forEach((section) => {
        if (section.price?.type === PriceType.Plus) {
          newPrice += Number(section.price?.value);
        }
        if (section.price?.type === PriceType.Percent) {
          if (state.config.defaultPrice) {
            newPrice +=
              state.config.defaultPrice * (Number(section.price?.value) / 100);
          }
        }
      });

      if (state.config) {
        state.config.prevPrice = state.config.price;
        state.config.price = newPrice;
      }
    },
    reset: (state: InitialDataState, action: { payload: string }) => {},
  },
});

export const { setItem, setDefaultTab, changeList } = dataSlice.actions;

export default dataSlice.reducer;
