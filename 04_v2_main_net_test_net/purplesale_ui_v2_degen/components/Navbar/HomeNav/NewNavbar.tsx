import React, { useState } from "react";
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

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Index = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const { chain } = useNetwork();
  const router = useRouter();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  return (
    <motion.div
      animate={
        isSidebarOpen
          ? { width: "82vw", transition: { duration: 0.3 } }
          : typeof window !== "undefined" && window.innerWidth > 1024
          ? { width: "92vw", transition: { duration: 0.3 } }
          : { width: "100vw", transition: { duration: 0.3 } }
      }
      className={` rounded-md w-full  `}
    >
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
          className="hover:cursor-pointer lg:hidden"
          onClick={() => {
            setOpenMobileNav(true);
          }}
        />
      </div>

      <div className="flex flex-col">
        <div className="border-b pb-3 border-gray-400/20 mb-3">
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
      </div>
    </motion.div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
