import FormContext from "@/contexts/create/FormContext";
import React, { useContext, useState } from "react";

interface DeFiLaunchpadProps {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
  selectedListingOption: string;
}

const DeFiLaunchpad: React.FC<DeFiLaunchpadProps> = ({
  chngeVal,
  onStepValidation,
  selectedListingOption,
}) => {
  const { routerSelect, setRouterSelect } = useContext(FormContext);
  const { infoData, setInfoData } = useContext(FormContext);

  const isFormValid = (): boolean => {
    return (
      infoData.perSaleRate > 0 &&
      infoData.softCap > 0 &&
      infoData.hardCap > 0 &&
      infoData.minimumBuy > 0 &&
      infoData.maximumBuy > 0
    );
  };

  const handleRouterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = {
      routerSelect: e.target.value,
    };
    setRouterSelect(data.routerSelect);
    onStepValidation(isFormValid());
  };

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

  const { whitelist, setWhitelist } = useContext(FormContext);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
    onStepValidation(isFormValid());
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

  console.log(whitelist, "jhg");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfoData({ ...infoData, [event.target.name]: event.target.value });
    const { name, value } = event.target;
    setVesting({
      ...vesting,
      [name]: parseFloat(value),
    });
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
              <strong>Presale rate</strong>{" "}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="mb-4">
              <input
                id="perSaleRate"
                name="perSaleRate"
                onChange={handleOnChange}
                type="number"
                defaultValue={0}
                required
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
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
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Softcap (MATIC)</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <input
                    id="softCap"
                    name="softCap"
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
                  htmlFor="hardCap"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>HardCap (MATIC)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
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
                  htmlFor="refundType"
                  className="block mb-2 text-sm font-medium"
                >
                  <strong>Refund type</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    defaultValue="Burn"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
                </div>
              </div>
            </div>
            {selectedListingOption === "auto" && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="routerSelect"
                    className="block mb-2 text-sm font-medium"
                  >
                    <strong>Router</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className="mb-4">
                    <select
                      id="routerSelect"
                      name="routerSelect"
                      onChange={handleRouterSelect}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    >
                      <option value="">-----Select Router Exchange-----</option>
                      <option value="Uniswap">Uniswap</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="liquidity"
                    className="block mb-2 text-sm font-medium"
                  >
                    <strong>Liquidity (%)</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className="mb-4">
                    <input
                      id="liquidity"
                      name="liquidity"
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
                    htmlFor="listingRate"
                    className="block mb-2 text-sm font-medium"
                  >
                    <strong>Listing rate</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <div className="mb-4">
                    <input
                      id="listingRate"
                      name="listingRate"
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
                    htmlFor="liquidityLockup"
                    className="block mb-2 text-sm font-medium"
                  >
                    <strong>Liquidity lockup (days)</strong>
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
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-lg mb-2" htmlFor="vestingEnabled">
                Vesting<span className="ml-1 text-red-500">*</span>
              </label>
              <div className="flex flex-col space-y-2 items-start">
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
              </div>
              {/* Vesting Parameters */}
              {vesting.enabled && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstReleasePercentage"
                      className="block mb-2 text-sm font-medium"
                    >
                      First Release Percentage
                    </label>
                    <input
                      id="firstReleasePercentage"
                      name="firstReleasePercentage"
                      type="number"
                      value={vesting.firstReleasePercentage}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="vestingPeriod"
                      className="block mb-2 text-sm font-medium"
                    >
                      Vesting Period
                    </label>
                    <input
                      id="vestingPeriod"
                      name="vestingPeriod"
                      type="number"
                      value={vesting.vestingPeriod}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cycleReleasePercentage"
                      className="block mb-2 text-sm font-medium"
                    >
                      Cycle Release Percentage
                    </label>
                    <input
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      value={vesting.cycleReleasePercentage}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeFiLaunchpad;

export class TokenDetails {}
