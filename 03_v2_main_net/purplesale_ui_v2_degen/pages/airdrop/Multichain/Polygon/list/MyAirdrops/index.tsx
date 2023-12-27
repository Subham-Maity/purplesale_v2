import React, { useEffect, useState } from "react";
import AirDrop from "@/components/Cards/Polygon/AirDrop/AirDrop";
import { enqueueSnackbar } from "notistack";
import {
  airdropAbi,
  airdropAddress,
} from "@/constants/Polygon/createConstants";
import { useContractRead } from "wagmi";
import dynamic from "next/dynamic";
import BgCards from "@/components/TailwindWrapper/Cards/bgCards";
import CardsWrapper from "@/components/TailwindWrapper/Cards/wrapperCards";

interface airdropProps {
  id: number[];
  imgHref: string[];
  title: string[];
  token: string[];
  totalTokens: number[];
  participants: number[];
  starTime: number[];
  selectedIndices: number[];
  idWeb2privsales: number[];
  idWeb3Presale: any;
  web2Data: any;
  airdropDatas: any;
}

const MyAirdrops = ({
  id,
  imgHref,
  title,
  token,
  totalTokens,
  participants,
  starTime,
  selectedIndices,
  idWeb2privsales,
  idWeb3Presale,
  web2Data,
  airdropDatas,
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
  const [airDropLength, setAirDropLength] = useState<any>(
    returnLength?.toString(),
  );
  useEffect(() => {
    setAirDropLength(returnLength?.toString());
  }, []);

  const dataLength: any = airDropLength;
  const number = parseInt(dataLength);
  return (
    <BgCards>
      <CardsWrapper>
        {selectedIndices.map((index: number) => {
          const idWeb3AirDrop = index + 1;
          const matchingIndex = idWeb2privsales.indexOf(idWeb3AirDrop);
          return (
            <AirDrop
              currency={"BNB"}
              key={index || 0}
              id={id[index] || 0}
              imgHref={
                matchingIndex !== -1
                  ? web2Data[matchingIndex]?.logoUrl
                  : "/PlaceHolder.svg"
              }
              title={title[index] || "AirDrop 1"}
              token={token[index] || "Token 1"}
              totalTokens={totalTokens[index] || 100}
              participants={participants[index] || 100}
              starTime={starTime[index] || 100}
              bg={
                matchingIndex !== -1
                  ? web2Data[matchingIndex]?.bgLogoUrl
                  : "/PlaceholderCardBg.png"
              }
            />
          );
        })}
      </CardsWrapper>
    </BgCards>
  );
};

export default dynamic(() => Promise.resolve(MyAirdrops), { ssr: false });
