import React from "react";
import { useNetwork } from "wagmi";
import EthereumFinish from "@/pages/subscription-pool/section/MultiChainFinish/EthereumFinish";
import ArbitrumFinish from "@/pages/subscription-pool/section/MultiChainFinish/ArbitrumFinish";
import PolygonFinish from "@/pages/subscription-pool/section/MultiChainFinish/PolygonFinish";
import AvalancheFinish from "@/pages/subscription-pool/section/MultiChainFinish/AvalancheFinish";
import PolygonMumbaiFinish from "@/pages/subscription-pool/section/MultiChainFinish/PolygonMumbaiFinish";

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
