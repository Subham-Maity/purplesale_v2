import React from "react";
import { useNetwork } from "wagmi";
import EthLeader from "@/pages/leaderboard/Multichain/Ethereum";
import ArbitrumLeader from "@/pages/leaderboard/Multichain/Arbitrum";
import PolygonLeader from "@/pages/leaderboard/Multichain/Polygon";
import AvalancheLeader from "@/pages/leaderboard/Multichain/Avalanche";
import dynamic from "next/dynamic";
import PolygonMumbaiLeader from "@/pages/leaderboard/Multichain/PolygonMumbai";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";

const Index = () => {
  const { chain } = useNetwork();

  return (
    <FormWrapper>
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
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbaiLeader />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalancheLeader />
        </>
      )}
    </FormWrapper>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
