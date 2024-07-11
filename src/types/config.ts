export type ConfigJSON = Section[];

export interface Property {
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
  values?: Property[];
  defaultValue: number | string;
  type?: string;
  min?: number;
  max?: number;
}

export interface Section {
  id: number;
  name: string;
  sections: Section[];
  items: SectionItem[];
}
