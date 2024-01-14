"use client";
import React, { useState } from "react";

import MultiSender from "@/pages/multi-sender/Multichain/Polygon/section/AddYourAllocation";
import Finish from "@/pages/multi-sender/Multichain/Polygon/section/Finish";
import HorizontalLinearStepper3 from "@/components/stepper3";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const changeVal = () => {
    setIsValidate(1);
    console.log(isValidate);
  };

  const steps = ["Add Your Allocation", ""];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (
    <FormWrapper>
      <HorizontalLinearStepper3 steps={steps}>
        <MultiSender onStepValidation={handleStepValidation} />
        <Finish />
      </HorizontalLinearStepper3>
    </FormWrapper>
  );
};

export default Page;
