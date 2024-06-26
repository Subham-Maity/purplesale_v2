import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "@/constants/axio";
import { useAccount } from "wagmi";
import { BiLike } from "react-icons/bi";
import { FaCircleDot } from "react-icons/fa6";
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
  bg: string;
}

const SaleStatus = ({ startDate, endDate }: CountdownProps) => {
  const [saleState, setSaleState] = useState<string>("");

  const calculateSaleState = () => {
    const now = new Date().getTime();
    const startTime = startDate * 1000;
    const endTime = endDate * 1000;

    if (now < startTime) {
      // Sale has not started yet
      setSaleState("UPCOMING");
    } else if (now >= startTime && now <= endTime) {
      // Sale is ongoing
      setSaleState("LIVE");
    } else {
      // Sale has ended
      setSaleState("ENDED");
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
    case "UPCOMING":
      textClass = "text-yellow-500 bg-white";
      break;
    case "LIVE":
      textClass = " text-green-500 bg-green-500";
      break;
    case "ENDED":
      textClass = "text-red-500 bg-red-500";
      break;
    default:
      textClass = "text-gray-500 bg-gray-500";
  }

  return (
    <span
      className={`mt-2 w-18 gap-0.5 h-5 pr-2 flex justify-between font-bold text-xs items-center mr-2 rounded-full p-0.5 bg-white text-black ${textClass}`}
    >
      <FaCircleDot className={`text-lg ${textClass} rounded-full`} />

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
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <span className="text-gray-800 dark:text-gray-300">
      {timeLeft || "Presale"}
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
  bg,
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
    try {
      await axios.post("/cart/Ethereum", postData);
      setIsCardAdded(true);
      localStorage.setItem("isCardAdded", "true");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className=" h-[527px] w-[346px] mb-12 rounded-2xl bg-gradient-to-tr from-[#2020aa] to-[#6161b3] shadow-black shadow-2xl border-blue-600/25 border ">
      <div className="relative">
        <div className="h-[130px] w-[344px]">
          <Image
            height={2000}
            width={2000}
            className="rounded-2xl w-full h-full p-1"
            src={bg}
            alt="cartImage"
          />
        </div>
        <Image
          height={200}
          width={200}
          className="rounded-full w-14 h-14 border border-white/25 ml-2 mt-2 absolute top-2/3 right-4 z-30"
          src={imgHref}
          alt="cartImage"
        />
        <div className="absolute top-0 right-0">
          <SaleStatus startDate={SalesStartIn} endDate={SalesEndIn} />
        </div>
      </div>
      <div className="px-3 mb-8">
        <h5 className="mb-2 flex justify-start text-2xl font-semibold whitespace-nowrap tracking-tight text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 flex justify-start font-normal text-lg text-gray-200 dark:text-gray-200">
          {maxBuyFair == 0
            ? "Fair Launch"
            : `Fair Launch - Max buy ${maxBuyFair} ${currency}`}
        </p>
      </div>
      <div className="px-4">
        <p className="mb-3 flex justify-start text-sm font-bold text-gray-700 dark:text-white">
          Progress ({moneyRaised / softCapCurrency}%)
        </p>
        <div className="w-full bg-gray-300 rounded-full">
          <div className="w-full bg-gray-300 rounded-full">
            <div
              className={`h-2 rounded-full bg-gradient-to-r from-[#9999c5] to-gray-600`}
              style={{ width: `min(${moneyRaised / softCapCurrency}%, 100%)` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            {moneyRaised ? `${moneyRaised}${currency}` : `0${currency}`}
          </p>
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            {softCapCurrency} {currency}
          </p>
        </div>

        <hr className="border-t border-gray-300/75 mb-4"></hr>
        <div className="grid grid-cols-5 whitespace-nowrap justify-items-center">
          <div>
            <div className="flex flex-col whitespace-nowrap">
              <span className=" text-gray-300 font-bold text-center">
                {Liquidity}%
              </span>
              <p className="text-white font-light text-center text-sm whitespace-nowrap">
                Liquidity %
              </p>
            </div>
          </div>
          <Image
            src={"/Card/line.svg"}
            alt={"line"}
            width={1}
            height={20}
            className="h-10 w-2 py-2"
          />
          <div>
            <div className="flex flex-col whitespace-nowrap">
              <span className=" text-gray-300 font-bold text-center">
                {Liquidity}%
              </span>
              <p className="text-white font-light text-center text-sm whitespace-nowrap">
                Liquidity %
              </p>
            </div>
          </div>
          <Image
            src={"/Card/line.svg"}
            alt={"line"}
            width={1}
            height={20}
            className="h-10 w-2 py-2"
          />
          <div className="flex gap-2 mr-2">
            <div className="flex flex-col whitespace-nowrap">
              <span className=" text-gray-300 font-bold text-center">
                {softCapCurrency} {currency}
              </span>
              <p className="text-white font-light text-center text-sm whitespace-nowrap">
                Soft Cap
              </p>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300/75 mt-4 "></hr>
        <h3 className="flex justify-between mt-4 mb-4">
          <p className="text-xl font-normal text-gray-700 dark:text-gray-100">
            Lockup Time:
          </p>
          <p className=" text-xl font-normal text-gray-700 dark:text-gray-100">
            <span className="text-gray-800 dark:text-gray-300">
              {Math.floor(LockupTime / (60 * 60 * 24))} Days
            </span>
          </p>
        </h3>

        <div className="flex justify-between">
          <div>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-100">
              Sale Starts In
            </p>
            <p className="text-sm flex justify-start font-normal text-gray-700 dark:text-gray-100">
              <span className="text-gray-800 dark:text-gray-300">
                <CountdownTimer startDate={SalesStartIn} endDate={SalesEndIn} />
              </span>
            </p>
          </div>
          <div className=" flex justify-between gap-3">
            <button
              className=" w-12 mt-6 text-center text-md font-medium px-1 text-white rounded-md hover:bg-[#a6a6c4] bg-[#9494c4] "
              onClick={() => {
                router.push({
                  pathname: "/details/fairlaunch/[id]",
                  query: { id: id },
                });
              }}
            >
              View
            </button>
            <button
              className="flex mt-8 rounded-lg text-gray-700 dark:text-gray-100 cursor-pointer"
              onClick={() => {
                handleHeartButtonClickFair(id, imgHref, address, name, symbol);
              }}
            >
              <BiLike
                className={`text-2xl ${
                  isCardAdded
                    ? "text-purple-300 "
                    : "text-slate-200 dark:text-slate-200"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairLaunchCards;
