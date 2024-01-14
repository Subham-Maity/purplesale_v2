import React, { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { MdSkipNext } from "react-icons/md";
import Link from "next/link";

type Props = {
  title?: string;
  description?: string;
  steps: string[];
  children: React.ReactNode[];
  showSkip?: boolean;
};

const HorizontalLinearStepper3 = ({
  title,
  description,
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
    <div className="mt-10 flex flex-col items-center w-full mb-10">
      <div>
        {React.cloneElement(children[activeStep] as React.ReactElement, {
          onStepValidation: handleStepValidation,
        })}
      </div>
      <div className="flex justify-between mt-4 gap-12 lg:gap-0 lg:w-full lg:max-w-xl">
        <button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
            activeStep === 0
              ? "bg-[#020202] text-white cursor-not-allowed animate-pulse"
              : "bg-[#9e9cf3] text-white border transition duration-300 hover:bg-[#6b68e3] transform hover:scale-105 hover:shadow-md hover:shadow-white hover:animate-pulse"
          }`}
        >
          <BiLeftArrowAlt className="w-4 h-4 text-white text-lg" />
          <span className="hidden sm:inline text-white text-lg">Prev</span>
        </button>
        {activeStep === steps.length - 1 ? (
          <Link
            href="/"
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-green-500 text-white border transition duration-300 hover:bg-green-400 transform hover:scale-105 hover:shadow-md hover:shadow-white"
          >
            <span>Finish</span>
            <BsCheckCircle className="w-4 h-4 animate-pulse" />
          </Link>
        ) : (
          <button
            onClick={handleNext}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              (isStepValid || activeStep === steps.length - 1) &&
              activeStep < children.length - 1
                ? "bg-[#9e9cf3] text-white border transition duration-300 hover:bg-[#6b68e3] transform hover:scale-105 hover:shadow-md hover:shadow-white hover:animate-pulse"
                : "bg-[#020202] text-white cursor-not-allowed animate-pulse"
            }`}
            disabled={!isStepValid && activeStep !== steps.length - 1}
          >
            <span className="hidden sm:inline text-white text-lg">Next</span>
            <BiRightArrowAlt className="w-4 h-4 text-lg text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalLinearStepper3;
