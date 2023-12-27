import {
  ERC20Abi,
  createAbi,
  createAddress,
  multiSendAbi,
  multiSendAddress,
} from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import React, { use, useContext, useEffect, useState } from "react";
import { useContractWrite } from "wagmi";
import { useNetwork } from "wagmi";
import { enqueueSnackbar } from "notistack";
import { info } from "console";
import { parse } from "path";
import { ethers } from "ethers";

const Finish = () => {
  const {
    tokenAddress,
    isAffiliateEnabled,
    currency,
    feeOption,
    tokenDetails,
    refundType,
    routerSelect,
    infoData,
    whitelist,
    vesting,
  } = useContext(FormContext);

  const { chain } = useNetwork();
  const [addresses, setAddresses] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);
  const [altTokenAddress, setAltTokenAddress] = useState<string>(
    "0x0000000000000000000000000000000000000000",
  );
  const allowanceValue = ethers.constants.MaxUint256.toString();

  const { write: allowance } = useContractWrite({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "approve",
    //change address here accordingly.
    args: [multiSendAddress, allowanceValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating priv sale ${error}`, {
        variant: "error",
      });
    },
  });

  useEffect(() => {
    function updateAltTokenAddress(x: string, altTokenAddress: string): string {
      if (currency == "USDC" && x == "Polygon") {
        setAltTokenAddress("0x2791bca1f2de4661ed88a30c99a7a9449aa84174");
      } else if (currency === "USDT" && x === "Polygon") {
        setAltTokenAddress("0xc2132d05d31c914a87c6611c10748aeb04b58e8f");
      }
      return altTokenAddress;
    }
    if (chain) {
      updateAltTokenAddress(chain.name, altTokenAddress);
    }
    function parseInputData(inputData: string) {
      const lines = inputData.trim().split("\n");
      const addresses: string[] = [];
      const amounts: number[] = [];

      lines.forEach((line) => {
        const [addressStr, amountStr] = line.split(",");

        const cleanedAddress = addressStr.trim();
        const amount = parseInt(amountStr.trim());

        addresses.push(cleanedAddress);
        amounts.push(amount);
      });

      return { addresses, amounts };
    }
    const { addresses, amounts } = parseInputData(infoData.title);
    setAddresses(addresses);
    setAmounts(amounts);
  }, [currency, chain, altTokenAddress, feeOption, refundType, infoData.title]);

  const { write: multisender } = useContractWrite({
    address: multiSendAddress,
    abi: multiSendAbi,
    functionName: "multisendToken",
    args: [tokenAddress, false, addresses, amounts],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating multisend ${error}`, {
        variant: "error",
      });
    },
  });

  return (
    <div className="flex justify-center items-center ">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
        <form className="px-16 py-16 space-y-4">
          <div className="flex justify-between">
            <p>
              {" "}
              Token Details: {tokenDetails.decimals}, {tokenDetails.name},{" "}
              {tokenDetails.symbol}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Allocations: {infoData.title}</p>
          </div>
          <div
            className="btn h-6 w-36 cursor-pointer bg-green-500 rounded text-center"
            onClick={() => {
              allowance();
            }}
          >
            ALLOWANCE
          </div>

          <div
            className="btn h-6 w-36 bg-green-500 rounded text-center"
            onClick={() => {
              multisender();
            }}
          >
            {" "}
            MULTISEND
          </div>
        </form>
      </div>
    </div>
  );
};

export default Finish;
