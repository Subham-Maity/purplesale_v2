import React from "react";
import { useNetwork } from "wagmi";

import EthAntiBot from "@/pages/antibot/Multichain/Ethereum/section/create";
import ArbitrumAntiBot from "@/pages/antibot/Multichain/Arbitrum/section/create";
import PolygonAntiBot from "@/pages/antibot/Multichain/Polygon/section/create";
import AvalancheAntiBot from "@/pages/antibot/Multichain/Avalanche/section/create";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && <></>}
      {chain?.name === "Ethereum" && (
        <>
          <EthAntiBot />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumAntiBot />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonAntiBot />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalancheAntiBot />
        </>
      )}
    </div>
  );
};

export default Index;
