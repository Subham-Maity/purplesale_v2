import React from "react";
import AirDrop from "@/components/Cards/Ethereum/AirDrop/AirDrop";
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
  idWeb2privsales: number[];
  idWeb3Presale: any;
  web2Data: any;
  airdropDatas: any;
}

const MyAirDrops = ({
  id,
  title,
  token,
  totalTokens,
  participants,
  starTime,
  idWeb2privsales,
  airdropDatas,
  web2Data,
}: airdropProps) => {
  return (
    <BgCards>
      <CardsWrapper>
        {isNaN(airdropDatas?.length) ? (
          <>
            <AirDrop
              currency={"Ethereum"}
              key={1}
              id={1}
              imgHref={"/PlaceHolder.svg"}
              title={"AirDrop 2"}
              token={"Token 2"}
              totalTokens={150}
              participants={130}
              starTime={1631000000}
              bg={"/PlaceholderCardBg.png"}
            />

            <AirDrop
              currency={"Cardano"}
              key={2}
              id={2}
              imgHref={"/PlaceHolder.svg"}
              title={"AirDrop 3"}
              token={"Token 3"}
              totalTokens={200}
              participants={140}
              starTime={1632000000}
              bg={"/PlaceholderCardBg.png"}
            />

            <AirDrop
              currency={"Solana"}
              key={3}
              id={3}
              imgHref={"/PlaceHolder.svg"}
              title={"AirDrop 4"}
              token={"Token 4"}
              totalTokens={180}
              participants={160}
              starTime={1633000000}
              bg={"/PlaceholderCardBg.png"}
            />

            <AirDrop
              currency={"Binance Coin"}
              key={4}
              id={4}
              imgHref={"/PlaceHolder.svg"}
              title={"AirDrop 5"}
              token={"Token 5"}
              totalTokens={250}
              participants={180}
              starTime={1634000000}
              bg={"/PlaceholderCardBg.png"}
            />

            <AirDrop
              currency={"Ripple"}
              key={5}
              id={5}
              imgHref={"/PlaceHolder.svg"}
              title={"AirDrop 6"}
              token={"Token 6"}
              totalTokens={300}
              participants={200}
              starTime={16}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
        ) : (
          <>
            {airdropDatas?.map((item: any, index: any) => {
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
          </>
        )}
      </CardsWrapper>
    </BgCards>
  );
};

export default dynamic(() => Promise.resolve(MyAirDrops), { ssr: false });
