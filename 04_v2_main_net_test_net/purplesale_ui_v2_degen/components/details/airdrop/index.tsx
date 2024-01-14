import React from "react";
import { useNetwork } from "wagmi";
import Ethereum from "@/components/details/Multichain/Ethereum/airdrop";
import dynamic from "next/dynamic";

import Avalanche from "@/components/details/Multichain/Avalanche/airdrop";
import Arbitrum from "@/components/details/Multichain/Arbitrum/airdrop";
import Polygon from "@/components/details/Multichain/Polygon/airdrop";
import PolygonMumbai from "@/components/details/Multichain/PolygonMumbai/airdrop";

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

      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbai />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
