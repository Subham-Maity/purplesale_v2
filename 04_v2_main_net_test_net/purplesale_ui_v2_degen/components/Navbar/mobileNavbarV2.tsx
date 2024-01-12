"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import {
  AiOutlineCrown,
  AiOutlineHome,
  AiOutlineMenuUnfold,
  AiOutlineRobot,
  AiOutlineRocket,
  AiOutlineUnlock,
} from "react-icons/ai";
import { RiFileLine } from "react-icons/ri";
import {
  BsFacebook,
  BsFillShieldFill,
  BsTelegram,
  BsTwitter,
} from "react-icons/bs";
import { GiParachute } from "react-icons/gi";
import { FaAddressCard, FaChartLine, FaUserSecret } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { NavItem } from "@/components/Navbar/SideNavbarV2";

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

type Props = {
  isSidebarOpen: boolean;

  onClose: (value: boolean) => void;
};

const MobileSidebar = (props: Props) => {
  const [activeSubNav, setActiveSubNav] = useState<string | null>(null);
  const [activeSubNavItem, setActiveSubNavItem] = useState<string | null>(null);
  const [selectedNoSubNav, setSelectedNoSubNav] = useState<string | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(props.isSidebarOpen);
  const [open, setOpen] = useState(props.isSidebarOpen);
  const handleSubNavItemClick = (title: string) => {
    setActiveSubNavItem(title);
    setSelectedNoSubNav(null);
  };
  useEffect(() => {
    setIsNavOpen(props.isSidebarOpen);
    setOpen(props.isSidebarOpen);
  }, [props.isSidebarOpen]);
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
    <aside>
      <motion.div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50`}
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ x: "-100%" }}
          className={`fixed top-0 left-0 w-64 h-full bg-white dark:bg-[#2E3248] z-50`}
        >
          <div className="flex flex-col justify-between items-center p-4 ">
            <div className="flex items-center justify-between w-full">
              <span className="dark:text-white text-2xl font-semibold ml-2">
                Admin
              </span>
              <button
                onClick={() => props.onClose(false)}
                className="dark:text-white focus:outline-none lg:hidden"
              >
                <AiOutlineMenuUnfold size={25} />
              </button>
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
                        ? "flex items-center justify-between px-2 py-1"
                        : "flex items-center justify-center py-1"
                    }`}
                  >
                    <div
                      className={`flex ${
                        activeSubNav === item.title && "dark:bg-[#3E4163]"
                      } items-center ${
                        open ? "justify-start" : "justify-center"
                      } w-full p-2 rounded-md`}
                    >
                      {item.icon}
                      {open && (
                        <span className="ml-2 text-sm font-medium">
                          {item.title}
                        </span>
                      )}
                    </div>
                    {item.subNav && (
                      <div>
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
                  <div className="pl-4">
                    {item.subNav.map((subNavItem, index) => (
                      <Link href={subNavItem.href} key={index}>
                        <div
                          className={`${
                            open
                              ? "flex items-center justify-between"
                              : "flex items-center justify-center"
                          }`}
                        >
                          <div className="flex items-center justify-center px-1">
                            {subNavItem.icon}
                            {open && (
                              <span className="ml-2 text-sm font-medium">
                                {subNavItem.title}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </aside>
  );
};

export default MobileSidebar;
