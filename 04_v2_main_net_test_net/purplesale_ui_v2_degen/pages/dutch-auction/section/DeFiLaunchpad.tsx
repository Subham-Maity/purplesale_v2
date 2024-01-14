import FormContext from "@/contexts/create/FormContext";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
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
  const { routerSelect, setRouterSelect } = useContext(FormContext);
  const { infoData, setInfoData } = useContext(FormContext);
  const { chain } = useNetwork();
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
                <label htmlFor="tokensToSell" className="inputHeading">
                  <strong>Total Selling Amount</strong>{" "}
                  <span className="inputRequired">*</span>
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
              </div>
              <p className="inputAlert">
                Total tokens to sell must be greater than 0
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
                  <label htmlFor="startPrice" className="inputHeading">
                    <strong>Start Price (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startPrice"
                    name="startPrice"
                    onChange={handleOnChange}
                    placeholder="Ex: 10"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Start price must be greater than 0</p>
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
                  <label htmlFor="endPrice" className="inputHeading">
                    <strong>End Price (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    placeholder="Ex: 10"
                    id="endPrice"
                    name="endPrice"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert"> End price must be greater than 0</p>
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
                    <strong>SoftCap (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    value={softCap}
                    type="number"
                    placeholder="Ex: 10"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Soft cap must be greater than 0</p>
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
                  <label htmlFor="hardCap" className="inputHeading">
                    <strong>HardCap (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="hardCap"
                    value={hardCap}
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                    name="hardCap"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert"> Hard cap must be greater than 0</p>
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
                <label htmlFor="whitelist" className="inputHeading">
                  <strong>Whitelist</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 ">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="input"
                    onChange={handleWhitelistChange}
                    required
                  />
                  <label htmlFor="disableWhitelist" className="ml-2">
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
                  <label htmlFor="enableWhitelist" className="ml-2">
                    Enable
                  </label>
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
                  <label htmlFor="minContribution" className="inputHeading">
                    <strong>Min Contribution (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="minContribution"
                    name="minContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Min contribution must be greater than 0
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
                  <label htmlFor="maxContribution" className="inputHeading">
                    <strong>Max Contribution (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Max contribution must be greater than 0
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
                  <label htmlFor="decreasePriceCycle" className="inputHeading">
                    <strong>Decrease Price Cycle (MINUTES)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="decreasePriceCycle"
                    name="decreasePriceCycle"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Decrease price cycle must be greater than 0
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
                  <label htmlFor="liquidityPercent" className="inputHeading">
                    <strong>Liquidity Percent(%)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityPercent"
                    name="liquidityPercent"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity percent must be greater than 0
              </p>
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
                <label htmlFor="routerSelect" className="inputHeading">
                  <strong>Router</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div>
                <select id="routerSelect" name="routerSelect" className="input">
                  <option value="">-----Select Router Exchange-----</option>
                  <option value="Uniswap">Uniswap</option>
                </select>
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
                  <label htmlFor="refundType" className="inputHeading">
                    <strong>Refund type</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="input"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
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
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="">
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity lockup must be greater than 0
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input mb-8"
                    required
                  />
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div className="flex items-center">
                <p className="flex">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
                  />
                </p>
                <label
                  htmlFor="vestingEnabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Enable Vesting
                </label>
              </div>
              <div className="flex items-center mb-8">
                <input
                  type="radio"
                  id="vestingDisabled"
                  name="vestingEnabled"
                  value="disable"
                  onChange={handleVestingEnableChange}
                  className="form-radio ml-2"
                />
                <label
                  htmlFor="vestingDisabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Disable Vesting
                </label>
              </div>

              {vesting.enabled && (
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
                      htmlFor="tgereleasePercentage"
                      className="inputHeading "
                    >
                      TGE Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      id="tgereleasePercentage"
                      name="tgereleasePercentage"
                      onChange={handleOnChange}
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      TGE release percentage must be greater than 0
                    </p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="cycle" className="inputHeading ">
                      Cycle (days)<span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycle"
                      name="cycle"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />

                    <p className="inputAlert">Cycle must be greater than 0</p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label
                      htmlFor="cycleReleasePercentage"
                      className="inputHeading"
                    >
                      Cycle Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      Cycle release percentage must be greater than 0
                    </p>
                  </div>
                </div>
              )}
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
                <label htmlFor="tokensToSell" className="inputHeading">
                  <strong>Total Selling Amount</strong>{" "}
                  <span className="inputRequired">*</span>
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
              </div>
              <p className="inputAlert">
                Total tokens to sell must be greater than 0
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
                  <label htmlFor="startPrice" className="inputHeading">
                    <strong>Start Price (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startPrice"
                    name="startPrice"
                    onChange={handleOnChange}
                    placeholder="Ex: 10"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Start price must be greater than 0</p>
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
                  <label htmlFor="endPrice" className="inputHeading">
                    <strong>End Price (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    placeholder="Ex: 10"
                    id="endPrice"
                    name="endPrice"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert"> End price must be greater than 0</p>
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
                    <strong>SoftCap (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    value={softCap}
                    type="number"
                    placeholder="Ex: 10"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Soft cap must be greater than 0</p>
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
                  <label htmlFor="hardCap" className="inputHeading">
                    <strong>HardCap (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="hardCap"
                    value={hardCap}
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                    name="hardCap"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert"> Hard cap must be greater than 0</p>
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
                <label htmlFor="whitelist" className="inputHeading">
                  <strong>Whitelist</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 ">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="input"
                    onChange={handleWhitelistChange}
                    required
                  />
                  <label htmlFor="disableWhitelist" className="ml-2">
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
                  <label htmlFor="enableWhitelist" className="ml-2">
                    Enable
                  </label>
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
                  <label htmlFor="minContribution" className="inputHeading">
                    <strong>Min Contribution (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="minContribution"
                    name="minContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Min contribution must be greater than 0
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
                  <label htmlFor="maxContribution" className="inputHeading">
                    <strong>Max Contribution (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Max contribution must be greater than 0
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
                  <label htmlFor="decreasePriceCycle" className="inputHeading">
                    <strong>Decrease Price Cycle (MINUTES)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="decreasePriceCycle"
                    name="decreasePriceCycle"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Decrease price cycle must be greater than 0
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
                  <label htmlFor="liquidityPercent" className="inputHeading">
                    <strong>Liquidity Percent(%)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityPercent"
                    name="liquidityPercent"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity percent must be greater than 0
              </p>
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
                <label htmlFor="routerSelect" className="inputHeading">
                  <strong>Router</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div>
                <select id="routerSelect" name="routerSelect" className="input">
                  <option value="">-----Select Router Exchange-----</option>
                  <option value="Uniswap">Uniswap</option>
                </select>
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
                  <label htmlFor="refundType" className="inputHeading">
                    <strong>Refund type</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="input"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
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
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="">
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity lockup must be greater than 0
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input mb-8"
                    required
                  />
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div className="flex items-center">
                <p className="flex">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
                  />
                </p>
                <label
                  htmlFor="vestingEnabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Enable Vesting
                </label>
              </div>
              <div className="flex items-center mb-8">
                <input
                  type="radio"
                  id="vestingDisabled"
                  name="vestingEnabled"
                  value="disable"
                  onChange={handleVestingEnableChange}
                  className="form-radio ml-2"
                />
                <label
                  htmlFor="vestingDisabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Disable Vesting
                </label>
              </div>

              {vesting.enabled && (
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
                      htmlFor="tgereleasePercentage"
                      className="inputHeading "
                    >
                      TGE Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      id="tgereleasePercentage"
                      name="tgereleasePercentage"
                      onChange={handleOnChange}
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      TGE release percentage must be greater than 0
                    </p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="cycle" className="inputHeading ">
                      Cycle (days)<span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycle"
                      name="cycle"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />

                    <p className="inputAlert">Cycle must be greater than 0</p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label
                      htmlFor="cycleReleasePercentage"
                      className="inputHeading"
                    >
                      Cycle Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      Cycle release percentage must be greater than 0
                    </p>
                  </div>
                </div>
              )}
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
                <label htmlFor="tokensToSell" className="inputHeading">
                  <strong>Total Selling Amount</strong>{" "}
                  <span className="inputRequired">*</span>
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
              </div>
              <p className="inputAlert">
                Total tokens to sell must be greater than 0
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
                  <label htmlFor="startPrice" className="inputHeading">
                    <strong>Start Price (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startPrice"
                    name="startPrice"
                    onChange={handleOnChange}
                    placeholder="Ex: 10"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Start price must be greater than 0</p>
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
                  <label htmlFor="endPrice" className="inputHeading">
                    <strong>End Price (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    placeholder="Ex: 10"
                    id="endPrice"
                    name="endPrice"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert"> End price must be greater than 0</p>
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
                    <strong>SoftCap (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    value={softCap}
                    type="number"
                    placeholder="Ex: 10"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Soft cap must be greater than 0</p>
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
                  <label htmlFor="hardCap" className="inputHeading">
                    <strong>HardCap (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="hardCap"
                    value={hardCap}
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                    name="hardCap"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert"> Hard cap must be greater than 0</p>
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
                <label htmlFor="whitelist" className="inputHeading">
                  <strong>Whitelist</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 ">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="input"
                    onChange={handleWhitelistChange}
                    required
                  />
                  <label htmlFor="disableWhitelist" className="ml-2">
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
                  <label htmlFor="enableWhitelist" className="ml-2">
                    Enable
                  </label>
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
                  <label htmlFor="minContribution" className="inputHeading">
                    <strong>Min Contribution (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="minContribution"
                    name="minContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Min contribution must be greater than 0
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
                  <label htmlFor="maxContribution" className="inputHeading">
                    <strong>Max Contribution (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Max contribution must be greater than 0
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
                  <label htmlFor="decreasePriceCycle" className="inputHeading">
                    <strong>Decrease Price Cycle (MINUTES)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="decreasePriceCycle"
                    name="decreasePriceCycle"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Decrease price cycle must be greater than 0
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
                  <label htmlFor="liquidityPercent" className="inputHeading">
                    <strong>Liquidity Percent(%)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityPercent"
                    name="liquidityPercent"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity percent must be greater than 0
              </p>
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
                <label htmlFor="routerSelect" className="inputHeading">
                  <strong>Router</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div>
                <select id="routerSelect" name="routerSelect" className="input">
                  <option value="">-----Select Router Exchange-----</option>
                  <option value="Uniswap">Uniswap</option>
                </select>
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
                  <label htmlFor="refundType" className="inputHeading">
                    <strong>Refund type</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="input"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
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
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="">
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity lockup must be greater than 0
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input mb-8"
                    required
                  />
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div className="flex items-center">
                <p className="flex">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
                  />
                </p>
                <label
                  htmlFor="vestingEnabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Enable Vesting
                </label>
              </div>
              <div className="flex items-center mb-8">
                <input
                  type="radio"
                  id="vestingDisabled"
                  name="vestingEnabled"
                  value="disable"
                  onChange={handleVestingEnableChange}
                  className="form-radio ml-2"
                />
                <label
                  htmlFor="vestingDisabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Disable Vesting
                </label>
              </div>

              {vesting.enabled && (
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
                      htmlFor="tgereleasePercentage"
                      className="inputHeading "
                    >
                      TGE Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      id="tgereleasePercentage"
                      name="tgereleasePercentage"
                      onChange={handleOnChange}
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      TGE release percentage must be greater than 0
                    </p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="cycle" className="inputHeading ">
                      Cycle (days)<span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycle"
                      name="cycle"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />

                    <p className="inputAlert">Cycle must be greater than 0</p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label
                      htmlFor="cycleReleasePercentage"
                      className="inputHeading"
                    >
                      Cycle Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      Cycle release percentage must be greater than 0
                    </p>
                  </div>
                </div>
              )}
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
                <label htmlFor="tokensToSell" className="inputHeading">
                  <strong>Total Selling Amount</strong>{" "}
                  <span className="inputRequired">*</span>
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
              </div>
              <p className="inputAlert">
                Total tokens to sell must be greater than 0
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
                  <label htmlFor="startPrice" className="inputHeading">
                    <strong>Start Price (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startPrice"
                    name="startPrice"
                    onChange={handleOnChange}
                    placeholder="Ex: 10"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Start price must be greater than 0</p>
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
                  <label htmlFor="endPrice" className="inputHeading">
                    <strong>End Price (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    placeholder="Ex: 10"
                    id="endPrice"
                    name="endPrice"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert"> End price must be greater than 0</p>
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
                    <strong>SoftCap (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    value={softCap}
                    type="number"
                    placeholder="Ex: 10"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Soft cap must be greater than 0</p>
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
                  <label htmlFor="hardCap" className="inputHeading">
                    <strong>HardCap (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="hardCap"
                    value={hardCap}
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                    name="hardCap"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert"> Hard cap must be greater than 0</p>
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
                <label htmlFor="whitelist" className="inputHeading">
                  <strong>Whitelist</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 ">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="input"
                    onChange={handleWhitelistChange}
                    required
                  />
                  <label htmlFor="disableWhitelist" className="ml-2">
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
                  <label htmlFor="enableWhitelist" className="ml-2">
                    Enable
                  </label>
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
                  <label htmlFor="minContribution" className="inputHeading">
                    <strong>Min Contribution (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="minContribution"
                    name="minContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Min contribution must be greater than 0
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
                  <label htmlFor="maxContribution" className="inputHeading">
                    <strong>Max Contribution (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Max contribution must be greater than 0
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
                  <label htmlFor="decreasePriceCycle" className="inputHeading">
                    <strong>Decrease Price Cycle (MINUTES)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="decreasePriceCycle"
                    name="decreasePriceCycle"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Decrease price cycle must be greater than 0
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
                  <label htmlFor="liquidityPercent" className="inputHeading">
                    <strong>Liquidity Percent(%)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityPercent"
                    name="liquidityPercent"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity percent must be greater than 0
              </p>
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
                <label htmlFor="routerSelect" className="inputHeading">
                  <strong>Router</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div>
                <select id="routerSelect" name="routerSelect" className="input">
                  <option value="">-----Select Router Exchange-----</option>
                  <option value="Uniswap">Uniswap</option>
                </select>
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
                  <label htmlFor="refundType" className="inputHeading">
                    <strong>Refund type</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="input"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
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
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="">
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity lockup must be greater than 0
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input mb-8"
                    required
                  />
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div className="flex items-center">
                <p className="flex">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
                  />
                </p>
                <label
                  htmlFor="vestingEnabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Enable Vesting
                </label>
              </div>
              <div className="flex items-center mb-8">
                <input
                  type="radio"
                  id="vestingDisabled"
                  name="vestingEnabled"
                  value="disable"
                  onChange={handleVestingEnableChange}
                  className="form-radio ml-2"
                />
                <label
                  htmlFor="vestingDisabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Disable Vesting
                </label>
              </div>

              {vesting.enabled && (
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
                      htmlFor="tgereleasePercentage"
                      className="inputHeading "
                    >
                      TGE Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      id="tgereleasePercentage"
                      name="tgereleasePercentage"
                      onChange={handleOnChange}
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      TGE release percentage must be greater than 0
                    </p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="cycle" className="inputHeading ">
                      Cycle (days)<span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycle"
                      name="cycle"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />

                    <p className="inputAlert">Cycle must be greater than 0</p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label
                      htmlFor="cycleReleasePercentage"
                      className="inputHeading"
                    >
                      Cycle Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      Cycle release percentage must be greater than 0
                    </p>
                  </div>
                </div>
              )}
            </BgInput>
          </div>
        </>
      )}
      {chain?.name === "Polygon Mumbai" && (
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
                <label htmlFor="tokensToSell" className="inputHeading">
                  <strong>Total Selling Amount</strong>{" "}
                  <span className="inputRequired">*</span>
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
              </div>
              <p className="inputAlert">
                Total tokens to sell must be greater than 0
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
                  <label htmlFor="startPrice" className="inputHeading">
                    <strong>Start Price (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startPrice"
                    name="startPrice"
                    onChange={handleOnChange}
                    placeholder="Ex: 10"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Start price must be greater than 0</p>
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
                  <label htmlFor="endPrice" className="inputHeading">
                    <strong>End Price (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    placeholder="Ex: 10"
                    id="endPrice"
                    name="endPrice"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert"> End price must be greater than 0</p>
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
                    <strong>SoftCap (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    value={softCap}
                    type="number"
                    placeholder="Ex: 10"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Soft cap must be greater than 0</p>
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
                  <label htmlFor="hardCap" className="inputHeading">
                    <strong>HardCap (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="hardCap"
                    value={hardCap}
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                    name="hardCap"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert"> Hard cap must be greater than 0</p>
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
                <label htmlFor="whitelist" className="inputHeading">
                  <strong>Whitelist</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 ">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="input"
                    onChange={handleWhitelistChange}
                    required
                  />
                  <label htmlFor="disableWhitelist" className="ml-2">
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
                  <label htmlFor="enableWhitelist" className="ml-2">
                    Enable
                  </label>
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
                  <label htmlFor="minContribution" className="inputHeading">
                    <strong>Min Contribution (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="minContribution"
                    name="minContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Min contribution must be greater than 0
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
                  <label htmlFor="maxContribution" className="inputHeading">
                    <strong>Max Contribution (MATIC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Max contribution must be greater than 0
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
                  <label htmlFor="decreasePriceCycle" className="inputHeading">
                    <strong>Decrease Price Cycle (MINUTES)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="decreasePriceCycle"
                    name="decreasePriceCycle"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Decrease price cycle must be greater than 0
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
                  <label htmlFor="liquidityPercent" className="inputHeading">
                    <strong>Liquidity Percent(%)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityPercent"
                    name="liquidityPercent"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity percent must be greater than 0
              </p>
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
                <label htmlFor="routerSelect" className="inputHeading">
                  <strong>Router</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div>
                <select id="routerSelect" name="routerSelect" className="input">
                  <option value="">-----Select Router Exchange-----</option>
                  <option value="Uniswap">Uniswap</option>
                </select>
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
                  <label htmlFor="refundType" className="inputHeading">
                    <strong>Refund type</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="input"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
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
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="">
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity lockup must be greater than 0
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input mb-8"
                    required
                  />
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div className="flex items-center">
                <p className="flex">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
                  />
                </p>
                <label
                  htmlFor="vestingEnabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Enable Vesting
                </label>
              </div>
              <div className="flex items-center mb-8">
                <input
                  type="radio"
                  id="vestingDisabled"
                  name="vestingEnabled"
                  value="disable"
                  onChange={handleVestingEnableChange}
                  className="form-radio ml-2"
                />
                <label
                  htmlFor="vestingDisabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Disable Vesting
                </label>
              </div>

              {vesting.enabled && (
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
                      htmlFor="tgereleasePercentage"
                      className="inputHeading "
                    >
                      TGE Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      id="tgereleasePercentage"
                      name="tgereleasePercentage"
                      onChange={handleOnChange}
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      TGE release percentage must be greater than 0
                    </p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="cycle" className="inputHeading ">
                      Cycle (days)<span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycle"
                      name="cycle"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />

                    <p className="inputAlert">Cycle must be greater than 0</p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label
                      htmlFor="cycleReleasePercentage"
                      className="inputHeading"
                    >
                      Cycle Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      Cycle release percentage must be greater than 0
                    </p>
                  </div>
                </div>
              )}
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
                <label htmlFor="tokensToSell" className="inputHeading">
                  <strong>Total Selling Amount</strong>{" "}
                  <span className="inputRequired">*</span>
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
              </div>
              <p className="inputAlert">
                Total tokens to sell must be greater than 0
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
                  <label htmlFor="startPrice" className="inputHeading">
                    <strong>Start Price (AVAX)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="startPrice"
                    name="startPrice"
                    onChange={handleOnChange}
                    placeholder="Ex: 10"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Start price must be greater than 0</p>
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
                  <label htmlFor="endPrice" className="inputHeading">
                    <strong>End Price (AVAX)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    placeholder="Ex: 10"
                    id="endPrice"
                    name="endPrice"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert"> End price must be greater than 0</p>
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
                    <strong>SoftCap (AVAX)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    value={softCap}
                    type="number"
                    placeholder="Ex: 10"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">Soft cap must be greater than 0</p>
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
                  <label htmlFor="hardCap" className="inputHeading">
                    <strong>HardCap (AVAX)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="hardCap"
                    value={hardCap}
                    placeholder="Ex: 10"
                    onChange={handleOnChange}
                    name="hardCap"
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert"> Hard cap must be greater than 0</p>
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
                <label htmlFor="whitelist" className="inputHeading">
                  <strong>Whitelist</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 ">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="input"
                    onChange={handleWhitelistChange}
                    required
                  />
                  <label htmlFor="disableWhitelist" className="ml-2">
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
                  <label htmlFor="enableWhitelist" className="ml-2">
                    Enable
                  </label>
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
                  <label htmlFor="minContribution" className="inputHeading">
                    <strong>Min Contribution (AVAX)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="minContribution"
                    name="minContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Min contribution must be greater than 0
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
                  <label htmlFor="maxContribution" className="inputHeading">
                    <strong>Max Contribution (AVAX)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="maxContribution"
                    name="maxContribution"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                {" "}
                Max contribution must be greater than 0
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
                  <label htmlFor="decreasePriceCycle" className="inputHeading">
                    <strong>Decrease Price Cycle (MINUTES)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="decreasePriceCycle"
                    name="decreasePriceCycle"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Decrease price cycle must be greater than 0
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
                  <label htmlFor="liquidityPercent" className="inputHeading">
                    <strong>Liquidity Percent(%)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div>
                  <input
                    id="liquidityPercent"
                    name="liquidityPercent"
                    onChange={handleOnChange}
                    type="number"
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity percent must be greater than 0
              </p>
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
                <label htmlFor="routerSelect" className="inputHeading">
                  <strong>Router</strong>{" "}
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div>
                <select id="routerSelect" name="routerSelect" className="input">
                  <option value="">-----Select Router Exchange-----</option>
                  <option value="Uniswap">Uniswap</option>
                </select>
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
                  <label htmlFor="refundType" className="inputHeading">
                    <strong>Refund type</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="input"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
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
                  <label htmlFor="liquidityLockup" className="inputHeading">
                    <strong>Liquidity lockup (days)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="">
                  <input
                    id="liquidityLockup"
                    name="liquidityLockup"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
              </div>
              <p className="inputAlert">
                Liquidity lockup must be greater than 0
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="startDate"
                    name="startDate"
                    onChange={handleOnChange}
                    type="datetime-local"
                    className="input"
                    required
                  />
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input mb-8"
                    required
                  />
                </div>
              </div>
            </BgInput>
            <BgInput>
              <div className="flex items-center">
                <p className="flex">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
                  />
                </p>
                <label
                  htmlFor="vestingEnabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Enable Vesting
                </label>
              </div>
              <div className="flex items-center mb-8">
                <input
                  type="radio"
                  id="vestingDisabled"
                  name="vestingEnabled"
                  value="disable"
                  onChange={handleVestingEnableChange}
                  className="form-radio ml-2"
                />
                <label
                  htmlFor="vestingDisabled"
                  className="ml-2 whitespace-nowrap"
                >
                  Disable Vesting
                </label>
              </div>

              {vesting.enabled && (
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
                      htmlFor="tgereleasePercentage"
                      className="inputHeading "
                    >
                      TGE Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      id="tgereleasePercentage"
                      name="tgereleasePercentage"
                      onChange={handleOnChange}
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      TGE release percentage must be greater than 0
                    </p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label htmlFor="cycle" className="inputHeading ">
                      Cycle (days)<span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycle"
                      name="cycle"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />

                    <p className="inputAlert">Cycle must be greater than 0</p>
                  </div>

                  <p className="flex">
                    <Image
                      src={"/Line.svg"}
                      alt={"Line"}
                      width={3}
                      height={2}
                      className="inputImageBar"
                    />
                    <label
                      htmlFor="cycleReleasePercentage"
                      className="inputHeading"
                    >
                      Cycle Release percentage(%)
                      <span className="inputRequired">*</span>
                    </label>
                  </p>
                  <div className="mb-8">
                    <input
                      onChange={handleOnChange}
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                    <p className="inputAlert">
                      Cycle release percentage must be greater than 0
                    </p>
                  </div>
                </div>
              )}
            </BgInput>
          </div>
        </>
      )}
    </>
  );
};

export default DeFiLaunchpad;
