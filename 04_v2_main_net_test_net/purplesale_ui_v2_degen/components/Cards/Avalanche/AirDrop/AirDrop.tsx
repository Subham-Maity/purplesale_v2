import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaCircleDot } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";

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
  bg: string;
}

const SaleStatus = ({ startDate }: CountdownProps) => {
  const [saleState, setSaleState] = useState<string>("");

  const calculateSaleState = () => {
    const now = new Date().getTime();
    const startTime = startDate * 1000;

    if (now < startTime) {
      // Sale has not started yet
      setSaleState("UPCOMING");
    } else if (now >= startTime) {
      // Sale is ongoing
      setSaleState("LIVE");
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
    <span className="text-gray-300 dark:text-gray-300">
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
  bg,
}: CardProps) => {
  const router = useRouter();

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
          <SaleStatus startDate={starTime} />
        </div>
      </div>
      <div className="px-3 mb-8">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300 dark:text-white">
          {title}
        </h5>
      </div>
      <div className="px-4">
        <hr className="mt-24 border-t border-gray-300/75 mb-4"></hr>

        <div className=" grid grid-cols-5 whitespace-nowrap justify-items-center">
          <div>
            <div className="flex flex-col whitespace-nowrap">
              <span className=" text-gray-300 font-bold text-center">
                {token}
              </span>
              <p className="text-white font-light text-center text-sm whitespace-nowrap">
                Token
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
                {totalTokens}
              </span>
              <p className="text-white font-light text-center text-sm whitespace-nowrap">
                Total Tokens
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
                {participants}
              </span>
              <p className="text-white font-light text-center text-sm whitespace-nowrap">
                Participants
              </p>
            </div>
          </div>
        </div>
        <hr className="border-t mb-32 border-gray-300/75 mt-4 "></hr>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-normal text-gray-300 dark:text-gray-100">
              Sale Starts In
            </p>
            <p className="text-sm font-normal text-gray-300 dark:text-gray-100">
              <span className="text-gray-300 dark:text-gray-300">
                <CountdownTimer startDate={starTime} />
              </span>
            </p>
          </div>
          <div className=" flex justify-between gap-3">
            <button
              className=" w-12 text-center text-md font-medium px-1 text-white rounded-md hover:bg-[#a6a6c4] bg-[#9494c4] "
              onClick={() => {
                router.push({
                  pathname: "/details/airdrop/[id]",
                  query: { id: id },
                });
              }}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirDropCard;