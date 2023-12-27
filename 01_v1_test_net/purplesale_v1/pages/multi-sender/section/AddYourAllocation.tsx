import { ERC20Abi } from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead } from "wagmi";

type Sender = {
  onStepValidation: (isValid: boolean) => void;
};

const MultiSender: React.FC<Sender> = ({ onStepValidation }) => {
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [affiliateChangePercent, setAffiliateChangePercent] =
    useState<number>(0);
  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const {
    tokenAddress,
    setTokenAddress,
    setIsAffiliateEnabled,
    setCurrency,
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
  const { infoData, setInfoData } = useContext(FormContext);
  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
    // console.log("Start Time:", re);
    // console.log("End Time:", infoData.endDate);
    onStepValidation(isFormValid());
  };
  const isFormValid = (): boolean => {
    return infoData.title !== "";
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

        <div className="mt-10">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Allocations*
          </label>
          <textarea
            rows={20}
            id="title"
            className="w-full border border-gray-300 rounded py-2 px-4"
            name="title"
            placeholder="Insert allocation: separate with line breaks. Format: address,amount"
            onChange={handleOnChange}
            required
          />
          {/* Any error messages or validation for allocations field can be added here */}
        </div>
      </div>
    </div>
  );
};

export default MultiSender;
