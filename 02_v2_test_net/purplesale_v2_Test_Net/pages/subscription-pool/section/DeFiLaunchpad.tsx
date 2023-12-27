import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import FormContext from "@/contexts/create/FormContext";
import React, { ChangeEvent, useContext, useState } from "react";
import Image from "next/image";

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
          <label htmlFor="perSaleRate" className="inputHeading">
            <strong>HardCap Tokens</strong>{" "}
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
            required
            className="input"
          />
        </div>
        <p className="inputAlert">HardCap Tokens must be greater than 0</p>
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
            <strong>SoftCap Tokens</strong>{" "}
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
            required
            className="input"
          />
        </div>
        <p className="inputAlert"> SoftCap Tokens must be greater than 0</p>
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
          <label htmlFor="hardCapTokenPerUser" className="inputHeading">
            <strong>HardCap Token Per User </strong>{" "}
            <span className="inputRequired">*</span>
          </label>
        </p>
        <div className="mb-4">
          <input
            id="hardCapTokenPerUser"
            name="hardCapTokenPerUser"
            onChange={handleOnChange}
            type="number"
            defaultValue={0}
            required
            className="input"
          />
        </div>
        <p className="inputAlert">
          HardCap Token Per User must be greater than 0
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
            <label htmlFor="subRate" className="inputHeading">
              <strong>Subscription rate</strong>{" "}
              <span className="inputRequired">*</span>
            </label>
          </p>
          <div className="mb-8">
            <input
              id="subRate"
              name="subRate"
              onChange={handleOnChange}
              type="number"
              placeholder="Ex: 10"
              className="input"
              required
            />
          </div>
        </div>
        <p className="inputAlert">Subscription rate must be greater than 0</p>
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
            <label htmlFor="listingRate" className="inputHeading">
              <strong>Listing rate</strong>{" "}
              <span className="inputRequired">*</span>
            </label>
          </p>

          <input
            id="listingRate"
            placeholder="Ex: 10"
            name="listingRate"
            onChange={handleOnChange}
            type="number"
            className="input"
            required
          />
        </div>
        <p className="inputAlert">Listing rate must be greater than 0</p>
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
            <strong>Whitelist</strong> <span className="inputRequired">*</span>
          </label>
        </p>
        <div className="flex flex-col space-y-2 items-start">
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
            <label
              htmlFor="disableWhitelist"
              className="ml-2 whitespace-nowrap"
            >
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
            <label htmlFor="enableWhitelist" className="ml-2 whitespace-nowrap">
              Enable
            </label>
          </div>
        </div>

        <p className="inputAlert">Whitelist must be selected</p>
      </BgInput>
      <BgInput>
        <div>
          {" "}
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="routerSelect" className="inputHeading">
              <strong>Router</strong> <span className="inputRequired">*</span>
            </label>
          </p>
          <div>
            <select
              id="routerSelect"
              name="routerSelect"
              className="input"
              onChange={handleOnChange}
            >
              <option value="">-----Select Router Exchange-----</option>
              <option value="Uniswap">Uniswap</option>
            </select>
          </div>
        </div>
        <p className="inputAlert">Router must be selected</p>
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
            <label htmlFor="liquidityAdditionPercent" className="inputHeading">
              <strong>Liquidity Percent(%)</strong>{" "}
              <span className="inputRequired">*</span>
            </label>
          </p>
          <div>
            <input
              id="liquidityAdditionPercent"
              name="liquidityAdditionPercent"
              onChange={handleOnChange}
              type="number"
              className="input"
              required
            />
          </div>
        </div>
        <p className="inputAlert">
          Liquidity Percent(%) must be greater than 0
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
        <p className="inputAlert">Refund type must be selected</p>
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
            <label htmlFor="liquidityUnlockTime" className="inputHeading">
              <strong>Liquidity lockup (days)</strong>{" "}
              <span className="inputRequired">*</span>
            </label>
          </p>
          <div className="mb-4">
            <input
              id="liquidityUnlockTime"
              name="liquidityUnlockTime"
              onChange={handleOnChange}
              type="number"
              defaultValue={0}
              className="input"
              required
            />
          </div>
        </div>
        <p className="inputAlert">
          Liquidity lockup (days) must be greater than 0
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
              className="input"
              required
            />
          </div>
        </div>
      </BgInput>
    </>
  );
};

export default DeFiLaunchpad;
