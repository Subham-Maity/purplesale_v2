"use client";
import React, { useEffect, useState } from "react";
import {
  AiOutlineCrown,
  AiOutlineHome,
  AiOutlineMenuUnfold,
  AiOutlineRobot,
  AiOutlineRocket,
  AiOutlineUnlock,
} from "react-icons/ai";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { RiComputerLine, RiFileLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LuCircle, LuShoppingCart } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import SidebarWrapper from "@/components/TailwindWrapper/Sidenav/Sidebar";
import {
  BsFacebook,
  BsFillShieldFill,
  BsTelegram,
  BsTwitter,
} from "react-icons/bs";
import { GiParachute } from "react-icons/gi";
import { FaAddressCard, FaChartLine, FaUserSecret } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";
import Image from "next/image";
export interface NavItem {
  title: string;
  href: string;
  icon?: JSX.Element;
  subNav?: NavItem[];
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: (value: boolean) => void;
}

const navConfig: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <AiOutlineHome size={25} />,
  },
  {
    title: "Launchpads",
    href: "/launchpads",
    icon: <AiOutlineRocket size={25} />,
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
    icon: <BsFillShieldFill size={25} />,
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
    href: "#",
    icon: <AiOutlineUnlock size={25} />,
    subNav: [
      { title: "Create lock", href: "/pinklock/create" },
      { title: "Token/Liquidity", href: "/pinklock/token" },
    ],
  },
  {
    title: "Air drop",
    href: "/air-drop",
    icon: <GiParachute size={25} />,
    subNav: [
      { title: "Create Airdrop", href: "/airdrop" },
      { title: "Air drop list", href: "/airdrop/list" },
    ],
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: <AiOutlineCrown size={25} />,
  },
  {
    title: "Anti bot",
    href: "/antibot",
    icon: <FaUserSecret size={25} />,
  },
  {
    title: "Multi sender",
    href: "/multi-sender",
    icon: <BiPaperPlane size={25} />,
  },
  {
    title: "Dexview.com",
    href: "/dexview",
    icon: <FaChartLine size={25} />,
  },
  {
    title: "Pools alert",
    href: "/pools-alert",
    icon: <AiOutlineRobot size={25} />,
  },
  {
    title: "KYC & Audit",
    href: "/kyc-audit",
    icon: <FaAddressCard size={25} />,
  },
  {
    title: "DOCS",
    href: "/docs",
    icon: <RiFileLine size={25} />,
  },
  {
    title: "Shop",
    href: "/shop",
    icon: <LuShoppingCart size={25} />,
  },
  {
    title: "Telegram",
    href: "#",
    icon: <BsTelegram size={25} />,
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
    icon: <BsTwitter size={25} />,
  },
  {
    title: "Facebook",
    href: "/facebook",
    icon: <BsFacebook size={25} />,
  },
];

const SideNavbar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);
  const [activeLayeredSubNav, setActiveLayeredSubNav] = useState<string | null>(
    null,
  );

  const [activeSubNavItem, setActiveSubNavItem] = useState<string | null>(null);
  const [selectedNoSubNav, setSelectedNoSubNav] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(isSidebarOpen);
  const [open, setOpen] = useState(false);
  const [selectedSubNav, setSelectedSubNav] = useState<string | null>(null);
  const path = usePathname();

  const handleSubNavItemClick = (title: string) => {
    setActiveSubNavItem(title);
    setSelectedSubNav(title);
    setSelectedNoSubNav(null);
  };
  const handleLayeredSubNavItemClick = (title: string) => {
    setActiveLayeredSubNav((prevActiveSubNav) =>
      prevActiveSubNav === title ? null : title,
    );
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
  const activeNavItemClasses = "bg-[#3E4163] rounded-md";
  return (
    <>
      {isNavOpen !== null ? (
        <SidebarWrapper>
          <nav
            className={`overflow-hidden hidden z-40 bg-transparent bg-no-repeat bg-cover dark:text-white text-black lg:flex flex-col justify-between fixed duration-300 top-0 bg-stone-100 `}
          >
            <div
              className={`${
                open ? "w-[16rem] fixed h-full" : "w-[4rem]"
              }   bg-[url('/Rectangle2.png')] bg-cover bg-no-repeat fixed h-full bg-opacity-10 bg-transparent border shadow-xl dark:shadow-sm dark:border-gray-400/25 border-gray-800/25 text-gray-900 dark:text-gray-300 duration-300 left-0 flex flex-col overflow-y-auto`}
            >
              <div
                className={` z-50 cursor-pointer  dark:bg-[#2b313a] dark:bg-transparent m-2 text-gray-900 dark:text-gray-300 flex items-center justify-center bg-sidebar rounded-full `}
                onClick={() => {
                  setOpen(!open);
                  toggleSidebar(!open);
                }}
              >
                <div className="flex w-full justify-between py-2">
                  {open && (
                    <Image
                      src="/logo.png"
                      alt={"logo"}
                      width={200}
                      height={200}
                      className="h-1/2 w-1/2"
                    />
                  )}
                  <AiOutlineMenuUnfold
                    className={`text-gray-900 dark:text-gray-300  ${
                      open ? "text-2xl " : "text-2xl text-center mx-auto"
                    }`}
                  />
                </div>
              </div>
              <div className=" mx-2 rounded-md">
                {navConfig.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      onClick={() => handleSubNavToggle(item.title)}
                    >
                      <div
                        className={`${
                          open
                            ? `flex items-center justify-between px-2 py-2 ${
                                activeSubNav === item.title &&
                                activeNavItemClasses
                              } `
                            : "flex items-center justify-center py-1"
                        }`}
                      >
                        <div
                          className={`flex  items-center ${
                            open ? "justify-start" : "justify-center"
                          } w-full p-1`}
                        >
                          {item.icon}
                          {open && (
                            <span className="ml-2 text-sm font-medium">
                              {item.title}
                            </span>
                          )}
                        </div>
                        {item.subNav && (
                          <div className={`${!open && "hidden"} `}>
                            {activeSubNav === item.title ? (
                              <FiChevronDown
                                className={`${
                                  open ? "text-xl" : "text-xl text-center"
                                }`}
                              />
                            ) : (
                              <FiChevronRight
                                className={`${
                                  open ? "text-xl" : "text-xl text-center"
                                }`}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                    {item.subNav && activeSubNav === item.title && (
                      <div className="pl-4 my-1">
                        {item.subNav.map((subNavItem, index) => (
                          <Link
                            href={subNavItem.href}
                            key={index}
                            onClick={() =>
                              handleSubNavItemClick(subNavItem.title)
                            }
                          >
                            <div
                              className={`${
                                open
                                  ? "flex items-center justify-between"
                                  : "flex items-center justify-center"
                              } ${
                                selectedSubNav === subNavItem.title
                                  ? activeNavItemClasses
                                  : ""
                              }`}
                            >
                              <div
                                className={`flex p-2 px-2 items-center justify-center ${
                                  open ? "block" : "hidden"
                                }`}
                              >
                                {subNavItem.icon}
                                {open && (
                                  <span className="ml-2 text-sm font-medium">
                                    {subNavItem.title}
                                  </span>
                                )}
                              </div>
                              {subNavItem.subNav && (
                                <div className={`${!open && "hidden"} mr-2`}>
                                  {activeLayeredSubNav === subNavItem.title ? (
                                    <FiChevronDown
                                      className={`${
                                        open ? "text-xl" : "text-xl text-center"
                                      }`}
                                    />
                                  ) : (
                                    <FiChevronRight
                                      className={`${
                                        open ? "text-xl" : "text-xl text-center"
                                      }`}
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                            {subNavItem.subNav &&
                              activeLayeredSubNav === subNavItem.title && (
                                <div className="pl-4">
                                  {subNavItem.subNav.map(
                                    (subNavItem, index) => (
                                      <Link
                                        href={subNavItem.href}
                                        key={index}
                                        onClick={() =>
                                          handleSubNavItemClick(
                                            subNavItem.title,
                                          )
                                        }
                                      >
                                        <div
                                          className={`${
                                            open
                                              ? "flex items-center justify-between"
                                              : "flex items-center justify-center"
                                          }`}
                                        >
                                          <div className="flex items-center justify-center px-1 my-1">
                                            {subNavItem.icon}
                                            {open && (
                                              <span className="ml-2 text-sm font-medium">
                                                {subNavItem.title}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    ),
                                  )}
                                </div>
                              )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </SidebarWrapper>
      ) : null}
    </>
  );
};

export default SideNavbar;
