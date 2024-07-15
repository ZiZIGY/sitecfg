import { AnimatePresence, motion } from "framer-motion";

import styles from "./Header.module.scss";
import { useAppSelector } from "../../hooks/useAppSelector";

export const Header = () => {
  const { loading, item, defaultTab } = useAppSelector((state) => state.data);

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.header}
      >
        <motion.h2
          className={styles["header__title"]}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{ duration: 0.5 }}
        >
          Выбрать размеры и цвет
        </motion.h2>
        {loading ? (
          <div className="h-[14px] animate-pulse bg-gray-500 rounded-md w-1/2"></div>
        ) : (
          <motion.div
            className={styles["header__subtitle"]}
            initial={{
              width: 0,
              display: "inline-block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textWrap: "nowrap",
            }}
            animate={{
              width: "min-content",
              transition: {
                duration: 0.5,
              },
            }}
          >
            {item?.NAME}
          </motion.div>
        )}
      </motion.header>
    </AnimatePresence>
  );
};
