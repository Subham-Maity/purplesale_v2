import { ERC20Abi } from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead } from "wagmi";
import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import Image from "next/image";

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
    <div>
      <BgInput>
        <div className="mt-10">
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
        <div className="mt-10">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="title" className="inputHeading">
              Allocations <span className="inputRequired">*</span>
            </label>
          </p>
          <textarea
            rows={20}
            id="title"
            className="input"
            name="title"
            placeholder="Insert allocation: separate with line breaks. Format: address,amount"
            onChange={handleOnChange}
            required
          />
          {/* Any error messages or validation for allocations field can be added here */}
        </div>
      </BgInput>
    </div>
  );
};

export default MultiSender;
