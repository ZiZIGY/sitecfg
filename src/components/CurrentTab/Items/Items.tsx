import { Section } from "../../../types/config";

export const Items = ({ section }: { section: Section }) => {
  return (
    <div key={section?.id}>
      {section?.items?.map((item) => (
        <div key={item.id}>
          {item.type} и {item.id}
        </div>
      ))}
    </div>
  );
};
