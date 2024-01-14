import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import FormContext from "@/contexts/create/FormContext";
import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import Image from "next/image";
import { useNetwork } from "wagmi";

interface PrivateSale {
  chngeVal: () => void;
  onStepValidation: (isValid: boolean) => void;
}

const BeforeYouStart: React.FC<PrivateSale> = ({
  chngeVal,
  onStepValidation,
}) => {
  const { routerSelect, setRouterSelect } = useContext(FormContext);
  const { infoData, setInfoData } = useContext(FormContext);
  const { chain } = useNetwork();
  // Add a new state to hold the selected currency
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    setSelectedCurrency(event.target.value);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
    onStepValidation(isFormValid());
  };

  const isFormValid = (): boolean => {
    return infoData.title !== "";
  };
  const { currency, setCurrency } = useContext(FormContext);
  const getCurrencyText = (): string => {
    switch (selectedCurrency) {
      case "MATIC":
        return "Users will pay with MATIC for your token";
      case "USDT":
        return "Users will pay with USDT for your token";
      case "USDC":
      default:
        return "Users will pay with USDC for your token";
    }
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
                <label htmlFor="liquidity" className="inputHeading">
                  <strong>Title</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="title"
                  name="title"
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Ex: This is the private sale of the token"
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
              <label className="inputHeading" htmlFor="currency">
                Currency
              </label>
            </p>
            <div className="flex flex-col space-y-2 items-start">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="maticCurrency"
                  name="currency"
                  value="ETH"
                  checked={currency === "ETH"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="maticCurrency">
                  ETH
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdtCurrency"
                  name="currency"
                  value="USDT"
                  checked={currency === "USDT"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdtCurrency">
                  USDT
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdcCurrency"
                  name="currency"
                  value="USDC"
                  checked={currency === "USDC"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdcCurrency">
                  USDC
                </label>
              </div>
            </div>
            <p className="inputAlert">
              Users will pay with {currency} for your token
            </p>
          </BgInput>
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
                <label htmlFor="liquidity" className="inputHeading">
                  <strong>Title</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="title"
                  name="title"
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Ex: This is the private sale of the token"
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
              <label className="inputHeading" htmlFor="currency">
                Currency
              </label>
            </p>
            <div className="flex flex-col space-y-2 items-start">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="maticCurrency"
                  name="currency"
                  value="ETH"
                  checked={currency === "ETH"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="maticCurrency">
                  ETH
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdtCurrency"
                  name="currency"
                  value="USDT"
                  checked={currency === "USDT"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdtCurrency">
                  USDT
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdcCurrency"
                  name="currency"
                  value="USDC"
                  checked={currency === "USDC"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdcCurrency">
                  USDC
                </label>
              </div>
            </div>
            <p className="inputAlert">
              Users will pay with {currency} for your token
            </p>
          </BgInput>
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
                <label htmlFor="liquidity" className="inputHeading">
                  <strong>Title</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="title"
                  name="title"
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Ex: This is the private sale of the token"
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
              <label className="inputHeading" htmlFor="currency">
                Currency
              </label>
            </p>
            <div className="flex flex-col space-y-2 items-start">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="maticCurrency"
                  name="currency"
                  value="ETH"
                  checked={currency === "ETH"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="maticCurrency">
                  ETH
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdtCurrency"
                  name="currency"
                  value="USDT"
                  checked={currency === "USDT"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdtCurrency">
                  USDT
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdcCurrency"
                  name="currency"
                  value="USDC"
                  checked={currency === "USDC"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdcCurrency">
                  USDC
                </label>
              </div>
            </div>
            <p className="inputAlert">
              Users will pay with {currency} for your token
            </p>
          </BgInput>
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
                <label htmlFor="liquidity" className="inputHeading">
                  <strong>Title</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="title"
                  name="title"
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Ex: This is the private sale of the token"
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
              <label className="inputHeading" htmlFor="currency">
                Currency
              </label>
            </p>
            <div className="flex flex-col space-y-2 items-start">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="maticCurrency"
                  name="currency"
                  value="MATIC"
                  checked={currency === "MATIC"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="maticCurrency">
                  MATIC
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdtCurrency"
                  name="currency"
                  value="USDT"
                  checked={currency === "USDT"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdtCurrency">
                  USDT
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdcCurrency"
                  name="currency"
                  value="USDC"
                  checked={currency === "USDC"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdcCurrency">
                  USDC
                </label>
              </div>
            </div>
            <p className="inputAlert">
              Users will pay with {currency} for your token
            </p>
          </BgInput>
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
                <label htmlFor="liquidity" className="inputHeading">
                  <strong>Title</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="title"
                  name="title"
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Ex: This is the private sale of the token"
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
              <label className="inputHeading" htmlFor="currency">
                Currency
              </label>
            </p>
            <div className="flex flex-col space-y-2 items-start">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="maticCurrency"
                  name="currency"
                  value="MATIC"
                  checked={currency === "MATIC"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="maticCurrency">
                  MATIC
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdtCurrency"
                  name="currency"
                  value="USDT"
                  checked={currency === "USDT"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdtCurrency">
                  USDT
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdcCurrency"
                  name="currency"
                  value="USDC"
                  checked={currency === "USDC"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdcCurrency">
                  USDC
                </label>
              </div>
            </div>
            <p className="inputAlert">
              Users will pay with {currency} for your token
            </p>
          </BgInput>
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
                <label htmlFor="liquidity" className="inputHeading">
                  <strong>Title</strong>
                  <span className="ml-1 text-red-500">*</span>
                </label>
              </p>
              <div className="mb-4">
                <input
                  id="title"
                  name="title"
                  onChange={handleOnChange}
                  type="text"
                  placeholder="Ex: This is the private sale of the token"
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
              <label className="inputHeading" htmlFor="currency">
                Currency
              </label>
            </p>
            <div className="flex flex-col space-y-2 items-start">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="maticCurrency"
                  name="currency"
                  value="AVAX"
                  checked={currency === "AVAX"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="maticCurrency">
                  AVAX
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdtCurrency"
                  name="currency"
                  value="USDT"
                  checked={currency === "USDT"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdtCurrency">
                  USDT
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="usdcCurrency"
                  name="currency"
                  value="USDC"
                  checked={currency === "USDC"}
                  onChange={handleCurrencyChange}
                  className="input"
                />
                <label className="ml-2" htmlFor="usdcCurrency">
                  USDC
                </label>
              </div>
            </div>
            <p className="inputAlert">
              Users will pay with {currency} for your token
            </p>
          </BgInput>
        </>
      )}
    </>
  );
};

export default BeforeYouStart;
