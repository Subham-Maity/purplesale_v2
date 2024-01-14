import { useAccount, useContractWrite } from "wagmi";
import {
  dutchAuctionAbi,
  dutchAuctionAddress,
  pinkLockABI,
  pinkLockAddress,
} from "@/constants/PolygonMumbai/createConstants";
import { enqueueSnackbar } from "notistack";
import React, { useContext } from "react";
import FormContext from "@/contexts/create/FormContext";
import BgPinklockToken from "@/components/TailwindWrapper/PinklockToken/BgPinkLock";

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
      <BgPinklockToken>
        <div className="border-b-2 dark:border-stone-900 border-stone-100">
          <div className="flex justify-center">
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
      </BgPinklockToken>
    </>
  ) : null;
};

export default Button;
