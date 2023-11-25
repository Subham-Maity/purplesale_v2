import React from "react";
import { useNetwork } from "wagmi";
import EthMe from "@/pages/me/Multichain/Ethereum";
import ArbitrumMe from "@/pages/me/Multichain/Arbitrum";
import PolygonMe from "@/pages/me/Multichain/Polygon";
import AvalancheMe from "@/pages/me/Multichain/Avalanche";
import dynamic from "next/dynamic";

const Index = () => {
  const { chain } = useNetwork();

  return (
    <div>
      {!chain?.name && (
        <>
          {" "}
          <EthMe />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <EthMe />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumMe />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonMe />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalancheMe />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
