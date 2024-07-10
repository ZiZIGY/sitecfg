import "./App.css";

import { FC, Fragment } from "react";

import Card from "./components/Card";
import { ConfigJSON } from "./types";
import Container from "./components/Container";
import Header from "./components/Header";
import { Item } from "./types/item";
import Row from "./components/Row";
import Tabs from "./components/Tabs";
import { objectToJson } from "./lib";
import { setItem } from "./redux/data";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useFetchAPI } from "./hooks/useFetchAPI";

export const App: FC = () => {
  const dispatch = useAppDispatch();

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
      complete: (result) => dispatch(setItem(result as Item)),
    }
  );

  return (
    <Fragment>
      <Header />
      <Container>
        <Tabs />
      </Container>
    </Fragment>
  );
};

export default App;
