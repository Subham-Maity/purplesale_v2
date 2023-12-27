import FormContext from "@/contexts/create/FormContext";
import React, { useContext, useState } from "react";

interface DeFiLaunchpadProps {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const PrivateSale: React.FC<DeFiLaunchpadProps> = ({
  chngeVal,
  onStepValidation,
}) => {
  const { routerSelect, setRouterSelect, whitelist, setWhitelist } =
    useContext(FormContext);
  const { infoData, setInfoData } = useContext(FormContext);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });

    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return (
      infoData.softCap > 0 &&
      infoData.hardCap > 0 &&
      infoData.fundReleaseEachCycle > 0 &&
      infoData.firstReleasePercentage > 0 &&
      infoData.vestingPeriod > 0
    );
  };
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
  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
          <form className="px-3 py-3">
            <div className="mb-4">
              <label
                htmlFor="whitelist"
                className="block mb-4 text-sm font-medium"
              >
                <strong>Whitelist</strong>{" "}
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="flex space-x-2">
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
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="softCap"
                  className="block mb-4 text-sm font-medium"
                >
                  <strong>
                    Softcap (MATIC)<span className="ml-1 text-red-500">*</span>
                  </strong>
                </label>
                <div className="">
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
              <div>
                <label
                  htmlFor="hardCap"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>HardCap (MATIC)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div>
                  <input
                    id="hardCap"
                    name="hardCap"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    min={0}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="minimumBuy"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Minimum buy (MATIC)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="minimumBuy"
                    name="minimumBuy"
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
                  htmlFor="maximumBuy"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Maximum buy (MATIC)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="maximumBuy"
                    name="maximumBuy"
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
                  <strong>Select start time & end time (UTC)*</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
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
              <div className="mt-8">
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
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="firstReleasePercentage"
                className="block mb-2 text-sm font-medium"
              >
                <strong>First Fund Release For Project (%)</strong>
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="mb-4">
                <input
                  id="firstReleasePercentage"
                  name="firstReleasePercentage"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="vestingPeriod"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Fund Vesting Period Each Cycle (days)*</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="vestingPeriod"
                    name="vestingPeriod"
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
                  htmlFor="fundReleaseEachCycle"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Fund Release Each Cycle (percent)*</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="fundReleaseEachCycle"
                    name="fundReleaseEachCycle"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
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

export default PrivateSale;

export class TokenDetails {}
