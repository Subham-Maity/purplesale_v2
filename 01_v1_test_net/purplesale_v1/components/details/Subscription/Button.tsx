import { useContractWrite } from "wagmi";
import { subAbi, subAddress } from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import FormContext from "@/contexts/create/FormContext";

interface CardProps {
  createTokenAddress: string;
  userWalletAddress: string | undefined;
  argsValue: number;
  endTime: number;
  moneyRaised: number;
  softCapCurrency: number;
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
  console.log(infoData.userWalletAddress, "infoData.userWallerAddress");

  const { write: whitelistAddress } = useContractWrite({
    address: subAddress,
    abi: subAbi,
    functionName: "whitelistAddress",
    args: [argsValue, infoData.userWalletAddress],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  //WhiteList Function Call
  const { write: refundInvestment } = useContractWrite({
    address: subAddress,
    abi: subAbi,
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
    address: subAddress,
    abi: subAbi,
    functionName: "claimTokens",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });
  //finalizePool Function Call

  const { write: finalizePool } = useContractWrite({
    address: subAddress,
    abi: subAbi,
    functionName: "finalizePool",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  //handleAfterSale Function Call

  const { write: handleAfterSale } = useContractWrite({
    address: subAddress,
    abi: subAbi,
    functionName: "handleAfterSale",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  return (
    <div className="ml-4">
      <div className=" border flex flex-col mt-2 border-green-300/25 w-[370px] lg:w-[640px] md:w-[368px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 max-w-sm overflow-hidden relative z-0">
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
                className="w-full border border-green-500/25 rounded-sm "
              />

              <button
                className="mt-3 w-48 h-8 text-md nobreak break-normal font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
              className="mt-3 w-48 h-8 text-md nobreak break-normal font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
              className="mt-3 w-48 h-8 text-md nobreak break-normal font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
              className="mt-3 w-48 h-8 text-md nobreak break-normal font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => {
                finalizePool();
              }}
            >
              Claim Tokens
            </button>
          ) : null}
        </>

        <>
          {createTokenAddress === userWalletAddress &&
          currentTime >= endTime &&
          moneyRaised >= softCapCurrency ? (
            <button
              className="mt-3 w-48 h-8 text-md nobreak break-normal font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => {
                handleAfterSale();
              }}
            >
              Handle After Sale
            </button>
          ) : null}
        </>
      </div>
    </div>
  );
};

export default Button;
