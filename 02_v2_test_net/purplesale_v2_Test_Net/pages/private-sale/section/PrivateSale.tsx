import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import FormContext from "@/contexts/create/FormContext";
import React, { useContext, useState } from "react";
import Image from "next/image";

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
              <span className="ml-1 text-red-500">*</span>
            </label>
          </p>
          <div className="flex space-x-2">
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
                className="input"
                onChange={handleWhitelistChange}
                required
              />
              <label htmlFor="enableWhitelist" className="ml-2 text-sm ">
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
                SoftCap (MATIC)<span className="ml-1 text-red-500">*</span>
              </strong>
            </label>
          </p>
          <div className="">
            <input
              id="softCap"
              name="softCap"
              onChange={handleOnChange}
              type="number"
              className="input"
              required
            />
          </div>
          <p className="inputAlert"> SoftCap must be less than HardCap</p>
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
            <label htmlFor="hardCap" className="inputHeading">
              <strong>HardCap (MATIC)</strong>
              <span className="ml-1 text-red-500">*</span>
            </label>
          </p>
          <div>
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
          <p className="inputAlert"> HardCap must be greater than SoftCap</p>
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
            <label htmlFor="firstReleasePercentage" className="inputHeading">
              <strong>First Fund Release For Project (%)</strong>
              <span className="ml-1 text-red-500">*</span>
            </label>
          </p>
          <div className="mb-4">
            <input
              id="firstReleasePercentage"
              name="firstReleasePercentage"
              onChange={handleOnChange}
              type="number"
              defaultValue={0}
              className="input"
              required
            />
          </div>
          <p className="inputAlert">
            {" "}
            First Fund Release must be less than 100%
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
            <label htmlFor="vestingPeriod" className="inputHeading">
              <strong>
                Fund Vesting Period Each Cycle (days)
                <span className="ml-1 text-red-500">*</span>
              </strong>
            </label>
          </p>
          <div className="mb-4">
            <input
              id="vestingPeriod"
              name="vestingPeriod"
              onChange={handleOnChange}
              type="number"
              defaultValue={0}
              className="input"
              required
            />
          </div>
          <p className="inputAlert"> Vesting Period must be greater than 0</p>
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
            <label htmlFor="fundReleaseEachCycle" className="inputHeading">
              <strong>
                Fund Release Each Cycle (percent){" "}
                <span className="ml-1 text-red-500">*</span>
              </strong>
            </label>
          </p>
          <div className="mb-4">
            <input
              id="fundReleaseEachCycle"
              name="fundReleaseEachCycle"
              onChange={handleOnChange}
              type="number"
              defaultValue={0}
              className="input"
              required
            />
          </div>
          <p className="inputAlert"> Fund Release must be less than 100%</p>
        </div>
      </BgInput>
    </div>
  );
};

export default PrivateSale;
