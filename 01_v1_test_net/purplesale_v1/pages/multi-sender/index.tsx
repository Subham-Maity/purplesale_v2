"use client";
import React, { useState } from "react";
import HorizontalLinearStepper from "@/components/stepper";
import MultiSender from "@/pages/multi-sender/section/AddYourAllocation";
import Finish from "@/pages/multi-sender/section/Finish";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const changeVal = () => {
    setIsValidate(1);
    console.log(isValidate);
  };

  const steps = ["Add Your Allocation", "Confirmation"];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (
    <div>
      <HorizontalLinearStepper steps={steps}>
        <MultiSender onStepValidation={handleStepValidation} />
        <Finish />
      </HorizontalLinearStepper>
    </div>
  );
};

export default Page;
