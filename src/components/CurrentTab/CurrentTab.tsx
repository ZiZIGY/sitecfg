import Items from "./Items";
import Row from "../Row";
import { Section } from "../../types/config";
import Tabs from "./Tabs";
import { useAppSelector } from "../../hooks/useAppSelector";

export const CurrentTab = () => {
  const { item, defaultTab } = useAppSelector((state) => state.data);
  const currentItem = item?.CONFIG[defaultTab || 0] as Section;
  return (
    <Row className="bg-[#f2f3f5] w-full h-[500px] pr-[5px] pl-[20px] pb-[15px] pt-[15px] rounded-md flex flex-col">
      {currentItem?.sections.length ? (
        <Tabs section={currentItem} />
      ) : (
        <Items section={currentItem} />
      )}
    </Row>
  );
};
