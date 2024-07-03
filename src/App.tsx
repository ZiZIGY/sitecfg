import "./App.css";

import { FC, Fragment } from "react";

import { ConfigJSON } from "./types";
import Header from "./components/Header";
import { objectToJson } from "./lib";
import { useFetchAPI } from "./hooks/useFetchAPI";

export const App: FC = () => {
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
      complete: (result) => {},
    }
  );

  return (
    <Fragment>
      <Header />
    </Fragment>
  );
};

export default App;
