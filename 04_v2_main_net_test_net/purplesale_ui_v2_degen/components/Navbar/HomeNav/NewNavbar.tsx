import React, { useContext, useState } from "react";
import { useNetwork } from "wagmi";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Avalanche from "@/components/Navbar/HomeNav/Multichain/Avalanche/NewNavbar";
import Arbitrum from "@/components/Navbar/HomeNav/Multichain/Arbitrum/NewNavbar";
import Polygon from "@/components/Navbar/HomeNav/Multichain/Polygon/NewNavbar";
import Ethereum from "@/components/Navbar/HomeNav/Multichain/Ethereum/NewNavbar";
import { RiMenu2Fill, RiUserSettingsLine } from "react-icons/ri";
import { useRouter } from "next/router";
import Switcher from "@/components/Navbar/mode/Switcher";
import MobileSidebar from "@/components/Navbar/mobileNavbarV2";
import FormContext from "@/contexts/create/FormContext";
import { usePathname } from "next/navigation";
import PolygonMumbai from "@/components/Navbar/HomeNav/Multichain/PolygonMumbai/NewNavbar";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Index = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const { activeTab, setActiveTab } = useContext(FormContext);
  const { chain } = useNetwork();
  const router = useRouter();
  const path = usePathname();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  return (
    <div className="flex flex-col mt-2">
      <div className="border-b pb-3 border-gray-400/20 mb-3 flex justify-between">
        <div>
          {openMobileNav && (
            <MobileSidebar
              onClose={(value) => setOpenMobileNav(value)}
              isSidebarOpen={openMobileNav}
            />
          )}
        </div>

        <div>
          <RiMenu2Fill
            size={25}
            className="hover:cursor-pointer text-white lg:hidden"
            onClick={() => {
              setOpenMobileNav(true);
            }}
          />
        </div>
        <div className="flex justify-end gap-5">
          <Switcher />
          <button
            onClick={() => {
              router.push("/me");
            }}
          >
            <RiUserSettingsLine className="text-2xl lg:mb-2 text-white hover:text-gray-400 shadow-2xl shadow-white" />
          </button>
          <ConnectButton />
        </div>
      </div>
      {path == "/" && (
        <div>
          <div
            className={
              chain?.name ||
              chain?.name === "Ethereum" ||
              chain?.name === "Arbitrum One" ||
              chain?.name === "Polygon" ||
              chain?.name === "Avalanche"
                ? "hidden"
                : "block"
            }
          >
            <Ethereum
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>

          {chain?.name === "Ethereum" && (
            <>
              <Ethereum
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </>
          )}

          {chain?.name === "Arbitrum One" && (
            <>
              <Arbitrum
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </>
          )}

          {chain?.name === "Polygon" && (
            <>
              <Polygon
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </>
          )}

          {chain?.name === "Avalanche" && (
            <>
              <Avalanche
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </>
          )}
          {chain?.name === "Polygon Mumbai" && (
            <>
              <PolygonMumbai
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </>
          )}
        </div>
      )}
      <div className="mt-4">
        <div className="px-4">
          <div className="bg-gray-700/50 h-18 mb-4 flex p-2 rounded-2xl justify-between gap-5">
            <button
              className={`w-full h-14 px-6 text-md lg:text-4xl border-4 font-bold transition-colors duration-150 rounded-2xl focus:shadow-outline ${
                activeTab === 1
                  ? "text-black border-yellow-400 bg-gradient-to-b from-[#ff7b4c] to-[#fb6e4c]"
                  : "text-indigo-100 border-yellow-700"
              }`}
              onClick={() => setActiveTab(1)}
            >
              {activeTab === 1 ? (
                "ALPHA MODE"
              ) : (
                <>
                  <span className="hidden md:inline">🔥🔥</span>ALPHA MODE
                  <span className="hidden md:inline">🔥🔥</span>
                </>
              )}
            </button>
            <button
              className={`w-full h-14 px-6 text-md lg:text-4xl border-4 font-bold transition-colors duration-150 rounded-2xl focus:shadow-outline ${
                activeTab === 0
                  ? "text-black border-yellow-400 bg-gradient-to-b from-[#ff7b4c] to-[#fb6e4c]"
                  : "text-indigo-100 border-yellow-700"
              }`}
              onClick={() => setActiveTab(0)}
            >
              {activeTab === 0 ? (
                "DEGEN MODE"
              ) : (
                <>
                  <span className="hidden md:inline">🔥🔥</span>DEGEN MODE
                  <span className="hidden md:inline">🔥🔥</span>
                </>
              )}
            </button>
          </div>
        </div>
        {path !== "/" && (
          <div>
            <div
              className={
                chain?.name ||
                chain?.name === "Ethereum" ||
                chain?.name === "Arbitrum One" ||
                chain?.name === "Polygon" ||
                chain?.name === "Avalanche"
                  ? "hidden"
                  : "block"
              }
            >
              <Ethereum
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </div>

            {chain?.name === "Ethereum" && (
              <>
                <Ethereum
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </>
            )}

            {chain?.name === "Arbitrum One" && (
              <>
                <Arbitrum
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </>
            )}

            {chain?.name === "Polygon" && (
              <>
                <Polygon
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </>
            )}

            {chain?.name === "Avalanche" && (
              <>
                <Avalanche
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </>
            )}
          </div>
        )}
        <div className="border border-[#FDB149] mx-4 bg-gray-600/25 items-center lg:mx-96 mt-4 rounded-2xl py-2">
          <p className="text-[#FDB149] text-center font-bold">
            {`You are currently in ${
              activeTab === 1 ? "Alpha" : "Degen"
            } mode, Please click ${
              activeTab === 1 ? "Degen" : "Alpha"
            } mode to switch`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
