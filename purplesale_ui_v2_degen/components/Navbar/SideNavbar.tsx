"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineRocket,
  AiOutlineUnlock,
  AiOutlineCrown,
  AiOutlineRobot,
  AiOutlineHome,
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
import { FaAddressCard } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { RiFileLine, RiMenu2Fill } from "react-icons/ri";
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
    title: "Home",
    href: "/",
    icon: <AiOutlineHome />,
  },
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
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const SideNavbar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const [showSidebar, setShowSidebar] = useState(isSidebarOpen);
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);
  const [activeSubNavItem, setActiveSubNavItem] = useState<string | null>(null);
  const [selectedNoSubNav, setSelectedNoSubNav] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(isSidebarOpen);

  const handleSubNavItemClick = (title: string) => {
    setActiveSubNavItem(title);
    setSelectedNoSubNav(null);
  };
  useEffect(() => {
    setIsNavOpen(isSidebarOpen);
  }, [isSidebarOpen]);
  const handleSubNavToggle = (title: string) => {
    setActiveSubNav((prevActiveSubNav) =>
      prevActiveSubNav === title ? null : title,
    );
  };

  const handleNoSubNavClick = (title: string) => {
    setActiveSubNav(null);
    setSelectedNoSubNav(title);
  };

  return (
    <>
      {!isNavOpen ? (
        <motion.nav
          initial={{ width: 0 }}
          animate={{ width: !isNavOpen ? "350px" : "hidden" }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden h-screen ${
            isNavOpen
              ? "w-auto fixed lg:relative "
              : "w-[330px] fixed lg:relative"
          } z-40 border lg:block bg-[url('/Home/sideNav.svg')] bg-black/95 lg:bg-transparent h-[670px] lg:h-[730px] mt-20 lg:mt-0 border-gray-400/75 w-[360px] bg-no-repeat bg-cover text-white text-black flex flex-col justify-between rounded-2xl`}
        >
          <div className="p-2">
            <div className="flex flex-col items-center justify-between overflow-y-auto h-[670px] lg:h-[730px] ">
              <div className=" mb-10 mt-4 flex">
                <Link
                  href="/"
                  className=" text-white text-left  ml-2 font-bold whitespace-nowrap text-2xl"
                >
                  Purple Sale
                </Link>
              </div>
              <ul
                className={`${
                  !isNavOpen ? "flex" : "hidden"
                } w-full px-2 lg:flex flex-col gap-4 font-medium`}
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
                        className={`group flex items-center px-4 py-3 ${
                          item.href === "/" ? "bg-gray-200 bg-transparent" : ""
                        } ${
                          activeSubNav === item.title
                            ? "bg-gradient-to-r from-transparent to-yellow-400/25 bg-transparent text-yellow-300 border-r-2 border-r-yellow-400/75 cursor-pointer"
                            : ""
                        }`}
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
                        className={`group flex items-center px-4 py-3  ${
                          item.href === "/" ? "bg-gray-200 bg-transparent" : ""
                        } ${
                          selectedNoSubNav === item.title
                            ? "bg-gradient-to-r from-transparent to-yellow-400/25 bg-transparent text-yellow-300 border-r-2 border-r-yellow-400/75 cursor-pointer"
                            : ""
                        }`}
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
                              className={`flex items-center px-4 py-2 whitespace-nowrap ${
                                activeSubNavItem === subItem.title
                                  ? "bg-gradient-to-r from-transparent to-yellow-400/25 bg-transparent text-yellow-300 border-r-2 border-r-yellow-400/75 cursor-pointer"
                                  : ""
                              } hover:bg-gradient-to-r from-transparent to-yellow-400/25 bg-transparent `}
                              onClick={() =>
                                handleSubNavItemClick(subItem.title)
                              }
                            >
                              {subItem.icon && (
                                <div className="mr-3 text-xl">
                                  {subItem.icon}
                                </div>
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
        </motion.nav>
      ) : null}
    </>
  );
};

export default SideNavbar;
