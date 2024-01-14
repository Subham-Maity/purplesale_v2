import React from "react";
import { useNetwork } from "wagmi";
import dynamic from "next/dynamic";
import EthereumPinklock from "@/pages/pinklock/create/Multichain/EthList";
import ArbitrumPinklock from "@/pages/pinklock/create/Multichain/ArbitrumList";
import PolygonPinklock from "@/pages/pinklock/create/Multichain/PolygonList";
import AvalanchePinklock from "@/pages/pinklock/create/Multichain/AvalancheList";
import PolygonMumbaiPinklock from "@/pages/pinklock/create/Multichain/PolygonMumbaiList";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <FormWrapper>
      {!chain?.name && (
        <>
          <EthereumPinklock />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <EthereumPinklock />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumPinklock />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonPinklock />
        </>
      )}
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbaiPinklock />
        </>
      )}
      {chain?.name === "Avalanche" && (
        <>
          <AvalanchePinklock />
        </>
      )}
    </FormWrapper>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
