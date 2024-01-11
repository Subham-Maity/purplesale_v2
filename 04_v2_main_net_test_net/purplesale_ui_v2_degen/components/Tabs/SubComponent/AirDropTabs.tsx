import React, { ReactNode, useState } from "react";
import { IconBaseProps } from "react-icons";
import Link from "next/link";

interface TabProps {
  tabs: string[];
  icons: React.ComponentType<IconBaseProps>[];
  children: ReactNode[];
}

function AirDropTab({ tabs, icons, children }: TabProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col mt-8 justify-center items-center">
      <div className="w-[370px] sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[1440px] rounded-md px-6">
        <div className="border-b-2 border-[#4a4545] ">
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
                        ? "text-[#9E9CF3] font-bold border bg-[#4a4545] rounded-t-lg active dark:text-[#9E9CF3] dark:border-[#9E9CF3]"
                        : "border-b-2 border-transparent rounded-t-lg hover:text-[#9E9CF3] hover:border-gray-300 dark:hover:text-gray-300 group"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <IconComponent
                      className={`w-4 h-4 mr-2 ${
                        isActive
                          ? "text-[#9E9CF3] dark:text-[#9E9CF3]"
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

export default AirDropTab;
