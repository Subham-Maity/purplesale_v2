import { useAccount, useContractWrite } from "wagmi";
import {
  dutchAuctionAbi,
  dutchAuctionAddress,
  pinkLockABI,
  pinkLockAddress,
} from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import FormContext from "@/contexts/create/FormContext";

interface CardProps {
  argsValue: number;
  beneficiary: string;
}

const Button: React.FC<CardProps> = ({ argsValue, beneficiary }) => {
  const { address, isConnected } = useAccount();
  //WhiteList Function Call

  const { setInfoData, infoData } = useContext(FormContext);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };
  console.log(infoData.userWalletAddress, "infoData.userWallerAddress");

  const { write: claimTokens } = useContractWrite({
    address: pinkLockAddress,
    abi: pinkLockABI,
    functionName: "claimTokens",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  return beneficiary == address ? (
    <>
      <div className="flex justify-center items-center ">
        <div className="dark:bg-[#242525] lg:w-[1060px] text-sm bg-stone-50 rounded-md p-8 mb-4">
          <div className="border-b-2 dark:border-stone-900 border-stone-100">
            <div className="flex justify-center">
              <button
                className="mt-3 w-48 h-8 text-md  nobreak break-normal font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => {
                  claimTokens();
                }}
              >
                Claim Tokens
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default Button;
