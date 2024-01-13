"use client";
import React, { useContext, useState } from "react";
import VerifyToken from "../section/VerifyToken";
import HorizontalLinearStepper from "../../../components/stepper/index";
import Finish from "../section/Finish";
import AddAdditional from "../section/AddAdditional";
import DeFiLaunchpad from "../section/DeFiLaunchpad";
import FormContext from "@/contexts/create/FormContext";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";

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
    "Additional Info",
    "Finish Page",
  ];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleListingOption = (option: string) => {
    setSelectedListingOption(option);
  };

  return (
    <FormWrapper>
      <HorizontalLinearStepper
        steps={steps}
        title={"DeFi Launchpad Info"}
        description={
          "ENTER THE LAUNCHPAD INFORMATION THAT YOU WANT TO RAISE, THAT SHOULD BE ENTER ALL DETAILS ABOUT YOUR PRESALE."
        }
      >
        <VerifyToken onStepValidation={handleStepValidation} />
        <DeFiLaunchpad
          chngeVal={changeVal}
          onStepValidation={handleStepValidation}
          selectedListingOption={selectedListingOption}
        />
        <AddAdditional onStepValidation={handleStepValidation} />
        <Finish />
      </HorizontalLinearStepper>
    </FormWrapper>
  );
};

export default Page;
