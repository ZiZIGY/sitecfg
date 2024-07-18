import {
  PriceType,
  Property,
  Section,
  SectionItem,
} from "../../../../../../types/config";
import {
  change,
  decrease,
  increase,
  recalculate,
} from "../../../../../../redux/data";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useId } from "react";

import Minus from "../../../../../UI/Minus";
import Plus from "../../../../../UI/Plus";
import Row from "../../../../../Row";
import { deviceIsMobile } from "../../../../../../lib";
import { setCompletedAnimation } from "../../../../../../redux/animation";
import { useAppDispatch } from "../../../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../../../hooks/useAppSelector";

export const ListProperty = ({
  property,
  index,
  parent,
  section,
}: {
  property: Property;
  index: number;
  parent: SectionItem;
  section: Section;
}) => {
  const [scope, animate] = useAnimate();

  const { animation, data } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();

  const id = useId();

  const currentSectionIndex = data.config?.sections?.findIndex((v) =>
    property.type ? v.name === property.type : v.name === section.name
  );
  const currentSection = data.config?.sections?.[currentSectionIndex as number];

  useEffect(() => {
    !animation.completed?.includes(parent.id) &&
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
      dispatch(setCompletedAnimation(parent.id));
    };
  }, []);

  return (
    <label className="cursor-pointer hov">
      <motion.li
        ref={scope}
        initial={{
          opacity:
            animation.completed?.includes(parent.id) && !deviceIsMobile()
              ? 1
              : 0,
          y:
            animation.completed?.includes(parent.id) && !deviceIsMobile()
              ? 0
              : -20,
        }}
        className="w-[120px]"
      >
        <input
          id={id}
          type="radio"
          onChange={() => {
            if (!property.multiple) {
              dispatch(
                change({
                  property: property,
                  component: parent,
                  section: section,
                })
              );
              dispatch(recalculate());
            }
          }}
          name={property.type ? property.type : section.name}
          value={property.name}
          className="hidden"
        />
        <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis mb-[5px] text-center text-[#2a2a2a80] font-medium">
          {property.name}
        </p>
        <figure>
          <img
            className={
              property.name === currentSection?.value
                ? "border-[4px] border-solid border-[#FFA12E] rounded-[10px] h-120px w-full mb-[5px] aspect-square"
                : "rounded-[10px] h-120px w-full mb-[5px] aspect-square"
            }
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
          {property.multiple && (
            <Row className="flex items-center justify-around">
              <button
                className="aspect-square flex bg-[#F7BC58] size-[26px] items-center justify-center rounded-sm"
                onClick={() => {
                  dispatch(
                    decrease({
                      property: property,
                      component: parent,
                      section: section,
                    })
                  );
                  dispatch(recalculate());
                }}
              >
                <Minus />
              </button>
              <input
                type="text"
                className="w-[46px] h-[26px] rounded-sm text-center p-0 border-[#2a2a2a33] border-solid border-[1px]"
                value={currentSection?.count ? currentSection?.count : 0}
              />
              <button
                className="aspect-square flex bg-[#F7BC58] size-[26px] items-center justify-center rounded-sm"
                onClick={() => {
                  dispatch(
                    increase({
                      property: property,
                      component: parent,
                      section: section,
                    })
                  );
                  dispatch(recalculate());
                }}
              >
                <Plus />
              </button>
            </Row>
          )}
        </figure>
      </motion.li>
    </label>
  );
};
