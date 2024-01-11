"use client";

// Components import
import React, { useState } from "react";

import Navbar from "./HomeNav/NewNavbar";

// Libraries import
import { motion } from "framer-motion";

import SideNavbar from "@/components/Navbar/SideNavbarV2";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // The initial value of 'isSidebarOpen' is set to 'false', indicating that the sidebar is not open initially.
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // When this function is called, it sets 'isSidebarOpen' to its opposite value.
  // If 'isSidebarOpen' is true (sidebar is open), it will be set to false (sidebar will close), and vice versa.
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="">
      <SideNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <motion.div
        className={`${"lg:mt-16 m-2"} w-auto  dark:border-0   lg:rounded-lg flex flex-col items-center justify-center`}
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
          <div className="w-full hidden lg:flex h-8 bg-transparent backdrop-blur-sm fixed top-0 z-50 "></div>
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className={`${"mt-12"} w-full `}>{children}</div>
      </motion.div>
    </div>
  );
};

export default Layout;
