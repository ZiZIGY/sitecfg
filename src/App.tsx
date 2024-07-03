import "./App.css";

import { FC, Fragment } from "react";

import { ConfigJSON } from "./types";
import Header from "./components/Header";
import { objectToJson } from "./lib";
import { setData } from "./redux/data";
import { useDispatch } from "react-redux";
import { useFetchAPI } from "./hooks/useFetchAPI";

export const App: FC = () => {
  const dispatch = useDispatch();
  useFetchAPI<ConfigJSON>(
    "https://delmard.ru/api/cfg/site/get/item/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cors: "no-cors",
      body: objectToJson({
        id: 125111,
      }),
    },
    {
      complete: (result) => {
        dispatch(setData(result as ConfigJSON));
      },
    }
  );

  return (
    <Fragment>
      <Header />
    </Fragment>
  );
};

export default App;
