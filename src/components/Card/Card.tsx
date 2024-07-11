import { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";

export const Card: FC = () => {
  const { item, loading } = useAppSelector((state) => state.data);

  return (
    <figure className="max-w-72 min-w-72 w-full h-full">
      {loading ? (
        <div className="aspect-square bg-gray-500 rounded-md mb-4 animate-pulse"></div>
      ) : (
        <img
          className="w-full h-full max-h-72 object-cover rounded-md mb-4"
          src={"https://delmard.ru" + item?.DETAIL_PICTURE}
          alt={item?.NAME}
        />
      )}
      <figcaption className="text-sm leading-[135%]">
        На нашем сайте вы можете самостоятельно выбрать нужные вам параметры:
        размеры, цвет и материал, фурнитуру и дополнительные опции. Мы изготовим
        заказ согласно вашим индивидуальным пожеланиям.
      </figcaption>
    </figure>
  );
};
