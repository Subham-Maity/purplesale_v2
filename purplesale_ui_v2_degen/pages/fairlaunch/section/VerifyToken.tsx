import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import { ERC20Abi } from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import { info } from "console";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead } from "wagmi";
import Image from "next/image";

type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};

const VerifyToken: React.FC<VerifyTokenProps> = ({ onStepValidation }) => {
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
    infoData,
    setInfoData,
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
    setInfoData({ ...infoData, [event.target.name]: event.target.value });
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
              Token address<span className="inputRequired">*</span>
            </label>
          </p>
          <input
            id="tokenAddress"
            type="text"
            className="input"
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
          <div className="mt-4">
            <p className="inputAlert">Name: {tokenDetails.name}</p>
            <p className="inputAlert">Symbol: {tokenDetails.symbol}</p>
            <p className="inputAlert">Decimals: {tokenDetails.decimals}</p>
          </div>
        )}
        {!isValidAddress && tokenAddress.trim() === "" && (
          <div className="mt-4">
            <p className="inputAlert">Token address cannot be blank</p>
          </div>
        )}
        {isValidAddress && (
          <div className="mt-4">
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
            <div className="flex  items-center">
              <input
                type="radio"
                id="feeOption1"
                name="feeOptions"
                className="ml-2 mr-2"
                checked={
                  feeOption === `5% ${currency} raised only (Recommended)`
                }
                onChange={() =>
                  setFeeOption(`5% ${currency} raised only (Recommended)`)
                }
              />
              <label htmlFor="feeOption1">
                5% {currency} raised only (Recommended)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="feeOption2"
                name="feeOptions"
                className="ml-2 mr-2"
                checked={feeOption === `2% ${currency} + 2% token sold`}
                onChange={() => setFeeOption(`2% ${currency} + 2% token sold`)}
              />
              <label htmlFor="feeOption2">2% {currency} + 2% token sold</label>
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
            <label className="inputHeading" htmlFor="affiliateProgram">
              Affiliate Program
            </label>
          </p>
          <div className="flex flex-col space-y-2 items-start">
            <div className="flex items-center">
              <input
                type="radio"
                id="affiliateProgram1"
                name="affiliateProgram"
                value="disable"
                onChange={handleAffiliateChange}
                className="ml-2 mr-2"
              />
              <label htmlFor="affiliateProgram1">Disable Affiliate</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="affiliateProgram2"
                name="affiliateProgram"
                value="enable"
                onChange={handleAffiliateChange}
                className="ml-2 mr-2"
              />
              <label htmlFor="affiliateProgram2">Enable Affiliate</label>
            </div>
          </div>
        </div>

        {openAffiliate && (
          <div className="mt-6">
            <input
              id="affiliateProgram"
              name="affiliateProgram"
              type="text"
              className="input"
              placeholder="Enter reward percentage"
              onChange={handleAffiliateChangePercent}
            />
          </div>
        )}

        <div className="mt-6">
          {openAffiliate && (
            <p className="inputAlert">Reward percentage must be less than 5</p>
          )}
          <p className="inputAlert">
            The amount of raised currency that uses for the affiliate program.
          </p>
        </div>
      </BgInput>
    </>
  );
};

export default VerifyToken;
