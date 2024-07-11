import Item from "./Item";
import { Section } from "../../../types/config";

export const Items = ({ section }: { section: Section }) => {
  return (
    <div key={section?.id}>
      {section?.items?.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
