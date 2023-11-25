import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { BiWalletAlt } from "react-icons/bi";
import { useContractWrite } from "wagmi";
import {
  createAbi,
  createAddress,
  subAbi,
  subAddress,
} from "@/constants/Avalanche/createConstants";
import { enqueueSnackbar } from "notistack";
import FormContext from "@/contexts/create/FormContext";
import RightSideDetailsWrapper from "@/components/TailwindWrapper/Details/RightSideWidget";

interface CardProps {
  purchaseTokenAddress: string;
  symbolToken: string;
  EndTime: number;
  index: number;
  amountDecimal: number;
  address: string | undefined;
  dataIndex: number;
  moneyRaised: number;
  softCapCurrency: number;
  hardCapCurrency: number;
  currency: string;
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
          className="dark:bg-[#aca4ff] bg-[#aca4ff] p-1 rounded text-center"
        >
          <span className="text-lg font-bold">{component}</span>
        </p>
      ))}
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
  dataIndex,
  moneyRaised,
  softCapCurrency,
  hardCapCurrency,
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

  const { write: buyToken } = useContractWrite({
    address: subAddress,
    abi: subAbi,
    functionName: "buyToken",
    args: [presaleIndex, AmountData, affiliatAddress],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  return (
    <RightSideDetailsWrapper>
      <div className="flex border border-[#aca4ff]/25 py-2 rounded-2xl justify-between">
        <p className="font-bold text-sm p-1 pl-2 dark:text-[#aca4ff] text-[#aca4ff]">
          Make sure the website is purplesale finance!
        </p>
      </div>
      <div className="lg:ml-32 ml-20">
        <p className="ml-4 mt-3 text-sm font-bold mb-2 text-gray-700 dark:text-gray-100">
          Presale Starts In
        </p>
        <div className="text-sm font-normal text-gray-700 dark:text-gray-100">
          <div>
            <CountdownTimer timestamp={EndTime} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <p className="mb-3 text-sm font-bold text-gray-700 dark:text-white">
          Progress ({(moneyRaised / hardCapCurrency) * 100}%)
        </p>
        <div className="w-full bg-gray-300 rounded-full">
          <div
            className={`h-2 rounded-full bg-gradient-to-r from-[#aca4ff] to-lime-500`}
            style={{
              width: `min(${(moneyRaised / hardCapCurrency) * 100}%, 100%)`,
            }}
          ></div>
        </div>
        <div className="flex justify-between">
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            {moneyRaised
              ? `${moneyRaised} ${" "} ${currency}`
              : `0 ${currency}`}
          </p>
          <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
            {hardCapCurrency} {currency}
          </p>
        </div>
        <input
          onChange={handleOnChange}
          id="launchpadDetailsAmount"
          name="launchpadDetailsAmount"
          type="number"
          placeholder="Ex:1000000000000000000"
          className="w-full p-2 border border-[#aca4ff] rounded-sm bg-stone-800"
        />
      </div>

      <button
        className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#aca4ff] rounded-lg hover:bg-[#aca4ff] focus:ring-4 focus:outline-none focus:ring-[#aca4ff] dark:bg-[#aca4ff] dark:hover:bg-[#aca4ff] dark:focus:ring-[#aca4ff]"
        onClick={() => {
          buyToken();
        }}
      >
        {purchaseTokenAddress ===
        "0x0000000000000000000000000000000000000000" ? (
          <p>Buy with Matic</p>
        ) : (
          <p>Buy with {currency}</p>
        )}
        <BiWalletAlt className="ml-2" />
      </button>
    </RightSideDetailsWrapper>
  );
};

export default Cards;
