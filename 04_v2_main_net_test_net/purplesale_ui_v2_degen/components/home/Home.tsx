import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import BoxHome from "@/components/home/Components/BoxHome";
import BgBox from "../TailwindWrapper/HomePage/bgBox";
import { useAccount } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switcher from "@/components/Navbar/mode/Switcher";
import { useNetwork } from "wagmi";
const HomeMain = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreateNow = async () => {
    setIsLoading(true);
    // isConnected is used here
    setIsLoading(false);
    if (isConnected) {
      toast.success("Success! Your operation was completed successfully.", {
        position: "bottom-right",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      <ToastContainer position="bottom-right" theme="dark" autoClose={1000} />
      <BgBox>
        <div style={{ position: "relative" }}>
          <div>
            <Image
              className="pt-4 pb-4"
              src="/homebackground.svg"
              alt="Hey"
              height={2000}
              width={2000}
            />
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
              <div style={{ marginLeft: "auto" }}>
                <Image
                  className="pt-4 pb-4"
                  src="/demon.svg"
                  alt="Hey"
                  height={600}
                  width={600}
                />
              </div>
            </div>
          </div>
        </div>

        <BoxHome />
        <hr className="lg:mt-20 lg:mb-20 mb-5 mt-5 mx-16 dark:border-gray-400/50 " />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-2 whitespace-nowrap justify-items-center sm:gap-12 sm:px-4 md:gap-20">
          <div className="bg-[url('/Home/b1.svg')] flex lg:h-[254px] lg:w-[665px] h-[127px] w-[332px] bg-cover bg-no-repeat mb-10 bg-center items-center justify-center transform transition duration-500 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="flex flex-col items-center justify-center">
              <span className="block text-xl sm:text-lg md:text-2xl lg:text-3xl font-normal subpixel-antialiased">
                REVV Racing Launches
              </span>
              <span className="block text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold subpixel-antialiased">
                $ 150,000 Play-to-Earn
              </span>
              <span className="block text-2xl font-normal subpixel-antialiased">
                Tournament
              </span>
            </div>
          </div>

          <div className="bg-[url('/Home/b2.svg')] flex lg:h-[254px] lg:w-[665px] h-[127px] w-[332px] bg-cover bg-no-repeat mb-10 bg-center items-center justify-center transform transition duration-500 ease-in-out hover:scale-105 shadow-lg hover:shadow-xl">
            <div className="flex  items-center gap-4 justify-center">
              <span className="block text-6xl font-bold subpixel-antialiased">
                JUL
              </span>
              <p className="flex flex-col">
                <span className="block text-4xl font-medium subpixel-antialiased">
                  Industry
                </span>
                <span className="block text-4xl font-medium subpixel-antialiased">
                  Report
                </span>
              </p>
            </div>
          </div>
        </div>
      </BgBox>

      <p className="text-[#BA9999] text-center mt-4 lg:mt-20 mb-10 text-md px-4 lg:px-0 lg:text-xl font-light">
        <span className="block">
          Disclaimer: PinkSale will never endorse or encourage that you invest
          in any of the projects listed
        </span>
        <span className="block">
          and therefore, accept no liability for any loss occasioned. It is the
          user(s) responsibility to do
        </span>
        <span className="block">
          their own research and seek financial advice from a professional. More
          information about
        </span>
        <span className="block">(DYOR) can be found via Clone</span>
      </p>
    </div>
  );
};

export default HomeMain;
