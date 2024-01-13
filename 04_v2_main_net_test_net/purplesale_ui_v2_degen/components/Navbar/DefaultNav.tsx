"use client";

// Components import
import React, { useState } from "react";

import Navbar from "./HomeNav/NewNavbar";

// Libraries import
import { motion } from "framer-motion";

import SideNavbar from "@/components/Navbar/SideNavbarV2";
import Provider from "@/components/Navbar/provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // The initial value of 'isSidebarOpen' is set to 'false', indicating that the sidebar is not open initially.
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="">
      <Provider>
        <SideNavbar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <motion.div
          className={`${" m-0"} w-auto  dark:border-0   lg:rounded-lg flex flex-col items-center justify-center`}
          // Make transition smoother when sidebar is toggled
          transition={{ duration: 0.3 }}
          animate={
            isSidebarOpen
              ? { marginLeft: "16.5rem", transition: { duration: 0.3 } }
              : typeof window !== "undefined" && window.innerWidth > 1024
              ? { marginLeft: "4.5rem", transition: { duration: 0.3 } }
              : { marginLeft: "0rem", transition: { duration: 0.3 } }
          }
        >
          <div className="w-full justify-center items-center">
            <div className="w-full hidden lg:flex bg-transparent backdrop-blur-sm fixed top-0 z-50 "></div>
            <Navbar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </div>
          <div className={` w-full `}>{children}</div>
        </motion.div>
      </Provider>
    </div>
  );
};

export default Layout;
