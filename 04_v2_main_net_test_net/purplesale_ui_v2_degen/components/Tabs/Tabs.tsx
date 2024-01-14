import React, { ReactNode, useState } from "react";
import { IconBaseProps } from "react-icons";
import Link from "next/link";

interface TabProps {
  tabs: string[];
  icons: React.ComponentType<IconBaseProps>[];
  children: ReactNode[];
}

function LauchPadTab({ tabs, icons, children }: TabProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col justify-end items-end mr-4">
      <div className="bg-[#404040] rounded-full py-1">
        <div className="rounded-full  ">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            {tabs.map((tabName, index) => {
              const IconComponent = icons[index];
              const isActive = index === activeTab;

              return (
                <li className="" key={index}>
                  <Link
                    href="#"
                    className={`inline-flex items-center justify-center p-4 ${
                      isActive
                        ? "text-black font-bold rounded-full bg-yellow-400  active dark:border-[#9E9CF3]"
                        : "rounded-t-lg hover:text-[#9E9CF3] hover:border-gray-300 dark:hover:text-gray-300 group"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <IconComponent
                      className={`w-4 h-4 mr-2 ${
                        isActive
                          ? "text-black"
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

export default LauchPadTab;
