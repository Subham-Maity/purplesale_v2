"use client";
import React, { useState } from "react";

import MultiSender from "@/pages/multi-sender/section/AddYourAllocation";
import Finish from "@/pages/multi-sender/section/Finish";
import HorizontalLinearStepper3 from "@/components/stepper3";

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
    <div>
      <HorizontalLinearStepper3 steps={steps}>
        <MultiSender onStepValidation={handleStepValidation} />
        <Finish />
      </HorizontalLinearStepper3>
    </div>
  );
};

export default Page;
