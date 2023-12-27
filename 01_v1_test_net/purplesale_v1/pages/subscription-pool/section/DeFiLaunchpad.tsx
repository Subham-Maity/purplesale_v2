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

    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return (
      infoData.hardCap > 0 &&
      infoData.softCap > 0 &&
      infoData.hardCapTokenPerUser > 0 &&
      infoData.subRate > 0 &&
      infoData.listingRate > 0 &&
      infoData.liquidityAdditionPercent > 0 &&
      infoData.liquidityUnlockTime > 0
    );
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

  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const handleAffiliateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOpenAffiliate(event.target.checked);
  };
  const [selectedRouter, setSelectedRouter] = useState<string | undefined>(
    undefined,
  );

  const routerOptions = [
    { value: "Pancakeswap", label: "Pancakeswap" },
    { value: "Apeswap", label: "Apeswap" },
    { value: "MDex", label: "MDex" },
    { value: "BiSwap", label: "BiSwap" },
    { value: "PinkSwap", label: "PinkSwap" },
    { value: "Babydogeswap", label: "Babydogeswap" },
  ];

  const handleRouterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouter(e.target.value);
  };

  // Define the labels for each router option
  const routerLabels: { [key: string]: string } = {
    Pancakeswap: "Pancakeswap",
    Apeswap: "Apeswap",
    MDex: "MDex",
    BiSwap: "BiSwap",
    PinkSwap: "PinkSwap",
    Babydogeswap: "Babydogeswap",
  };

  // Function to get the selected router label
  const getSelectedRouterLabel = () => {
    return selectedRouter ? routerLabels[selectedRouter] : "Router*";
  };

  // Function to get the field label based on the selected router
  const getFieldLabel = (fieldName: string) => {
    return selectedRouter
      ? `${routerLabels[selectedRouter]} ${fieldName}`
      : `${fieldName}*`;
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
              <strong>HardCap Tokens</strong>{" "}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="mb-4">
              <input
                id="hardCap"
                name="hardCap"
                onChange={handleOnChange}
                type="number"
                defaultValue={0}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <label htmlFor="softCap" className="block mb-2 text-sm font-medium">
              <strong>SoftCap Tokens</strong>{" "}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="mb-4">
              <input
                id="softCap"
                name="softCap"
                onChange={handleOnChange}
                type="number"
                defaultValue={0}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <label
              htmlFor="hardCapTokenPerUser"
              className="block mb-2 text-sm font-medium"
            >
              <strong>HardCap Token Per User </strong>{" "}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="mb-4">
              <input
                id="hardCapTokenPerUser"
                name="hardCapTokenPerUser"
                onChange={handleOnChange}
                type="number"
                defaultValue={0}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="subRate"
                  className="block mt-4 mb-4 text-sm font-medium"
                >
                  <strong>Subscription rate</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-8">
                  <input
                    id="subRate"
                    name="subRate"
                    onChange={handleOnChange}
                    type="number"
                    placeholder="Ex: 10"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="listingRate"
                  className="block mt-4 mb-4 text-sm font-medium"
                >
                  <strong>Listing rate</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  id="listingRate"
                  placeholder="Ex: 10"
                  name="listingRate"
                  onChange={handleOnChange}
                  type="number"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            </div>
            <label
              htmlFor="whitelist"
              className="block mb-2 text-sm font-medium"
            >
              <strong>Whitelist</strong>{" "}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="flex space-x-2 mb-4">
              <div className="flex items-center">
                <input
                  id="disableWhitelist"
                  name="row-radio-buttons-group"
                  type="radio"
                  value="Disable"
                  className="form-radio"
                  onChange={handleWhitelistChange}
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
            <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="routerSelect"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Router</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div>
                  <select
                    id="routerSelect"
                    name="routerSelect"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    onChange={handleOnChange}
                  >
                    <option value="">-----Select Router Exchange-----</option>
                    <option value="Uniswap">Uniswap</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="liquidityAdditionPercent"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Liquidity Percent(%)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div>
                  <input
                    id="liquidityAdditionPercent"
                    name="liquidityAdditionPercent"
                    onChange={handleOnChange}
                    type="number"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="refundType"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Refund type</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="liquidityUnlockTime"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Liquidity lockup (days)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="liquidityUnlockTime"
                    name="liquidityUnlockTime"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Start time (UTC)</strong>{" "}
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
                  <strong>End time (UTC)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeFiLaunchpad;
