import Row from "../../Row";
import Underline from "../../UI/Underline";
import { setDefaultTab } from "../../../redux/data";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

export const HeaderTabs = () => {
  const { item, defaultTab, loading } = useAppSelector((state) => state.data);
  const dispatch = useAppDispatch();
  return (
    <Row className="flex gap-[60px] mb-5">
      {!loading &&
        item?.CONFIG.map((tab, tabIndex) =>
          defaultTab === tabIndex ? (
            <button key={tab.id} className="flex gap-[6px] font-bold">
              <div className="bg-[#FFA12E] rounded-lg text-white size-[26px] flex items-center justify-center text-base">
                {tabIndex + 1}
              </div>
              <p className="relative">
                <span>{tab.name}</span>
                <Underline />
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
