import { useContractWrite } from "wagmi";
import {
  createAbi,
  createAddress,
  privSaleAbi,
  privSaleAddress,
} from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import FormContext from "@/contexts/create/FormContext";
import RightSideDetailsWrapper from "@/components/TailwindWrapper/Details/RightSideWidget";

interface CardProps {
  createTokenAddress: string;
  userWalletAddress: string | undefined;
  argsValue: number;
  endTime: number;
  moneyRaised: number;
  softCapCurrency: any;
  whitelistedEnabled: boolean;
}

const Button: React.FC<CardProps> = ({
  createTokenAddress,
  userWalletAddress,
  argsValue,
  endTime,
  moneyRaised,
  softCapCurrency,
  whitelistedEnabled,
}) => {
  //WhiteList Function Call
  const { setInfoData, infoData } = useContext(FormContext);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };

  const { write: whitelistAddress } = useContractWrite({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "whitelistAddress",
    args: [argsValue, infoData.userWalletAddress],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  //WhiteList Function Call
  const { write: refundInvestment } = useContractWrite({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "refundInvestment",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });
  const currentTime = Math.floor(Date.now() / 1000);

  //claimTokens Function Call

  const { write: claimTokens } = useContractWrite({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "claimTokens",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  return (
    <RightSideDetailsWrapper>
      <>
        {createTokenAddress === userWalletAddress &&
        currentTime < endTime &&
        whitelistedEnabled ? (
          <>
            <input
              onChange={handleOnChange}
              id="userWalletAddress"
              name="userWalletAddress"
              type="text"
              placeholder="Ex:1000000000000000000"
              className="input"
            />

            <button
              className="finishButton mt-6"
              onClick={() => {
                whitelistAddress();
              }}
            >
              Whitelist
            </button>
          </>
        ) : null}
      </>
      <>
        {currentTime >= endTime && moneyRaised < softCapCurrency ? (
          <button
            className="finishButton mt-6"
            onClick={() => {
              refundInvestment();
            }}
          >
            Refund Investment
          </button>
        ) : null}
      </>
      <>
        {currentTime >= endTime &&
        moneyRaised >= softCapCurrency &&
        createTokenAddress === userWalletAddress ? (
          <button
            className="finishButton mt-6"
            onClick={() => {
              claimTokens();
            }}
          >
            Claim Tokens
          </button>
        ) : null}
      </>
    </RightSideDetailsWrapper>
  );
};

export default Button;
