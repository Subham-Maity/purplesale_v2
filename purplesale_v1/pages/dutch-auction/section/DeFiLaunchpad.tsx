import FormContext from "@/contexts/create/FormContext";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

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
      infoData.tokensToSell > 0 &&
      infoData.startPrice > 0 &&
      infoData.endPrice > 0 &&
      infoData.minContribution > 0 &&
      infoData.maxContribution > 0 &&
      infoData.decreasePriceCycle > 0 &&
      infoData.liquidityPercent > 0 &&
      infoData.liquidityLockup > 0
    );
  };

  const [selectedRouter, setSelectedRouter] = useState<string | undefined>(
    undefined,
  );

  const { vesting, setVesting } = useContext(FormContext);

  const handleVestingEnableChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const enableVesting = event.target.value === "enable";

    if (enableVesting) {
      setVesting({
        ...vesting,
        enabled: true,
      });
    } else {
      setVesting({
        enabled: false,
        firstReleasePercentage: 0,
        vestingPeriod: 0,
        cycleReleasePercentage: 0,
      });
    }
  };

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

  const [softCap, setSoftCap] = useState<number>(0);
  const [hardCap, setHardCap] = useState<number>(0);

  useEffect(() => {
    const calculateCaps = () => {
      const tokensToSell = parseFloat(String(Number(infoData.tokensToSell)));
      const startPrice = parseFloat(String(infoData.startPrice));
      const endPrice = parseFloat(String(infoData.endPrice));
      if (!isNaN(tokensToSell) && !isNaN(startPrice) && !isNaN(endPrice)) {
        setSoftCap(tokensToSell * endPrice);
        setHardCap(tokensToSell * startPrice);
      } else {
        // Clear softCap and hardCap when any of the input fields are empty
        setSoftCap(0);
        setHardCap(0);
      }
    };

    calculateCaps();
  }, [infoData.tokensToSell, infoData.startPrice, infoData.endPrice]);
  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
          <form className="px-3 py-3">
            <label
              htmlFor="tokensToSell"
              className="block mb-2 text-sm font-medium"
            >
              <strong>Total Selling Amount</strong>{" "}
              <span className="ml-1 text-red-500">*</span>
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
            <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="startPrice"
                  className="block mt-4 mb-4 text-sm font-medium"
                >
                  <strong>Start Price (MATIC)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-8">
                  <input
                    id="startPrice"
                    name="startPrice"
                    onChange={handleOnChange}
                    placeholder="Ex: 10"
                    type="number"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="endPrice"
                  className="block mt-4 mb-4 text-sm font-medium"
                >
                  <strong>End Price (MATIC)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-8">
                  <input
                    placeholder="Ex: 10"
                    id="endPrice"
                    name="endPrice"
                    onChange={handleOnChange}
                    type="number"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="softCap"
                className="block mt-4 mb-4 text-sm font-medium"
              >
                <strong>SoftCap (MATIC)</strong>{" "}
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="mb-8">
                <input
                  id="softCap"
                  name="softCap"
                  onChange={handleOnChange}
                  value={softCap}
                  type="number"
                  placeholder="Ex: 10"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="hardCap"
                className="block mt-4 mb-4 text-sm font-medium"
              >
                <strong>HardCap (MATIC)</strong>{" "}
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="mb-8">
                <input
                  id="hardCap"
                  value={hardCap}
                  placeholder="Ex: 10"
                  onChange={handleOnChange}
                  name="hardCap"
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
                  htmlFor="minContribution"
                  className="block mt-4 mb-4 text-sm font-medium"
                >
                  <strong>Min Contribution (MATIC)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-8">
                  <input
                    id="minContribution"
                    name="minContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="maxContribution"
                  className="block mt-4 mb-4 text-sm font-medium"
                >
                  <strong>Max Contribution (MATIC)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-8">
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="decreasePriceCycle"
                  className="block mt-4 mb-4 text-sm font-medium"
                >
                  <strong>Decrease Price Cycle (MINUTES)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-8">
                  <input
                    id="decreasePriceCycle"
                    name="decreasePriceCycle"
                    onChange={handleOnChange}
                    type="number"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="liquidityPercent"
                  className="block mt-4 mb-4 text-sm font-medium"
                >
                  <strong>Liquidity Percent(%)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-8">
                  <input
                    id="liquidityPercent"
                    name="liquidityPercent"
                    onChange={handleOnChange}
                    type="number"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
            </div>
            <label
              htmlFor="routerSelect"
              className="block mb-2 text-sm font-medium"
            >
              <strong>Router</strong>{" "}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="mb-4">
              <select
                id="routerSelect"
                name="routerSelect"
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">-----Select Router Exchange-----</option>
                <option value="Uniswap">Uniswap</option>
              </select>
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
                  htmlFor="liquidityLockup"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Liquidity lockup (days)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
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
            <div className="flex items-center">
              <input
                type="radio"
                id="vestingEnabled"
                name="vestingEnabled"
                value="enable"
                onChange={handleVestingEnableChange}
                className="form-radio"
              />
              <label htmlFor="vestingEnabled" className="ml-2 text-sm">
                Enable Vesting
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="vestingDisabled"
                name="vestingEnabled"
                value="disable"
                onChange={handleVestingEnableChange}
                className="form-radio"
              />
              <label htmlFor="vestingDisabled" className="ml-2 text-sm">
                Disable Vesting
              </label>
            </div>
            {vesting.enabled && (
              <div className="mt-6">
                <label
                  htmlFor="tgereleasePercentage"
                  className="block mb-2 text-sm font-medium"
                >
                  TGE Release percentage(%)*
                </label>
                <input
                  id="tgereleasePercentage"
                  name="tgereleasePercentage"
                  onChange={handleOnChange}
                  type="number"
                  className="w-full mt-4 mb-4 border border-gray-300 rounded py-2 px-4"
                  placeholder="Ex: 10"
                />
                <div className="grid grid-cols-2 mt-4 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="cycle"
                      className="block mb-2 text-sm font-medium"
                    >
                      Cycle (days)*
                    </label>
                    <input
                      onChange={handleOnChange}
                      id="cycle"
                      name="cycle"
                      type="number"
                      className="w-full mt-4 mb-4 border border-gray-300 rounded py-2 px-4"
                      placeholder="Ex: 10"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cycleReleasePercentage"
                      className="block mb-2 text-sm font-medium"
                    >
                      Cycle Release percentage(%)*
                    </label>
                    <input
                      onChange={handleOnChange}
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      className="w-full mt-4 mb-4 border border-gray-300 rounded py-2 px-4"
                      placeholder="Ex: 10"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeFiLaunchpad;
