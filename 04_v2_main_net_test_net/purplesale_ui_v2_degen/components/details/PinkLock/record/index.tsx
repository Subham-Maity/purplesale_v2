import React from "react";
import { useNetwork } from "wagmi";
import Ethereum from "@/components/details/Multichain/Ethereum/PinkLock/record";
import dynamic from "next/dynamic";

import Avalanche from "@/components/details/Multichain/Avalanche/PinkLock/record";
import Arbitrum from "@/components/details/Multichain/Arbitrum/PinkLock/record";
import Polygon from "@/components/details/Multichain/Polygon/PinkLock/record";
import PolygonMumbai from "@/components/details/Multichain/PolygonMumbai/PinkLock/record";

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
