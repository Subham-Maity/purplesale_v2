import React, { useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

interface ProgressStepProps {
  title: string;
  description: string;
  isCompleted: boolean;
  preDescription?: string;
  postDescription?: string;
}

const ProgressStep = ({
  title,
  description,
  isCompleted,
  preDescription,
  postDescription,
}: ProgressStepProps) => (
  <div className="flex items-start mt-2">
    <div className="flex items-center justify-center">
      <div
        className={`${
          isCompleted
            ? "bg-gray-300 border-2 border-green-500"
            : "bg-green-500 border-2 border-green-500"
        } rounded-full w-3 h-3 flex-shrink-0`}
      ></div>
      {!isCompleted && isCompleted ? (
        <div className="bg-green-500 h-8 w-0.5 mx-2"></div>
      ) : (
        <div className="bg-green-500 h-8 w-0.5 mx-2"></div>
      )}
    </div>
    <div className="flex-1">
      <p
        className={`text-sm font-medium ${
          isCompleted ? "text-green-500" : "dark:text-gray-200 text-gray-700"
        }`}
      >
        {title}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {preDescription} {description} {postDescription}
      </p>
    </div>
  </div>
);

interface CountdownProps {
  startDate: number;
  endDate: number;
}

const SaleStatus = ({ startDate, endDate }: CountdownProps) => {
  const [saleState, setSaleState] = useState<string>("");

  const calculateSaleState = () => {
    const now = new Date().getTime();
    const startTime = startDate * 1000;
    const endTime = endDate * 1000;

    if (now < startTime) {
      // Sale has not started yet
      setSaleState("Upcoming");
    } else if (now >= startTime && now <= endTime) {
      // Sale is ongoing
      setSaleState("Sale Live");
    } else {
      // Sale has ended
      setSaleState("Sale Ended");
    }
  };

  useEffect(() => {
    calculateSaleState();
    const interval = setInterval(calculateSaleState, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  let textClass = "";

  switch (saleState) {
    case "Upcoming":
      textClass = "text-yellow-500";
      break;
    case "Sale Live":
      textClass = "text-green-500";
      break;
    case "Sale Ended":
      textClass = " text-red-500";
      break;
    default:
      textClass = " text-gray-800";
  }

  return <span className={` ${textClass} `}>{saleState}</span>;
};

interface SidePanelProps {
  preSaleStartTime: number;
  preSaleEndTime: number;
  moneyRaised: number;
  hardCapCurrency: number;
  symbolToken: string;
  currency: string;
  HardCapCurrency?: number;
  softAndHardCapCurrency?: string;
}

const SidePanel = ({
  preSaleStartTime,
  preSaleEndTime,
  moneyRaised,
  hardCapCurrency,
  symbolToken,
  currency,
  HardCapCurrency,
  softAndHardCapCurrency,
}: SidePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const date = new Date(preSaleStartTime * 1000);
  // Format the date and time
  const formattedDate = `${date.getFullYear()}.${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}.${("0" + date.getDate()).slice(-2)} ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;

  const endDate = new Date(preSaleEndTime * 1000);
  const formattedEndDateTime = `${endDate.getFullYear()}.${(
    "0" +
    (endDate.getMonth() + 1)
  ).slice(-2)}.${("0" + endDate.getDate()).slice(-2)} ${(
    "0" + endDate.getHours()
  ).slice(-2)}:${("0" + endDate.getMinutes()).slice(-2)}`;
  return (
    <div className="ml-4 mt-2">
      <div className="border border-green-300/25 w-[370px] lg:w-[640px] md:w-[368px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 max-w-sm overflow-hidden relative z-0">
        <div className="w-full bg-gray-300 rounded-full mb-2">
          <div className="flex ">
            <div className="bg-green-500 border-2 border-green-500 rounded-full w-3 h-3 flex-shrink-0"></div>
            <div
              className={` rounded-full w-3 h-3 bg-gradient-to-r from-green-400 to-lime-500`}
              style={{ width: `${moneyRaised / hardCapCurrency}%` }}
            ></div>
          </div>
        </div>

        {isOpen ? (
          <FiChevronUp
            onClick={togglePanel}
            className="text-green-500 text-2xl cursor-pointer mx-auto"
          />
        ) : (
          <FiChevronDown
            onClick={togglePanel}
            className="text-green-500 text-2xl cursor-pointer mx-auto"
          />
        )}

        {isOpen && (
          <div className="mt-4 space-y-4">
            <ProgressStep
              title="Waiting for pool start"
              description="No one can purchase"
              isCompleted={false}
            />
            <ProgressStep
              title="Pool Start"
              preDescription={"Pool starts at"}
              description={formattedDate}
              postDescription={"(UTC)"}
              isCompleted={false}
            />
            <ProgressStep
              title="Pool Ended"
              preDescription={"Pool ends at"}
              description={formattedEndDateTime}
              postDescription={"(UTC)"}
              isCompleted={true}
            />
          </div>
        )}

        <div className="flex mt-4 justify-between">
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
            Status
          </p>
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
            <SaleStatus startDate={preSaleStartTime} endDate={preSaleEndTime} />
          </p>
        </div>
        <div className="flex justify-between">
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
            Sales Type
          </p>
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
            Public
          </p>
        </div>

        <div className="flex justify-between">
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
            Current Raised
          </p>
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
            {moneyRaised} {currency}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
            Hard Cap Per User
          </p>
          <p className="mb-3 text-sm font-medium text-gray-700 dark:text-white">
            {hardCapCurrency} {softAndHardCapCurrency}({HardCapCurrency}{" "}
            {currency})
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
