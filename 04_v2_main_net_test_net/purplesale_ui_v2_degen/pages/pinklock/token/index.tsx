import React from "react";
import { useNetwork } from "wagmi";
import EthPinklockToken from "@/pages/pinklock/token/Multichain/EthList";
import ArbitrumPinklockToken from "@/pages/pinklock/token/Multichain/ArbitrumList";
import PolygonPinklockToken from "@/pages/pinklock/token/Multichain/PolygonList";
import AvalanchePinklockToken from "@/pages/pinklock/token/Multichain/AvalancheList";
const Index = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && (
        <>
          <EthPinklockToken />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <EthPinklockToken />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumPinklockToken />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonPinklockToken />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalanchePinklockToken />
        </>
      )}
    </div>
  );
};

export default Index;
