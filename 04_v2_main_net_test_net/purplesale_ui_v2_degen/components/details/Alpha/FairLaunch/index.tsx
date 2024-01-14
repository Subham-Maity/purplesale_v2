import React from "react";
import { useNetwork } from "wagmi";
import Ethereum from "@/components/details/Multichain/Ethereum/Alpha/FairLaunch";
import dynamic from "next/dynamic";

import Avalanche from "@/components/details/Multichain/Avalanche/Alpha/FairLaunch";
import Arbitrum from "@/components/details/Multichain/Arbitrum/Alpha/FairLaunch";
import Polygon from "@/components/details/Multichain/Polygon/Alpha/FairLaunch";
import PolygonMumbai from "@/components/details/Multichain/PolygonMumbai/Alpha/FairLaunch";
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
      )}{" "}
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbai />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
