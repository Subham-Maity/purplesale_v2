import React, { useEffect, useState } from "react";
import { IoGlobeOutline } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineReddit,
} from "react-icons/ai";
import Link from "next/link";
import { BiLogoDiscordAlt } from "react-icons/bi";
import { AiFillYoutube, AiOutlineFacebook } from "react-icons/ai";
import DetailsFinishWrapper from "@/components/TailwindWrapper/Details/FinishPage";
import { FaCircleDot } from "react-icons/fa6";

interface FinishDetailsProps {
  softCap: number | null;
  hardCap: number | null;
  StartDate: number;
  EndDate: number;
  firstReleaseForProject: number;
  cycleReleasePercentages: number;
  vestingPeriod: number;
  title: string; //web2Data
  description: string; //web2Data
  imgHref: string; //web2Data
  facebook?: string; //web2Data
  twitter?: string; //web2Data
  github?: string; //web2Data
  website?: string; //web2Data
  instagram?: string; //web2Data
  discord?: string; //web2Data
  reddit?: string; //web2Data
  youtube?: string; //web2Data
  currency?: string; //web2Data
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
  softCap,
  hardCap,
  StartDate,
  EndDate,
  firstReleaseForProject,
  cycleReleasePercentages,
  vestingPeriod,
  title, //web2Data
  description, //web2Data
  imgHref, //web2Data
  facebook, //web2Data
  twitter, //web2Data
  github, //web2Data
  website, //web2Data
  instagram, //web2Data
  discord, //web2Data
  reddit, //web2Data
  youtube, //web2Data
  currency, //web2Data
}) => {
  // Convert Unix timestamp to milliseconds
  const date = new Date(StartDate * 1000);
  // Format the date and time
  const formattedDate = `${date.getFullYear()}.${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}.${("0" + date.getDate()).slice(-2)} ${(
    "0" + date.getHours()
  ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;

  const endDate = new Date(EndDate * 1000);
  const formattedEndDateTime = `${endDate.getFullYear()}.${(
    "0" +
    (endDate.getMonth() + 1)
  ).slice(-2)}.${("0" + endDate.getDate()).slice(-2)} ${(
    "0" + endDate.getHours()
  ).slice(-2)}:${("0" + endDate.getMinutes()).slice(-2)}`;

  return (
    <>
      <DetailsFinishWrapper>
        <div className="flex justify-between">
          <div className="flex gap-2">
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
            <SaleStatus startDate={StartDate} endDate={EndDate} />
          </div>
        </div>
        <p>{description}</p>
        <form className=" py-16 space-y-4">
          <div className="flex gap-12 justify-between break-all">
            <p>Soft Cap</p>
            <p>
              {softCap}
              {currency}
            </p>
          </div>
          <div className="flex gap-12 justify-between">
            <p>Hard Cap</p>
            <p>
              {hardCap} {currency}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Private Sale Start Time</p>
            <p>{formattedDate} (UTC)</p>
          </div>
          <div className="flex justify-between">
            <p>Private Sale End Time</p>
            <p>{formattedEndDateTime} (UTC)</p>
          </div>

          <div className="flex gap-12 justify-between break-all">
            <p>First Release For Project</p>
            <p>{firstReleaseForProject} %</p>
          </div>

          <div className="flex gap-12 justify-between break-all">
            <p>Vesting For Project</p>
            <p>
              {cycleReleasePercentages}% each {vestingPeriod} days
            </p>
          </div>
        </form>
      </DetailsFinishWrapper>
    </>
  );
};

export default FinishDetails;
