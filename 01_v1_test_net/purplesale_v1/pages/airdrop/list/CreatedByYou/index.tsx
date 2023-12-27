import React from "react";
import AirDrop from "@/components/Cards/AirDrop/AirDrop";
import { enqueueSnackbar } from "notistack";
import { airdropAbi, airdropAddress } from "@/constants/createConstants";
import { useContractRead } from "wagmi";
import dynamic from "next/dynamic";

interface airdropProps {
  id: number[];
  imgHref: string[];
  title: string[];
  token: string[];
  totalTokens: number[];
  participants: number[];
  starTime: number[];
  selectedIndices2: number[];
  idWeb2privsales: number[];
  idWeb3Presale: any;
  web2Data: any;
  airdropDatas: any;
}

const CreatedByYou = ({
  id,
  imgHref,
  title,
  token,
  totalTokens,
  participants,
  starTime,
  selectedIndices2,
  idWeb2privsales,
  airdropDatas,
  web2Data,
}: airdropProps) => {
  //✅ Step0: Return Length of the Array
  const { data: returnLength } = useContractRead({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "returnLength",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });
  const dataLength: any = returnLength?.toString();
  const number = parseInt(dataLength);
  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 items-center justify-center">
          {selectedIndices2.map((item: any, index: any) => {
            const idWeb3AirDrop = index + 1;
            const matchingIndex = idWeb2privsales.indexOf(idWeb3AirDrop);

            return (
              <AirDrop
                currency={"BNB"}
                key={index || 0}
                id={id[index] || 0}
                imgHref={
                  matchingIndex !== -1
                    ? web2Data[index]?.logoUrl
                    : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                }
                title={title[index] || "AirDrop 1"}
                token={token[index] || "Token 1"}
                totalTokens={totalTokens[index] || 100}
                participants={participants[index] || 100}
                starTime={starTime[index] || 100}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CreatedByYou), { ssr: false });
