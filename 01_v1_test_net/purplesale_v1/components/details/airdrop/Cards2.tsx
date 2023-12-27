import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { BiWalletAlt } from "react-icons/bi";
import { useContractRead, useContractWrite } from "wagmi";
import { privSaleAbi, privSaleAddress } from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import FormContext from "@/contexts/create/FormContext";

interface CountdownProps {
  Dates: string;
}
interface CardProps {
  purchaseTokenAddress: string;
  symbolToken: string;
  EndTime: number;
  index: number;
  amountDecimal: number;
  address: string | undefined;
  Affiliate: number;
  moneyRaised: number;
  hardCapCurrency: any;
  allocation: any;
  claimed: any;
  currency: string;
}

interface SwipeTextProps {
  affiliateValues: number[];
}
const CountdownTimer = ({ timestamp }: { timestamp: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const calculateTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    const timeDifference = timestamp - now;

    if (timeDifference > 0) {
      setTimeLeft(timeDifference);
    } else {
      setTimeLeft(0);
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [timestamp]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${days.toString().padStart(2, "0")} : ${hours
      .toString()
      .padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timeComponents = formatTime(timeLeft).split(" : ");

  return (
    <div className="flex space-x-2">
      {timeComponents.map((component, index) => (
        <p
          key={index}
          className="dark:bg-green-800 bg-green-500 p-1 rounded text-center"
        >
          <span className="text-lg font-bold">{component}</span>
        </p>
      ))}
    </div>
  );
};

const SwipeText = ({ affiliateValues }: SwipeTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % affiliateValues.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [affiliateValues]);

  return (
    <div className="flex justify-center text-white border border-green-700 bg-green-500/75 dark:bg-green-900 dark:border-green-300 mx-32 w-32 rounded-full transition-transform duration-500 transform -translate-y-1/2 z-20">
      {affiliateValues[currentIndex]}
    </div>
  );
};

const Cards: React.FC<CardProps> = ({
  purchaseTokenAddress,
  symbolToken,
  EndTime,
  index,
  amountDecimal,
  address,
  moneyRaised,
  hardCapCurrency,
  allocation,
  claimed,
  currency,
}) => {
  const router = useRouter();

  const { setInfoData, infoData } = useContext(FormContext);

  //Args logic
  const amountDecimalData =
    purchaseTokenAddress == "0x0000000000000000000000000000000000000000"
      ? 18
      : amountDecimal;

  const presaleIndex = index;
  const AmountData = infoData.launchpadDetailsAmount * 10 ** amountDecimalData;

  const affiliatAddress = address;

  //Data Collection
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };
  console.log(
    infoData.launchpadDetailsAmount,
    "infoData.launchpadDetailsAmount",
  );

  const { write: buyToken } = useContractWrite({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "buyToken",
    args: [presaleIndex, AmountData],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });
  const date = new Date(EndTime * 1000);
  // Format the date and time
  const formattedDate = `${date.getFullYear()}.${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}.${("0" + date.getDate()).slice(-2)} ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;

  return (
    <div className="ml-4 mt-6">
      <div className=" border border-green-300/25 w-[370px] lg:w-[640px] md:w-[368px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 max-w-sm overflow-hidden relative z-0">
        <div className="mx-24">
          <p className="ml-4 mt-3 text-sm font-bold mb-2 text-gray-700 dark:text-gray-100">
            Live Now
          </p>
          <div className="text-sm font-normal text-gray-700 dark:text-gray-100">
            <div>
              <CountdownTimer timestamp={EndTime} />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="w-full bg-gray-300 rounded-full">
            <div
              className={`h-2 rounded-full bg-gradient-to-r from-green-400 to-lime-500`}
              style={{ width: `${moneyRaised / hardCapCurrency}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              0 {currency}
            </p>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              {hardCapCurrency} {currency}
            </p>
          </div>
        </div>
        <div className="flex justify-between border-gray-400 border-b-2 dark:border-gray-500/25"></div>
        <div className="flex justify-between mt-6">
          <p className="mb-3 font-normal text-gray-700 text-md dark:text-gray-400">
            Start Time
          </p>
          <p className="mb-3 font-normal text-md text-gray-700 dark:text-gray-400">
            {formattedDate}
          </p>
        </div>
        <div className="flex justify-between ">
          <p className="mb-3 font-normal text-gray-700 text-md dark:text-gray-400">
            Your Allocation
          </p>
          <p className="mb-3 font-normal text-md text-gray-700 dark:text-gray-400">
            {allocation}
          </p>
        </div>
        <div className="flex justify-between ">
          <p className="mb-3 font-normal text-gray-700 text-md dark:text-gray-400">
            Your Claimed
          </p>
          <p className="mb-3 font-normal text-md text-gray-700 dark:text-gray-400">
            {claimed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
