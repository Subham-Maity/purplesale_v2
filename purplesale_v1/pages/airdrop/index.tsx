"use client";
import React, { useContext, useState } from "react";

import FormContext from "@/contexts/create/FormContext";

import VerifyToken from "@/pages/airdrop/create";
import AddAdditional from "@/pages/airdrop/section/AddAdditional";
import HorizontalLinearStepper from "@/components/stepper2";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const steps = ["Verify Token", "Finish"];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  return (
    <div>
      <HorizontalLinearStepper steps={steps}>
        <AddAdditional onStepValidation={handleStepValidation} />
        <VerifyToken onStepValidation={handleStepValidation} />
      </HorizontalLinearStepper>
    </div>
  );
};

export default Page;
