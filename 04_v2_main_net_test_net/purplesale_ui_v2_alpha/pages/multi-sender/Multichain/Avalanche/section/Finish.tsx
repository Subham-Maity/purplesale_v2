import {
  ERC20Abi,
  createAbi,
  createAddress,
  multiSendAbi,
  multiSendAddress,
} from "@/constants/Arbitrum/createConstants";
import FormContext from "@/contexts/create/FormContext";
import React, { use, useContext, useEffect, useState } from "react";
import { useContractWrite } from "wagmi";
import { useNetwork } from "wagmi";
import { enqueueSnackbar } from "notistack";
import { info } from "console";
import { parse } from "path";
import { ethers } from "ethers";
import FinishWrapper from "@/components/TailwindWrapper/FinishPage/bgFinish";

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
        const amount = parseInt(amountStr?.trim()) || 0;

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
    <FinishWrapper>
      <p className="flex justify-between">
        <span> Token Details: </span>
        <span>
          {tokenDetails.decimals}, {tokenDetails.name}, {tokenDetails.symbol}
        </span>
      </p>

      <hr className="border-b border-dashed border-white/10"></hr>
      <p className="flex justify-between">
        <span>Allocations:</span> <span>{infoData.title}</span>
      </p>
      <div className="flex justify-start gap-4 pt-8">
        <button
          className="finishButton"
          onClick={() => {
            allowance();
          }}
        >
          ALLOWANCE
        </button>

        <button
          className="finishButton"
          onClick={() => {
            multisender();
          }}
        >
          {" "}
          MULTISEND
        </button>
      </div>
    </FinishWrapper>
  );
};

export default Finish;
