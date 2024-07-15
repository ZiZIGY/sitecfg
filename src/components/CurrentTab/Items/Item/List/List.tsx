import ListProperty from "./ListProperty";
import { SectionItem } from "../../../../../types/config";
import { motion } from "framer-motion";

export const List = ({ item }: { item: SectionItem }) => {
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
          property={property}
          index={index}
          parentId={item.id}
          key={property.id}
        />
      ))}
    </motion.ul>
  );
};
