import React, { ReactNode, useState } from "react";
import { IconBaseProps } from "react-icons";
import Link from "next/link";

interface TabProps {
  tabs: string[];
  icons?: React.ComponentType<IconBaseProps>[];
  children: ReactNode[];
}

function LaunchPadListTab({ tabs, icons, children }: TabProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col mt-20 mb-4 justify-center items-center">
      <div className="max-w-screen-xl rounded-md px-6">
        <div>
          <ul className="flex flex-wrap font-medium text-center lg:bg-[#1f1f1f] text-md rounded-xl mb-10 text-gray-500 dark:text-gray-400">
            {tabs.map((tabName, index) => {
              const isActive = index === activeTab;

              return (
                <li className="mr-2 mb-4" key={index}>
                  <Link
                    href="#"
                    className={`inline-flex w-[203px] h-[25px] lg:w-[407px] lg:h-[50px]  items-center justify-center p-4 ${
                      isActive
                        ? "text-[#9E9CF3] font-bold  bg-gradient-to-r from-[#482ef0] to-[#9d59be] rounded-xl active dark:text-white"
                        : " rounded-t-lg hover:text-[#9E9CF3] bg-[#1f1f1f]  hover:border-gray-300 dark:hover:text-gray-300 group"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tabName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-4 w-full text-center">{children[activeTab]}</div>{" "}
      {/* Make the content wider and centered */}
    </div>
  );
}

export default LaunchPadListTab;
