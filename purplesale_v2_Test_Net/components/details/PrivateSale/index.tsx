import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import FinishDetails from "@/components/details/PrivateSale/FinishDetails";
import { InfinitySpin } from "react-loader-spinner";
import { useAccount, useConnect, useContractRead } from "wagmi";
import {
  ERC20Abi,
  privSaleAbi,
  privSaleAddress,
} from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import { InjectedConnector } from "wagmi/connectors/injected";
import Faq from "@/components/FAQ/Faq";
import Cards2 from "@/components/details/PrivateSale/Cards2";
import SidePanel from "@/components/details/PrivateSale/SidePanel";
import DisqusComments from "@/components/Disqus/Disqus";
import Button from "@/components/details/PrivateSale/Button";
import axios from "@/constants/axio";
import DetailsSize from "@/components/TailwindWrapper/Details/Size";
import FinishDisqusWrapper from "@/components/TailwindWrapper/Details/DisqusBg";
const SubComponent = () => {
  const [dataIndex, setDataIndex] = useState<number>(0);
  const router = useRouter();
  const { id } = router.query;
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { asPath } = useRouter();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const url = `${origin}${asPath}`;

  useEffect(() => {
    if (typeof id === "string") {
      setDataIndex(parseInt(id));
    }
  }, [id]);

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
  const dataLength: any = returnLength?.toString();
  const number = parseInt(dataLength);

  //✅ Step1: Data from the contract
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
  //✅ Step3: Check if the data is available
  if (!dataPrivString) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }
  //✅ Step3: Parse the data to JSON format
  const dataPriv = JSON.parse(dataPrivString);

  //✅ Step4: Create the key for the data

  if (!web2Data) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <p>Metamask is not connected</p>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
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
  //✅ Step5: Map the data to the key
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

  //✅ Step5: Decimals & Symbol & Name
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

  const symbolPrivateSale = tokenArrayPrivateSale.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: symbol } = useContractRead({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "symbol",
      });
      // return an object with the data property
      return { data: symbol };
    },
  );

  const symbol = symbolPrivateSale.map((item: any) => {
    return item.data;
  });

  //✅ Step6: Additional Calculations

  //✔️ SoftCap Calculation
  const softCapValue =
    dataIndex < dataMain.length
      ? dataMain[dataIndex]?.softCap / 10 ** (decimal[dataIndex] || 18)
      : null;

  //✔️ HardCap Calculation
  const hardCapValue =
    dataIndex < dataMain.length
      ? dataMain[dataIndex]?.hardCap / 10 ** (decimal[dataIndex] || 18)
      : null;

  //✔️ MaxBuy Calculation
  const MaxBuy =
    dataIndex < dataMain.length
      ? dataMain[dataIndex].maxBuy / 10 ** (decimal[dataIndex] || 18)
      : null;
  const MinBuy =
    dataIndex < dataMain.length
      ? dataMain[dataIndex].minBuy / 10 ** (decimal[dataIndex] || 18)
      : null;

  //🚀 PRIVATE SALE CARDS
  const currencySub = dataMain.map((item: any, index: number) => {
    if (item.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbol[index];
    } else {
      return "MATIC";
    }
  });
  const idWeb3Presale = dataIndex + 1;
  const matchingIndex = idWeb2privsales.indexOf(idWeb3Presale);

  return (
    <DetailsSize>
      <div className="lg:flex flex-col ">
        <div className="flex-col ">
          <FinishDetails
            softCap={softCapValue || 18}
            hardCap={hardCapValue || 18}
            StartDate={dataMain[dataIndex]?.startTime || 0}
            EndDate={dataMain[dataIndex]?.endTime || 0}
            firstReleaseForProject={
              dataMain[dataIndex].firstReleasePercent || ""
            }
            cycleReleasePercentages={
              dataMain[dataIndex]?.cycleReleasePercentages || ""
            }
            vestingPeriod={dataMain[dataIndex]?.vestingPeriod || ""}
            title={matchingIndex !== -1 ? web2Data[matchingIndex]?.title : ""}
            imgHref={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.logoUrl
                : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
            }
            description={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.description
                : "www.google.com"
            }
            facebook={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.facebook
                : "www.facebook.com"
            }
            twitter={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.twitter
                : "www.twitter.com"
            }
            github={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.github
                : "www.github.com"
            }
            website={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.websiteUrl
                : "www.google.com"
            }
            instagram={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.instagram
                : "www.instagram.com"
            }
            discord={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.discord
                : "www.discord.com"
            }
            reddit={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.reddit
                : "www.reddit.com"
            }
            youtube={
              matchingIndex !== -1
                ? web2Data[matchingIndex]?.youtube
                : "www.youtube.com"
            }
            currency={currencySub[dataIndex] || "MATIC"}
          />

          <Faq />
        </div>
        <div>
          <FinishDisqusWrapper>
            <DisqusComments className="bg-white dark:bg-[#242525] p-5" />
          </FinishDisqusWrapper>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4 items-center justify-center">
          <Cards2
            purchaseTokenAddress={dataMain[dataIndex]?.purchaseToken}
            symbolToken={symbol[dataIndex]}
            EndTime={dataMain[dataIndex]?.endTime}
            index={dataIndex}
            amountDecimal={decimal[dataIndex]}
            address={address}
            Affiliate={dataMain[dataIndex]?.addressCreator}
            moneyRaised={dataMain[dataIndex]?.moneyRaised}
            hardCapCurrency={hardCapValue}
            currency={currencySub[dataIndex] || "MATIC"}
          />
        </div>
        <Button
          createTokenAddress={dataMain[dataIndex]?.addressCreator}
          userWalletAddress={address}
          argsValue={dataIndex}
          endTime={dataMain[dataIndex]?.endTime}
          moneyRaised={dataMain[dataIndex]?.moneyRaised}
          softCapCurrency={softCapValue}
          whitelistedEnabled={dataMain[dataIndex]?.whitelist}
        />
        <SidePanel
          preSaleStartTime={dataMain[dataIndex]?.startTime}
          preSaleEndTime={dataMain[dataIndex]?.endTime}
          maximumBuy={MaxBuy}
          minimumBuy={MinBuy}
          currency={currencySub[dataIndex] || "MATIC"}
        />
      </div>
    </DetailsSize>
  );
};

export default dynamic(() => Promise.resolve(SubComponent), { ssr: false });
