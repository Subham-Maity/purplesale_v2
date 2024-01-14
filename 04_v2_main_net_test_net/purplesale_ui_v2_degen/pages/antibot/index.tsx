import React from "react";
import { useNetwork } from "wagmi";

import EthAntiBot from "@/pages/antibot/Multichain/Ethereum/section/create";
import ArbitrumAntiBot from "@/pages/antibot/Multichain/Arbitrum/section/create";
import PolygonAntiBot from "@/pages/antibot/Multichain/Polygon/section/create";
import AvalancheAntiBot from "@/pages/antibot/Multichain/Avalanche/section/create";
import PolygonMumbaiAntiBot from "@/pages/antibot/Multichain/PolygonMumbai/section/create";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <FormWrapper>
      {!chain?.name && <></>}
      {chain?.name === "Ethereum" && (
        <>
          <EthAntiBot />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <ArbitrumAntiBot />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <PolygonAntiBot />
        </>
      )}
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbaiAntiBot />
        </>
      )}
      {chain?.name === "Avalanche" && (
        <>
          <AvalancheAntiBot />
        </>
      )}
    </FormWrapper>
  );
};

export default Index;
