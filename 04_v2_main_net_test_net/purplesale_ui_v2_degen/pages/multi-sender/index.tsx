import React from "react";
import { useNetwork } from "wagmi";
import EthMulti from "@/pages/multi-sender/Multichain/Ethereum";
import ArbitrumMulti from "@/pages/multi-sender/Multichain/Arbitrum";
import PolygonMulti from "@/pages/multi-sender/Multichain/Polygon";
import AvalancheMulti from "@/pages/multi-sender/Multichain/Avalanche";
import dynamic from "next/dynamic";
import PolygonMumbaiMulti from "@/pages/multi-sender/Multichain/PolygonMumbai";

const Index = () => {
  const { chain } = useNetwork();

  return (
    <div>
      {!chain?.name && (
        <>
          {" "}
          <EthMulti />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <EthMulti />
        </>
      )}
      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumMulti />
        </>
      )}
      {chain?.name === "Polygon" && (
        <>
          <PolygonMulti />
        </>
      )}{" "}
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbaiMulti />
        </>
      )}
      {chain?.name === "Avalanche" && (
        <>
          <AvalancheMulti />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
