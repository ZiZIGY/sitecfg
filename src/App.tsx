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
import SubmitForm from "./components/SubmitForm";
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
  const defaultTab = useAppSelector((state) => state.data.defaultTab);

  return (
    <>
      {item && (
        <div className="max-w-[1460px]">
          <Header />
          <Container>
            <Tabs />
            <Row className="flex gap-5 main-row max-h-[500px]">
              <Card />
              <CurrentTab />
              <SelectedParams />
              {item && defaultTab === item.CONFIG.length + 1 && <SubmitForm />}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default App;
