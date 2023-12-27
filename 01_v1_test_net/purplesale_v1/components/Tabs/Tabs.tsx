import React, { ReactNode, useState } from "react";
import { IconBaseProps } from "react-icons";
import Link from "next/link";

interface TabProps {
  tabs: string[];
  icons: React.ComponentType<IconBaseProps>[];
  children: ReactNode[];
}

function Tab({ tabs, icons, children }: TabProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:w-[1060px] rounded-md px-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            {tabs.map((tabName, index) => {
              const IconComponent = icons[index];
              const isActive = index === activeTab;

              return (
                <li className="mr-2" key={index}>
                  <Link
                    href="#"
                    className={`inline-flex items-center justify-center p-4 ${
                      isActive
                        ? "text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-green-500 dark:border-green-500"
                        : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <IconComponent
                      className={`w-4 h-4 mr-2 ${
                        isActive
                          ? "text-green-600 dark:text-green-500"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                      aria-hidden={true}
                    />
                    {tabName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-4">{children[activeTab]}</div>
    </div>
  );
}

export default Tab;
