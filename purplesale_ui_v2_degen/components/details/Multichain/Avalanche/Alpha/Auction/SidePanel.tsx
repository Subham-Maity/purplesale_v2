import React, { useEffect, useState } from "react";
import RightSideDetailsWrapper from "@/components/TailwindWrapper/Details/RightSideWidget";

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
          isCompleted ? "text-green-500" : "dark:text-gray-200 text-gray-300"
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
  maximumBuy: number;
  minimumBuy: number;
  softCapCurrency?: string;
}

const SidePanel = ({
  preSaleStartTime,
  preSaleEndTime,
  maximumBuy,
  minimumBuy,
  softCapCurrency,
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
    <RightSideDetailsWrapper>
      <div className="flex mt-4 justify-between">
        <p className="mb-3 text-sm font-medium text-gray-300 dark:text-white">
          Status
        </p>
        <p className="mb-3 text-sm font-medium text-gray-300 dark:text-white">
          <SaleStatus startDate={preSaleStartTime} endDate={preSaleEndTime} />
        </p>
      </div>
      <div className="flex justify-between">
        <p className="mb-3 text-sm font-medium text-gray-300 dark:text-white">
          Sales Type
        </p>
        <p className="mb-3 text-sm font-medium text-gray-300 dark:text-white">
          Public
        </p>
      </div>
      <div className="flex justify-between">
        <p className="mb-3 text-sm font-medium text-gray-300 dark:text-white">
          Minimum Buy
        </p>
        <p className="mb-3 text-sm font-medium text-gray-300 dark:text-white">
          {minimumBuy} {softCapCurrency}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="mb-3 text-sm font-medium text-gray-300 dark:text-white">
          Maximum Buy
        </p>
        <p className="mb-3 text-sm font-medium text-gray-300 dark:text-white">
          {maximumBuy} {softCapCurrency}
        </p>
      </div>
    </RightSideDetailsWrapper>
  );
};

export default SidePanel;
