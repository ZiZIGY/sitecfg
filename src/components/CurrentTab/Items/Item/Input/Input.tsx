import Field from "../../../../UI/Field";
import { SectionItem } from "../../../../../types/config";

export const Input = ({ item }: { item: SectionItem }) => {
  return (
    <div className="flex gap-[10px] items-center mb-[10px]">
      <label className="w-[100px]">{item.properties.name}</label>
      <Field {...item.properties} />
    </div>
  );
};
