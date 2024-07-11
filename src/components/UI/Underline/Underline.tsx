import { motion } from "framer-motion";

export const Underline = () => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ width: 0 }}
      className="absolute h-[1px] bg-black bottom-0 right-0 left-0 m-auto"
    />
  );
};
