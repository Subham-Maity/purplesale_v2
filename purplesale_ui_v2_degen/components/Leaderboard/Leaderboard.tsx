import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Card {
  name: string;
  symbol: string;
  endDate: number;
  moneyRaised: number;
  link: string;
  imgHref: string;
}

interface Tab {
  name: string;
  cards: Card[];
  weekNumber: string;
}

interface DynamicTabsProps {
  cardData: Card[];
}

const Tabs: React.FC<{
  tabs: Tab[];
  selectedTab: number;
  onTabClick: (tabIndex: number) => void;
}> = ({ tabs, selectedTab, onTabClick }) => {
  return (
    <div className="flex space-x-1 p-4">
      {tabs.map((tab, index) => (
        <div
          key={tab.name}
          className={`px-1 cursor-pointer ${
            selectedTab === index
              ? "text-[#9E9CF3] font-bold border-b-2 bg-[#4a4545] py-1 border-[#9E9CF3] rounded-t-lg"
              : "text-gray-400  font-bold  py-1 rounded-t-lg "
          }`}
          onClick={() => onTabClick(index)}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
};

interface TimestampFormatterProps {
  timestamp: number;
}
const TimestampFormatter = ({ timestamp }: TimestampFormatterProps) => {
  // Convert Unix timestamp to milliseconds
  const date = new Date(timestamp * 1000);
  // Format the date and time
  const formattedDateTime = `${date.getFullYear()}.${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}.${("0" + date.getDate()).slice(-2)} ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;

  return <span>{formattedDateTime}</span>;
};
const CardList: React.FC<{ cards: Card[] }> = ({ cards }) => {
  return (
    <table className="w-full">
      <tbody>
        {cards.map((card, index) => (
          <>
            <tr key={card.name}>
              <td className="pl-4 pr-0 py-2 lg:block hidden ">{index + 1}</td>
              <td className="px-4 py-2">
                <Image
                  src={card.imgHref}
                  alt={`Image for ${card.name}`}
                  className="w-12 h-12 object-cover rounded-full lg:block hidden"
                  height={60}
                  width={60}
                />
              </td>
              <td className="pl-0 pr-4  py-2">
                <div>
                  <div className="flex">
                    {card.name}
                    {card.symbol}
                  </div>
                  <div className="flex">
                    <p className="lg:block hidden">
                      {card.moneyRaised} Matic - Listing Time:
                    </p>
                    <p className="ml-1">
                      <TimestampFormatter timestamp={card.endDate} />
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-2">
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      className=" text-gray-700 stroke-current"
                      strokeWidth="4"
                      fill="none"
                      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#9E9CF3] stroke-current"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${card.moneyRaised},100`}
                      d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[#9E9CF3]">
                    {card.moneyRaised}%
                  </div>
                </div>
              </td>

              <td className="px-1 py-2">
                <a href={card.link} className="text-[#9E9CF3]">
                  <button className="finishButton">View Pool</button>
                </a>
              </td>
            </tr>
            <tr
              key={`hr-${index}`}
              className="border-b border-dashed border-white/10"
            ></tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

const DynamicTabs: React.FC<DynamicTabsProps> = ({ cardData }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    // Group cards by week number
    const groupedByWeek: { [week: string]: Card[] } = {};

    cardData.forEach((card) => {
      const weekNumber = getWeekNumber(card.endDate);
      if (!groupedByWeek[weekNumber]) {
        groupedByWeek[weekNumber] = [];
      }
      groupedByWeek[weekNumber].push(card);
    });

    // Create tabs from grouped data
    const sortedWeeks = Object.keys(groupedByWeek)
      .map((week) => ({
        weekNumber: week,
        cards: groupedByWeek[week],
      }))
      .sort((a, b) => parseInt(b.weekNumber) - parseInt(a.weekNumber));

    const reversedTabs = sortedWeeks.map((week) => ({
      name: `Week ${week.weekNumber}`,
      cards: week.cards,
      weekNumber: week.weekNumber,
    }));

    setTabs(reversedTabs);
  }, [cardData]);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div>
      <Tabs tabs={tabs} selectedTab={selectedTab} onTabClick={handleTabClick} />
      <hr className="mx-8 border border-gray-300/25"></hr>
      {tabs.length > 0 && (
        <CardList key={selectedTab} cards={tabs[selectedTab].cards} />
      )}
    </div>
  );
};

// Helper function to get the week number for a given date
function getWeekNumber(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const dayOfWeek = startOfYear.getDay();
  const weekNumber = Math.ceil(
    ((date.getTime() - startOfYear.getTime()) / 86400000 + dayOfWeek + 1) / 7,
  );
  return `${weekNumber}/${year}`;
}

export default DynamicTabs;
