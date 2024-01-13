"use client";
import React, { useState } from "react";
import VerifyToken from "../section/VerifyToken";
import HorizontalLinearStepper from "../../../components/stepper/index";
import Finish from "../section/Finish";
import AddAdditional from "../section/AddAdditional";
import DeFiLaunchpad from "../section/DeFiLaunchpad";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const changeVal = () => {
    setIsValidate(1);
    console.log(isValidate);
  };

  const steps = [
    "Verify Token",
    "DeFi Launchpad Info",
    "Additional Info",
    "Finish Page",
  ];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (
    <FormWrapper>
      <HorizontalLinearStepper
        steps={steps}
        description={
          "ENTER THE LAUNCHPAD INFORMATION THAT YOU WANT TO RAISE, THAT SHOULD BE ENTER ALL DETAILS ABOUT YOUR AUCTION"
        }
      >
        <VerifyToken onStepValidation={handleStepValidation} />
        <DeFiLaunchpad
          chngeVal={changeVal}
          onStepValidation={handleStepValidation}
        />
        <AddAdditional onStepValidation={handleStepValidation} />
        <Finish />
      </HorizontalLinearStepper>
    </FormWrapper>
  );
};

export default Page;
