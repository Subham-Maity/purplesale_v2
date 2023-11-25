import React from "react";
import { useNetwork } from "wagmi";
import EthereumFinish from "@/pages/dutch-auction/MultiChainFinish/EthereumFinish";
import ArbitrumFinish from "@/pages/dutch-auction/MultiChainFinish/ArbitrumFinish";
import PolygonFinish from "@/pages/dutch-auction/MultiChainFinish/PolygonFinish";
import AvalancheFinish from "@/pages/dutch-auction/MultiChainFinish/AvalancheFinish";

const Finish = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && <></>}
      {chain?.name === "Ethereum" && (
        <>
          <EthereumFinish />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumFinish />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonFinish />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalancheFinish />
        </>
      )}
    </div>
  );
};

export default Finish;
