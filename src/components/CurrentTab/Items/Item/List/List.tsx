import { Section, SectionItem } from "../../../../../types/config";

import ListProperty from "./ListProperty";
import { motion } from "framer-motion";

export const List = ({
  item,
  section,
}: {
  item: SectionItem;
  section: Section;
}) => {
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.01,
      },
    },
  };

  return (
    <motion.ul
      className="flex flex-wrap gap-x-[60px] pr-[15px] gap-y-[25px] h-full"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {item.properties.values?.map((property, index) => (
        <ListProperty
          section={section}
          property={property}
          index={index}
          parent={item}
          key={property.id}
        />
      ))}
    </motion.ul>
  );
};
