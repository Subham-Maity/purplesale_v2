import React from "react";
import { useNetwork } from "wagmi";

import Ethereum from "@/components/details/Multichain/Ethereum/Alpha/Auction";
import dynamic from "next/dynamic";

import Avalanche from "@/components/details/Multichain/Avalanche/Alpha/Auction";
import Arbitrum from "@/components/details/Multichain/Arbitrum/Alpha/Auction";
import Polygon from "@/components/details/Multichain/Polygon/Alpha/Auction";
import PolygonMumbai from "@/components/details/Multichain/PolygonMumbai/Alpha/Auction";
const Index = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && (
        <>
          <Ethereum />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <Ethereum />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <Arbitrum />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <Polygon />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <Avalanche />
        </>
      )}
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbai />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
