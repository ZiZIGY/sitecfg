import Items from "./Items";
import Row from "../Row";
import { Section } from "../../types/config";
import Tabs from "./Tabs";
import { useAppSelector } from "../../hooks/useAppSelector";

export const CurrentTab = () => {
  const { item, defaultTab } = useAppSelector((state) => state.data);
  const currentItem = item?.CONFIG[defaultTab || 0] as Section;
  return (
    <Row className="bg-[#f2f3f5] w-full h-full h-[500px] p-5 rounded-md">
      {currentItem?.sections.length ? (
        <Tabs section={currentItem} />
      ) : (
        <Items section={currentItem} />
      )}
    </Row>
  );
};
