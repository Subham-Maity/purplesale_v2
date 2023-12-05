import { ERC20Abi } from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead } from "wagmi";

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
    console.log(isTokenAddressFormatValid, "isTokenAddressFormatValid");
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

  console.log(isAffiliateEnabled, "isAffiliateEnabled");
  console.log(affiliateChangePercent, "affiliateChangePercent");

  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
        <div className="mt-10">
          <label className="block text-lg mb-2" htmlFor="tokenAddress">
            Token address<span className="text-red-500">*</span>
          </label>
          <input
            id="tokenAddress"
            type="text"
            className="w-full border border-gray-300 rounded py-2 px-4"
            value={tokenAddress}
            onChange={handleChangeTokenAddress}
            onBlur={checkTokenAddressValidity}
            required
          />
          {!isValidAddress && tokenAddress.trim() !== "" && (
            <p className="text-red-500">Invalid/Network token address</p>
          )}
        </div>

        {isValidAddress && (
          <div className="mt-4">
            <p>Name: {tokenDetails.name}</p>
            <p>Symbol: {tokenDetails.symbol}</p>
            <p>Decimals: {tokenDetails.decimals}</p>
          </div>
        )}
        {!isValidAddress && tokenAddress.trim() === "" && (
          <div className="mt-4">
            <p>Token address cannot be blank</p>
          </div>
        )}
        {isValidAddress && (
          <div className="mt-4">
            <p>Correct</p>
          </div>
        )}

        <div className="mt-6">
          <label className="block text-lg mb-2" htmlFor="currency">
            Currency
          </label>
          <div className="flex flex-col space-y-2 items-start">
            <div className="flex items-center">
              <input
                type="radio"
                id="maticCurrency"
                name="currency"
                value="MATIC"
                checked={currency === "MATIC"}
                onChange={handleCurrencyChange}
                className="mr-2"
              />
              <label htmlFor="maticCurrency">MATIC</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="usdtCurrency"
                name="currency"
                value="USDT"
                checked={currency === "USDT"}
                onChange={handleCurrencyChange}
                className="mr-2"
              />
              <label htmlFor="usdtCurrency">USDT</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="usdcCurrency"
                name="currency"
                value="USDC"
                checked={currency === "USDC"}
                onChange={handleCurrencyChange}
                className="mr-2"
              />
              <label htmlFor="usdcCurrency">USDC</label>
            </div>
          </div>
          <p className="mt-2">Users will pay with {currency} for your token</p>
        </div>

        <div className="mt-6">
          <label className="block text-lg mb-2" htmlFor="feeOptions">
            Fee Options
          </label>
          <div className="flex flex-col space-y-2 items-start">
            <div className="flex items-center">
              <input
                type="radio"
                id="feeOption1"
                name="feeOptions"
                className="mr-2"
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
                className="mr-2"
                checked={feeOption === `2% ${currency} + 2% token sold`}
                onChange={() => setFeeOption(`2% ${currency} + 2% token sold`)}
              />
              <label htmlFor="feeOption2">2% {currency} + 2% token sold</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyToken;
