import React from "react";
import { useNetwork } from "wagmi";
import EthToken from "@/pages/launchpads/token/create/MultiChainToken/EthToken";
import ArbitrumToken from "@/pages/launchpads/token/create/MultiChainToken/ArbitrumToken";
import PolygonToken from "@/pages/launchpads/token/create/MultiChainToken/PolygonToken";
import AvalancheToken from "@/pages/launchpads/token/create/MultiChainToken/AvalancheToken";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && <></>}
      {chain?.name === "Ethereum" && (
        <>
          <EthToken />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumToken />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonToken />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalancheToken />
        </>
      )}
    </div>
  );
};

export default Index;
