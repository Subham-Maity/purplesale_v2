import React from "react";
import { useNetwork } from "wagmi";

import Ethereum from "@/components/details/Multichain/Ethereum/PrivateSale";
import dynamic from "next/dynamic";
import Avalanche from "@/components/details/Multichain/Avalanche/PrivateSale";
import Arbitrum from "@/components/details/Multichain/Arbitrum/PrivateSale";
import Polygon from "@/components/details/Multichain/Polygon/PrivateSale";
import PolygonMumbai from "@/components/details/Multichain/PolygonMumbai/PrivateSale";
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
