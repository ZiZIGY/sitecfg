import "./App.css";

import { FC, Fragment } from "react";

import Card from "./components/Card";
import { ConfigJSON } from "./types";
import Container from "./components/Container";
import CurrentTab from "./components/CurrentTab";
import Header from "./components/Header";
import { Item } from "./types/item";
import Row from "./components/Row";
import SelectedParams from "./components/SelectedParams";
import Tabs from "./components/Header/Tabs/";
import { objectToJson } from "./lib";
import { setItem } from "./redux/data";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
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

  const item = useAppSelector((state) => state.data.item);
  const dt = useAppSelector((state) => state.data.config);
  console.log("dt: ", dt);

  return (
    <>
      {item && (
        <>
          <Header />
          <Container>
            <Tabs />
            <Row className="flex gap-5">
              <Card />
              <CurrentTab />
              <SelectedParams />
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default App;
