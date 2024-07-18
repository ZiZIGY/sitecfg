import { ItemType, PriceType, Section } from "../types/config";
import { createBaseConfig, getSection } from "../lib";

import { InitialDataState } from "../types/store";
import { Item } from "../types/item";
import { config } from "process";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

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
    change: (state: InitialDataState, action) => {
      const section = getSection(state, action);
      if (section) {
        if (action.payload.component.type === "list") {
          section.picture = action.payload.property.picture;
        }
        section.value = action.payload.property.name;
        section.price = action.payload.property.price;
      }
    },
    reset: (state: InitialDataState, action: { payload: Section }) => {
      console.log("action: ", action);

      action.payload.items.forEach((item) => {
        if (item.type === ItemType.Select) {
          const name = item.properties.name;
          const defaultSection = state.defaultConfig?.sections?.find(
            (section) => section.name === name
          );

          if (defaultSection) {
            const configIndex = state.config.sections?.findIndex(
              (section) => section.name === name
            );
            if (
              configIndex !== -1 &&
              configIndex !== undefined &&
              state.config.sections
            ) {
              state.config.sections[configIndex] = defaultSection;
            }
          }
        }
        if (item.type === ItemType.List) {
          item.properties.values?.forEach((property) => {
            const name = property.type ? property.type : action.payload.name;

            const defaultSection = state.defaultConfig?.sections?.find(
              (section) => section.name === name
            );

            if (defaultSection) {
              const configIndex = state.config.sections?.findIndex(
                (section) => section.name === name
              );
              if (
                configIndex !== -1 &&
                configIndex !== undefined &&
                state.config.sections
              ) {
                state.config.sections[configIndex] = defaultSection;
              }
            }
          });
        }
      });
    },
    increase: (state: InitialDataState, action) => {
      const section = getSection(state, action);
      if (section) {
        section.count = section.count ? section.count + 1 : 1;
        if (action.payload.component.type === "list") {
          section.picture = action.payload.property.picture;
        }
        section.value = action.payload.property.name;
        section.price = action.payload.property.price;
      }
    },
    decrease: (state: InitialDataState, action) => {
      const section = getSection(state, action);
      if (section) {
        section.count = section.count ? section.count - 1 : 0;
        if (action.payload.component.type === "list") {
          section.picture = action.payload.property.picture;
        }
        section.value = section.count ? action.payload.property.name : "";
        section.price = section.count ? action.payload.property.price : "";
      }
    },
    recalculate: (state: InitialDataState) => {
      const oldPrice = state.config.price;
      let newPrice = state.config.defaultPrice;

      state.config.sections?.forEach((section) => {
        if (section.price?.type === PriceType.Plus) {
          if (section.count) {
            newPrice += Number(section.price.value) * Number(section.count);
          } else newPrice += Number(section.price?.value);
        }
        if (section.price?.type === PriceType.Percent) {
          if (section.count) {
            newPrice +=
              state.config.defaultPrice *
              (Number(section.price.value) / 100) *
              Number(section.count);
          } else
            newPrice +=
              state.config.defaultPrice * (Number(section.price?.value) / 100);
        }
      });

      state.config.price = newPrice;
      state.config.prevPrice = oldPrice;
    },
  },
});

export const {
  setItem,
  setDefaultTab,
  change,
  reset,
  increase,
  decrease,
  recalculate,
} = dataSlice.actions;

export default dataSlice.reducer;
