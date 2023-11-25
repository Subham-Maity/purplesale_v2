import React from "react";
import { useNetwork } from "wagmi";
import PolygonList from "@/pages/airdrop/Multichain/Polygon/list";
import EthereumList from "@/pages/airdrop/Multichain/Ethereum/list";
import dynamic from "next/dynamic";
import ArbitrumList from "@/pages/airdrop/Multichain/Arbitrum/list";
import AvalancheList from "@/pages/airdrop/Multichain/Avalanche/list";

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
