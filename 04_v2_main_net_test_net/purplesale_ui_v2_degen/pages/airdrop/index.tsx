"use client";
import React, { useState } from "react";
import VerifyToken from "@/pages/airdrop/create";
import AddAdditional from "@/pages/airdrop/section/AddAdditional";
import HorizontalLinearStepper from "@/components/stepper2";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const steps = ["Verify Token", "Finish"];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  return (
    <FormWrapper>
      <HorizontalLinearStepper steps={steps}>
        <AddAdditional onStepValidation={handleStepValidation} />
        <VerifyToken onStepValidation={handleStepValidation} />
      </HorizontalLinearStepper>
    </FormWrapper>
  );
};

export default Page;
