import { objectToJson } from "../../lib";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useFetchAPI } from "../../hooks/useFetchAPI";
import { useMask } from "@react-input/mask";
import { useState } from "react";

export const SubmitForm = () => {
  const { item, config } = useAppSelector((state) => state.data);
  const inputRef = useMask({
    onMask: (event) => setShowError(!event.detail.isValid),
    showMask: true,
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  });

  const [showError, setShowError] = useState(true);

  const checkForm = async () => {
    const response = await fetch(
      "https://delmard.ru/api/configurator/send_config_data.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: objectToJson({
          newConfig: true,
          from: {
            site: "delmard.ru",
            path: window.location.href,
          },
          config: config,
          item: item,
          phone: inputRef?.current?.value,
        }),
      }
    );
    const data = await response.json();
    console.log("data: ", data);
  };

  return (
    <div className="max-w-[355px] w-full flex flex-col">
      <h2 className="font-medium text-lg mb-[15px]">Оформление заказа</h2>
      <div className="bg-[#F2F3F5] py-[15px] px-[10px] rounded">
        <p className="flex gap-[15px] items-end pb-[5px] mb-[20px] border-b-[1px] border-[solid] border-[#2a2a2a33]">
          <span className="font-medium text-sm text-[#2a2a2a80]">Скидка:</span>
          <span className="font-medium text-lg">
            {(config.price * Number(item?.PROPERTY_PROTSENT_SKIDKI_VALUE)) /
              100 +
              " ₽"}
          </span>
        </p>
        <div className="">
          <p className="font-medium text-sm text-[#2a2a2a80]">Итого:</p>
          <p className="flex gap-[25px] m-[10px] items-center">
            <span className="font-semibold text-2xl">{config.price} ₽</span>
            <span className="font-medium text-[#2a2a2a33] line-through">
              {config.price +
                (config.price * Number(item?.PROPERTY_PROTSENT_SKIDKI_VALUE)) /
                  100 +
                " ₽"}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-auto">
        <p className="text-sm mb-[25px]">
          Для формирования заказа укажите ваши контактные данные. Наш менеджер
          свяжется с Вами в ближайшее время.
        </p>
        <div className="relative">
          <div className="relative">
            {!showError && <SuccessSymbol />}
            <input
              className="w-full p-[10px] outline-none border-solid border-[1px] border-[#2a2a2a33] rounded focus:border-[#F7BC58]"
              type="tel"
              ref={inputRef}
              autoComplete="tel"
              placeholder="Введите ваш телефон"
            />
          </div>
          <span
            className={
              showError
                ? "text-[red] opacity-100 text-sm"
                : "text-[red] opacity-0 text-sm"
            }
          >
            Недостаточное количество символов
          </span>
        </div>
        <div>
          <button
            className="bg-[#F7BC58] p-[10px] text-white h-[50px] font-medium border-none w-full text-center"
            onClick={checkForm}
          >
            Оформить заказ
          </button>
          <p className="text-center text-xs text-[#2a2a2a80]">
            Я соглашаюсь с &nbsp;
            <a
              href="https://delmard.ru/politika-konfidentsialnosti/"
              className="text-black hover:text-[#F7BC58]"
            >
              политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const SuccessSymbol = () => (
  <svg
    className="absolute right-3 top-0 bottom-0 m-auto"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M20.5385 6L8.48077 18L3 12.5455"
      stroke="#00AE76"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
);
