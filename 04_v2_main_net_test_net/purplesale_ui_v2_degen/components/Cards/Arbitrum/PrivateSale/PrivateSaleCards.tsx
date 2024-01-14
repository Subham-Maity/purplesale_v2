import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { FaCircleDot } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";

interface CountdownProps {
  startDate: number;
  endDate: number;
}
interface CardProps {
  id: number;
  title: string;
  vestingFirstReleasePercent: number;
  softCapCurrency: number;
  hardCapCurrency: any;
  moneyRaised: number;
  startTime: number;
  endTime: number;
  imgHref: string;
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
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <span className="text-gray-300 dark:text-gray-300">
      {timeLeft || "Presale"} {/* Default to Presale text */}
    </span>
  );
};

const PrivateSaleCards = ({
  imgHref,
  title,
  vestingFirstReleasePercent,
  softCapCurrency,
  hardCapCurrency,
  moneyRaised,
  startTime,
  endTime,
  id,
  currency,
  bg,
}: CardProps) => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isCardAdded, setIsCardAdded] = useState(false);

  return (
    <div className="card-bg">
      <div className="relative">
        <Image
          height={2000}
          width={2000}
          className="bg-card-image"
          src={bg}
          alt="cartImage"
        />
        <Image
          height={300}
          width={300}
          className="bg-card-profile-image"
          src={imgHref}
          alt="cartImage"
        />
        <div className="bg-card-status">
          <SaleStatus startDate={startTime} endDate={endTime} />
        </div>
      </div>
      <div className="px-3 mb-4 ">
        <h5 className="card-name">{title}</h5>

        <p className="card-description">
          Project will receive {vestingFirstReleasePercent}% at first release
        </p>
      </div>
      <div className="px-4">
        <hr className="card-ruler"></hr>
        <p className="card-progress">
          Progress ({(moneyRaised / hardCapCurrency) * 100}%)
        </p>
        <div className="loader-style">
          <div
            className={`loader-color`}
            style={{
              width: `min(${(moneyRaised / hardCapCurrency) * 100}%, 100%)`,
            }}
          ></div>
        </div>

        <div className="loader-under-value-flex">
          <p className="loader-under-value">
            {moneyRaised ? `${moneyRaised}${currency}` : `0${currency}`}
          </p>
          <p className="loader-under-value">
            {hardCapCurrency} {currency}
          </p>
        </div>
        <div className="card-value-grid">
          <div className="card-value-bg">
            <div className="card-flex">
              <p className="card-title">Soft Cap</p>
              <p className="card-value">
                {softCapCurrency} {currency}
              </p>
            </div>
          </div>

          <div className="card-value-bg">
            <div className="card-flex">
              <p className="card-title">Hard Cap</p>
              <p className="card-value">
                {hardCapCurrency} {currency}
              </p>
            </div>
          </div>
        </div>
        <hr className="card-ruler"></hr>
        <div className="card-button-flex">
          <div>
            <p className="card-start">Sale Starts In</p>
            <p className="card-start-bg">
              <span className="card-start-span">
                <CountdownTimer startDate={startTime} endDate={endTime} />
              </span>
            </p>
          </div>
          <button
            className="card-button-secondary"
            onClick={() => {
              router.push({
                pathname: "/details/privatesale/[id]",
                query: { id: id },
              });
            }}
          >
            View
          </button>
        </div>
        <div className="card-flex"></div>
      </div>
    </div>
  );
};

export default PrivateSaleCards;
