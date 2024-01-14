import { useAccount, useContractWrite } from "wagmi";
import {
  airdropAbi,
  airdropAddress,
  dutchAuctionAbi,
  dutchAuctionAddress,
  pinkLockABI,
  pinkLockAddress,
} from "@/constants/PolygonMumbai/createConstants";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import FormContext from "@/contexts/create/FormContext";

interface CardProps {
  argsValue: number;
}

const Button: React.FC<CardProps> = ({ argsValue }) => {
  const { address, isConnected } = useAccount();
  //WhiteList Function Call

  const { setInfoData, infoData } = useContext(FormContext);
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };

  const { write: claimTokens } = useContractWrite({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "claim",
    args: [argsValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  return (
    <div className="flex justify-center items-center ">
      <div className="dark:bg-[#242525] lg:w-[1060px] flex justify-center text-sm bg-stone-50 rounded-md p-8 mb-4">
        <button
          className="finishButton"
          onClick={() => {
            claimTokens();
          }}
        >
          Claim Tokens
        </button>
      </div>
    </div>
  );
};

export default Button;
