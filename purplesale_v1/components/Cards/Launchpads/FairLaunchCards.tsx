import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/router";
import axios from "@/constants/axio";
import { useAccount } from "wagmi";

interface CountdownProps {
  startDate: number;
  endDate: number;
}
interface CardProps {
  maxBuyFair: number;
  softCapCurrency: number;
  Affiliate: string;
  imgHref: string;
  Liquidity: number;
  LockupTime: number;
  SalesStartIn: number;
  SalesEndIn: number;
  moneyRaised: number;
  id: number;
  name: string;
  symbol: number;
  currency: string;
}

interface SwipeTextProps {
  affiliateValues: string;
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

  // Determine the text color class based on the sale state
  switch (saleState) {
    case "Upcoming":
      textClass = "border border-yellow-400 text-yellow-500";
      break;
    case "Sale Live":
      textClass = "border border-green-500 text-green-500";
      break;
    case "Sale Ended":
      textClass = "border border-red-500 text-red-500";
      break;
    default:
      textClass = "border border-gray-800 text-gray-800";
  }

  return (
    <span
      className={` ml-2 mt-2 w-24 h-8  text-xs font-medium inline-flex items-center mr-2 px-1 py-0.5 rounded-3xl   ${textClass} `}
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

const CountdownTimer = ({ startDate, endDate }: CountdownProps) => {
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

    if (timeDifference < 0) {
      // Sale has already started or ended
      const endTimeDifference = endDate * 1000 - now;
      if (endTimeDifference <= 0) {
        // Sale has ended
        setTimeLeft("Ended");
      } else {
        // Sale is ongoing
        setTimeLeft(formatTime(endTimeDifference));
      }
    } else {
      // Sale has not started yet
      setTimeLeft(formatTime(timeDifference));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <span className="text-gray-800 dark:text-gray-300">
      {timeLeft || "Presale"} {/* Default to Presale text */}
    </span>
  );
};

const FairLaunchCards = ({
  maxBuyFair,
  softCapCurrency,
  Affiliate,
  imgHref,
  Liquidity,
  LockupTime,
  SalesStartIn,
  SalesEndIn,
  moneyRaised,
  id,
  name,
  symbol,
  currency,
}: CardProps) => {
  const router = useRouter();

  const affiliateValues = Affiliate;
  const { address, isConnected } = useAccount();
  const [isCardAdded, setIsCardAdded] = useState(false);
  const handleHeartButtonClickFair = async (
    id: number,
    imgHref: string,
    address: any,
    name: string,
    symbol: number,
  ) => {
    const postData = {
      Name: name,
      Symbol: symbol,
      Link: `/details/fairlaunch/${id}`,
      WalletAddress: address,
      imgHref: imgHref,
    };
    console.log(postData + "postdataFair");
    try {
      await axios.post("/cart", postData);
      setIsCardAdded(true);
      localStorage.setItem("isCardAdded", "true");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="">
      <div className="relative  mt-8">
        <div className="absolute  z-20 transform translate-x-0.5 -translate-y-1/2 inset-0 bg-gradient-to-r from-green-400 to-lime-500 dark:from-green-700 dark:to-green-800 rounded-lg shadow-lg">
          <div className="flex justify-center text-white border border-green-700 bg-green-500/75 dark:bg-green-900 dark:border-green-300 mx-32 w-32 rounded-full transition-transform duration-500 transform -translate-y-1/2 z-20">
            {affiliateValues}
          </div>
        </div>
      </div>
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
            <SaleStatus startDate={SalesStartIn} endDate={SalesEndIn} />
          </span>
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {maxBuyFair == 0
              ? "Fair Launch"
              : `Fair Launch - Max buy ${maxBuyFair} ${currency}`}
          </p>
          <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            Soft
          </h5>
          <p className="mb-3 font-normal text-2xl text-green-700 dark:text-green-400">
            {softCapCurrency} {currency}
          </p>
          <p className="mb-3 text-sm font-bold text-gray-700 dark:text-white">
            Progress ({moneyRaised / softCapCurrency}%)
          </p>
          <div className="w-full bg-gray-300 rounded-full">
            <div
              className={`h-2 rounded-full bg-gradient-to-r from-green-400 to-lime-500`}
              style={{ width: `${moneyRaised / softCapCurrency}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              {moneyRaised ? `${moneyRaised}${currency}` : `0${currency}`}
            </p>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              {softCapCurrency} {currency}
            </p>
          </div>

          <h3 className="flex justify-between">
            <p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-100">
              Liquidity %
            </p>
            <p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-100">
              <span className="text-gray-800 dark:text-gray-300">
                {Liquidity}%
              </span>
            </p>
          </h3>
          <h3 className="flex justify-between">
            <p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-100">
              Lockup Time:
            </p>
            <p className="mb-3 text-lg font-normal text-gray-700 dark:text-gray-100">
              <span className="text-gray-800 dark:text-gray-300">
                {Math.floor(LockupTime / (60 * 60 * 24))} Days
              </span>
            </p>
          </h3>
          <hr className="h-px mx-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <div className="flex justify-between">
            <div>
              <p className="mr-12 mt-3 text-sm font-normal text-gray-700 dark:text-gray-100">
                Sale Starts In
              </p>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-100">
                <span className="text-gray-800 dark:text-gray-300">
                  <CountdownTimer
                    startDate={SalesStartIn}
                    endDate={SalesEndIn}
                  />
                </span>
              </p>
            </div>
            <div className=" flex justify-between gap-3">
              <button
                className="mt-3 h-10 w-8  flex items-center justify-center space-x-1 rounded-lg py-2 px-2 bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-gray-100 cursor-pointer"
                onClick={() => {
                  handleHeartButtonClickFair(
                    id,
                    imgHref,
                    address,
                    name,
                    symbol,
                  );
                }}
              >
                <AiOutlineHeart
                  className={`${
                    isCardAdded
                      ? "text-red-500"
                      : "text-slate-200 dark:text-slate-200"
                  }`}
                />
              </button>

              <button
                className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => {
                  router.push({
                    pathname: "/details/fairlaunch/[id]",
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
    </div>
  );
};

export default FairLaunchCards;
