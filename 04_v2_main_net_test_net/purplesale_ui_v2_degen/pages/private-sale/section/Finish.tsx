import React from "react";
import { useNetwork } from "wagmi";
import EthereumFinish from "@/pages/private-sale/section/MultiChainFinish/EthereumFinish";
import ArbitrumFinish from "@/pages/private-sale/section/MultiChainFinish/ArbitrumFinish";
import PolygonFinish from "@/pages/private-sale/section/MultiChainFinish/PolygonFinish";
import AvalancheFinish from "@/pages/private-sale/section/MultiChainFinish/AvalancheFinish";
import PolygonMumbaiFinish from "@/pages/private-sale/section/MultiChainFinish/PolygonMumbaiFinish";

const Finish = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && (
        <>
          <EthereumFinish />
        </>
      )}
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
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbaiFinish />
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
