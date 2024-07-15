import { Fragment, useId, useState } from "react";

import Items from "../Items";
import Row from "../../Row";
import { Section } from "../../../types/config";
import Underline from "../../UI/Underline";

export const Tabs = ({ section }: { section: Section }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const id = useId();
  return (
    <Fragment key={id}>
      {section?.sections.length !== 0 && (
        <Row className="flex gap-5 mb-3 border-b-2">
          {section?.sections.map((tab, tabIndex: number) => (
            <button
              type="button"
              className="relative cursor-pointer"
              key={tab.id}
              onClick={() => setCurrentTab(tabIndex)}
            >
              {tabIndex === currentTab ? (
                <Fragment>
                  <span className="text-[#2A2A2A] font-semibold">
                    {tab.name}
                  </span>
                  <Underline key={tab.id} bottomPx={-2} />
                </Fragment>
              ) : (
                <span className="text-[#2a2a2a80]">{tab.name}</span>
              )}
            </button>
          ))}
        </Row>
      )}
      {section?.sections && <Items section={section.sections[currentTab]} />}
      {section?.sections[currentTab]?.sections && (
        <Tabs section={section.sections[currentTab]} />
      )}
    </Fragment>
  );
};
