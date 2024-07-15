import Item from "./Item";
import { Section } from "../../../types/config";

export const Items = ({ section }: { section: Section }) => {
  return section !== undefined && section.items.length ? (
    <div key={section?.id} className="h-full overflow-y-auto custom-scroll">
      {section?.items?.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  ) : (
    <></>
  );
};
