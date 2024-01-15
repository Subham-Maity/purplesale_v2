import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import BoxHome from "@/components/home/Components/BoxHome";
import BgBox from "../TailwindWrapper/HomePage/bgBox";
import { useAccount } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormContext from "@/contexts/create/FormContext";
const HomeMain = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { isDarkTheme } = useContext(FormContext);
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

      <BgBox>
        <div className="flex w-full rounded-xl mt-4 dark:bg-[url('/bendwhite.svg')] bg-[url('/bend.svg')] mb-4 bg-cover bg-no-repeat bg-center">
          <div className="p-4 md:p-20">
            <h1 className="font-semibold text-md md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-6xl lg:mt-12 lg:mb-12 text-white">
              The launchpad <br/> protocol for everyone
            </h1>
            <p className="text-sm lg:block hidden lg:mb-12 text-white md:text-2xl">
              PinkSale helps everyone to create
              <br className="lg:block hidden"/>their own tokens and token sales in few

              <br className="lg:block hidden"/> seconds.Tokens created on PinkSale will be <br className="md:hidden lg:block hidden"/>
              verified and published on explorer websites.
            </p>
            <button
                className="bg-[#7BFE88] text-black text-sm lg:text-xl mt-4 lg:mt-0 font-semibold whitespace-nowrap px-4 py-1 lg:px-9 lg:py-3 rounded-3xl transform transition duration-500 ease-in-out hover:scale-110 shadow-lg hover:shadow-xl"
                onClick={() => {
                  router.push("/launchpads/create");
                }}
            >
              CREATE NOW
            </button>
          </div>
        </div>
        <BoxHome/>{" "}
        <h2 className="text-3xl lg:text-4xl mt-16 mb-8 font-bold text-white text-center flex justify-center">
          A Suite of Tools for Token Sales.{" "}
        </h2>
        <p className="text-gray-400 text-sm lg:text-lg mb-8 text-center break-all ">
          A suite of tools were built to help you create your own tokens and
          launchpads in a fast, simple and <br/>
          cheap way, with no prior code knowledge required and 100%
          decentralized!
        </p>
        <div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 whitespace-nowrap justify-items-center xl:gap-4 gap-8">
          <div
              className="flex text-white bg-[url('/Rectangle.svg')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 w-full lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
            <span className="flex justify-between gap-2">
              <Image
                  src="/Home/icons/standard.svg"
                  height={200}
                  width={200}
                alt="pot"
                className="ml-2 lg:ml:0 md md:h-14 md:w-14 lg:h-16 lg:w-16 h-12 w-12"
              />
              <span className="flex flex-col">
                <p className="font-medium  text-3xl whitespace-nowrap">
                  Standard
                </p>
                <p className="font-normal text-gray-400 text-sm lg:text-xl text-md break-words lg:mr-0 mr-2 ">
                  Standard Mint standard
                  <br /> tokens on ETH, BSC, AVAX <br />
                  Polygon.
                </p>
              </span>
            </span>
          </div>
          <div className="flex text-white bg-[url('/Rectangle.svg')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 w-full lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
            <span className="flex justify-between gap-2">
              <Image
                  src="/Home/icons/punch.svg"
                  height={200}
                  width={200}
                  alt="pot"
                  className="ml-2 lg:ml:0 md md:h-14 md:w-14 lg:h-16 lg:w-16 h-12 w-12"
              />
              <span className="flex flex-col">
                <p className="font-medium  text-3xl whitespace-nowrap">
                  Deflationary
                </p>
                  <p className="font-normal text-gray-400 text-sm lg:text-xl text-md break-words lg:mr-0 mr-2 ">
                  Standard Mint standard
                  <br/> tokens on ETH, BSC, AVAX <br/>
                  Polygon.
                </p>
              </span>
            </span>
          </div>
          <div
              className="flex text-white bg-[url('/Rectangle.svg')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 w-full lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
              <span className="flex justify-between gap-2">
              <Image
                  src="/Home/icons/pot.svg"
                  height={200}
                  width={200}
                  alt="pot"
                  className="ml-2 lg:ml:0 md md:h-14 md:w-14 lg:h-16 lg:w-16 h-12 w-12"
              />
              <span className="flex flex-col">
                <p className="font-medium  text-3xl whitespace-nowrap">
                  Customization
                </p>
                  <p className="font-normal text-gray-400 text-sm lg:text-xl text-md break-words lg:mr-0 mr-2 ">
                  Standard Mint standard
                  <br/> tokens on ETH, BSC, AVAX <br/>
                  Polygon.
                </p>
              </span>
            </span>
          </div>
          <div
              className="flex text-white bg-[url('/Rectangle.svg')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 w-full lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
             <span className="flex justify-between gap-2">
              <Image
                  src="/Home/icons/flower.svg"
                  height={200}
                  width={200}
                  alt="pot"
                  className="ml-2 lg:ml:0 md md:h-14 md:w-14 lg:h-16 lg:w-16 h-12 w-12"
              />
              <span className="flex flex-col">
                <p className="font-medium  text-3xl whitespace-nowrap">
                  Standard
                </p>
                  <p className="font-normal text-gray-400 text-sm lg:text-xl text-md break-words lg:mr-0 mr-2 ">
                  Standard Mint standard
                  <br/> tokens on ETH, BSC, AVAX <br/>
                  Polygon.
                </p>
              </span>
            </span>
          </div>
          <div
              className="flex text-white bg-[url('/Rectangle.svg')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 w-full lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
             <span className="flex justify-between gap-2">
              <Image
                  src="/Home/icons/punch2.svg"
                  height={200}
                  width={200}
                  alt="pot"
                  className="ml-2 lg:ml:0 md md:h-14 md:w-14 lg:h-16 lg:w-16 h-12 w-12"
              />
              <span className="flex flex-col">
                <p className="font-medium  text-3xl whitespace-nowrap">
                  Deflationary
                </p>
                 <p className="font-normal text-gray-400 text-sm lg:text-xl text-md break-words lg:mr-0 mr-2 ">
                  Standard Mint standard
                  <br/> tokens on ETH, BSC, AVAX <br/>
                  Polygon.
                </p>
              </span>
            </span>
          </div>
          <div
              className="flex text-white bg-[url('/Rectangle.svg')] bg-cover bg-no-repeat flex-col items-center justify-center gap-4 w-full lg:h-[211px] lg:w-full  border-gray-600/75 border border-primaryButton hover:border-text hover:scale-[1.05] transition-all ease-in-out duration-500 py-5 lg:p-2 shadow-lg aspect-w-1 aspect-h-1 rounded-3xl ">
             <span className="flex justify-between gap-2">
              <Image
                  src="/Home/icons/pot2.svg"
                  height={200}
                  width={200}
                  alt="pot"
                  className="ml-2 lg:ml:0 md md:h-14 md:w-14 lg:h-16 lg:w-16 h-12 w-12"
              />
              <span className="flex flex-col">
                <p className="font-medium  text-3xl whitespace-nowrap">
                  Customization
                </p>
                  <p className="font-normal text-gray-400 text-sm lg:text-xl text-md break-words lg:mr-0 mr-2 ">
                  Standard Mint standard
                  <br/> tokens on ETH, BSC, AVAX <br/>
                  Polygon.
                </p>
              </span>
            </span>
          </div>
        </div>
        <div className="lg:block hidden">
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
        </div>
        <footer className="rounded-2xl mb-4 px-2 shadow bg-gray-800/50 lg:mt-0 mt-8">
          <div className="w-full mx-auto max-w-screen-xl py-8  md:flex md:items-center md:justify-between">
            <span className="ml-2 lg:ml-0 mb-2 lg:mb-0 text-lg text-gray-500 sm:text-center dark:text-gray-400">
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
              className="lg:block hidden"
            />
            <ul className="flex flex-wrap items-center mt-3 text-sm ml-2 lg:ml-0 mb-2 lg:mb-0 lg:text-lg font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
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
            <Image
              src="/footer/logo.svg"
              alt={"logo"}
              width={100}
              height={100}
              className="lg:hidden ml-2 lg:ml-0 mb-2 lg:mb-0"
            />
          </div>
        </footer>
      </BgBox>
    </div>
  );
};

export default HomeMain;
