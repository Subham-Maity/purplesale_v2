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
import { BiLogoDiscordAlt } from "react-icons/bi";

interface FinishDetailsProps {
  title: string;
  tokenName: string;
  symbolToken: string;
  tokenDecimals: number;
  tokenAddress: string;
  totalSupply: number;
  presaleRate: number;
  softCap: number;
  hardCap: number;
  burnOrRefund: boolean;
  preSaleStartTime: number;
  preSaleEndTime: number;
  liquidityAdditionPercent: number;
  liquidityUnlockTime: number;
  listingRate: number;
  dataIndex: number;
  imgHref: string;
  description: string;
  purchaseTokenDecimal: number;
  currency: string;
  facebook?: string; //web2Data
  twitter?: string; //web2Data
  github?: string; //web2Data
  website?: string; //web2Data
  instagram?: string; //web2Data
  discord?: string; //web2Data
  reddit?: string; //web2Data
  youtube?: string; //web2Data
  hardCapTokenForPresale: number;
  softCapCurrency: string;
  hardCapCurrency: string;
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

const FinishDetails: React.FC<FinishDetailsProps> = ({
  title,
  tokenName,
  symbolToken,
  tokenDecimals,
  tokenAddress,
  totalSupply,
  presaleRate,
  softCap,
  hardCap,
  burnOrRefund,
  preSaleStartTime,
  preSaleEndTime,
  liquidityAdditionPercent,
  liquidityUnlockTime,
  listingRate,
  dataIndex,
  imgHref,
  description,
  currency,
  softCapCurrency,
  hardCapCurrency,
  facebook, //web2Data
  twitter, //web2Data
  github, //web2Data
  website, //web2Data
  instagram, //web2Data
  discord, //web2Data
  reddit, //web2Data
  youtube, //web2Data
  purchaseTokenDecimal,
  hardCapTokenForPresale,
}) => {
  // Convert Unix timestamp to milliseconds
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
      Link: `/details/launchpad/${dataIndex}`,
      WalletAddress: address,
      imgHref: imgHref,
    };
    console.log(postData);
    try {
      await axios.post("/cart", postData);
      setIsCardAdded(true);
      localStorage.setItem("isCardAdded", "true");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  return (
    <div className="mt-4 flex justify-left mb-4 items-center">
      <div className="w-[370px] lg:w-[640px] md:w-[368px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div>
              <Image
                width={40}
                height={40}
                src={imgHref}
                className="rounded-full w-12 h-12 border-2 ml-2 mt-2"
                alt=""
              />
            </div>
            <div>
              <h1 className="text-3xl mb-4">{title}</h1>
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
              className="h-10 w-8 flex items-center justify-center space-x-1 rounded-lg py-2 px-2 bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-gray-100 cursor-pointer"
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
              <AiOutlineHeart
                className={`${
                  isCardAdded
                    ? "text-red-500"
                    : "text-slate-200 dark:text-slate-200"
                }`}
              />
            </button>

            <SaleStatus startDate={preSaleStartTime} endDate={preSaleEndTime} />
          </div>
        </div>
        <p>{description}</p>
        <form className=" py-16 space-y-4">
          <div>
            <p>
              {liquidityAdditionPercent == 0 &&
              liquidityUnlockTime == 0 &&
              listingRate == 0 ? (
                <>
                  <div className="flex justify-between mt-4">
                    <p>Manual Listing:</p>
                    <p className="text-indigo-500">
                      Liquidity will not be automatically added
                    </p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </p>
          </div>
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
              {totalSupply / 10 ** tokenDecimals} {currency}
            </p>
          </div>

          <div className="flex gap0-12 justify-between break-all">
            <p>Tokens For Presale </p>

            <p>
              {presaleRate *
                (hardCapTokenForPresale / 10 ** purchaseTokenDecimal)}{" "}
              {currency}
            </p>
          </div>

          <div className="flex gap0-12 justify-between break-all">
            {(liquidityAdditionPercent * (presaleRate * hardCap)) / 100 ===
            0 ? null : (
              <>
                <p>Tokens For Liquidity</p>
                <p>
                  {(liquidityAdditionPercent * (presaleRate * hardCap)) /
                    100 ===
                  0
                    ? null
                    : (liquidityAdditionPercent * (presaleRate * hardCap)) /
                      100}{" "}
                  {currency}
                </p>
              </>
            )}
          </div>
          <div className="flex gap0-12 justify-between break-all">
            <p>Presale Rate</p>
            <p>
              {presaleRate} {currency}
            </p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Soft Cap</p>
            <p>
              {softCap} {softCapCurrency}
            </p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Hard Cap</p>
            <p>
              {hardCap} {hardCapCurrency}
            </p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Unsold Tokens</p>
            <p>{burnOrRefund ? "Burn" : "Refund"}</p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Presale Start Time</p>
            <p>{formattedDate} (UTC)</p>
          </div>
          <div className="flex gap-12 justify-between break-all">
            <p>Presale End Time</p>
            <p>{formattedEndDateTime} (UTC)</p>
          </div>

          <div>
            <p>
              {liquidityAdditionPercent == 0 &&
              liquidityUnlockTime == 0 &&
              listingRate == 0 ? (
                <>
                  <div className="flex justify-between mt-4">
                    <p>Liquidity Percentage:</p>
                    <p>Manual Listing </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between mt-4">
                    <p>Listing Rate:</p>{" "}
                    <p>
                      1 MATIC = {listingRate} {tokenName}
                    </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <p>Listing On:</p>
                    <p>Uniswap</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <p>Liquidity Percent:</p>
                    <p>{liquidityAdditionPercent}% </p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <p>Liquidity Lockup Time:</p>
                    <p>
                      {Math.floor(liquidityUnlockTime / (60 * 60 * 24))} days
                      after pool ends
                    </p>
                  </div>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinishDetails;
