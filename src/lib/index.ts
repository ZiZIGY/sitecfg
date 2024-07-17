import { ConfigJSON, ItemType, PriceType, Section } from "../types/config";

import { SelectedConfigSection } from "../types/store";

export const formDataToJson = (formData: FormData) => {
  const json: any = {};

  for (const [key, value] of formData) json[key] = value;

  return JSON.stringify(json);
};

export const objectToJson = (obj: Object) => {
  return JSON.stringify(obj);
};

export const deviceIsMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const createBaseConfig = (state: ConfigJSON) => {
  const data: SelectedConfigSection[] = [];
  const recursive = (array: Section[]) => {
    for (const section of array) {
      if (section.sections.length) {
        recursive(section.sections);
      }
      if (section.items.length) {
        for (const item of section.items) {
          if (item.type === ItemType.Select) {
            data.push({
              id: item.id,
              name: item.properties.name,
              value: item.properties.defaultValue,
              price: {
                type: PriceType.Free,
                value: 0,
              },
            });
          }
          if (item.type === ItemType.List) {
            const valueIndex = item.properties.values?.findIndex(
              (v) => v.id === item.properties.defaultValue
            );

            const val = item.properties.values?.[valueIndex as number];
            if (item.properties.values?.every((el) => el.type)) {
              const first = item.properties.values[0];

              if (!data.some((section) => section.name === first.type)) {
                data.push({
                  id: section.id,
                  name: first.type,
                  value: val?.name,
                  picture: val?.picture,
                  price: {
                    type: val?.price?.type ? val?.price?.type : PriceType.Free,
                    value: val?.price?.value ? val?.price?.value : 0,
                  },
                });
              }
            } else {
              data.push({
                id: item.id,
                name: section.name,
                value: val?.name,
                picture: val?.picture,
                price: {
                  type: val?.price?.type ? val?.price?.type : PriceType.Free,
                  value: val?.price?.value ? val?.price?.value : 0,
                },
              });
            }
          }
          if (item.type === ItemType.Input) {
          }
        }
      }
    }
  };
  recursive(state);
  return data;
};
