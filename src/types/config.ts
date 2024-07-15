export type ConfigJSON = Section[];

export interface Property {
  id: number;
  name: string;
  price?: Price;
  picture?: string;
  value?: string | number;
}

export interface Price {
  value: number;
  type: PriceType;
}

export enum PriceType {
  Plus = "+",
  Free = "free",
  Percent = "%",
}

export enum InputTypes {
  Text = "text",
  Number = "number",
  Any = "any",
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
  type?: InputTypes;
  min?: number | 0;
  max?: number | 0;
}

export interface Section {
  id: number;
  name: string;
  sections: Section[];
  items: SectionItem[];
}
