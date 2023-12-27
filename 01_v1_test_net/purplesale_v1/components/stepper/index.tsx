"use client";
import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { MdSkipNext } from "react-icons/md";
import Link from "next/link";

type Props = {
  steps: string[];
  children: React.ReactNode[];
  showSkip?: boolean;
};

const HorizontalLinearStepper = ({
  steps,
  children,
  showSkip = true,
}: Props) => {
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIsStepValid(false);
  };

  const handleSkip = () => {
    setActiveStep(steps.length - 1);
    setIsStepValid(false);
  };

  const handleStepValidation = (isValid: boolean) => {
    setIsStepValid(isValid);
  };

  return (
    <div className="mt-6 ml-6 mr-6 flex flex-col items-center">
      <div className="flex items-center space-x-4 mb-4">
        {steps.map((step: string, index: number) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= activeStep ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {index < activeStep ? (
                <BsCheckCircle className="text-white" />
              ) : (
                <span className="text-white font-bold">{index + 1}</span>
              )}
            </div>
            <p className="text-sm text-gray-600">{step}</p>
          </div>
        ))}
      </div>
      <div className=" rounded-md shadow-md">
        {React.cloneElement(children[activeStep] as React.ReactElement, {
          onStepValidation: handleStepValidation,
        })}
      </div>
      <div className="flex justify-between mt-4 w-full max-w-xl">
        <button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
            activeStep === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-100"
          }`}
        >
          <BiLeftArrowAlt />
          <span>Prev</span>
        </button>
        {activeStep === steps.length - 1 ? (
          <Link
            href="/launchpads/create"
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-green-500 text-white border"
          >
            <span>Finish</span>
            <BsCheckCircle />
          </Link>
        ) : (
          <button
            onClick={handleNext}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              (isStepValid || activeStep === steps.length - 1) &&
              activeStep < children.length - 1
                ? "bg-blue-500 text-white border"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isStepValid && activeStep !== steps.length - 1}
          >
            <span>Next</span>
            <BiRightArrowAlt />
          </button>
        )}
        {showSkip && activeStep !== steps.length - 1 && (
          <button
            onClick={handleSkip}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-yellow-500 text-white border"
          >
            <span>Skip</span>
            <MdSkipNext />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalLinearStepper;
