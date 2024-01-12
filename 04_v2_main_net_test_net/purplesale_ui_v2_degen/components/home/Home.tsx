import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import BoxHome from "@/components/home/Components/BoxHome";
import BgBox from "../TailwindWrapper/HomePage/bgBox";
import { useAccount } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switcher from "@/components/Navbar/mode/Switcher";
import { useNetwork } from "wagmi";
import { BsBarChartFill } from "react-icons/bs";
import FormContext from "@/contexts/create/FormContext";
const HomeMain = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkTheme } = useContext(FormContext);
  const { activeTab, setActiveTab } = useContext(FormContext);
  // Show warning if not connected to MetaMask
  useEffect(() => {
    if (!isConnected) {
      const interval = setInterval(() => {
        toast.warning(
          "Please connect to MetaMask. You are currently not connected.",
          {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  return (
    <div className="px-4">
      <ToastContainer position="bottom-right" theme="dark" autoClose={1000} />
      <div className="px-10">
        <div className="bg-gray-700/50 h-18 mb-8 flex p-2 rounded-2xl justify-between gap-5">
          <button
            className={`w-full h-14 px-6 text-4xl border-4 font-bold transition-colors duration-150 rounded-2xl focus:shadow-outline ${
              activeTab === 1
                ? "text-black border-yellow-400 bg-gradient-to-b from-[#ff7b4c] to-[#fb6e4c]"
                : "text-indigo-100 border-yellow-700"
            }`}
            onClick={() => setActiveTab(1)}
          >
            ALPHA MODE
          </button>
          <button
            className={`w-full h-14 px-6 text-4xl border-4 font-bold transition-colors duration-150 rounded-2xl focus:shadow-outline ${
              activeTab === 0
                ? "text-black border-yellow-400 bg-gradient-to-b from-[#ff7b4c] to-[#fb6e4c]"
                : "text-indigo-100 border-yellow-700"
            }`}
            onClick={() => setActiveTab(0)}
          >
            🔥🔥DEGEN MODE🔥🔥
          </button>
        </div>
      </div>
      <div className="border border-[#FDB149] bg-gray-600/25 items-center mx-96 rounded-2xl py-2">
        <p className="text-[#FDB149] text-center font-bold">
          {`You are currently in ${
            activeTab === 1 ? "Alpha" : "Degen"
          } mode, Please click ${
            activeTab === 1 ? "Degen" : "Alpha"
          } mode to switch`}
        </p>
      </div>
      <BgBox>
        <div style={{ position: "relative" }}>
          <div>
            {isDarkTheme ? (
              <Image
                className="pt-4 pb-4"
                src="/bendwhite.svg"
                alt="Hey"
                height={2000}
                width={2000}
              />
            ) : (
              <Image
                className="pt-4 pb-4"
                src="/bend.svg"
                alt="Hey"
                height={2000}
                width={2000}
              />
            )}
            <div
              style={{
                position: "absolute",
                top: "0%",
                left: "0px",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <div className="p-20">
                <h1 className="md:text-xm font-semibold md:text-3xl lg:text-6xl mt-12 mb-12 text-white">
                  The launchpad <br /> protocol for everyone
                </h1>
                <p className="text-lg mb-12 text-white md:text-2xl">
                  PinkSale helps everyone to create their own tokens and token{" "}
                  <br /> sales in few seconds. Tokens created on PinkSale will
                  be <br /> verified and published on explorer websites.
                </p>
                <button
                  className="bg-[#7BFE88]  text-black  font-semibold whitespace-nowrap px-4 py-1 lg:px-9 lg:py-3 rounded-3xl transform transition duration-500 ease-in-out hover:scale-110 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    router.push("/launchpads/create");
                  }}
                >
                  CREATE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        <BoxHome />{" "}
        <h2 className="text-4xl mt-16 mb-8 font-bold text-white flex justify-center">
          A Suite of Tools for Token Sales.{" "}
        </h2>
        <p className="text-gray-400 text-lg mb-8 text-center break-all ">
          A suite of tools were built to help you create your own tokens and
          launchpads in a fast, simple and <br />
          cheap way, with no prior code knowledge required and 100%
          decentralized!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 whitespace-nowrap justify-items-center md:gap-20 p-10 gap-8">
          <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
            <span className="flex justify-between gap-4">
              <Image
                src="/Home/icons/standard.svg"
                height={200}
                width={200}
                alt="pot"
                className="h-16 w-16"
              />
              <span className="flex flex-col">
                <p className="font-medium  text-3xl whitespace-nowrap">
                  Standard
                </p>
                <p className="font-normal text-gray-400 text-1xl text-md break-words ">
                  Standard Mint standard tokens
                  <br /> on ETH, BSC, AVAX, Fantom, Polygon.
                </p>
              </span>
            </span>
          </div>
          <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
            <span className="flex justify-between gap-4">
              <Image
                src="/Home/icons/punch.svg"
                height={200}
                width={200}
                alt="pot"
                className="h-16 w-16"
              />
              <span className="flex flex-col">
                <p className="font-medium  text-3xl whitespace-nowrap">
                  Deflationary
                </p>
                <p className="font-normal text-gray-400 text-1xl text-md break-words ">
                  Mint standard tokens on ETH, BSC,
                  <br /> AVAX, Fantom, Polygon.
                </p>
              </span>
            </span>
          </div>
          <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
            <span className="flex justify-between gap-4">
              <Image
                src="/Home/icons/pot.svg"
                height={200}
                width={200}
                alt="pot"
                className="h-16 w-16"
              />
              <span className="flex flex-col">
                <p className="font-medium text-3xl whitespace-nowrap">
                  Customization
                </p>
                <p className="font-normal text-gray-400 text-1xl text-md break-words ">
                  Mint standard tokens on ETH, BSC,
                  <br /> BSC, AVAX, Fantom, Polygon.
                </p>
              </span>
            </span>
          </div>
          <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
            <span className="flex justify-between gap-4">
              <Image
                src="/Home/icons/flower.svg"
                height={200}
                width={200}
                alt="pot"
                className="h-16 w-16"
              />
              <span className="flex flex-col">
                <p className="font-medium text-3xl whitespace-nowrap">
                  Standard
                </p>
                <p className="font-normal text-gray-400 text-1xl text-md break-words ">
                  Standard Mint standard tokens
                  <br /> on ETH, BSC, AVAX, Fantom, Polygon.
                </p>
              </span>
            </span>
          </div>
          <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
            <span className="flex justify-between gap-4">
              <Image
                src="/Home/icons/punch2.svg"
                height={200}
                width={200}
                alt="pot"
                className="h-16 w-16"
              />
              <span className="flex flex-col">
                <p className="font-medium text-3xl whitespace-nowrap">
                  Deflationary
                </p>
                <p className="font-normal text-gray-400 text-1xl text-md break-words ">
                  Standard Mint standard tokens
                  <br /> on ETH, BSC, AVAX, Fantom, Polygon.
                </p>
              </span>
            </span>
          </div>
          <div className="flex text-white bg-[url('/Rectangle.png')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
            <span className="flex justify-between gap-4">
              <Image
                src="/Home/icons/pot2.svg"
                height={200}
                width={200}
                alt="pot"
                className="h-16 w-16"
              />
              <span className="flex flex-col">
                <p className="font-medium text-3xl whitespace-nowrap">
                  Customization
                </p>
                <p className="font-normal text-gray-400 text-1xl text-md break-words ">
                  Standard Mint standard tokens
                  <br /> on ETH, BSC, AVAX, Fantom, Polygon.
                </p>
              </span>
            </span>
          </div>
        </div>
        <h2 className="text-4xl mt-16 mb-2 font-bold text-white flex justify-center">
          Our Partners{" "}
        </h2>
        <div className="flex justify-between px-10">
          <Image
            src="/Home/partner/1.svg"
            height={1200}
            width={1200}
            alt="pot"
            className="h-48 w-48"
          />
          <Image
            src="/Home/partner/2.svg"
            height={1200}
            width={1200}
            alt="pot"
            className="h-48 w-48"
          />
          <Image
            src="/Home/partner/3.svg"
            height={1200}
            width={1200}
            alt="pot"
            className="h-48 w-48"
          />
          <Image
            src="/Home/partner/4.svg"
            height={1200}
            width={1200}
            alt="pot"
            className="h-48 w-48"
          />
          <Image
            src="/Home/partner/5.svg"
            height={1200}
            width={1200}
            alt="pot"
            className="h-48 w-48"
          />
        </div>
        <footer className="rounded-2xl shadow m-4 bg-gray-800/50">
          <div className="w-full mx-auto max-w-screen-xl py-8  md:flex md:items-center md:justify-between">
            <span className="text-lg text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a
                href="https://flowbite.com/"
                className="text-lg hover:underline"
              >
                Purple Sale™
              </a>
              . All Rights Reserved.
            </span>
            <Image
              src="/footer/logo.svg"
              alt={"logo"}
              width={150}
              height={150}
            />
            <ul className="flex flex-wrap items-center mt-3 text-lg font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </BgBox>
    </div>
  );
};

export default HomeMain;
