import React, { ReactNode, useContext, useState } from "react";
import { IconBaseProps } from "react-icons";
import Link from "next/link";
import FormContext from "@/contexts/create/FormContext";

interface TabProps {
  tabs: string[];
  icons?: React.ComponentType<IconBaseProps>[];
  children: ReactNode[];
}

function LaunchPadListTab({ tabs, icons, children }: TabProps) {
  const { activeTab, setActiveTab } = useContext(FormContext);

  return (
    <div>
      <div>
        <div>
          <ul>
            {tabs.map((tabName, index) => {
              const isActive = index === activeTab;

              return <></>;
            })}
          </ul>
        </div>
      </div>
      <div>{children[activeTab]}</div>{" "}
      {/* Make the content wider and centered */}
    </div>
  );
}

export default LaunchPadListTab;
