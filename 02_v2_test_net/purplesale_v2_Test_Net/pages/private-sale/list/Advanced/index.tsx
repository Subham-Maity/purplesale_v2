import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import {
  ERC20Abi,
  privSaleAbi,
  privSaleAddress,
} from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import PrivateSaleCards from "@/components/Cards/PrivateSale/PrivateSaleCards";
import axios from "@/constants/axio";
import CardsWrapper from "@/components/TailwindWrapper/Cards/wrapperCards";
import BgCards from "@/components/TailwindWrapper/Cards/bgCards";

const Advance = () => {
  const { address, isConnected } = useAccount();
  const [privsales, setPrivsales] = useState<any>([]);

  const fetchWeb2DataPrivSale = async () => {
    try {
      const response = await axios.get("/privateSale-fetch-data");
      setPrivsales(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeb2DataPrivSale();
  }, []);

  const web2Data = privsales;
  const idWeb2privsales = web2Data.map((item: any) => {
    return item.id;
  });
  //✅ Step0: Return Length of the Array
  const { data: returnLength } = useContractRead({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "returnLength",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });
  const [privsalesLength, setPrivsalesLength] = useState<any>(
    returnLength?.toString(),
  );
  useEffect(() => {
    setPrivsalesLength(returnLength?.toString());
  }, []);

  const number = parseInt(privsalesLength);

  //✅ Step1: Data from the contract

  // My Private Sale
  const { data: getUserInvested } = useContractRead({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "getUserInvested",
    args: [address],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });
  const privsalesArray = Array.from({ length: number }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: privsales } = useContractRead({
      address: privSaleAddress,
      abi: privSaleAbi,
      functionName: "privsales",
      args: [index],
      onError(error: any) {
        console.log("Error", error);
        enqueueSnackbar(`Error creating presale ${error}`, {
          variant: "error",
        });
      },
    });
    return privsales;
  });

  //✅ Step2: Convert the data to JSON format
  const dataPrivString = JSON.stringify(privsalesArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  const dataPrivString2 = JSON.stringify(getUserInvested, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
  //✅ Step3: Check if the data is available
  if (!dataPrivString || !dataPrivString2) {
    return (
      <BgCards>
        <CardsWrapper>
          <>
            <PrivateSaleCards
              currency={"Ethereum"}
              key={1}
              id={1}
              title={"ETH"}
              vestingFirstReleasePercent={30}
              softCapCurrency={20}
              hardCapCurrency={20}
              moneyRaised={5}
              startTime={1631000000}
              endTime={1631000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Cardano"}
              key={2}
              id={2}
              title={"ADA"}
              vestingFirstReleasePercent={35}
              softCapCurrency={22}
              hardCapCurrency={22}
              moneyRaised={8}
              startTime={1632000000}
              endTime={1632000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Solana"}
              key={3}
              id={3}
              title={"SOL"}
              vestingFirstReleasePercent={40}
              softCapCurrency={24}
              hardCapCurrency={24}
              moneyRaised={10}
              startTime={1633000000}
              endTime={1633000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Binance Coin"}
              key={4}
              id={4}
              title={"BNB"}
              vestingFirstReleasePercent={45}
              softCapCurrency={26}
              hardCapCurrency={26}
              moneyRaised={12}
              startTime={1634000000}
              endTime={1634000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Ripple"}
              key={5}
              id={5}
              title={"XRP"}
              vestingFirstReleasePercent={50}
              softCapCurrency={28}
              hardCapCurrency={28}
              moneyRaised={15}
              startTime={1635000000}
              endTime={1635000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PrivateSaleCards
              currency={"Solana"}
              key={3}
              id={3}
              title={"SOL"}
              vestingFirstReleasePercent={40}
              softCapCurrency={24}
              hardCapCurrency={24}
              moneyRaised={10}
              startTime={1633000000}
              endTime={1633000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
        </CardsWrapper>
      </BgCards>
    );
  }
  //✅ Step4: Parse the data to JSON format
  const dataPriv = JSON.parse(dataPrivString);
  const dataPriv2 = JSON.parse(dataPrivString2);

  //✅ Step5: Create the key for the data

  if (!web2Data) {
    return (
      <BgCards>
        <CardsWrapper>
          <>
            <PrivateSaleCards
              currency={"Ethereum"}
              key={1}
              id={1}
              title={"ETH"}
              vestingFirstReleasePercent={30}
              softCapCurrency={20}
              hardCapCurrency={20}
              moneyRaised={5}
              startTime={1631000000}
              endTime={1631000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Cardano"}
              key={2}
              id={2}
              title={"ADA"}
              vestingFirstReleasePercent={35}
              softCapCurrency={22}
              hardCapCurrency={22}
              moneyRaised={8}
              startTime={1632000000}
              endTime={1632000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Solana"}
              key={3}
              id={3}
              title={"SOL"}
              vestingFirstReleasePercent={40}
              softCapCurrency={24}
              hardCapCurrency={24}
              moneyRaised={10}
              startTime={1633000000}
              endTime={1633000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Binance Coin"}
              key={4}
              id={4}
              title={"BNB"}
              vestingFirstReleasePercent={45}
              softCapCurrency={26}
              hardCapCurrency={26}
              moneyRaised={12}
              startTime={1634000000}
              endTime={1634000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Ripple"}
              key={5}
              id={5}
              title={"XRP"}
              vestingFirstReleasePercent={50}
              softCapCurrency={28}
              hardCapCurrency={28}
              moneyRaised={15}
              startTime={1635000000}
              endTime={1635000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PrivateSaleCards
              currency={"Solana"}
              key={3}
              id={3}
              title={"SOL"}
              vestingFirstReleasePercent={40}
              softCapCurrency={24}
              hardCapCurrency={24}
              moneyRaised={10}
              startTime={1633000000}
              endTime={1633000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
        </CardsWrapper>
      </BgCards>
    );
  }

  //Blockchain
  const Web3key = [
    "purchaseToken",
    "addressCreator",
    "whitelist",
    "softCap",
    "hardCap",
    "moneyRaised",
    "minBuy",
    "maxBuy",
    "startTime",
    "endTime",
    "tokensVested",
    "firstReleasePercent",
    "vestingPeriod",
    "cycleReleasePercentages",
  ];
  //✅ Step6: Map the data to the key
  const dataMain = dataPriv.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3key.length; i++) {
      if (item) {
        obj[Web3key[i]] = item[i];
      } else {
        obj[Web3key[i]] = null; // Handle the case where item is null
      }
    }
    return obj;
  });

  //✅ Step7: Decimals & Name & Symbol
  const tokenArrayPrivateSale = dataMain.map((item: any) => {
    return item.purchaseToken;
  });

  const decimalsPrivateSale = tokenArrayPrivateSale.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: decimals } = useContractRead({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "decimals",
      });
      // return an object with the data property
      return { data: decimals };
    },
  );

  const decimal = decimalsPrivateSale.map((item: any) => {
    return item.data;
  });

  //✅ Step8: Additional Calculations

  //✔️ SoftCap Calculation
  const softCap = dataMain.map((item: any, index: any) => {
    const currentDecimal = decimal && decimal[index];
    const TokenDecimal = currentDecimal || 18;
    return item.softCap / 10 ** TokenDecimal;
  });

  //✔️ HardCap Calculation
  const hardCap = dataMain.map((item: any, index: any) => {
    const currentDecimal = decimal && decimal[index];
    const TokenDecimal = currentDecimal || 18;
    return item.hardCap / 10 ** TokenDecimal;
  });

  const selectedIndices = dataPriv2;

  return (
    <BgCards>
      <CardsWrapper>
        {isNaN(number) ? (
          <>
            <PrivateSaleCards
              currency={"Ethereum"}
              key={1}
              id={1}
              title={"ETH"}
              vestingFirstReleasePercent={30}
              softCapCurrency={20}
              hardCapCurrency={20}
              moneyRaised={5}
              startTime={1631000000}
              endTime={1631000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Cardano"}
              key={2}
              id={2}
              title={"ADA"}
              vestingFirstReleasePercent={35}
              softCapCurrency={22}
              hardCapCurrency={22}
              moneyRaised={8}
              startTime={1632000000}
              endTime={1632000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Solana"}
              key={3}
              id={3}
              title={"SOL"}
              vestingFirstReleasePercent={40}
              softCapCurrency={24}
              hardCapCurrency={24}
              moneyRaised={10}
              startTime={1633000000}
              endTime={1633000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Binance Coin"}
              key={4}
              id={4}
              title={"BNB"}
              vestingFirstReleasePercent={45}
              softCapCurrency={26}
              hardCapCurrency={26}
              moneyRaised={12}
              startTime={1634000000}
              endTime={1634000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />

            <PrivateSaleCards
              currency={"Ripple"}
              key={5}
              id={5}
              title={"XRP"}
              vestingFirstReleasePercent={50}
              softCapCurrency={28}
              hardCapCurrency={28}
              moneyRaised={15}
              startTime={1635000000}
              endTime={1635000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PrivateSaleCards
              currency={"Solana"}
              key={3}
              id={3}
              title={"SOL"}
              vestingFirstReleasePercent={40}
              softCapCurrency={24}
              hardCapCurrency={24}
              moneyRaised={10}
              startTime={1633000000}
              endTime={1633000000}
              imgHref={"/PlaceHolder.svg"}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
        ) : (
          <>
            {selectedIndices
              .map((index: any, i: any) => ({
                index,
                matchingIndex: idWeb2privsales.indexOf(selectedIndices[i]),
              }))
              .reverse()
              //@ts-ignore
              .map(({ index, matchingIndex }, i) => (
                <PrivateSaleCards
                  currency={"ss"}
                  key={index || 0}
                  id={index || 0}
                  title={web2Data[web2Data.length - i - 1]?.title || "Title"}
                  vestingFirstReleasePercent={
                    dataMain[index]?.firstReleasePercent || 0
                  }
                  softCapCurrency={softCap[index] || 0}
                  hardCapCurrency={hardCap[index] || 0}
                  moneyRaised={dataMain[index]?.moneyRaised || 0}
                  startTime={dataMain[index]?.startTime || 0}
                  endTime={dataMain[index]?.endTime || 0}
                  imgHref={
                    web2Data[web2Data.length - i - 1]?.logoUrl ||
                    "/PlaceHolder.svg"
                  }
                  bg={
                    web2Data[web2Data.length - i - 1]?.bgLogoUrl ||
                    "/PlaceholderCardBg.png"
                  }
                />
              ))}
          </>
        )}
      </CardsWrapper>
    </BgCards>
  );
};

export default dynamic(() => Promise.resolve(Advance), { ssr: false });
