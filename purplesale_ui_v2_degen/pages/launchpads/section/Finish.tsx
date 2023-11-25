import React from "react";
import { useNetwork } from "wagmi";
import PolygonFinish from "@/pages/launchpads/section/MultiChainFinish/PolygonFinish";
import EthereumFinish from "@/pages/launchpads/section/MultiChainFinish/EthereumFinish";
import ArbitrumFinish from "@/pages/launchpads/section/MultiChainFinish/ArbitrumFinish";
import AvalancheFinish from "@/pages/launchpads/section/MultiChainFinish/AvalancheFinish";

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
