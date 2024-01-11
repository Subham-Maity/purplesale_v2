import React, { useState } from "react";
import { useNetwork } from "wagmi";
import Arbitrum from "@/pages/airdrop/create/Multichain/Arbitrum";
import Polygon from "@/pages/airdrop/create/Multichain/Polygon";
import Avalanche from "@/pages/airdrop/create/Multichain/Avalanche";
import Ethereum from "@/pages/airdrop/create/Multichain/Ethereum";

type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};

const VerifyToken: React.FC<VerifyTokenProps> = ({ onStepValidation }) => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const { chain } = useNetwork();

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (
    <div>
      {!chain?.name && (
        <>
          {" "}
          <Ethereum onStepValidation={handleStepValidation} />
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          {" "}
          <Ethereum onStepValidation={handleStepValidation} />
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <Arbitrum onStepValidation={handleStepValidation} />
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          {" "}
          <Polygon onStepValidation={handleStepValidation} />
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          {" "}
          <Avalanche onStepValidation={handleStepValidation} />
        </>
      )}
    </div>
  );
};

export default VerifyToken;