"use client";
import Leaderboard from "@/components/Leaderboard/Leaderboard";
import React, { useEffect, useState } from "react";

import { useContractRead } from "wagmi";
import {
  createAbi,
  createAddress,
  dutchAuctionAbi,
  dutchAuctionAddress,
  ERC20Abi,
  fairLaunchAbi,
  fairLaunchAddress,
  subAbi,
  subAddress,
} from "@/constants/Polygon/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import axios from "@/constants/axio";
import BgLeaderboard from "@/components/TailwindWrapper/Leaderboard/BgLeaderboard";

interface SubBoxProps {
  title: string;
  number: number;
}

export function SubBox({ title, number }: SubBoxProps) {
  return (
    <div className="flex flex-col items-center text-center p-3 w-[370px] sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[1440px]">
      <div className="text-black dark:text-gray-300 text-lg">{title}</div>
      <div className="text-black dark:text-white text-3xl font-bold">
        {parseFloat(number.toString()).toLocaleString()}
      </div>
    </div>
  );
}

const LeaderboardPage: React.FC<any> = ({ weeksData }) => {
  //Web2 Presale
  const [presale, setPresale] = useState<any>([]);
  //Web2 Fair Launch
  const [fairLaunch, setFairLaunch] = useState<any>([]);

  //Web2 Auction
  const [auction, setAuction] = useState<any>([]);
  //Web2 Subscription
  const [subscription, setSubscription] = useState<any>([]);

  //Length of the array

  const fetchWeb2DataPresale = async () => {
    try {
      const response = await axios.get("/presale-fetch-data/Polygon");
      setPresale(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataFairLaunch = async () => {
    try {
      const response = await axios.get("/fairLaunch-fetch-data/Polygon");
      setFairLaunch(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataAuction = async () => {
    try {
      const response = await axios.get("/dutchAuction-fetch-data/Polygon");
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataSubscription = async () => {
    try {
      const response = await axios.get("/Subscription-fetch-data/Polygon");
      setSubscription(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeb2DataFairLaunch();
    fetchWeb2DataAuction();
    fetchWeb2DataPresale();
    fetchWeb2DataSubscription();
  }, []);

  // Web2 Auction
  const web2DataAuction = auction;
  const idWeb2Auction = web2DataAuction.map((auction: any) => auction.id);

  // Web2 Fair Launch
  const web2DataFair = fairLaunch;
  const idWeb2Fair = web2DataFair.map((fairLaunch: any) => fairLaunch.id);

  // Web2 Presale
  const web2DataPresale = presale;
  const idWeb2Presale = web2DataPresale.map((presale: any) => presale.id);

  // Web2 Subscription
  const web2DataSubscription = subscription;
  const idWeb2Subscription = web2DataSubscription.map(
    (subscription: any) => subscription.id,
  );

  //✅ Step0: Set the length of the array
  //🚀 Presale
  const { data: returnLength } = useContractRead({
    address: createAddress,
    abi: createAbi,
    functionName: "returnLength",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });

  const [presaleLength, setPresaleLength] = useState<any>(
    returnLength?.toString(),
  );

  useEffect(() => {
    setPresaleLength(returnLength?.toString());
  }, []);

  const lengthPresales = parseInt(presaleLength);

  //🚀 Fair Launch

  const { data: returnLengthFair } = useContractRead({
    address: fairLaunchAddress,
    abi: fairLaunchAbi,
    functionName: "returnLength",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });

  const [fairLength, setFairLength] = useState<any>(
    returnLengthFair?.toString(),
  );

  useEffect(() => {
    setFairLength(returnLengthFair?.toString());
  }, []);

  const lengthFair = parseInt(fairLength);

  //🚀 Auction

  const { data: returnLengthAuction } = useContractRead({
    address: dutchAuctionAddress,
    abi: dutchAuctionAbi,
    functionName: "returnLength",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });

  const [auctionLength, setAuctionLength] = useState<any>(
    returnLengthAuction?.toString(),
  );

  useEffect(() => {
    setAuctionLength(returnLengthAuction?.toString());
  }, []);

  const lengthAuction = parseInt(auctionLength);

  //🚀 Subscription

  const { data: returnLengthSub } = useContractRead({
    address: subAddress,
    abi: subAbi,
    functionName: "returnLength",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });

  const [subLength, setSubLength] = useState<any>(returnLengthSub?.toString());

  useEffect(() => {
    setSubLength(returnLengthSub?.toString());
  }, []);

  const lengthSub = parseInt(subLength);
  //✅ Step1: Get the data from the contract
  //🚀 Presale
  const presalesArray = Array.from({ length: lengthPresales }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: presales } = useContractRead({
      address: createAddress,
      abi: createAbi,
      functionName: "presales",
      args: [index],
      onError(error: any) {
        console.log("Error", error);
        enqueueSnackbar(`Error creating presale ${error}`, {
          variant: "error",
        });
      },
    });
    return presales;
  });

  //🚀 Fair Launch
  const fairLaunchArray = Array.from({ length: lengthFair }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: fairLaunch } = useContractRead({
      address: fairLaunchAddress,
      abi: fairLaunchAbi,
      functionName: "fairLaunch",
      args: [index],
      onError(error: any) {
        console.log("Error", error);
        enqueueSnackbar(`Error creating presale ${error}`, {
          variant: "error",
        });
      },
    });
    return fairLaunch;
  });

  //🚀 Auction
  const auctionsLaunchArray = Array.from(
    { length: lengthAuction },
    (_, index) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: Auctions } = useContractRead({
        address: dutchAuctionAddress,
        abi: dutchAuctionAbi,
        functionName: "Auctions",
        args: [index],
        onError(error: any) {
          console.log("Error", error);
          enqueueSnackbar(`Error creating presale ${error}`, {
            variant: "error",
          });
        },
      });
      return Auctions;
    },
  );

  //🚀 Subscription
  const subsLaunchArray = Array.from({ length: lengthSub }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: subs } = useContractRead({
      address: subAddress,
      abi: subAbi,
      functionName: "subs",
      args: [index],
      onError(error: any) {
        console.log("Error", error);
        enqueueSnackbar(`Error creating presale ${error}`, {
          variant: "error",
        });
      },
    });
    return subs;
  });

  //✅ Step2: Convert the data to JSON format

  //🚀 Subscription
  const dataSubString = JSON.stringify(subsLaunchArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //🚀 Auction
  const dataStringAuction = JSON.stringify(
    auctionsLaunchArray,
    (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    },
  );

  //🚀 Fair Launch
  const dataStringFair = JSON.stringify(fairLaunchArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //🚀 Presale
  const PresaleDataString = JSON.stringify(presalesArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //✅ Step3: Check if the data is available
  if (
    !dataSubString ||
    !dataStringAuction ||
    !dataStringFair ||
    !PresaleDataString
  ) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✅ Step4: Parse the data to JSON format

  //🚀 Subscription
  const parsedDataSub = JSON.parse(dataSubString);
  //🚀 Auction
  const parsedDataAuction = JSON.parse(dataStringAuction);
  //🚀 Fair Launch
  const parsedDataFair = JSON.parse(dataStringFair);
  //🚀 Presale
  const parsedDataPresale = JSON.parse(PresaleDataString);

  //✅ Step5: Create the key for the data
  //🚀 Presale

  if (!web2DataPresale) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <p>Metamask is not connected</p>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✔️ Blockchain
  const Web3keyPresale = [
    "token",
    "purchaseToken",
    "addressCreator",
    "whitelistedEnabled",
    "burnOrRefund",
    "burnedOrRefunded",
    "vestingEnabled",
    "devFeeInToken",
    "softCap",
    "hardCap",
    "presaleRate",
    "moneyRaised",
    "tokensSold",
    "devCommission",
    "devCommissionInToken",
    "affiliateCommissionAmount",
    "minBuy",
    "maxBuy",
    "startTime",
    "endTime",
    "affiliateRate",
    "firstReleasePercentage",
    "vestingPeriod",
    "cycleReleasePercentage",
    "liquidityAdditionPercent",
    "liquidityUnlockTime",
    "listingRate",
  ];
  //✅ Step6: Map the data to the key
  const dataMainPresale = parsedDataPresale.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3keyPresale.length; i++) {
      if (item) {
        obj[Web3keyPresale[i]] = item[i];
      } else {
        obj[Web3keyPresale[i]] = null; // Handle the case where item is null
      }
    }
    return obj;
  });

  //🚀 Subscription

  if (!web2DataSubscription) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <p>Metamask is not connected</p>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✔️ Blockchain
  const Web3keySubscription = [
    "token",
    "purchaseToken",
    "addressCreator",
    "whitelistedEnabled",
    "finalizedPool",
    "devFeeInToken",
    "softCap",
    "hardCap",
    "hardCapPerUser",
    "subRate",
    "listingRate",
    "finHardCap",
    "finMoneyPer",
    "moneyRaised",
    "tokensSold",
    "devCommission",
    "devCommissionInToken",
    "startTime",
    "endTime",
    "liquidityAdditionPercent",
    "liquidityUnlockTime",
    "investors",
  ];
  //✅ Step6: Map the data to the key
  const dataMainSubscription = parsedDataSub.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3keySubscription.length; i++) {
      if (item) {
        obj[Web3keySubscription[i]] = item[i];
      } else {
        obj[Web3keySubscription[i]] = null; // Handle the case where item is null
      }
    }
    return obj;
  });

  //🚀 Auction
  //✔️ Web2

  if (!web2DataAuction) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <p>Metamask is not connected</p>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✔️ Blockchain
  const Web3keyAuction = [
    "token",
    "purchaseToken",
    "addressCreator",
    "whitelistedEnabled",
    "burnOrRefund",
    "burnedOrRefunded",
    "vestingEnabled",
    "devFeeInToken",
    "auctionFinalized",
    "tokensToSell",
    "softCap",
    "hardCap",
    "startPrice",
    "endPrice",
    "moneyRaised",
    "actualMoneyRaised",
    "tokensSold",
    "devCommission",
    "devCommissionInToken",
    "minBuy",
    "maxBuy",
    "decPriceCycle",
    "startTime",
    "endTime",
    "lastPrice",
    "liquidityAdditionPercent",
    "liquidityUnlockTime",
    "firstReleasePercentage",
    "vestingPeriod",
    "cycleReleasePercentage",
  ];
  //✅ Step6: Map the data to the key
  const dataMainAuction = parsedDataAuction.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3keyAuction.length; i++) {
      if (item) {
        obj[Web3keyAuction[i]] = item[i];
      } else {
        obj[Web3keyAuction[i]] = null;
      }
    }
    return obj;
  });

  //🚀 Fair Launch
  //✔️ Web2

  if (!web2DataFair) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <p>Metamask is not connected</p>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //✔️ Blockchain
  const Web3keyFair = [
    "token",
    "purchaseToken",
    "addressCreator",
    "whitelistedEnabled",
    "fundsCollected",
    "devFeeInToken",
    "softCap",
    "maxBuy",
    "tokensToSell",
    "moneyRaised",
    "devCommission",
    "affiliateCommissionAmount",
    "liquidityAdditionPercent",
    "liquidityUnlockTime",
    "startTime",
    "endTime",
    "affiliateRate",
  ];
  //✅ Step6: Map the data to the key
  const dataMainFair = parsedDataFair.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < Web3keyFair.length; i++) {
      if (item) {
        obj[Web3keyFair[i]] = item[i];
      } else {
        obj[Web3keyFair[i]] = null; // Handle the case where item is null
      }
    }
    return obj;
  });

  //✅ Step7: Decimals & Name & Symbol

  //✔️ Decimals
  //🚀 Presale
  const tokenArrayPrivateSale = dataMainPresale.map((item: any) => {
    return item?.purchaseToken;
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

  const decimalPrivateSale = decimalsPrivateSale.map((item: any) => {
    return item?.data;
  });

  //🚀 Auction

  const tokenArrayAuction = dataMainAuction.map((item: any) => {
    return item?.purchaseToken;
  });

  const decimalsAuction = tokenArrayAuction.map(
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

  const decimalAuction = decimalsAuction.map((item: any) => {
    return item?.data;
  });

  //🚀 Fair Launch

  const tokenArrayFair = dataMainFair.map((item: any) => {
    return item?.purchaseToken;
  });

  const decimalsFair = tokenArrayFair.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: decimals } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "decimals",
    });
    // return an object with the data property
    return { data: decimals };
  });

  const decimalFair = decimalsFair.map((item: any) => {
    return item?.data;
  });

  //🚀 Subscription

  const tokenArraySub = dataMainSubscription.map((item: any) => {
    return item?.purchaseToken;
  });

  const decimalsSub = tokenArraySub.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: decimals } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "decimals",
    });
    // return an object with the data property
    return { data: decimals };
  });

  const decimalSub = decimalsSub.map((item: any) => {
    return item?.data;
  });

  //✔️ Name
  //🚀 Presale
  const tokenArrayPrivateSaleName = dataMainPresale.map((item: any) => {
    return item?.token;
  });

  const namesPrivateSale = tokenArrayPrivateSaleName.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: name } = useContractRead({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "name",
      });
      // return an object with the data property
      return { data: name };
    },
  );

  const namePrivateSale = namesPrivateSale.map((item: any) => {
    return item?.data;
  });

  //🚀 Auction
  const tokenArrayAuctionName = dataMainAuction.map((item: any) => {
    return item?.token;
  });

  const namesAuction = tokenArrayAuctionName.map(
    (token: string, index: number) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: name } = useContractRead({
        //@ts-ignore
        address: token,
        abi: ERC20Abi,
        functionName: "name",
      });
      // return an object with the data property
      return { data: name };
    },
  );

  const nameAuction = namesAuction.map((item: any) => {
    return item?.data;
  });

  //🚀 Fair Launch

  const tokenArrayFairName = dataMainFair.map((item: any) => {
    return item?.token;
  });

  const namesFair = tokenArrayFairName.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: name } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "name",
    });
    // return an object with the data property
    return { data: name };
  });

  const nameFair = namesFair.map((item: any) => {
    return item?.data;
  });

  //🚀 Subscription

  const tokenArraySubName = dataMainSubscription.map((item: any) => {
    return item?.token;
  });

  const namesSub = tokenArraySubName.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: name } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "name",
    });
    // return an object with the data property
    return { data: name };
  });

  const nameSub = namesSub.map((item: any) => {
    return item?.data;
  });

  //✔️ Symbol
  //🚀 Presale

  const tokenArrayPrivateSaleSymbol = dataMainPresale.map((item: any) => {
    return item?.purchaseToken;
  });

  const symbolsPrivateSale = tokenArrayPrivateSaleSymbol.map(
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

  const symbolPrivateSale = symbolsPrivateSale.map((item: any) => {
    return item?.data;
  });

  //🚀 Auction

  const tokenArrayAuctionSymbol = dataMainAuction.map((item: any) => {
    return item?.purchaseToken;
  });

  const symbolsAuction = tokenArrayAuctionSymbol.map(
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

  const symbolAuction = symbolsAuction.map((item: any) => {
    return item?.data;
  });

  //🚀 Fair Launch
  const tokenArrayFairSymbol = dataMainFair.map((item: any) => {
    return item?.purchaseToken;
  });

  const symbolsFair = tokenArrayFairSymbol.map(
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

  const symbolFair = symbolsFair.map((item: any) => {
    return item?.data;
  });

  //🚀 Subscription
  const tokenArraySubSymbol = dataMainSubscription.map((item: any) => {
    return item?.purchaseToken;
  });

  const symbolsSub = tokenArraySubSymbol.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: symbol } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "symbol",
    });
    // return an object with the data property
    return { data: symbol };
  });

  const symbolSub = symbolsSub.map((item: any) => {
    return item?.data;
  });

  //✅ Step8: Additional Calculations

  //🚀 Presale
  const softCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal = decimalPrivateSale && decimalPrivateSale[index];
    const TokenDecimal = currentDecimal || 18;
    return item.softCap / 10 ** TokenDecimal;
  });

  const hardCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal = decimalPrivateSale && decimalPrivateSale[index];
    const TokenDecimal = currentDecimal || 18;
    return item.hardCap / 10 ** TokenDecimal;
  });

  //🚀 Auction

  const softCapAuction = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal = decimalAuction && decimalAuction[index];
    const TokenDecimal = currentDecimal || 18;
    return item.softCap / 10 ** TokenDecimal;
  });

  const maxBuyAuction = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal = decimalAuction && decimalAuction[index];
    const TokenDecimal = currentDecimal || 18;
    return item.maxBuy / 10 ** TokenDecimal;
  });

  //🚀 Fair Launch

  const softCapFair = dataMainFair.map((item: any, index: number) => {
    const currentDecimal = decimalFair && decimalFair[index];
    const TokenDecimal = currentDecimal || 18;
    return item.softCap / 10 ** TokenDecimal;
  });

  const maxBuyFair = dataMainFair.map((item: any, index: number) => {
    const currentDecimal = decimalFair && decimalFair[index];
    const TokenDecimal = currentDecimal || 18;
    return item.maxBuy / 10 ** TokenDecimal;
  });
  //🚀 Subscription
  const softCapSub = dataMainSubscription.map((item: any, index: number) => {
    const currentDecimal = decimalSub && decimalSub[index];
    const TokenDecimal = currentDecimal || 18;
    return item.softCap / 10 ** TokenDecimal;
  });

  const hardCapSub = dataMainSubscription.map((item: any, index: number) => {
    const currentDecimal = decimalSub && decimalSub[index];
    const TokenDecimal = currentDecimal || 18;
    return item.hardCap / 10 ** TokenDecimal;
  });

  //🚀 Combined Card Data

  const PresaleCardData = dataMainPresale.map((item: any, index: number) => {
    return {
      imgHref: web2DataPresale && web2DataPresale[index]?.logoUrl,
      name: namePrivateSale && namePrivateSale[index],
      symbol: symbolPrivateSale && symbolPrivateSale[index],
      endDate: item.endTime,
      moneyRaised: item.moneyRaised,
      link: "/details/launchpad/" + index,
      progress: item.moneyRaised / item.hardCap,
    };
  });

  const AuctionCardData = dataMainAuction.map((item: any, index: number) => {
    return {
      imgHref: web2DataAuction && web2DataAuction[index]?.logoUrl,
      name: nameAuction && nameAuction[index],
      symbol: symbolAuction && symbolAuction[index],
      endDate: item.endTime,
      moneyRaised: item.moneyRaised,
      link: "/details/auction/" + index,
      progress: item.moneyRaised / item.softCap,
    };
  });

  const FairCardData = dataMainFair.map((item: any, index: number) => {
    return {
      imgHref: web2DataFair && web2DataFair[index]?.logoUrl,
      name: nameFair && nameFair[index],
      symbol: symbolFair && symbolFair[index],
      endDate: item.endTime,
      moneyRaised: item.moneyRaised,
      link: "/details/fairlaunch/" + index,
      progress: item.moneyRaised / item.softCap,
    };
  });

  const SubCardData = dataMainSubscription.map((item: any, index: number) => {
    return {
      imgHref: web2DataSubscription && web2DataSubscription[index]?.logoUrl,
      name: nameSub && nameSub[index],
      symbol: symbolSub && symbolSub[index],
      endDate: item.endTime,
      moneyRaised: item.moneyRaised,
      link: "/details/subscription/" + index,
      progress: item.moneyRaised / item.hardCapCurrency,
    };
  });

  //✅ Step9: Combined All the card data into one array

  const AllCardData = PresaleCardData.concat(
    AuctionCardData,
    FairCardData,
    SubCardData,
  );

  // Parse moneyRaised values as numbers before calculating the sums
  const sumOfPresaleMoneyRaised = AllCardData.reduce(
    (total: any, card: any) => total + card.moneyRaised,
    0,
  );

  // Define success criteria (greater than softcap or hardcap) for each launchpad type
  const softcapForPresale = PresaleCardData.reduce(
    (total: any, card: any) =>
      total + (parseFloat(card.moneyRaised) > card.softCap ? 1 : 0),
    0,
  );
  const hardcapForAuction = AuctionCardData.reduce(
    (total: any, card: any) =>
      total + (parseFloat(card.moneyRaised) > card.hardCap ? 1 : 0),
    0,
  );
  const softcapForFair = FairCardData.reduce(
    (total: any, card: any) =>
      total + (parseFloat(card.moneyRaised) > card.softCap ? 1 : 0),
    0,
  );
  const hardcapForSubscription = SubCardData.reduce(
    (total: any, card: any) =>
      total + (parseFloat(card.moneyRaised) > card.hardCapCurrency ? 1 : 0),
    0,
  );

  // Calculate the total number of successful projects
  const totalSuccess =
    softcapForPresale +
    hardcapForAuction +
    softcapForFair +
    hardcapForSubscription;

  const subBoxData = [
    { title: "TOTAL SUCCESS THIS WEEK", number: totalSuccess },
    { title: "TOTAL RAISED THIS WEEK", number: sumOfPresaleMoneyRaised },
  ];

  return (
    <div className="flex justify-center mt-8 ">
      <BgLeaderboard>
        <div className="mb-16 lg:mx-52 flex justify-between">
          {subBoxData.map((data, index) => (
            <SubBox key={index} title={data.title} number={data.number} />
          ))}
        </div>
        <Leaderboard cardData={AllCardData} />
      </BgLeaderboard>
    </div>
  );
};

export default LeaderboardPage;
