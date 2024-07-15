import { Property, SectionItem } from "../../../types/config";
import { useEffect, useRef, useState } from "react";

import Caret from "../Caret";

export const Select = ({ item }: { item: SectionItem }) => {
  const selectRef = useRef(null);
  const [val, setVal] = useState(item.properties.defaultValue);

  const handleClose = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !(selectRef.current as HTMLElement).contains(event.target as HTMLElement)
    ) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClose, false);
    return () => {
      document.removeEventListener("click", handleClose, false);
    };
  });

  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div className="flex gap-[10px] items-center mb-[10px]">
      <p className="w-28">
        {item.properties.name} + {val}
      </p>
      <div
        ref={selectRef}
        className="h-10 w-[110px] text-sm bg-white border-[1px] border-[#ddd] rounded-md cursor-pointer p-[10px] relative"
        onClick={() => setOpened(!opened)}
      >
        <span className="font-medium flex items-center justify-between">
          {item.properties.defaultValue} <Caret opened={opened} />
        </span>
        {opened && (
          <div className="absolute h-[160px] bg-[#fafafa] overflow-y-auto z-10 top-full bottom-0 left-0 right-0">
            {item.properties.values?.map((property: Property) => {
              return (
                <p
                  key={property.id}
                  className="p-[10px] font-medium text-sm"
                  onClick={() => {
                    setVal(property.value || 0);
                  }}
                >
                  {property.name}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
