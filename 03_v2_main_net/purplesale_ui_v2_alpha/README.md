```tsx
import React from "react";
import { useNetwork } from "wagmi";
import PolygonList from "@/pages/launchpads/MultichainList/PolygonList";
import EthereumList from "@/pages/launchpads/MultichainList/EthList";
import dynamic from "next/dynamic";
import ArbitrumList from "@/pages/launchpads/MultichainList/ArbitrumList";
import AvalancheList from "@/pages/launchpads/MultichainList/AvalancheList";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <div>
      {!chain?.name && (
        <>
          <EthereumList />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <EthereumList />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumList />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonList />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <AvalancheList />
        </>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

```