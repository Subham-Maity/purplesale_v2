"use client";
import React, { useState } from "react";
import VerifyToken from "../section/VerifyToken";
import HorizontalLinearStepper from "../../../components/stepper/index";
import Finish from "../section/Finish";
import AddAdditional from "../section/AddAdditional";
import DeFiLaunchpad from "../section/DeFiLaunchpad";

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
    "Add Additional Info",
    "Finish",
  ];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };
  return (

      <div>
        <HorizontalLinearStepper steps={steps}>
          <VerifyToken onStepValidation={handleStepValidation} />
          <DeFiLaunchpad
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
