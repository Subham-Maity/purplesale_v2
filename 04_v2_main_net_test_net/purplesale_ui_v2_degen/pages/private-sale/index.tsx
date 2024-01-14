import React from "react";
import { useNetwork } from "wagmi";
import PolygonList from "@/pages/private-sale/MultichainList/PolygonList";
import EthereumList from "@/pages/private-sale/MultichainList/EthList";
import dynamic from "next/dynamic";
import ArbitrumList from "@/pages/private-sale/MultichainList/ArbitrumList";
import AvalancheList from "@/pages/private-sale/MultichainList/AvalancheList";
import PolygonMumbaiList from "@/pages/private-sale/MultichainList/PolygonMumbaiList";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <FormWrapper>
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
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbaiList />
        </>
      )}
      {chain?.name === "Avalanche" && (
        <>
          <AvalancheList />
        </>
      )}
    </FormWrapper>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
