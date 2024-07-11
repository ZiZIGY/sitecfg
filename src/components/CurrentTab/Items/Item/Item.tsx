import { ItemType, Property, SectionItem } from "../../../../types/config";

export const Item = ({ item }: { item: SectionItem }) => {
  return (
    <div>
      {item.type === ItemType.List && (
        <div className="text-[#2A2A2A]">
          {item.properties.values?.map((prop: Property) => (
            <div>{prop.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};
