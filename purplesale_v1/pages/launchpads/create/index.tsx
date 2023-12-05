"use client";
import React, { useContext, useState } from "react";
import VerifyToken from "../section/VerifyToken";
import HorizontalLinearStepper from "../../../components/stepper/index";
import Finish from "../section/Finish";
import AddAdditional from "../section/AddAdditional";
import DeFiLaunchpad from "../section/DeFiLaunchpad";
import FormContext from "@/contexts/create/FormContext";

const Page = () => {
  const [isValidate, setIsValidate] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const { selectedListingOption, setSelectedListingOption } =
    useContext(FormContext);
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

  const handleListingOption = (option: string) => {
    setSelectedListingOption(option);
  };

  return (
    <div>
      <HorizontalLinearStepper steps={steps}>
        <VerifyToken onStepValidation={handleStepValidation} />
        <DeFiLaunchpad
          chngeVal={changeVal}
          onStepValidation={handleStepValidation}
          selectedListingOption={selectedListingOption}
        />
        <AddAdditional onStepValidation={handleStepValidation} />
        <Finish />
      </HorizontalLinearStepper>
    </div>
  );
};

export default Page;
