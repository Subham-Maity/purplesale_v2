import React from "react";
import { useNetwork } from "wagmi";
import dynamic from "next/dynamic";
import EthereumPinklock from "@/pages/pinklock/create/Multichain/EthList";
import ArbitrumPinklock from "@/pages/pinklock/create/Multichain/ArbitrumList";
import PolygonPinklock from "@/pages/pinklock/create/Multichain/PolygonList";
import AvalanchePinklock from "@/pages/pinklock/create/Multichain/AvalancheList";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && (
        <>
          <EthereumPinklock />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <EthereumPinklock />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumPinklock />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonPinklock />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalanchePinklock />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
