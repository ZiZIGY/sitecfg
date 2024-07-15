import { ItemType, SectionItem } from "../../../../types/config";

import { Fragment } from "react/jsx-runtime";
import Input from "./Input";
import List from "./List";
import Select from "../../../UI/Select";

export const Item = ({ item }: { item: SectionItem }) => {
  return (
    <Fragment>
      {item.type === ItemType.List && <List item={item} />}
      {item.type === ItemType.Select && <Select item={item} />}
      {item.type === ItemType.Input && <Input item={item} />}
    </Fragment>
  );
};
