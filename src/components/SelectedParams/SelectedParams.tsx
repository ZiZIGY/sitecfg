import { useEffect, useState } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";

export const SelectedParams = () => {
  const data = useAppSelector((state) => state.data.config);
  const price = useAppSelector((state) => state.data.config.price);
  const item = useAppSelector((state) => state.data.item);
  const defaultTab = useAppSelector((state) => state.data.defaultTab);
  const prevPrice = useAppSelector((state) => state.data.config.prevPrice);

  return (
    <div
      className={
        item && defaultTab === item?.CONFIG.length + 1
          ? "selected-params w-full flex flex-col"
          : "selected-params"
      }
    >
      <h2 className="font-medium text-lg mb-[15px]">Характеристики</h2>
      <div
        className={
          item && defaultTab === item?.CONFIG.length + 1
            ? "bg-[#F2F3F5] rounded-sm overflow-hidden pr-[5px] flex flex-col h-full w-full mb-[15px]"
            : "bg-[#F2F3F5] rounded-sm overflow-hidden pr-[5px] flex flex-col h-[343px] min-w-[350px] mb-[15px]"
        }
      >
        <div className="overflow-y-auto pl-[20px] pr-[15px] my-[15px] custom-scroll w-full">
          {data?.sections?.map((section) => (
            <div key={section.id}>
              {!section.hasOwnProperty("picture") ? (
                <div className="flex justify-between border-b border-solid border-[#2a2a2a80] mb-3 text-sm">
                  <span className="text-[#2a2a2a80] font-medium">
                    {section.name}:
                  </span>
                  <span>
                    {section.count
                      ? section.value + " " + section.count + " шт."
                      : section.value}
                  </span>
                </div>
              ) : (
                section.value && (
                  <div className="border-b border-solid border-[#2a2a2a80] mb-3 text-sm">
                    <p className="text-[#2a2a2a80] font-medium mb-[5px]">
                      {section.name}
                    </p>
                    <div className="flex mb-[10px]">
                      <img
                        className="border-solid border-[#2a2a2a33] border-[1px] mr-2 object-cover rounded-md "
                        width={38}
                        height={38}
                        src={"https://delmard.ru" + section.picture}
                        alt={section.value}
                      />
                      <span>
                        {section.count
                          ? section.value + " " + section.count + " шт."
                          : section.value}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
      {item && defaultTab !== item.CONFIG.length + 1 ? (
        <>
          <Price price={price} prevPrice={prevPrice} increaseValue={200} />
          <button className="bg-[#FFA12E] text-[16px] px-[10px] py-[20px] h-[50px] rounded-md font-medium text-white flex items-center justify-center w-full">
            Подтвердить заказ
          </button>
        </>
      ) : null}
    </div>
  );
};

const Price = ({
  price,
  prevPrice,
  increaseValue,
}: {
  price: number;
  prevPrice: number;
  increaseValue: number;
}) => {
  const [newPrice, setNewPrice] = useState(prevPrice);

  useEffect(() => {
    let interval: NodeJS.Timer;
    interval = setTimeout(() => {
      if (prevPrice < price && newPrice < price) {
        newPrice + increaseValue > price
          ? setNewPrice(price)
          : setNewPrice(newPrice + increaseValue);
      } else if (prevPrice > price && newPrice > price) {
        newPrice - increaseValue < price
          ? setNewPrice(price)
          : setNewPrice(newPrice - increaseValue);
      }
    }, 1);
    return () => clearTimeout(interval);
  }, [price, prevPrice, newPrice]);

  return (
    <div className="mb-[15px] flex justify-between">
      <span className="text-[#2a2a2a80] font-medium">Итого:</span>
      <span className="text-[22px] font-semibold">{newPrice} ₽</span>
    </div>
  );
};
