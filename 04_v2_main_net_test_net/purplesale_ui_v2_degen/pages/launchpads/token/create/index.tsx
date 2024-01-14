import React from "react";
import { useNetwork } from "wagmi";
import EthToken from "@/pages/launchpads/token/create/MultiChainToken/EthToken";
import ArbitrumToken from "@/pages/launchpads/token/create/MultiChainToken/ArbitrumToken";
import PolygonToken from "@/pages/launchpads/token/create/MultiChainToken/PolygonToken";
import AvalancheToken from "@/pages/launchpads/token/create/MultiChainToken/AvalancheToken";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";
import PolygonMumbaiToken from "@/pages/launchpads/token/create/MultiChainToken/PolygonMumbaiToken";

const Index = () => {
  const { chain } = useNetwork();
  return (
    <FormWrapper>
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
      {chain?.name === "Polygon Mumbai" && (
        <>
          <PolygonMumbaiToken />
        </>
      )}
      {chain?.name === "Avalanche" && (
        <>
          <AvalancheToken />
        </>
      )}
    </FormWrapper>
  );
};

export default Index;
