import {
  antiBotReadAbi,
  antiBotReadAddress,
  ERC20Abi,
  isAntiBotEnabledAbi,
} from "@/constants/Ethereum/createConstants";

import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

import {
  antiBotAddress,
  antiBotAbi,
} from "@/constants/Ethereum/createConstants";

import FormContext from "@/contexts/create/FormContext";
import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import Image from "next/image";

const AntiBot = () => {
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false); // Add state for button
  const router = useRouter(); // Create router object
  const { tokenAddress, setTokenAddress, tokenDetails, setTokenDetails } =
    useContext(FormContext);
  const { infoData } = useContext(FormContext);

  const amountLimitPerTradeDecimals =
    infoData.amountLimitPerTrade * 10 ** infoData.antiBotDecimals;
  const amountToBeAddedPerBlockDecimals =
    infoData.amountToBeAddedPerBlock * 10 ** infoData.antiBotDecimals;
  const { write: createToken } = useContractWrite({
    address: antiBotAddress,
    abi: antiBotAbi,
    functionName: "createToken",
    args: [
      infoData.antiBotName,
      infoData.antiBotSymbol,
      infoData.antiBotDecimals,
      infoData.totalSupply,
      amountLimitPerTradeDecimals,
      amountToBeAddedPerBlockDecimals,
      infoData.timeLimitPerTrade,
      infoData.blockNumberToDisableAntiBot,
    ],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating fair-launch ${error}`, {
        variant: "error",
      });
    },
  });

  const { setInfoData } = useContext(FormContext);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };
  const [isFormValid, setIsFormValid] = useState(false);

  const steps = ["Verify Token", "Finish"];

  const handleStepValidation = (isValid: boolean) => {
    setIsFormValid(isValid);
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
    setIsNextButtonEnabled(isFormValid());

    function parseInputData(inputData: string) {
      const lines = inputData.trim().split("\n");
      const addresses: string[] = [];
      const amounts: number[] = [];

      lines.forEach((line) => {
        const [addressStr, amountStr] = line.split(",");

        const cleanedAddress = addressStr.trim();
        const amount = parseInt(amountStr);

        addresses.push(cleanedAddress);
        amounts.push(amount);
      });

      return { addresses, amounts };
    }
    const { addresses, amounts } = parseInputData(infoData.title);
    setAddresses(addresses);
    setAmounts(amounts);
  }, [isValidAddress, tokenAddress]);

  const { data: isAntiBotEnabled } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: isAntiBotEnabledAbi,
    functionName: "isAntiBotEnabled",
  });

  // const isAntiBot = false;

  const { data: isAntiBot } = useContractRead({
    address: antiBotReadAddress,
    abi: antiBotReadAbi,
    functionName: "isAntiBot",
    args: [tokenAddress],
  });

  const handleNextButtonClick = () => {
    if (isNextButtonEnabled && isAntiBot === true) {
      router.push({
        pathname: "/antibot/section/final",
        //@ts-ignore
        query: { isAntiBotEnabledCheck: isAntiBotEnabled },
      });
    }
  };
  return (
    <div className="mb-8">
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
            <p>Correct</p>
          </div>
        )}{" "}
        <div className="mt-4 mb-4">
          <p className="inputAlert">
            Choose a token to integrate with Purple Anti-Bot
          </p>
          <p className="inputAlert">
            Check out the guide how to integrate Purple Anti-Bot for custom
            contract here:{" "}
            <a className="text-green-500" href="https://wwww.github.com">
              https://wwww.github.com
            </a>
          </p>
        </div>
        <button
          onClick={handleNextButtonClick}
          disabled={!isNextButtonEnabled}
          className={`mt-4 ${
            isNextButtonEnabled
              ? "bg-[#9e9cf3] text-white border transition duration-300 hover:bg-[#6b68e3] transform hover:scale-105 hover:shadow-md hover:shadow-white hover:animate-pulse"
              : "bg-[#020202] text-white cursor-not-allowed animate-pulse"
          } text-white py-2 px-4 rounded ${
            isNextButtonEnabled ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </BgInput>
      <div className="mt-10 mb-10 mx-20 flex items-center">
        <div className="border-t border-gray-300 flex-grow mr-3"></div>
        <span>Or</span>
        <div className="border-t border-gray-300 flex-grow ml-3"></div>
      </div>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="facebook" className="inputHeading">
              Amount Limit Per Trade
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="amountLimitPerTrade"
            name="amountLimitPerTrade"
            type="text"
            placeholder="Ex:1000000000000000000"
            className="input"
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="twitter" className="inputHeading">
              Amount To Be Added Per Block
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="amountToBeAddedPerBlock"
            name="amountToBeAddedPerBlock"
            type="text"
            placeholder="Ex:1000000000000000000"
            className="input"
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1 mt-4">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="github" className="inputHeading">
              Time Limit Per Trade (Seconds)
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="timeLimitPerTrade"
            name="timeLimitPerTrade"
            type="text"
            placeholder="Ex:60"
            className="input"
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1 mt-4">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="instagram" className="inputHeading">
              Block Number to Disable Anti-Bot
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="blockNumberToDisableAntiBot"
            name="blockNumberToDisableAntiBot"
            type="text"
            placeholder="Ex:100"
            className="input"
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1 mt-4">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="antiBotName" className="inputHeading">
              Name
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="antiBotName"
            name="antiBotName"
            type="text"
            placeholder="Ex: John Doe"
            className="input"
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1 mt-4">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="instagram" className="inputHeading">
              Symbol
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="antiBotSymbol"
            name="antiBotSymbol"
            type="text"
            placeholder="Ex: JDOE"
            className="input"
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1 mt-4">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="github" className="inputHeading">
              Decimals
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="antiBotDecimals"
            name="antiBotDecimals"
            type="text"
            placeholder="Ex: 18"
            className="input"
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1 mt-4">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="instagram" className="inputHeading">
              Total Supply
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="totalSupply"
            name="totalSupply"
            type="text"
            placeholder="Ex: 1000000000000000000"
            className="input"
          />
        </div>

        <button
          className="finishButton mt-8 "
          onClick={() => {
            createToken();
          }}
        >
          CREATE TOKEN
        </button>
      </BgInput>
    </div>
  );
};

export default AntiBot;
