import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

interface CountdownProps {
  startDate: number;
}
interface CardProps {
  id: number;
  imgHref: string;
  title: string;
  token: string;
  totalTokens: number;
  participants: number;
  starTime: number;
  currency: string;
}

const SaleStatus = ({ startDate }: CountdownProps) => {
  const [saleState, setSaleState] = useState<string>("");

  const calculateSaleState = () => {
    const now = new Date().getTime();
    const startTime = startDate * 1000;

    if (now < startTime) {
      // Sale has not started yet
      setSaleState("Upcoming");
    } else if (now >= startTime) {
      // Sale is ongoing
      setSaleState("Sale Live");
    }
  };

  useEffect(() => {
    calculateSaleState();
    const interval = setInterval(calculateSaleState, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startDate]);

  let textClass = "";

  // Determine the text color class based on the sale state
  switch (saleState) {
    case "Upcoming":
      textClass = "border border-yellow-400 text-yellow-500";
      break;
    case "Sale Live":
      textClass = "border border-green-500 text-green-500";
      break;
    default:
      textClass = "border border-gray-800 text-gray-800";
  }

  return (
    <span
      className={`mr-2 mt-2 w-24 h-8 text-xs font-medium inline-flex items-center px-1 py-0.5 rounded-3xl ${textClass}`}
    >
      <svg
        className="w-2.5 h-2.5 mr-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
      </svg>
      {saleState}
    </span>
  );
};

const CountdownTimer = ({ startDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  const formatTime = (timeDifference: number) => {
    const seconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}:${hours}:${minutes}:${remainingSeconds}`;
  };

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const timeDifference = startDate * 1000 - now;

    if (timeDifference <= 0) {
      // Sale has already started or ended
      setTimeLeft("Ongoing");
    } else {
      // Sale has not started yet
      setTimeLeft(formatTime(timeDifference));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // Update every second

    calculateTimeLeft(); // Calculate time left immediately when the component mounts.

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <span className="text-gray-800 dark:text-gray-300">
      {timeLeft === "Ongoing" ? "Ongoing" : timeLeft || "Upcoming"}{" "}
      {/* Default to Upcoming text */}
    </span>
  );
};

const AirDropCard = ({
  id,
  imgHref,
  title,
  token,
  totalTokens,
  participants,
  starTime,
  currency,
}: CardProps) => {
  const router = useRouter();

  return (
    <div className="">
      <div className=" dark:bg-gray-800/25 bg-opacity-20 backdrop-blur-lg max-w-sm border border-green-200 rounded-3xl shadow-lg dark:shadow-gray-800 shadow-gray-200 dark:border-green-700/50 overflow-hidden relative z-0">
        <div className="flex  justify-between">
          <Image
            height={200}
            width={200}
            className="rounded-full w-12 h-12 border-2 ml-2 mt-2"
            src={imgHref}
            alt=""
          />
          <span>
            <SaleStatus startDate={starTime} />
          </span>
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <div className="flex justify-between">
            <p className="mr-12 mt-3 text-sm font-normal text-gray-700 dark:text-gray-100">
              token
            </p>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-100">
              {token}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="mr-12 mt-3 text-sm font-normal text-gray-700 dark:text-gray-100">
              Total Tokens
            </p>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-100">
              {totalTokens}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="mr-12 mt-3 text-sm font-normal text-gray-700 dark:text-gray-100">
              Participants
            </p>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-100">
              {participants}
            </p>
          </div>
          <hr className="h-px mx-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="flex justify-between">
            <div>
              <p className="mr-12 mt-3 text-sm font-normal text-gray-700 dark:text-gray-100">
                Sale Starts In
              </p>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-100">
                <span className="text-gray-800 dark:text-gray-300">
                  <CountdownTimer startDate={starTime} />
                </span>
              </p>
            </div>
            <div className=" flex justify-between gap-3"></div>

            <button
              className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => {
                router.push({
                  pathname: "/details/airdrop/[id]",
                  query: { id: id },
                });
              }}
            >
              View
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirDropCard;
