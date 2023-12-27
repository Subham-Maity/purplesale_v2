"use client";
import React, { useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";

type Props = {
  steps: string[];
  children: React.ReactNode[];
};

const HorizontalLinearStepper = ({ steps, children }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);

  const handleNext = () => {
    if (
      (isStepValid || activeStep === steps.length - 1) &&
      activeStep < children.length - 1
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsStepValid(false);
    } else {
      console.log("error");
    }
  };

  const handleStepValidation = (isValid: boolean) => {
    setIsStepValid(isValid);
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <div className="mt-6 ml-6 mr-6 flex flex-col items-center">
      <div className="rounded-md shadow-md">
        {React.cloneElement(children[activeStep] as React.ReactElement, {
          onStepValidation: handleStepValidation,
        })}
      </div>
      <div className="flex justify-center items-center mt-4 w-full max-w-xl">
        {isLastStep ? (
          <Link
            href="/finish"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              isStepValid
                ? "bg-blue-500 text-white border"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            style={{ pointerEvents: isStepValid ? "auto" : "none" }}
          >
            <span>Finish</span>
            <BiRightArrowAlt />
          </Link>
        ) : (
          <button
            onClick={handleNext}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              isStepValid
                ? "bg-blue-500 text-white border"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isStepValid}
          >
            <span>Next</span>
            <BiRightArrowAlt />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalLinearStepper;
