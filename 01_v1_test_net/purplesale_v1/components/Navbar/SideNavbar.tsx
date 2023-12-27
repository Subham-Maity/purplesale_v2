"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineHome,
  AiOutlineRocket,
  AiOutlineUnlock,
  AiOutlineCrown,
  AiOutlineRobot,
  AiFillTwitterSquare,
  AiFillFacebook,
} from "react-icons/ai";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import {
  BsFillShieldFill,
  BsTelegram,
  BsTwitter,
  BsFacebook,
} from "react-icons/bs";
import { BiPaperPlane } from "react-icons/bi";
import { FaUserSecret, FaChartLine } from "react-icons/fa";
import { FaDollarSign, FaAddressCard } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { RiFileLine } from "react-icons/ri";
import { GiParachute } from "react-icons/gi";
import Link from "next/link";
interface NavItem {
  title: string;
  href: string;
  icon?: JSX.Element;
  subNav?: NavItem[];
}

const navConfig: NavItem[] = [
  {
    title: "Launchpads",
    href: "/launchpads",
    icon: <AiOutlineRocket />,
    subNav: [
      {
        title: "Create launchpad",
        href: "/launchpads/create",
      },
      {
        title: "Create fair launch",
        href: "/fairlaunch/create",
      },
      {
        title: "Create dutch auction",
        href: "/dutch-auction/create",
      },
      {
        title: "Create subscription",
        href: "/subscription-pool/create",
      },
      {
        title: "Create token",
        href: "/launchpads/token/create",
      },
      { title: "Launchpad list", href: "/launchpads" },
    ],
  },
  {
    title: "Private Sale",
    href: "/private-sale",
    icon: <BsFillShieldFill />,
    subNav: [
      {
        title: "Create Private Sale",
        href: "/private-sale/create",
      },
      { title: "Private Sale List", href: "/private-sale" },
    ],
  },
  {
    title: "Pink lock",
    href: "/pink-lock",
    icon: <AiOutlineUnlock />,
    subNav: [
      { title: "Create lock", href: "/pinklock/create" },
      { title: "Token/Liquidity", href: "/pinklock/token" },
    ],
  },
  {
    title: "Air drop",
    href: "/air-drop",
    icon: <GiParachute />,
    subNav: [
      { title: "Create Airdrop", href: "/airdrop" },
      { title: "Air drop list", href: "/airdrop/list" },
    ],
  },
  // {
  //   title: "Buy Crypto Fiat",
  //   href: "/buy-crypto-fiat",
  //   icon: <FaDollarSign />,
  // },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: <AiOutlineCrown />,
  },
  {
    title: "Anti bot",
    href: "/antibot",
    icon: <FaUserSecret />,
  },
  {
    title: "Multi sender",
    href: "/multi-sender",
    icon: <BiPaperPlane />,
  },
  {
    title: "Dexview.com",
    href: "/dexview",
    icon: <FaChartLine />,
  },
  {
    title: "Pools alert",
    href: "/pools-alert",
    icon: <AiOutlineRobot />,
  },
  {
    title: "KYC & Audit",
    href: "/kyc-audit",
    icon: <FaAddressCard />,
  },
  {
    title: "DOCS",
    href: "/docs",
    icon: <RiFileLine />,
  },
  {
    title: "Shop",
    href: "/shop",
    icon: <LuShoppingCart />,
  },
  {
    title: "Telegram",
    href: "/telegram",
    icon: <BsTelegram />,
    subNav: [
      { title: "English", href: "/telegram/english" },
      { title: "简体中文", href: "/telegram/chinese" },
      { title: "日本語", href: "/telegram/japanese" },
      { title: "Tiếng Việt", href: "/telegram/vietnamese" },
      { title: "Turkey", href: "/telegram/turkey" },
    ],
  },
  {
    title: "Twitter",
    href: "/twitter",
    icon: <BsTwitter />,
  },
  {
    title: "Facebook",
    href: "/facebook",
    icon: <BsFacebook />,
  },
];

const SideNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);
  const [activeSubNavItem, setActiveSubNavItem] = useState<string | null>(null);
  const [selectedNoSubNav, setSelectedNoSubNav] = useState<string | null>(null);

  const handleSubNavItemClick = (title: string) => {
    // Specify the type as string
    setActiveSubNavItem(title);
    setSelectedNoSubNav(null);
  };

  const handleSubNavToggle = (title: string) => {
    // Specify the type as string
    setActiveSubNav((prevActiveSubNav) =>
      prevActiveSubNav === title ? null : title,
    );
  };

  const handleNoSubNavClick = (title: string) => {
    // Specify the type as string
    setActiveSubNav(null);
    setSelectedNoSubNav(title);
  };

  return (
    <nav className="min-h-screen z-40  top-0 left-0 w-56 dark:bg-[#242525] max-w-[30rem] bg-[#f9fafb] dark:text-white text-black flex flex-col justify-between">
      <div className="p-2">
        <div className="overflow-y-auto h-screen">
          <button
            className=" absolute top-2 right-2 p-2 text-2xl text-white bg-gray-500 rounded-full"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <FiChevronLeft /> : <FiChevronRight />}
          </button>

          <ul
            className={`space-y-1 z-40 ${
              showSidebar ? "hidden lg:block" : "block"
            }`}
          >
            {navConfig.map((item) => (
              <motion.li
                key={item.title}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {item.subNav && item.subNav.length > 0 ? (
                  <div
                    className={`group flex items-center px-4 py-3 rounded-md ${
                      item.href === "/" ? "bg-gray-200 dark:bg-[#35cd70]" : ""
                    } ${activeSubNav === item.title ? "bg-green-500" : ""}`}
                    onClick={() => handleSubNavToggle(item.title)}
                  >
                    <div className="mr-3 text-xl">{item.icon}</div>
                    <span>{item.title}</span>
                    {activeSubNav === item.title ? (
                      <FiChevronDown className="ml-auto w-4 h-4" />
                    ) : (
                      <FiChevronRight className="ml-auto w-4 h-4" />
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`group flex items-center px-4 py-3 rounded-md ${
                      item.href === "/" ? "bg-gray-200 dark:bg-[#35cd70]" : ""
                    } ${selectedNoSubNav === item.title ? "bg-green-500" : ""}`}
                    onClick={() => handleNoSubNavClick(item.title)}
                  >
                    <div className="mr-3 text-xl">{item.icon}</div>
                    <span>{item.title}</span>
                  </Link>
                )}
                {item.subNav && activeSubNav === item.title && (
                  <ul className="pl-8 space-y-1 mt-2">
                    {item.subNav.map((subItem) => (
                      <motion.li
                        key={subItem.title}
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link
                          href={subItem.href}
                          className={`flex items-center px-4 py-2 rounded-md whitespace-nowrap ${
                            activeSubNavItem === subItem.title
                              ? "bg-green-500"
                              : ""
                          } hover:bg-gray-200 dark:hover:bg-green-500/50`}
                          onClick={() => handleSubNavItemClick(subItem.title)}
                        >
                          {subItem.icon && (
                            <div className="mr-3 text-xl">{subItem.icon}</div>
                          )}
                          {subItem.title}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SideNavbar;
