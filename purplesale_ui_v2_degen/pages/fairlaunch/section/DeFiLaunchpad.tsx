import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import FormContext from "@/contexts/create/FormContext";
import React, { ChangeEvent, useContext, useState } from "react";
import Image from "next/image";
import { useNetwork } from "wagmi";

interface DeFiLaunchpadProps {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const DeFiLaunchpad: React.FC<DeFiLaunchpadProps> = ({
  chngeVal,
  onStepValidation,
}) => {
  const { chain } = useNetwork();
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
    <>
      {!chain?.name && (
        <>
          <div>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="perSaleRate" className="inputHeading">
                  <strong>
                    Total Selling Amount<span className="inputRequired">*</span>
                  </strong>
                </label>
              </p>
              <div>
                <input
                  id="tokensToSell"
                  name="tokensToSell"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  required
                  className="input"
                />
                <p className="inputAlert">
                  Total selling amount cannot be blank and must be greater than
                  0
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="whitelist" className="inputHeading">
                    <strong>Whitelist</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      onChange={handleWhitelistChange}
                      id="whitelist"
                      name="whitelist"
                      type="radio"
                      value="Disable"
                      className="input"
                      required
                    />
                    <label htmlFor="disableWhitelist" className="ml-2">
                      Disable
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="enableWhitelist"
                      name="whitelist"
                      type="radio"
                      value="Enable"
                      className="input"
                      onChange={handleWhitelistChange}
                      required
                    />
                    <label htmlFor="enableWhitelist" className="ml-2 ">
                      Enable
                    </label>
                  </div>
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="softCap" className="inputHeading">
                    <strong>
                      Softcap (ETH)<span className="inputRequired">*</span>
                    </strong>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                  <p className="inputAlert">
                    Softcap cannot be blank and must be greater than 0
                  </p>
                </div>
              </div>
            </BgInput>
            <BgInput>
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
                <div>
                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="rewardPercentage" className="inputHeading">
                      Max Contribution (ETH){" "}
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    type="text"
                    className="input"
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                  />
                </div>
              )}
            </BgInput>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="countries" className="inputHeading">
                  {getSelectedRouterLabel()}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <select
                id="router"
                name="router"
                value={selectedRouter}
                onChange={handleRouterChange}
                className="input"
              >
                <option value="">---Select Router Exchange---</option>
                {routerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label
                    htmlFor="liquidityAdditionPercent"
                    className="inputHeading"
                  >
                    {getFieldLabel("liquidity (%)")}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <input
                  id="liquidityAdditionPercent"
                  name="liquidityAdditionPercent"
                  onChange={handleOnChange}
                  type="number"
                  className="input"
                  placeholder="Ex: 52"
                />
                <p className="inputAlert">
                  Liquidity cannot be blank and must be between 50% and 100%
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  The duration between start time and end time must be less than
                  7 days
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="endDate"
                    name="endDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>

              <p className="inputAlert">
                The duration between start time and end time must be less than 7
                days
              </p>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    type="number"
                    onChange={handleOnChange}
                    placeholder="Ex: 30 days"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  Liquidity lockup cannot be blank and must be greater than 0
                </p>
              </div>
            </BgInput>
          </div>
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
          <div>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="perSaleRate" className="inputHeading">
                  <strong>
                    Total Selling Amount<span className="inputRequired">*</span>
                  </strong>
                </label>
              </p>
              <div>
                <input
                  id="tokensToSell"
                  name="tokensToSell"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  required
                  className="input"
                />
                <p className="inputAlert">
                  Total selling amount cannot be blank and must be greater than
                  0
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="whitelist" className="inputHeading">
                    <strong>Whitelist</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      onChange={handleWhitelistChange}
                      id="whitelist"
                      name="whitelist"
                      type="radio"
                      value="Disable"
                      className="input"
                      required
                    />
                    <label htmlFor="disableWhitelist" className="ml-2">
                      Disable
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="enableWhitelist"
                      name="whitelist"
                      type="radio"
                      value="Enable"
                      className="input"
                      onChange={handleWhitelistChange}
                      required
                    />
                    <label htmlFor="enableWhitelist" className="ml-2 ">
                      Enable
                    </label>
                  </div>
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="softCap" className="inputHeading">
                    <strong>
                      Softcap (ETH)<span className="inputRequired">*</span>
                    </strong>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                  <p className="inputAlert">
                    Softcap cannot be blank and must be greater than 0
                  </p>
                </div>
              </div>
            </BgInput>
            <BgInput>
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
                <div>
                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="rewardPercentage" className="inputHeading">
                      Max Contribution (ETH){" "}
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    type="text"
                    className="input"
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                  />
                </div>
              )}
            </BgInput>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="countries" className="inputHeading">
                  {getSelectedRouterLabel()}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <select
                id="router"
                name="router"
                value={selectedRouter}
                onChange={handleRouterChange}
                className="input"
              >
                <option value="">---Select Router Exchange---</option>
                {routerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label
                    htmlFor="liquidityAdditionPercent"
                    className="inputHeading"
                  >
                    {getFieldLabel("liquidity (%)")}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <input
                  id="liquidityAdditionPercent"
                  name="liquidityAdditionPercent"
                  onChange={handleOnChange}
                  type="number"
                  className="input"
                  placeholder="Ex: 52"
                />
                <p className="inputAlert">
                  Liquidity cannot be blank and must be between 50% and 100%
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  The duration between start time and end time must be less than
                  7 days
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="endDate"
                    name="endDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>

              <p className="inputAlert">
                The duration between start time and end time must be less than 7
                days
              </p>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    type="number"
                    onChange={handleOnChange}
                    placeholder="Ex: 30 days"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  Liquidity lockup cannot be blank and must be greater than 0
                </p>
              </div>
            </BgInput>
          </div>
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
          <div>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="perSaleRate" className="inputHeading">
                  <strong>
                    Total Selling Amount<span className="inputRequired">*</span>
                  </strong>
                </label>
              </p>
              <div>
                <input
                  id="tokensToSell"
                  name="tokensToSell"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  required
                  className="input"
                />
                <p className="inputAlert">
                  Total selling amount cannot be blank and must be greater than
                  0
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="whitelist" className="inputHeading">
                    <strong>Whitelist</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      onChange={handleWhitelistChange}
                      id="whitelist"
                      name="whitelist"
                      type="radio"
                      value="Disable"
                      className="input"
                      required
                    />
                    <label htmlFor="disableWhitelist" className="ml-2">
                      Disable
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="enableWhitelist"
                      name="whitelist"
                      type="radio"
                      value="Enable"
                      className="input"
                      onChange={handleWhitelistChange}
                      required
                    />
                    <label htmlFor="enableWhitelist" className="ml-2 ">
                      Enable
                    </label>
                  </div>
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="softCap" className="inputHeading">
                    <strong>
                      Softcap (ETH)<span className="inputRequired">*</span>
                    </strong>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                  <p className="inputAlert">
                    Softcap cannot be blank and must be greater than 0
                  </p>
                </div>
              </div>
            </BgInput>
            <BgInput>
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
                <div>
                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="rewardPercentage" className="inputHeading">
                      Max Contribution (ETH){" "}
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    type="text"
                    className="input"
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                  />
                </div>
              )}
            </BgInput>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="countries" className="inputHeading">
                  {getSelectedRouterLabel()}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <select
                id="router"
                name="router"
                value={selectedRouter}
                onChange={handleRouterChange}
                className="input"
              >
                <option value="">---Select Router Exchange---</option>
                {routerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label
                    htmlFor="liquidityAdditionPercent"
                    className="inputHeading"
                  >
                    {getFieldLabel("liquidity (%)")}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <input
                  id="liquidityAdditionPercent"
                  name="liquidityAdditionPercent"
                  onChange={handleOnChange}
                  type="number"
                  className="input"
                  placeholder="Ex: 52"
                />
                <p className="inputAlert">
                  Liquidity cannot be blank and must be between 50% and 100%
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  The duration between start time and end time must be less than
                  7 days
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="endDate"
                    name="endDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>

              <p className="inputAlert">
                The duration between start time and end time must be less than 7
                days
              </p>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    type="number"
                    onChange={handleOnChange}
                    placeholder="Ex: 30 days"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  Liquidity lockup cannot be blank and must be greater than 0
                </p>
              </div>
            </BgInput>
          </div>
        </>
      )}

      {chain?.name === "Polygon" && (
        <>
          <div>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="perSaleRate" className="inputHeading">
                  <strong>
                    Total Selling Amount<span className="inputRequired">*</span>
                  </strong>
                </label>
              </p>
              <div>
                <input
                  id="tokensToSell"
                  name="tokensToSell"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  required
                  className="input"
                />
                <p className="inputAlert">
                  Total selling amount cannot be blank and must be greater than
                  0
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="whitelist" className="inputHeading">
                    <strong>Whitelist</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      onChange={handleWhitelistChange}
                      id="whitelist"
                      name="whitelist"
                      type="radio"
                      value="Disable"
                      className="input"
                      required
                    />
                    <label htmlFor="disableWhitelist" className="ml-2">
                      Disable
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="enableWhitelist"
                      name="whitelist"
                      type="radio"
                      value="Enable"
                      className="input"
                      onChange={handleWhitelistChange}
                      required
                    />
                    <label htmlFor="enableWhitelist" className="ml-2 ">
                      Enable
                    </label>
                  </div>
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="softCap" className="inputHeading">
                    <strong>
                      Softcap (MATIC)<span className="inputRequired">*</span>
                    </strong>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                  <p className="inputAlert">
                    Softcap cannot be blank and must be greater than 0
                  </p>
                </div>
              </div>
            </BgInput>
            <BgInput>
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
                <div>
                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="rewardPercentage" className="inputHeading">
                      Max Contribution (MATIC){" "}
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    type="text"
                    className="input"
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                  />
                </div>
              )}
            </BgInput>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="countries" className="inputHeading">
                  {getSelectedRouterLabel()}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <select
                id="router"
                name="router"
                value={selectedRouter}
                onChange={handleRouterChange}
                className="input"
              >
                <option value="">---Select Router Exchange---</option>
                {routerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label
                    htmlFor="liquidityAdditionPercent"
                    className="inputHeading"
                  >
                    {getFieldLabel("liquidity (%)")}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <input
                  id="liquidityAdditionPercent"
                  name="liquidityAdditionPercent"
                  onChange={handleOnChange}
                  type="number"
                  className="input"
                  placeholder="Ex: 52"
                />
                <p className="inputAlert">
                  Liquidity cannot be blank and must be between 50% and 100%
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  The duration between start time and end time must be less than
                  7 days
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="endDate"
                    name="endDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>

              <p className="inputAlert">
                The duration between start time and end time must be less than 7
                days
              </p>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    type="number"
                    onChange={handleOnChange}
                    placeholder="Ex: 30 days"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  Liquidity lockup cannot be blank and must be greater than 0
                </p>
              </div>
            </BgInput>
          </div>
        </>
      )}

      {chain?.name === "Avalanche" && (
        <>
          <div>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="perSaleRate" className="inputHeading">
                  <strong>
                    Total Selling Amount<span className="inputRequired">*</span>
                  </strong>
                </label>
              </p>
              <div>
                <input
                  id="tokensToSell"
                  name="tokensToSell"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  required
                  className="input"
                />
                <p className="inputAlert">
                  Total selling amount cannot be blank and must be greater than
                  0
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="whitelist" className="inputHeading">
                    <strong>Whitelist</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      onChange={handleWhitelistChange}
                      id="whitelist"
                      name="whitelist"
                      type="radio"
                      value="Disable"
                      className="input"
                      required
                    />
                    <label htmlFor="disableWhitelist" className="ml-2">
                      Disable
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="enableWhitelist"
                      name="whitelist"
                      type="radio"
                      value="Enable"
                      className="input"
                      onChange={handleWhitelistChange}
                      required
                    />
                    <label htmlFor="enableWhitelist" className="ml-2 ">
                      Enable
                    </label>
                  </div>
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="softCap" className="inputHeading">
                    <strong>
                      Softcap (AVAX)<span className="inputRequired">*</span>
                    </strong>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                  <p className="inputAlert">
                    Softcap cannot be blank and must be greater than 0
                  </p>
                </div>
              </div>
            </BgInput>
            <BgInput>
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
                <div>
                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="rewardPercentage" className="inputHeading">
                      Max Contribution (AVAX){" "}
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    type="text"
                    className="input"
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                  />
                </div>
              )}
            </BgInput>
            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="countries" className="inputHeading">
                  {getSelectedRouterLabel()}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <select
                id="router"
                name="router"
                value={selectedRouter}
                onChange={handleRouterChange}
                className="input"
              >
                <option value="">---Select Router Exchange---</option>
                {routerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label
                    htmlFor="liquidityAdditionPercent"
                    className="inputHeading"
                  >
                    {getFieldLabel("liquidity (%)")}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <input
                  id="liquidityAdditionPercent"
                  name="liquidityAdditionPercent"
                  onChange={handleOnChange}
                  type="number"
                  className="input"
                  placeholder="Ex: 52"
                />
                <p className="inputAlert">
                  Liquidity cannot be blank and must be between 50% and 100%
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  The duration between start time and end time must be less than
                  7 days
                </p>
              </div>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="endDate"
                    name="endDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>

              <p className="inputAlert">
                The duration between start time and end time must be less than 7
                days
              </p>
            </BgInput>
            <BgInput>
              <div>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    type="number"
                    onChange={handleOnChange}
                    placeholder="Ex: 30 days"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">
                  Liquidity lockup cannot be blank and must be greater than 0
                </p>
              </div>
            </BgInput>
          </div>
        </>
      )}
    </>
  );
};

export default DeFiLaunchpad;
