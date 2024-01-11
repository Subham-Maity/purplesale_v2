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
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="rounded-md shadow-md">
        {React.cloneElement(children[activeStep] as React.ReactElement, {
          onStepValidation: handleStepValidation,
        })}
      </div>
      <div className="flex  mt-4 gap-12 lg:gap-0 mb-10 ">
        {" "}
        {isLastStep ? (
          <Link
            href="/"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md bg-[#9e9cf3] text-white border transition duration-300 hover:bg-blue-400 transform hover:scale-105 hover:shadow-md hover:shadow-white ${
              isStepValid
                ? "flex items-center space-x-2 px-4 py-2 rounded-md bg-[#9e9cf3] text-white border transition duration-300 hover:bg-blue-400 transform hover:scale-105 hover:shadow-md hover:shadow-white"
                : "flex items-center space-x-2 px-4 py-2 rounded-md bg-[#9e9cf3] text-white border transition duration-300 hover:bg-blue-400 transform hover:scale-105 hover:shadow-md hover:shadow-white"
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
                ? "bg-[#9e9cf3] text-white border transition duration-300 hover:bg-[#6b68e3] transform hover:scale-105 hover:shadow-md hover:shadow-white hover:animate-pulse"
                : "bg-[#020202] text-white cursor-not-allowed animate-pulse"
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
