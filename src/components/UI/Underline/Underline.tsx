import { motion } from "framer-motion";

export const Underline = ({ bottomPx }: { bottomPx?: number }) => {
  const mainClass = "absolute h-[2px] bg-black  right-0 left-0 m-auto ";
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ width: 0 }}
      className={
        bottomPx ? mainClass + `bottom-[${bottomPx}px]` : mainClass + "bottom-0"
      }
    />
  );
};
