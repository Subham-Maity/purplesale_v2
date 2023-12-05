import {
  antiBotReadAbi,
  antiBotReadAddress,
  ERC20Abi,
  isAntiBotEnabledAbi,
} from "@/constants/createConstants";

import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

import { antiBotAddress, antiBotAbi } from "@/constants/createConstants";

import FormContext from "@/contexts/create/FormContext";

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
  console.log("amountLimitPerTradeDecimals", amountLimitPerTradeDecimals);
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
  console.log(amountLimitPerTradeDecimals, "amountLimitPerTradeDecimals");
  console.log(
    amountToBeAddedPerBlockDecimals,
    "amountToBeAddedPerBlockDecimals",
  );
  console.log("antibotName", infoData.antiBotName);
  console.log("antibotSymbol", infoData.antiBotSymbol);
  console.log("antibotDecimals", infoData.antiBotDecimals);
  console.log("totalSupply", infoData.totalSupply);
  console.log("amountLimitPerTrade", infoData.amountLimitPerTrade);
  console.log("amountToBeAddedPerBlock", infoData.amountToBeAddedPerBlock);
  console.log("timeLimitPerTrade", infoData.timeLimitPerTrade);
  console.log(
    "blockNumberToDisableAntiBot",
    infoData.blockNumberToDisableAntiBot,
  );

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

  console.log(decimals, "decimals");

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

  console.log(tokenAddress, "tokenAddress");

  // const isAntiBot = false;
  console.log(isAntiBotEnabled, "Main isAntiBot");

  const { data: isAntiBot } = useContractRead({
    address: antiBotReadAddress,
    abi: antiBotReadAbi,
    functionName: "isAntiBot",
    args: [tokenAddress],
  });
  console.log(isAntiBot, "Main isAntiBot");

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
    <div>
      <div className="flex justify-center items-center mt-8 mb-8 ">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md pl-6 pr-6">
          <div>
            <label className="block text-lg mb-2 mt-8" htmlFor="tokenAddress">
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
          )}{" "}
          <div className="mt-4 mb-4">
            <p className="text-blue-400">
              Choose a token to integrate with Purple Anti-Bot
            </p>
            <p className="text-blue-400 mt-2">
              Check out the guide how to integrate Purple Anti-Bot for custom
              contract here:{" "}
              <a className="text-green-500" href="https://wwww.github.com">
                https://https://wwww.github.com
              </a>
            </p>
          </div>
          <button
            onClick={handleNextButtonClick}
            disabled={!isNextButtonEnabled}
            className={`mt-4 ${
              isNextButtonEnabled ? "bg-blue-500" : "bg-gray-300"
            } text-white py-2 px-4 rounded ${
              isNextButtonEnabled ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            Next
          </button>
          <div className="mt-10 mb-10 flex items-center">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <span>Or</span>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
            <div className="col-span-1">
              <label htmlFor="facebook" className="block mb-1 font-bold">
                Amount Limit Per Trade
              </label>
              <input
                onChange={handleOnChange}
                id="amountLimitPerTrade"
                name="amountLimitPerTrade"
                type="text"
                placeholder="Ex:1000000000000000000"
                className="w-full px-2 py-1 border rounded-md"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="twitter" className="block mb-1 font-bold">
                Amount To Be Added Per Block
              </label>
              <input
                onChange={handleOnChange}
                id="amountToBeAddedPerBlock"
                name="amountToBeAddedPerBlock"
                type="text"
                placeholder="Ex:1000000000000000000"
                className="w-full px-2 py-1 border rounded-md"
              />
            </div>
          </div>
          <div className="col-span-1 mt-4">
            <label htmlFor="github" className="block mb-1 font-bold">
              Time Limit Per Trade (Seconds)
            </label>
            <input
              onChange={handleOnChange}
              id="timeLimitPerTrade"
              name="timeLimitPerTrade"
              type="text"
              placeholder="Ex:60"
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>
          <div className="col-span-1 mt-4">
            <label htmlFor="instagram" className="block mb-1 font-bold">
              Block Number to Disable Anti-Bot
            </label>
            <input
              onChange={handleOnChange}
              id="blockNumberToDisableAntiBot"
              name="blockNumberToDisableAntiBot"
              type="text"
              placeholder="Ex:100"
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>
          <div className="col-span-1 mt-4">
            <label htmlFor="antiBotName" className="block mb-1 font-bold">
              Name
            </label>
            <input
              onChange={handleOnChange}
              id="antiBotName"
              name="antiBotName"
              type="text"
              placeholder="Ex: John Doe"
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>
          <div className="col-span-1 mt-4">
            <label htmlFor="instagram" className="block mb-1 font-bold">
              Symbol
            </label>
            <input
              onChange={handleOnChange}
              id="antiBotSymbol"
              name="antiBotSymbol"
              type="text"
              placeholder="Ex: JDOE"
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>
          <div className="col-span-1 mt-4">
            <label htmlFor="github" className="block mb-1 font-bold">
              Decimals
            </label>
            <input
              onChange={handleOnChange}
              id="antiBotDecimals"
              name="antiBotDecimals"
              type="text"
              placeholder="Ex: 18"
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>
          <div className="col-span-1 mt-4">
            <label htmlFor="instagram" className="block mb-1 font-bold">
              Total Supply
            </label>
            <input
              onChange={handleOnChange}
              id="totalSupply"
              name="totalSupply"
              type="text"
              placeholder="Ex: 1000000000000000000"
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>
          <div
            className="btn h-6 mt-4 mb-4 w-36 bg-green-500 rounded text-center"
            onClick={() => {
              createToken();
            }}
          >
            CREATE TOKEN
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntiBot;
