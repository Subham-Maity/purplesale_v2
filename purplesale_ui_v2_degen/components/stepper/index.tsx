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

const HorizontalLinearStepper = ({
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
      <div className="flex-col w-full ">
        <ol className="flex justify-between w-full  ">
          {steps.map((step: string, index: number) => (
            <li
              key={index}
              className="] w-full  text-center lg:block hidden lg:ml-72 whitespace-nowrap "
            >
              <p className="text-sm text-gray-400">{step}</p>
            </li>
          ))}
        </ol>
        <ol className="flex mb-5 justify-center ml-12 lg:ml-56 ">
          {steps.map((step: string, index: number) => (
            <li
              key={index}
              className={`flex w-full items-center ${
                index !== steps.length - 1
                  ? "after:content-[''] after:w-full after:h-1 after:border-dashed after:border-b "
                  : ""
              } ${
                index <= activeStep
                  ? "text-white after:border-[#9e9cf3]"
                  : "text-gray-500 after:border-gray-100 after:border-opacity-50"
              }`}
            >
              <span
                className={`flex items-center justify-center w-10 h-10 animate-pulse shadow-sm shadow-white rounded-full lg:h-10 lg:w-10 ${
                  index <= activeStep
                    ? "bg-[#9e9cf3]"
                    : "bg-white dark:bg-black"
                } shadow-lg`}
              >
                {index < activeStep ? (
                  <BsCheckCircle className="text-white w-10 h-10 animate-pulse shadow-lg shadow-white rounded-full lg:h-10 lg:w-10 " />
                ) : (
                  <span className="w-10 h-10 text-center mt-4 font-bold">
                    {index + 1}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>
      </div>
      {steps && (
        <h1 className="text-2xl font-semibold text-center mb-4 lg:mr-12">
          {steps[activeStep]}
        </h1>
      )}
      <div className="w-[282px] h-[33px] lg:mr-12 dark:bg-[#585858] rounded mb-4 relative border border-gray-400/25 shadow-md shadow-white/25 overflow-hidden">
        <div
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          className="h-full bg-[#9e9cf3] rounded animate-pulse shadow-xl shadow-white"
        ></div>
        <p className="text-sm text-white absolute font-light inset-0 flex items-center justify-center transitiona-all duration-1000 group-hover:duration-200 animate-tilt ">{`${
          ((activeStep + 1) / steps.length) * 100
        }% DONE`}</p>
      </div>
      {description && (
        <p className="text-sm text-gray-500 text-center mb-4 break-after-all mx-2">
          {description}
        </p>
      )}

      <div>
        {React.cloneElement(children[activeStep] as React.ReactElement, {
          onStepValidation: handleStepValidation,
        })}
      </div>
      <div className="flex mb-8 justify-between mt-4 gap-12 lg:gap-0 lg:w-full lg:max-w-xl">
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
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-[#9e9cf3] text-white border transition duration-300 hover:bg-blue-400 transform hover:scale-105 hover:shadow-md hover:shadow-white"
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

        {/*//Comment this out to remove skip button*/}
        {showSkip && activeStep !== steps.length - 1 && (
          <button
            onClick={handleSkip}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-red-500 text-white border"
          >
            <span>(Testing) Skip</span>
            <MdSkipNext />
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalLinearStepper;
