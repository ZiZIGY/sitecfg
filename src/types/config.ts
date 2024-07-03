export type ConfigJSON = Array<Section>;

export interface Value {
  id: number;
  name: string;
  price?: Price;
  picture?: string;
  value?: string;
}

export interface Price {
  value: number;
  type: PriceType;
}

export enum PriceType {
  Empty = "+",
  Free = "free",
  Type = "%",
}

export enum ItemType {
  Input = "input",
  List = "list",
  Select = "select",
}

export interface SectionItem {
  id: number;
  type: ItemType;
  properties: SectionItemProperties;
}

export interface SectionItemProperties {
  name?: string;
  values?: Value[];
  defaultValue: number | string;
  type?: string;
  min?: number;
  max?: number;
}

export interface Section {
  id: number;
  name: string;
  sections: any[];
  items: SectionItem[];
}
