import { PriceType, Property } from "../../../../../../types/config";
import { motion, useAnimate } from "framer-motion";

import { deviceIsMobile } from "../../../../../../lib";
import { setCompletedAnimation } from "../../../../../../redux/animation";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";
import { useEffect } from "react";

export const ListProperty = ({
  property,
  index,
  parentId,
}: {
  property: Property;
  index: number;
  parentId: number;
}) => {
  const [scope, animate] = useAnimate();

  const { completed } = useAppSelector((state) => state.animation);

  const dispatch = useAppDispatch();

  useEffect(() => {
    !completed?.includes(parentId) &&
      !deviceIsMobile() &&
      animate(
        scope.current,
        {
          y: 0,
          opacity: 1,
        },
        {
          delay: 0.01 * index,
        }
      );
    return () => {
      dispatch(setCompletedAnimation(parentId));
    };
  }, []);

  return (
    <motion.li
      ref={scope}
      initial={{
        opacity: completed?.includes(parentId) && !deviceIsMobile() ? 1 : 0,
        y: completed?.includes(parentId) && !deviceIsMobile() ? 0 : -20,
      }}
      className="w-[120px] h-[170px]"
    >
      <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis mb-[5px] text-center text-[#2a2a2a80] font-medium">
        {property.name}
      </p>
      <figure>
        <img
          className="rounded-[10px] h-120px w-full mb-[5px] aspect-square"
          src={"https://delmard.ru" + property.picture}
          alt={property.name}
        />
        <figcaption className="text-xs whitespace-nowrap overflow-hidden text-ellipsis mb-[5px] text-center text-[#2a2a2a80] font-medium">
          {property.price?.type === PriceType.Free && "Бесплатно"}
          {property.price?.type === PriceType.Percent &&
            "+ " + property.price?.value + "% к цене"}
          {property.price?.type === PriceType.Plus &&
            property.price?.value + " ₽"}
        </figcaption>
      </figure>
    </motion.li>
  );
};
