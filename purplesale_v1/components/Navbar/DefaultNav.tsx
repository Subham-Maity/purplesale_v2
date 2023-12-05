import React from "react";
import Navbar2 from "@/components/Navbar/Navbar";
import Provider from "./provider";
import SideNavbar from "@/components/Navbar/SideNavbar";

// @ts-ignore
const DefaultNav = ({ children }) => {
  return (
    <div>
      <Provider>
        <div className="overflow-hidden max-h-screen ">
          <div className="hidden lg:block">
            <Navbar2 />
          </div>
          <div className="flex">
            <div className="lg:flex ">
              <SideNavbar />
            </div>
            <div className="m-6 px-4 max-h-[90vh] w-full overflow-y-scroll">
              {children}
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
};

export default DefaultNav;
