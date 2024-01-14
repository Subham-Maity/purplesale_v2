import { useContractWrite } from "wagmi";
import {
  fairLaunchAbi,
  fairLaunchAddress,
} from "@/constants/PolygonMumbai/createConstants";
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
  softCapCurrency: number;
}

const Button: React.FC<CardProps> = ({
  createTokenAddress,
  userWalletAddress,
  argsValue,
  endTime,
  moneyRaised,
  softCapCurrency,
}) => {
  //WhiteList Function Call
  const { setInfoData, infoData } = useContext(FormContext);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };

  const { write: whitelistAddress } = useContractWrite({
    address: fairLaunchAddress,
    abi: fairLaunchAbi,
    functionName: "whitelistAddress",
    args: [argsValue, infoData.userWalletAddress],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  //WhiteList Function Call
  const { write: refundInvestment } = useContractWrite({
    address: fairLaunchAddress,
    abi: fairLaunchAbi,
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
    address: fairLaunchAddress,
    abi: fairLaunchAbi,
    functionName: "claimTokens",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  //collectAffiliateCommission Function Call

  const { write: collectAffiliateCommission } = useContractWrite({
    address: fairLaunchAddress,
    abi: fairLaunchAbi,
    functionName: "collectAffiliateCommission",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  //handleAfterSale Function Call

  const { write: handleAfterSale } = useContractWrite({
    address: fairLaunchAddress,
    abi: fairLaunchAbi,
    functionName: "handleAfterSale",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  return (
    <RightSideDetailsWrapper>
      <>
        {createTokenAddress === userWalletAddress && currentTime < endTime ? (
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
        {currentTime >= endTime && moneyRaised >= softCapCurrency ? (
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

      <>
        {currentTime >= endTime && moneyRaised >= softCapCurrency ? (
          <button
            className="finishButton mt-6"
            onClick={() => {
              collectAffiliateCommission();
            }}
          >
            Collect Affiliate Commission
          </button>
        ) : null}
      </>

      <>
        {createTokenAddress === userWalletAddress &&
        currentTime >= endTime &&
        moneyRaised >= softCapCurrency ? (
          <button
            className="finishButton mt-6"
            onClick={() => {
              handleAfterSale();
            }}
          >
            Handle After Sale
          </button>
        ) : null}
      </>
    </RightSideDetailsWrapper>
  );
};

export default Button;
