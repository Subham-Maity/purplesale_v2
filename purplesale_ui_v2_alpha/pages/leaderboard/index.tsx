import React from "react";
import { useNetwork } from "wagmi";
import EthLeader from "@/pages/leaderboard/Multichain/Ethereum";
import ArbitrumLeader from "@/pages/leaderboard/Multichain/Arbitrum";
import PolygonLeader from "@/pages/leaderboard/Multichain/Polygon";
import AvalancheLeader from "@/pages/leaderboard/Multichain/Avalanche";
import dynamic from "next/dynamic";

const Index = () => {
  const { chain } = useNetwork();

  return (
    <div>
      {!chain?.name && <></>}
      {chain?.name === "Ethereum" && (
        <>
          <EthLeader />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumLeader />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonLeader />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalancheLeader />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
