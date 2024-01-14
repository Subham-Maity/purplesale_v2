import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import { ERC20Abi } from "@/constants/PolygonMumbai/createConstants";
import FormContext from "@/contexts/create/FormContext";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead, useNetwork } from "wagmi";
import Image from "next/image";

type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};

const VerifyToken: React.FC<VerifyTokenProps> = ({ onStepValidation }) => {
  const { chain } = useNetwork();
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [affiliateChangePercent, setAffiliateChangePercent] =
    useState<number>(0);
  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const {
    tokenAddress,
    setTokenAddress,
    isAffiliateEnabled,
    setIsAffiliateEnabled,
    currency,
    setCurrency,
    feeOption,
    setFeeOption,
    tokenDetails,
    setTokenDetails,
  } = useContext(FormContext);

  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    setFeeOption(`5% ${event.target.value} raised only (Recommended)`);
  };

  const handleAffiliateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpenAffiliate(event.target.value === "enable" ? true : false);
  };

  const handleAffiliateChangePercent = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setAffiliateChangePercent(parseFloat(event.target.value));
  };

  const handleChangeTokenAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTokenAddress = event.target.value;
    const isValidFormat = /^0x[0-9A-Fa-f]+$/.test(inputTokenAddress);
    setTokenAddress(event.target.value);
    setIsValidAddress(isValidFormat);
  };

  const checkTokenAddressValidity = () => {
    if (tokenAddress.trim() === "") {
      setIsValidAddress(false);
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
      return;
    }

    const isTokenAddressFormatValid = /^0x[0-9A-Fa-f]{40}$/i.test(tokenAddress);

    setIsValidAddress(isTokenAddressFormatValid);
    if (isTokenAddressFormatValid) {
      fetchTokenDetails();
    } else {
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
    }
  };

  const { data: decimals } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const { data: name } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "name",
  });

  const { data: symbol } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "symbol",
  });

  const fetchTokenDetails = async () => {
    if (decimals && name && symbol) {
      setTokenDetails({
        //@ts-ignore
        name: name,
        //@ts-ignore
        symbol: symbol,
        //@ts-ignore
        decimals: decimals,
      });

      setIsValidAddress(true);
    } else {
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
      setIsValidAddress(false);
    }
  };

  useEffect(() => {
    const isFormValid = (): boolean => {
      const isValidTokenAddress = isValidAddress && tokenAddress.trim() !== "";
      return isValidTokenAddress && isValidAddress;
    };
    onStepValidation(isFormValid());
    setIsAffiliateEnabled(affiliateChangePercent);
  }, [
    isValidAddress,
    tokenAddress,
    onStepValidation,
    affiliateChangePercent,
    setIsAffiliateEnabled,
  ]);

  return (
    <>
      {!chain?.name && (
        <>
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

                  <label className="inputHeading" htmlFor="tokenAddress">
                    Token address <span className="inputRequired">*</span>
                  </label>
                </p>
                <input
                  id="tokenAddress"
                  type="text"
                  className="input "
                  value={tokenAddress}
                  onChange={handleChangeTokenAddress}
                  onBlur={checkTokenAddressValidity}
                  required
                />
                {!isValidAddress && tokenAddress.trim() !== "" && (
                  <p className="inputAlert">Invalid/Network token address</p>
                )}
              </div>

              {isValidAddress && (
                <div>
                  <p className="inputAlert">Name: {tokenDetails.name}</p>
                  <p className="inputAlert">Symbol: {tokenDetails.symbol}</p>
                  <p className="inputAlert">
                    Decimals: {tokenDetails.decimals}
                  </p>
                </div>
              )}
              {!isValidAddress && tokenAddress.trim() === "" && (
                <div>
                  <p className="inputAlert">Token address cannot be blank</p>
                </div>
              )}
              {isValidAddress && (
                <div>
                  <p className="inputAlert">Correct</p>
                </div>
              )}
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
                  <label className="inputHeading" htmlFor="feeOptions">
                    Fee Options
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="feeOption1"
                      name="feeOptions"
                      className="input"
                      checked={
                        feeOption === `5% ${currency} raised only (Recommended)`
                      }
                      onChange={() =>
                        setFeeOption(`5% ${currency} raised only (Recommended)`)
                      }
                    />
                    <label
                      className="ml-2 whitespace-nowrap"
                      htmlFor="feeOption1"
                    >
                      5% {currency} raised only (Recommended)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="feeOption2"
                      name="feeOptions"
                      className="input"
                      checked={feeOption === `2% ${currency} + 2% token sold`}
                      onChange={() =>
                        setFeeOption(`2% ${currency} + 2% token sold`)
                      }
                    />
                    <label
                      className="ml-2 whitespace-nowrap"
                      htmlFor="feeOption2"
                    >
                      2% {currency} + 2% token sold
                    </label>
                  </div>
                </div>
              </div>
            </BgInput>
          </div>
        </>
      )}
      {chain?.name === "Ethereum" && (
        <>
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

                  <label className="inputHeading" htmlFor="tokenAddress">
                    Token address <span className="inputRequired">*</span>
                  </label>
                </p>
                <input
                  id="tokenAddress"
                  type="text"
                  className="input "
                  value={tokenAddress}
                  onChange={handleChangeTokenAddress}
                  onBlur={checkTokenAddressValidity}
                  required
                />
                {!isValidAddress && tokenAddress.trim() !== "" && (
                  <p className="inputAlert">Invalid/Network token address</p>
                )}
              </div>

              {isValidAddress && (
                <div>
                  <p className="inputAlert">Name: {tokenDetails.name}</p>
                  <p className="inputAlert">Symbol: {tokenDetails.symbol}</p>
                  <p className="inputAlert">
                    Decimals: {tokenDetails.decimals}
                  </p>
                </div>
              )}
              {!isValidAddress && tokenAddress.trim() === "" && (
                <div>
                  <p className="inputAlert">Token address cannot be blank</p>
                </div>
              )}
              {isValidAddress && (
                <div>
                  <p className="inputAlert">Correct</p>
                </div>
              )}
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
                  <label className="inputHeading" htmlFor="feeOptions">
                    Fee Options
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="feeOption1"
                      name="feeOptions"
                      className="input"
                      checked={
                        feeOption === `5% ${currency} raised only (Recommended)`
                      }
                      onChange={() =>
                        setFeeOption(`5% ${currency} raised only (Recommended)`)
                      }
                    />
                    <label
                      className="ml-2 whitespace-nowrap"
                      htmlFor="feeOption1"
                    >
                      5% {currency} raised only (Recommended)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="feeOption2"
                      name="feeOptions"
                      className="input"
                      checked={feeOption === `2% ${currency} + 2% token sold`}
                      onChange={() =>
                        setFeeOption(`2% ${currency} + 2% token sold`)
                      }
                    />
                    <label
                      className="ml-2 whitespace-nowrap"
                      htmlFor="feeOption2"
                    >
                      2% {currency} + 2% token sold
                    </label>
                  </div>
                </div>
              </div>
            </BgInput>
          </div>
        </>
      )}

      {chain?.name === "Arbitrum One" && (
        <>
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

                  <label className="inputHeading" htmlFor="tokenAddress">
                    Token address <span className="inputRequired">*</span>
                  </label>
                </p>
                <input
                  id="tokenAddress"
                  type="text"
                  className="input "
                  value={tokenAddress}
                  onChange={handleChangeTokenAddress}
                  onBlur={checkTokenAddressValidity}
                  required
                />
                {!isValidAddress && tokenAddress.trim() !== "" && (
                  <p className="inputAlert">Invalid/Network token address</p>
                )}
              </div>

              {isValidAddress && (
                <div>
                  <p className="inputAlert">Name: {tokenDetails.name}</p>
                  <p className="inputAlert">Symbol: {tokenDetails.symbol}</p>
                  <p className="inputAlert">
                    Decimals: {tokenDetails.decimals}
                  </p>
                </div>
              )}
              {!isValidAddress && tokenAddress.trim() === "" && (
                <div>
                  <p className="inputAlert">Token address cannot be blank</p>
                </div>
              )}
              {isValidAddress && (
                <div>
                  <p className="inputAlert">Correct</p>
                </div>
              )}
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
                  <label className="inputHeading" htmlFor="feeOptions">
                    Fee Options
                  </label>
                </p>
                <div className="flex flex-col space-y-2 items-start">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="feeOption1"
                      name="feeOptions"
                      className="input"
                      checked={
                        feeOption === `5% ${currency} raised only (Recommended)`
                      }
                      onChange={() =>
                        setFeeOption(`5% ${currency} raised only (Recommended)`)
                      }
                    />
                    <label
                      className="ml-2 whitespace-nowrap"
                      htmlFor="feeOption1"
                    >
                      5% {currency} raised only (Recommended)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="feeOption2"
                      name="feeOptions"
                      className="input"
                      checked={feeOption === `2% ${currency} + 2% token sold`}
                      onChange={() =>
                        setFeeOption(`2% ${currency} + 2% token sold`)
                      }
                    />
                    <label
                      className="ml-2 whitespace-nowrap"
                      htmlFor="feeOption2"
                    >
                      2% {currency} + 2% token sold
                    </label>
                  </div>
                </div>
              </div>
            </BgInput>
          </div>
        </>
      )}

      {chain?.name === "Polygon" && (
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

                <label className="inputHeading" htmlFor="tokenAddress">
                  Token address <span className="inputRequired">*</span>
                </label>
              </p>
              <input
                id="tokenAddress"
                type="text"
                className="input "
                value={tokenAddress}
                onChange={handleChangeTokenAddress}
                onBlur={checkTokenAddressValidity}
                required
              />
              {!isValidAddress && tokenAddress.trim() !== "" && (
                <p className="inputAlert">Invalid/Network token address</p>
              )}
            </div>

            {isValidAddress && (
              <div>
                <p className="inputAlert">Name: {tokenDetails.name}</p>
                <p className="inputAlert">Symbol: {tokenDetails.symbol}</p>
                <p className="inputAlert">Decimals: {tokenDetails.decimals}</p>
              </div>
            )}
            {!isValidAddress && tokenAddress.trim() === "" && (
              <div>
                <p className="inputAlert">Token address cannot be blank</p>
              </div>
            )}
            {isValidAddress && (
              <div>
                <p className="inputAlert">Correct</p>
              </div>
            )}
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
                <label className="inputHeading" htmlFor="feeOptions">
                  Fee Options
                </label>
              </p>
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="feeOption1"
                    name="feeOptions"
                    className="input"
                    checked={
                      feeOption === `5% ${currency} raised only (Recommended)`
                    }
                    onChange={() =>
                      setFeeOption(`5% ${currency} raised only (Recommended)`)
                    }
                  />
                  <label
                    className="ml-2 whitespace-nowrap"
                    htmlFor="feeOption1"
                  >
                    5% {currency} raised only (Recommended)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="feeOption2"
                    name="feeOptions"
                    className="input"
                    checked={feeOption === `2% ${currency} + 2% token sold`}
                    onChange={() =>
                      setFeeOption(`2% ${currency} + 2% token sold`)
                    }
                  />
                  <label
                    className="ml-2 whitespace-nowrap"
                    htmlFor="feeOption2"
                  >
                    2% {currency} + 2% token sold
                  </label>
                </div>
              </div>
            </div>
          </BgInput>
        </div>
      )}

      {chain?.name === "Avalanche" && (
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

                <label className="inputHeading" htmlFor="tokenAddress">
                  Token address <span className="inputRequired">*</span>
                </label>
              </p>
              <input
                id="tokenAddress"
                type="text"
                className="input "
                value={tokenAddress}
                onChange={handleChangeTokenAddress}
                onBlur={checkTokenAddressValidity}
                required
              />
              {!isValidAddress && tokenAddress.trim() !== "" && (
                <p className="inputAlert">Invalid/Network token address</p>
              )}
            </div>

            {isValidAddress && (
              <div>
                <p className="inputAlert">Name: {tokenDetails.name}</p>
                <p className="inputAlert">Symbol: {tokenDetails.symbol}</p>
                <p className="inputAlert">Decimals: {tokenDetails.decimals}</p>
              </div>
            )}
            {!isValidAddress && tokenAddress.trim() === "" && (
              <div>
                <p className="inputAlert">Token address cannot be blank</p>
              </div>
            )}
            {isValidAddress && (
              <div>
                <p className="inputAlert">Correct</p>
              </div>
            )}
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
                <label className="inputHeading" htmlFor="feeOptions">
                  Fee Options
                </label>
              </p>
              <div className="flex flex-col space-y-2 items-start">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="feeOption1"
                    name="feeOptions"
                    className="input"
                    checked={
                      feeOption === `5% ${currency} raised only (Recommended)`
                    }
                    onChange={() =>
                      setFeeOption(`5% ${currency} raised only (Recommended)`)
                    }
                  />
                  <label
                    className="ml-2 whitespace-nowrap"
                    htmlFor="feeOption1"
                  >
                    5% {currency} raised only (Recommended)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="feeOption2"
                    name="feeOptions"
                    className="input"
                    checked={feeOption === `2% ${currency} + 2% token sold`}
                    onChange={() =>
                      setFeeOption(`2% ${currency} + 2% token sold`)
                    }
                  />
                  <label
                    className="ml-2 whitespace-nowrap"
                    htmlFor="feeOption2"
                  >
                    2% {currency} + 2% token sold
                  </label>
                </div>
              </div>
            </div>
          </BgInput>
        </div>
      )}
    </>
  );
};

export default VerifyToken;
