import FormContext from "@/contexts/create/FormContext";
import React, { ChangeEvent, useContext, useState } from "react";

interface DeFiLaunchpadProps {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const DeFiLaunchpad: React.FC<DeFiLaunchpadProps> = ({
  chngeVal,
  onStepValidation,
}) => {
  const { routerSelect, setRouterSelect } = useContext(FormContext);
  const { infoData, setInfoData } = useContext(FormContext);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
    // console.log("Start Time:", infoData.startDate);
    // console.log("End Time:", infoData.endDate);
    // console.log("L:", infoData.liquidityLockup);
    // console.log("LU:", infoData.liquidityUnlockTime);
    // console.log("LP:", infoData.liquidityAdditionPercent);
    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return (
      infoData.tokensToSell > 0 &&
      infoData.softCap > 0 &&
      infoData.liquidityLockup > 0 &&
      infoData.liquidityAdditionPercent <= 100 &&
      infoData.liquidityAdditionPercent >= 50
    );
  };

  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const handleAffiliateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOpenAffiliate(event.target.checked);
  };
  const [selectedRouter, setSelectedRouter] = useState<string | undefined>(
    undefined,
  );

  const routerOptions = [{ value: "Uniswap", label: "Uniswap" }];

  const handleRouterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouter(e.target.value);
  };

  const { whitelist, setWhitelist } = useContext(FormContext);

  const handleWhitelistChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (value === "Enable") {
      setWhitelist(true);
    } else if (value === "Disable") {
      setWhitelist(false);
    }
  };

  // Define the labels for each router option
  const routerLabels: { [key: string]: string } = {
    Uniswap: "Uniswap",
    Apeswap: "Apeswap",
    MDex: "MDex",
    BiSwap: "BiSwap",
    PinkSwap: "PinkSwap",
    Babydogeswap: "Babydogeswap",
  };

  // Function to get the selected router label
  const getSelectedRouterLabel = () => {
    return selectedRouter ? routerLabels[selectedRouter] : "Router";
  };

  // Function to get the field label based on the selected router
  const getFieldLabel = (fieldName: string) => {
    return selectedRouter
      ? `${routerLabels[selectedRouter]} ${fieldName}`
      : `${fieldName}`;
  };
  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
          <form className="px-3 py-3">
            <label
              htmlFor="perSaleRate"
              className="block mb-2 text-sm font-medium"
            >
              <strong>
                Total Selling Amount<span className="ml-1 text-red-500">*</span>
              </strong>
            </label>
            <div className="mb-4">
              <input
                id="tokensToSell"
                name="tokensToSell"
                onChange={handleOnChange}
                type="number"
                defaultValue={0}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="whitelist"
                className="block mb-2 text-sm font-medium"
              >
                <strong>Whitelist</strong>{" "}
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
                <div className="flex items-center">
                  <input
                    onChange={handleWhitelistChange}
                    id="whitelist"
                    name="whitelist"
                    type="radio"
                    value="Disable"
                    className="form-radio"
                    required
                  />
                  <label htmlFor="disableWhitelist" className="ml-2 text-sm ">
                    Disable
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="enableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Enable"
                    className="form-radio"
                    onChange={handleWhitelistChange}
                    required
                  />
                  <label htmlFor="enableWhitelist" className="ml-2 text-sm ">
                    Enable
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="softCap"
                className="block mt-4 mb-4 text-sm font-medium"
              >
                <strong>
                  Softcap (MATIC)<span className="ml-1 text-red-500">*</span>
                </strong>
              </label>
              <div className="mb-8">
                <input
                  id="softCap"
                  name="softCap"
                  onChange={handleOnChange}
                  type="number"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                onChange={handleAffiliateChange}
                type="checkbox"
                value="enable"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Setting max contribution?
              </label>
            </div>
            {openAffiliate && (
              <div className="mt-6">
                <label
                  htmlFor="rewardPercentage"
                  className="block mb-2 text-sm font-medium"
                >
                  Max Contribution (MATIC)*
                </label>
                <input
                  id="maxContribution"
                  name="maxContribution"
                  type="text"
                  className="w-full mt-4 mb-4 border border-gray-300 rounded py-2 px-4"
                  placeholder="Ex: 10"
                  onChange={handleOnChange}
                />
              </div>
            )}
            <label
              htmlFor="countries"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              {getSelectedRouterLabel()}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              id="router"
              name="router"
              value={selectedRouter}
              onChange={handleRouterChange}
              className="border mb-4 border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">---Select Router Exchange---</option>
              {routerOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="mt-6">
              <label
                htmlFor="liquidityAdditionPercent"
                className="block mb-2 text-sm font-medium"
              >
                {getFieldLabel("liquidity (%)")}
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                id="liquidityAdditionPercent"
                name="liquidityAdditionPercent"
                onChange={handleOnChange}
                type="number"
                className="w-full mt-4 mb-4 border border-gray-300 rounded py-2 px-4"
                placeholder="Ex: 52"
              />
              <p className="text-sm font-light text-red-500">
                Liquidity cannot be blank
              </p>
            </div>
            <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Start time (UTC)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>End time (UTC)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    defaultValue={0}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
            </div>
            <p className="text-sm font-light text-blue-400">
              The duration between start time and end time must be less than 7
              days
            </p>
            <div>
              <label
                htmlFor="liquidityLockup"
                className="block mt-4 mb-4 text-sm font-medium"
              >
                <strong>Liquidity lockup (days)</strong>
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="mb-8">
                <input
                  id="liquidityLockup"
                  name="liquidityLockup"
                  type="number"
                  onChange={handleOnChange}
                  placeholder="Ex: 30 days"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeFiLaunchpad;
