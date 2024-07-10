import Row from "../Row";
import { motion } from "framer-motion";
import { setDefaultTab } from "../../redux/data";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

export const Tabs = () => {
  const { item, defaultTab } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  return (
    <Row className="flex gap-[60px]">
      {item?.CONFIG.map((tab, tabIndex) =>
        defaultTab === tabIndex ? (
          <button key={tab.id} className="flex gap-[6px] font-bold">
            <div className="bg-[#FFA12E] rounded-lg text-white size-[26px] flex items-center justify-center text-base">
              {tabIndex + 1}
            </div>
            <p className="relative">
              <span>{tab.name}</span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="absolute h-[1px] bg-black bottom-0 right-0 left-0 m-auto"
              />
            </p>
          </button>
        ) : (
          <button
            key={tab.id}
            className="flex gap-[6px]"
            onClick={() => dispatch(setDefaultTab(tabIndex))}
          >
            <div className="bg-[#F7BC58] rounded-lg text-white size-[26px] flex items-center justify-center text-base">
              {tabIndex + 1}
            </div>
            <span>{tab.name}</span>
          </button>
        )
      )}
    </Row>
  );
};
