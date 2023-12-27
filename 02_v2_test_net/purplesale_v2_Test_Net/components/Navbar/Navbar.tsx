"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import logo from "@/public/logo.svg";
import { FaTimes } from "react-icons/fa";
import Style from "./Navbar.module.css";
import SideNavbar from "./SideNavbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Switcher from "@/components/Navbar/mode/Switcher";
import { BiUserCheck } from "react-icons/bi";
import { useRouter } from "next/router";
const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(true); // State for sidebar visibility
  const router = useRouter();

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <nav className="sticky flex z-50 items-center justify-between dark:bg-[#242525] bg-[#f9fafb] p-4 h-12 md:h-16 lg:h-20">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Link href="/">
            <div className="md:hidden">
              <Image src={logo} width={50} height={50} alt="Logo" />
            </div>
          </Link>
        </div>
        <div className="flex justify-between items-center w-full mb-4"></div>
        <div className="flex items-center gap-2">
          {/*<NetworkButton />*/}
          <div className="connectbtn">
            {/*<ConnectWallet key="connect-wallet" />*/}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <div className="">
          <FaTimes
            size={24}
            color="#9ca3af"
            onClick={handleSidebarToggle}
            className="absolute top-4 right-4 cursor-pointer lg:hidden"
          />
        </div>
      )}
      <button
        className="text-white hover:text-gray-200 focus:text-gray-200 mr-6 "
        onClick={() => router.push("/me")}
      >
        <BiUserCheck className="w-6 h-6" />
      </button>
      <div className={Style.connectbtn}>
        <ConnectButton />
      </div>

      <button
        className="text-white hover:text-gray-200 focus:text-gray-200 lg:hidden ml-6 "
        onClick={handleSidebarToggle}
      >
        <FaBars className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default Navbar;
