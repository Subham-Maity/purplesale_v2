"use client";
import React, { useState } from "react";

import HorizontalLinearStepper from "@/components/stepper";
import BeforeYouStart from "@/pages/private-sale/section/BeforeYouStart";
import PrivateSale from "@/pages/private-sale/section/PrivateSale";
import AddAdditional from "@/pages/private-sale/section/AddAdditional";
import Finish from "@/pages/private-sale/section/Finish";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const changeVal = () => {
    setIsValidate(1);
    console.log(isValidate);
  };

  const steps = [
    "Before you start",
    "Private Sale",
    "Add Additional Info",
    "Finish",
  ];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (
    <div>
      <HorizontalLinearStepper steps={steps}>
        <BeforeYouStart
          chngeVal={changeVal}
          onStepValidation={handleStepValidation}
        />
        <PrivateSale
          chngeVal={changeVal}
          onStepValidation={handleStepValidation}
        />
        <AddAdditional onStepValidation={handleStepValidation} />
        <Finish />
      </HorizontalLinearStepper>
    </div>
  );
};

export default Page;
