import React, { useState } from "react";
import { useNetwork } from "wagmi";

import dynamic from "next/dynamic";

import Avalanche from "@/components/Navbar/HomeNav/Multichain/Avalanche/NewNavbar";
import Arbitrum from "@/components/Navbar/HomeNav/Multichain/Arbitrum/NewNavbar";
import Polygon from "@/components/Navbar/HomeNav/Multichain/Polygon/NewNavbar";
import Ethereum from "@/components/Navbar/HomeNav/Multichain/Ethereum/NewNavbar";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Index = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && (
        <>
          <Ethereum
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </>
      )}
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
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
