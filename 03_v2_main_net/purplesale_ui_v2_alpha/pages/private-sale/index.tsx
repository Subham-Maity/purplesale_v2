import React from "react";
import { useNetwork } from "wagmi";
import PolygonList from "@/pages/private-sale/MultichainList/PolygonList";
import EthereumList from "@/pages/private-sale/MultichainList/EthList";
import dynamic from "next/dynamic";
import ArbitrumList from "@/pages/private-sale/MultichainList/ArbitrumList";
import AvalancheList from "@/pages/private-sale/MultichainList/AvalancheList";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && (
        <>
          <EthereumList />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <EthereumList />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumList />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonList />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalancheList />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
