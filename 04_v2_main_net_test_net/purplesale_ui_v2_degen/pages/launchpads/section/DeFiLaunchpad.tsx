import FormContext from "@/contexts/create/FormContext";
import React, { useContext, useState } from "react";
import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import Image from "next/image";
import { useNetwork } from "wagmi";

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
  const { chain } = useNetwork();
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfoData({ ...infoData, [event.target.name]: event.target.value });
    const { name, value } = event.target;
    setVesting({
      ...vesting,
      [name]: parseFloat(value),
    });
  };
  return (
    <>
      {!chain?.name && <></>}
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
                  <strong>Presale rate</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="perSaleRate"
                  name="perSaleRate"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  required
                  className="input"
                />
              </div>
              <p className="inputAlert">Presale rate must be greater than 0</p>
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
                  <strong>Token address</strong>
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 mt-4 ml-2">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="form-radio "
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
                <label htmlFor="softCap" className="inputHeading">
                  <strong>Softcap (ETH)</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="softCap"
                  name="softCap"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Softcap must be greater than 0</p>
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
                <label htmlFor="hardCap" className="inputHeading">
                  <strong>HardCap (ETH)</strong>
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="hardCap"
                  name="hardCap"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Hardcap must be greater than 0</p>
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
                <label htmlFor="minimumBuy" className="inputHeading">
                  <strong>Minimum buy (ETH)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="minimumBuy"
                  name="minimumBuy"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Minimum buy must be greater than 0</p>
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
                <label htmlFor="maximumBuy" className="inputHeading">
                  <strong>Maximum buy (ETH)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="maximumBuy"
                  name="maximumBuy"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Maximum buy must be greater than 0</p>
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
                <label htmlFor="refundType" className="inputHeading">
                  <strong>Refund type</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <select
                  id="refundType"
                  name="refundType"
                  onChange={handleOnChange}
                  className="input"
                  defaultValue="Burn"
                >
                  <option value="Burn">Burn</option>
                  <option value="Refund">Refund</option>
                </select>
              </div>
            </BgInput>

            {selectedListingOption === "auto" && (
              <>
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
                      <strong>Router</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <select
                      id="routerSelect"
                      name="routerSelect"
                      onChange={handleRouterSelect}
                      className="input"
                    >
                      <option value="">-----Select Router Exchange-----</option>
                      <option value="Uniswap">Uniswap</option>
                    </select>
                  </div>
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

                    <label htmlFor="liquidity" className="inputHeading">
                      <strong>Liquidity (%)</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <input
                      id="liquidity"
                      name="liquidity"
                      onChange={handleOnChange}
                      type="number"
                      defaultValue={0}
                      className="input"
                      required
                    />
                  </div>
                  <p className="inputAlert">Liquidity must be greater than 0</p>
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
                    <label htmlFor="listingRate" className="inputHeading">
                      <strong>Listing rate</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <input
                      id="listingRate"
                      name="listingRate"
                      onChange={handleOnChange}
                      type="number"
                      defaultValue={0}
                      className="input"
                      required
                    />
                  </div>
                  <p className="inputAlert">
                    Listing rate must be greater than 0
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
                    <label htmlFor="liquidityLockup" className="inputHeading">
                      <strong>Liquidity lockup (days)</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
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
                </BgInput>
              </>
            )}
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>
                    <span className="ml-1 text-red-500">*</span>
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input"
                    required
                  />
                </div>
              </BgInput>
            </div>

            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label className="block text-lg mb-2" htmlFor="vestingEnabled">
                  Vesting<span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
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
                    className="form-radio ml-2 mt-2"
                  />
                  <label
                    htmlFor="vestingDisabled"
                    className="mt-2 ml-2 text-sm"
                  >
                    Disable Vesting
                  </label>
                </div>
              </div>
            </BgInput>
            {vesting.enabled && (
              <>
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
                        htmlFor="firstReleasePercentage"
                        className="inputHeading"
                      >
                        First Release Percentage
                      </label>
                    </p>
                    <input
                      id="firstReleasePercentage"
                      name="firstReleasePercentage"
                      type="number"
                      value={vesting.firstReleasePercentage}
                      onChange={handleChange}
                      className="input"
                    />
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

                      <label htmlFor="vestingPeriod" className="inputHeading">
                        Vesting Period
                      </label>
                    </p>
                    <input
                      id="vestingPeriod"
                      name="vestingPeriod"
                      type="number"
                      value={vesting.vestingPeriod}
                      onChange={handleChange}
                      className="input"
                    />
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

                      <label
                        htmlFor="cycleReleasePercentage"
                        className="inputHeading"
                      >
                        Cycle Release Percentage
                      </label>
                    </p>
                    <input
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      value={vesting.cycleReleasePercentage}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </BgInput>
              </>
            )}
          </div>
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
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
                    <strong>Presale rate</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="perSaleRate"
                    name="perSaleRate"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    required
                    className="input"
                  />
                </div>
                <p className="inputAlert">
                  Presale rate must be greater than 0
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
                  <label htmlFor="whitelist" className="inputHeading">
                    <strong>Token address</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="flex space-x-2 mt-4 ml-2">
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
                  <label htmlFor="softCap" className="inputHeading">
                    <strong>Softcap (ETH)</strong>{" "}
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="softCap"
                    name="softCap"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    min={0}
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">Softcap must be greater than 0</p>
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
                  <label htmlFor="hardCap" className="inputHeading">
                    <strong>HardCap (ETH)</strong>
                    <span className="inputRequired">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="hardCap"
                    name="hardCap"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    min={0}
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">Hardcap must be greater than 0</p>
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
                  <label htmlFor="minimumBuy" className="inputHeading">
                    <strong>Minimum buy (ETH)</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="minimumBuy"
                    name="minimumBuy"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">Minimum buy must be greater than 0</p>
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
                  <label htmlFor="maximumBuy" className="inputHeading">
                    <strong>Maximum buy (ETH)</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="maximumBuy"
                    name="maximumBuy"
                    onChange={handleOnChange}
                    type="number"
                    defaultValue={0}
                    className="input"
                    required
                  />
                </div>
                <p className="inputAlert">Maximum buy must be greater than 0</p>
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
                  <label htmlFor="refundType" className="inputHeading">
                    <strong>Refund type</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <select
                    id="refundType"
                    name="refundType"
                    onChange={handleOnChange}
                    className="input"
                    defaultValue="Burn"
                  >
                    <option value="Burn">Burn</option>
                    <option value="Refund">Refund</option>
                  </select>
                </div>
              </BgInput>

              {selectedListingOption === "auto" && (
                <>
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
                        <strong>Router</strong>
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                    </p>
                    <div className="mb-4">
                      <select
                        id="routerSelect"
                        name="routerSelect"
                        onChange={handleRouterSelect}
                        className="input"
                      >
                        <option value="">
                          -----Select Router Exchange-----
                        </option>
                        <option value="Uniswap">Uniswap</option>
                      </select>
                    </div>
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

                      <label htmlFor="liquidity" className="inputHeading">
                        <strong>Liquidity (%)</strong>
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                    </p>
                    <div className="mb-4">
                      <input
                        id="liquidity"
                        name="liquidity"
                        onChange={handleOnChange}
                        type="number"
                        defaultValue={0}
                        className="input"
                        required
                      />
                    </div>
                    <p className="inputAlert">
                      Liquidity must be greater than 0
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
                      <label htmlFor="listingRate" className="inputHeading">
                        <strong>Listing rate</strong>
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                    </p>
                    <div className="mb-4">
                      <input
                        id="listingRate"
                        name="listingRate"
                        onChange={handleOnChange}
                        type="number"
                        defaultValue={0}
                        className="input"
                        required
                      />
                    </div>
                    <p className="inputAlert">
                      Listing rate must be greater than 0
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
                      <label htmlFor="liquidityLockup" className="inputHeading">
                        <strong>Liquidity lockup (days)</strong>
                        <span className="ml-1 text-red-500">*</span>
                      </label>
                    </p>
                    <div className="mb-4">
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
                  </BgInput>
                </>
              )}
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
                    <label htmlFor="startDate" className="inputHeading">
                      <strong>Start time (UTC)</strong>
                      <span className="ml-1 text-red-500">*</span>
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
                    <label htmlFor="endDate" className="inputHeading">
                      <strong>End time (UTC)</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <input
                      id="endDate"
                      name="endDate"
                      type="datetime-local"
                      defaultValue={0}
                      onChange={handleOnChange}
                      className="input"
                      required
                    />
                  </div>
                </BgInput>
              </div>

              <BgInput>
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label
                    className="block text-lg mb-2"
                    htmlFor="vestingEnabled"
                  >
                    Vesting<span className="ml-1 text-red-500">*</span>
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="vestingEnabled"
                      name="vestingEnabled"
                      value="enable"
                      onChange={handleVestingEnableChange}
                      className="form-radio ml-2"
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
                      className="form-radio ml-2 mt-2"
                    />
                    <label
                      htmlFor="vestingDisabled"
                      className="mt-2 ml-2 text-sm"
                    >
                      Disable Vesting
                    </label>
                  </div>
                </div>
              </BgInput>
              {vesting.enabled && (
                <>
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
                          htmlFor="firstReleasePercentage"
                          className="inputHeading"
                        >
                          First Release Percentage
                        </label>
                      </p>
                      <input
                        id="firstReleasePercentage"
                        name="firstReleasePercentage"
                        type="number"
                        value={vesting.firstReleasePercentage}
                        onChange={handleChange}
                        className="input"
                      />
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

                        <label htmlFor="vestingPeriod" className="inputHeading">
                          Vesting Period
                        </label>
                      </p>
                      <input
                        id="vestingPeriod"
                        name="vestingPeriod"
                        type="number"
                        value={vesting.vestingPeriod}
                        onChange={handleChange}
                        className="input"
                      />
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

                        <label
                          htmlFor="cycleReleasePercentage"
                          className="inputHeading"
                        >
                          Cycle Release Percentage
                        </label>
                      </p>
                      <input
                        id="cycleReleasePercentage"
                        name="cycleReleasePercentage"
                        type="number"
                        value={vesting.cycleReleasePercentage}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>
                  </BgInput>
                </>
              )}
            </div>
          </>
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
                  <strong>Presale rate</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="perSaleRate"
                  name="perSaleRate"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  required
                  className="input"
                />
              </div>
              <p className="inputAlert">Presale rate must be greater than 0</p>
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
                  <strong>Token address</strong>
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 mt-4 ml-2">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="form-radio "
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
                <label htmlFor="softCap" className="inputHeading">
                  <strong>Softcap (MATIC)</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="softCap"
                  name="softCap"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Softcap must be greater than 0</p>
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
                <label htmlFor="hardCap" className="inputHeading">
                  <strong>HardCap (MATIC)</strong>
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="hardCap"
                  name="hardCap"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Hardcap must be greater than 0</p>
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
                <label htmlFor="minimumBuy" className="inputHeading">
                  <strong>Minimum buy (MATIC)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="minimumBuy"
                  name="minimumBuy"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Minimum buy must be greater than 0</p>
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
                <label htmlFor="maximumBuy" className="inputHeading">
                  <strong>Maximum buy (MATIC)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="maximumBuy"
                  name="maximumBuy"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Maximum buy must be greater than 0</p>
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
                <label htmlFor="refundType" className="inputHeading">
                  <strong>Refund type</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <select
                  id="refundType"
                  name="refundType"
                  onChange={handleOnChange}
                  className="input"
                  defaultValue="Burn"
                >
                  <option value="Burn">Burn</option>
                  <option value="Refund">Refund</option>
                </select>
              </div>
            </BgInput>

            {selectedListingOption === "auto" && (
              <>
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
                      <strong>Router</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <select
                      id="routerSelect"
                      name="routerSelect"
                      onChange={handleRouterSelect}
                      className="input"
                    >
                      <option value="">-----Select Router Exchange-----</option>
                      <option value="Uniswap">Uniswap</option>
                    </select>
                  </div>
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

                    <label htmlFor="liquidity" className="inputHeading">
                      <strong>Liquidity (%)</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <input
                      id="liquidity"
                      name="liquidity"
                      onChange={handleOnChange}
                      type="number"
                      defaultValue={0}
                      className="input"
                      required
                    />
                  </div>
                  <p className="inputAlert">Liquidity must be greater than 0</p>
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
                    <label htmlFor="listingRate" className="inputHeading">
                      <strong>Listing rate</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <input
                      id="listingRate"
                      name="listingRate"
                      onChange={handleOnChange}
                      type="number"
                      defaultValue={0}
                      className="input"
                      required
                    />
                  </div>
                  <p className="inputAlert">
                    Listing rate must be greater than 0
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
                    <label htmlFor="liquidityLockup" className="inputHeading">
                      <strong>Liquidity lockup (days)</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
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
                </BgInput>
              </>
            )}
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>
                    <span className="ml-1 text-red-500">*</span>
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input"
                    required
                  />
                </div>
              </BgInput>
            </div>

            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label className="block text-lg mb-2" htmlFor="vestingEnabled">
                  Vesting<span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
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
                    className="form-radio ml-2 mt-2"
                  />
                  <label
                    htmlFor="vestingDisabled"
                    className="mt-2 ml-2 text-sm"
                  >
                    Disable Vesting
                  </label>
                </div>
              </div>
            </BgInput>
            {vesting.enabled && (
              <>
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
                        htmlFor="firstReleasePercentage"
                        className="inputHeading"
                      >
                        First Release Percentage
                      </label>
                    </p>
                    <input
                      id="firstReleasePercentage"
                      name="firstReleasePercentage"
                      type="number"
                      value={vesting.firstReleasePercentage}
                      onChange={handleChange}
                      className="input"
                    />
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

                      <label htmlFor="vestingPeriod" className="inputHeading">
                        Vesting Period
                      </label>
                    </p>
                    <input
                      id="vestingPeriod"
                      name="vestingPeriod"
                      type="number"
                      value={vesting.vestingPeriod}
                      onChange={handleChange}
                      className="input"
                    />
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

                      <label
                        htmlFor="cycleReleasePercentage"
                        className="inputHeading"
                      >
                        Cycle Release Percentage
                      </label>
                    </p>
                    <input
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      value={vesting.cycleReleasePercentage}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </BgInput>
              </>
            )}
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
                  <strong>Presale rate</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="perSaleRate"
                  name="perSaleRate"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  required
                  className="input"
                />
              </div>
              <p className="inputAlert">Presale rate must be greater than 0</p>
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
                  <strong>Token address</strong>
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="flex space-x-2 mt-4 ml-2">
                <div className="flex items-center">
                  <input
                    id="disableWhitelist"
                    name="row-radio-buttons-group"
                    type="radio"
                    value="Disable"
                    className="form-radio "
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
                <label htmlFor="softCap" className="inputHeading">
                  <strong>Softcap (AVAX)</strong>{" "}
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="softCap"
                  name="softCap"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Softcap must be greater than 0</p>
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
                <label htmlFor="hardCap" className="inputHeading">
                  <strong>HardCap (AVAX)</strong>
                  <span className="inputRequired">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="hardCap"
                  name="hardCap"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  min={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Hardcap must be greater than 0</p>
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
                <label htmlFor="minimumBuy" className="inputHeading">
                  <strong>Minimum buy (AVAX)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="minimumBuy"
                  name="minimumBuy"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Minimum buy must be greater than 0</p>
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
                <label htmlFor="maximumBuy" className="inputHeading">
                  <strong>Maximum buy (AVAX)</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="maximumBuy"
                  name="maximumBuy"
                  onChange={handleOnChange}
                  type="number"
                  defaultValue={0}
                  className="input"
                  required
                />
              </div>
              <p className="inputAlert">Maximum buy must be greater than 0</p>
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
                <label htmlFor="refundType" className="inputHeading">
                  <strong>Refund type</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <select
                  id="refundType"
                  name="refundType"
                  onChange={handleOnChange}
                  className="input"
                  defaultValue="Burn"
                >
                  <option value="Burn">Burn</option>
                  <option value="Refund">Refund</option>
                </select>
              </div>
            </BgInput>

            {selectedListingOption === "auto" && (
              <>
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
                      <strong>Router</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <select
                      id="routerSelect"
                      name="routerSelect"
                      onChange={handleRouterSelect}
                      className="input"
                    >
                      <option value="">-----Select Router Exchange-----</option>
                      <option value="Uniswap">Uniswap</option>
                    </select>
                  </div>
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

                    <label htmlFor="liquidity" className="inputHeading">
                      <strong>Liquidity (%)</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <input
                      id="liquidity"
                      name="liquidity"
                      onChange={handleOnChange}
                      type="number"
                      defaultValue={0}
                      className="input"
                      required
                    />
                  </div>
                  <p className="inputAlert">Liquidity must be greater than 0</p>
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
                    <label htmlFor="listingRate" className="inputHeading">
                      <strong>Listing rate</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
                    <input
                      id="listingRate"
                      name="listingRate"
                      onChange={handleOnChange}
                      type="number"
                      defaultValue={0}
                      className="input"
                      required
                    />
                  </div>
                  <p className="inputAlert">
                    Listing rate must be greater than 0
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
                    <label htmlFor="liquidityLockup" className="inputHeading">
                      <strong>Liquidity lockup (days)</strong>
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                  </p>
                  <div className="mb-4">
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
                </BgInput>
              </>
            )}
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
                  <label htmlFor="startDate" className="inputHeading">
                    <strong>Start time (UTC)</strong>
                    <span className="ml-1 text-red-500">*</span>
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
                  <label htmlFor="endDate" className="inputHeading">
                    <strong>End time (UTC)</strong>
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                </p>
                <div className="mb-4">
                  <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    defaultValue={0}
                    onChange={handleOnChange}
                    className="input"
                    required
                  />
                </div>
              </BgInput>
            </div>

            <BgInput>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label className="block text-lg mb-2" htmlFor="vestingEnabled">
                  Vesting<span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="vestingEnabled"
                    name="vestingEnabled"
                    value="enable"
                    onChange={handleVestingEnableChange}
                    className="form-radio ml-2"
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
                    className="form-radio ml-2 mt-2"
                  />
                  <label
                    htmlFor="vestingDisabled"
                    className="mt-2 ml-2 text-sm"
                  >
                    Disable Vesting
                  </label>
                </div>
              </div>
            </BgInput>
            {vesting.enabled && (
              <>
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
                        htmlFor="firstReleasePercentage"
                        className="inputHeading"
                      >
                        First Release Percentage
                      </label>
                    </p>
                    <input
                      id="firstReleasePercentage"
                      name="firstReleasePercentage"
                      type="number"
                      value={vesting.firstReleasePercentage}
                      onChange={handleChange}
                      className="input"
                    />
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

                      <label htmlFor="vestingPeriod" className="inputHeading">
                        Vesting Period
                      </label>
                    </p>
                    <input
                      id="vestingPeriod"
                      name="vestingPeriod"
                      type="number"
                      value={vesting.vestingPeriod}
                      onChange={handleChange}
                      className="input"
                    />
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

                      <label
                        htmlFor="cycleReleasePercentage"
                        className="inputHeading"
                      >
                        Cycle Release Percentage
                      </label>
                    </p>
                    <input
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      value={vesting.cycleReleasePercentage}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                </BgInput>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DeFiLaunchpad;
