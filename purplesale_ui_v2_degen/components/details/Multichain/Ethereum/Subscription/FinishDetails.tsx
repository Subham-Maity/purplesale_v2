import React, { useContext, useEffect, useState } from "react";
import { IoGlobeOutline } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import Image from "next/image";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  AiFillYoutube,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineHeart,
  AiOutlineInstagram,
  AiOutlineReddit,
} from "react-icons/ai";
import { useAccount } from "wagmi";
import axios from "@/constants/axio";
import Link from "next/link";
import { BiLike, BiLogoDiscordAlt } from "react-icons/bi";
import { FaCircleDot } from "react-icons/fa6";
import DetailsFinishWrapper from "@/components/TailwindWrapper/Details/FinishPage";

interface FinishDetailsProps {
  tokenAddress: string;
  tokenName: string;
  symbolToken: string;
  tokenDecimals: number;
  totalSupply: number;
  softCap: number;
  hardCap: number;
  liquidityAdditionPercent: number; //Token for Liquidity = (liquidityAdditionPercent/100)*tokenToSell
  subscriptionPrice: number;
  listingPrice: number;
  startTime: number;
  endTime: number;
  liquidityPercent: number;
  liquidityUnlockTime: number;
  dataIndex: any;
  imgHref: any;
  description: string;
  facebook?: string; //web2Data
  twitter?: string; //web2Data
  github?: string; //web2Data
  website?: string; //web2Data
  instagram?: string; //web2Data
  discord?: string; //web2Data
  reddit?: string; //web2Data
  youtube?: string; //web2Data
  currency: string;
  softAndHardCapCurrency: string;
  softCap1: number;
  hardCap1: number;
}
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
      className={` w-18 gap-0.5 h-5 pr-2 flex justify-between font-bold text-xs items-center mr-2 rounded-full p-0.5 bg-white text-black ${textClass}`}
    >
      <FaCircleDot className={`text-lg ${textClass} rounded-full`} />

      {saleState}
    </span>
  );
};

const FinishDetails: React.FC<FinishDetailsProps> = ({
  tokenAddress,
  tokenName,
  symbolToken,
  tokenDecimals,
  totalSupply,
  softCap,
  hardCap,
  softCap1,
  hardCap1,
  liquidityAdditionPercent, //Token for Liquidity = (liquidityAdditionPercent/100)*tokenToSell
  subscriptionPrice,
  listingPrice,
  startTime,
  endTime,
  liquidityPercent,
  liquidityUnlockTime,
  dataIndex,
  imgHref,
  description,
  facebook, //web2Data
  twitter, //web2Data
  github, //web2Data
  website, //web2Data
  instagram, //web2Data
  discord, //web2Data
  reddit, //web2Data
  youtube, //web2Data
  currency,
  softAndHardCapCurrency,
}) => {
  // Convert Unix timestamp to milliseconds
  const date = new Date(startTime * 1000);
  // Format the date and time
  const formattedDate = `${date.getFullYear()}.${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}.${("0" + date.getDate()).slice(-2)} ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;

  const endDate = new Date(endTime * 1000);
  const formattedEndDateTime = `${endDate.getFullYear()}.${(
    "0" +
    (endDate.getMonth() + 1)
  ).slice(-2)}.${("0" + endDate.getDate()).slice(-2)} ${(
    "0" + endDate.getHours()
  ).slice(-2)}:${("0" + endDate.getMinutes()).slice(-2)}`;
  const [isCardAdded, setIsCardAdded] = useState(false);
  const { address, isConnected } = useAccount();
  const handleHeartButtonClick = async (
    dataIndex: any,
    address: any,
    tokenName: any,
    symbolToken: any,
    imgHref: any,
  ) => {
    const postData = {
      Name: tokenName,
      Symbol: symbolToken,
      Link: `/details/subscription/${dataIndex}`,
      WalletAddress: address,
      imgHref: imgHref,
    };
    try {
      await axios.post("/cart", postData);
      setIsCardAdded(true);
      localStorage.setItem("isCardAdded", "true");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <>
      <DetailsFinishWrapper>
        <div className="flex justify-between">
          <div className="flex justify-between gap-4">
            <div>
              <Image
                width={40}
                height={40}
                src={imgHref}
                className="rounded-full w-12 h-12 border-2 lg:block hidden"
                alt=""
              />
            </div>
            <div>
              <h1 className="text-3xl mb-4">{tokenName}</h1>
              <div className="flex gap-3 mb-4">
                {website ? (
                  <Link href={website}>
                    <button>
                      <IoGlobeOutline />
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
                {twitter ? (
                  <Link href={twitter}>
                    <button>
                      <FaTwitter />
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
                {discord ? (
                  <Link href={discord}>
                    <button>
                      <BiLogoDiscordAlt />
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
                {instagram ? (
                  <Link href={instagram}>
                    <button>
                      <AiOutlineInstagram />
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
                {reddit ? (
                  <Link href={reddit}>
                    <button>
                      <AiOutlineReddit />
                    </button>
                  </Link>
                ) : (
                  <></>
                )}

                {youtube ? (
                  <Link href={youtube}>
                    <button>
                      <AiFillYoutube />
                    </button>
                  </Link>
                ) : (
                  <></>
                )}

                {facebook ? (
                  <Link href={facebook}>
                    <button>
                      <AiOutlineFacebook />
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
                {github ? (
                  <Link href={github}>
                    <button>
                      <AiOutlineGithub />
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex rounded-lg text-gray-700 dark:text-gray-100 cursor-pointer"
              onClick={() => {
                handleHeartButtonClick(
                  dataIndex,
                  address,
                  tokenName,
                  symbolToken,
                  imgHref,
                );
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

            <SaleStatus startDate={startTime} endDate={endTime} />
          </div>
        </div>
        <p>{description}</p>
        <form className=" py-16 space-y-4">
          <div className="flex gap-12 justify-between break-all">
            <p>Token Address</p>
            <p>{tokenAddress}</p>
          </div>
          <div className="flex gap-12 justify-between">
            <p>Token Name</p>
            <p>{tokenName}</p>
          </div>
          <div className="flex justify-between">
            <p>Token Symbol</p>
            <p>{symbolToken}</p>
          </div>
          <div className="flex justify-between">
            <p>Token Decimals</p>
            <p>{tokenDecimals}</p>
          </div>

          <div className="flex gap-12 justify-between break-all">
            <p>Total Supply</p>
            <p>
              {totalSupply / 10 ** tokenDecimals} {"  "} {symbolToken}
            </p>
          </div>
          <div className="flex gap0-12 justify-between break-all">
            <p>HardCap Tokens</p>
            <p>
              {hardCap} {"  "} {softAndHardCapCurrency} ({hardCap1} {currency})
            </p>
          </div>
          <div className="flex gap0-12 justify-between break-all">
            <p>SoftCap Tokens</p>
            <p>
              {softCap} {"  "} {softAndHardCapCurrency}({softCap1} {currency})
            </p>
          </div>

          <div className="flex gap0-12 justify-between break-all">
            <p>Tokens For Liquidity</p>
            <p>
              {(liquidityAdditionPercent / 100) * hardCap} {"  "} {symbolToken}
            </p>
          </div>
          <div className="flex gap0-12 justify-between break-all">
            <p>Subscription Rate</p>
            <p>
              1 {currency} = {subscriptionPrice} {"  "} {tokenName}
            </p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Lisiting Rate</p>
            <p>
              1 {currency} = {listingPrice} {"  "} {tokenName}
            </p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Unsold Tokens</p>
            <p>Refund</p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Start Time</p>
            <p>{formattedDate} (UTC)</p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>End Time</p>
            <p>{formattedEndDateTime} (UTC)</p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Lisiting On</p>
            <p> Uniswap</p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Liquidity Percent</p>
            <p> {liquidityPercent}%</p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Liquidity Lockup Time</p>
            <p> {Math.floor(liquidityUnlockTime / (60 * 60 * 24))} Days</p>
          </div>
        </form>
      </DetailsFinishWrapper>
    </>
  );
};

export default FinishDetails;
