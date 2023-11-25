import React, { useState } from "react";

import Provider from "./provider";
import SideNavbar from "@/components/Navbar/SideNavbar";
import Navbar from "./HomeNav/NewNavbar";

const DefaultNav = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <Provider>
        <div className="bg-gradient-to-r from-[#2a282b] via-[#1d1c1c] to-[#1c2037] select-animate bg-cover bg-no-repeat bg-center h-screen lg:p-8 ">
          <div className=" overflow-hidden max-h-screen ">
            <div className="flex">
              <div className="lg:flex ">
                <SideNavbar
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              </div>
              <div>
                <Navbar
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
                <div className=" lg:max-h-[90vh] max-h-[98vh] w-full overflow-y-scroll h-screen rounded-4xl">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
};

export default DefaultNav;
