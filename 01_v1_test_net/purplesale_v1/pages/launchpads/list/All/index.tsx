import dynamic from "next/dynamic";
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
} from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import PreSaleCards from "@/components/Cards/Launchpads/PreSaleCards";
import FairLaunchCards from "@/components/Cards/Launchpads/FairLaunchCards";
import DutchAuctionCards from "@/components/Cards/Launchpads/dutchAuctionCards";
import SubscriptionCards from "@/components/Cards/Launchpads/SubscriptionCards";
import axios from "@/constants/axio";

const All = () => {
  const [poolType, setPoolType] = useState("all");
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
      const response = await axios.get("/presale-fetch-data");
      setPresale(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataFairLaunch = async () => {
    try {
      const response = await axios.get("/fairLaunch-fetch-data");
      setFairLaunch(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataAuction = async () => {
    try {
      const response = await axios.get("/dutchAuction-fetch-data");
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataSubscription = async () => {
    try {
      const response = await axios.get("/Subscription-fetch-data");
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

  const handlePoolTypeChange = (newPoolType: any) => {
    setPoolType(newPoolType);
  };
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
  const dataLengthPresales: any = returnLength?.toString();

  const lengthPresales = parseInt(dataLengthPresales);

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

  const dataLengthFair: any = returnLengthFair?.toString();

  const lengthFair = parseInt(dataLengthFair);

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

  const dataLengthAuction: any = returnLengthAuction?.toString();

  const lengthAuction = parseInt(dataLengthAuction);

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

  const dataLengthSub: any = returnLengthSub?.toString();
  const lengthSub = parseInt(dataLengthSub);

  console.log(
    lengthSub,
    lengthAuction,
    lengthFair,
    lengthPresales,
    "lengthSub+lengthAuction+lengthFair+lengthPresales",
  );

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

  console.log(dataStringAuction + "dataSubString");
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
  console.log(JSON.stringify(dataMainAuction) + "dataMainAuction");
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

  console.log(decimalFair + "decimalFair");

  //🚀 Subscription

  const tokenArraySub = dataMainSubscription.map((item: any) => {
    return item?.token;
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

  console.log(decimalSub + "decimalSub");

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

  console.log(namePrivateSale + "namePrivateSale");

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

  console.log(nameAuction + "nameAuction");

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

  const tokenArrayPrivateSaleSymbols = dataMainPresale.map((item: any) => {
    return item.token;
  });

  const symbolsTokenPrivateSale = tokenArrayPrivateSaleSymbols.map(
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

  const symbolTokenPrivateSale = symbolsTokenPrivateSale.map((item: any) => {
    return item.data;
  });

  console.log(symbolTokenPrivateSale + "symbolTokenPrivateSale");

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
    return item?.softCap / 10 ** TokenDecimal;
  });

  const hardCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal = decimalPrivateSale && decimalPrivateSale[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.hardCap / 10 ** TokenDecimal;
  });

  //🚀 Auction

  const softCapAuction = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal = decimalAuction && decimalAuction[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.softCap / 10 ** TokenDecimal;
  });

  const maxBuyAuction = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal = decimalAuction && decimalAuction[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.maxBuy / 10 ** TokenDecimal;
  });

  //🚀 Fair Launch

  const softCapFair = dataMainFair.map((item: any, index: number) => {
    const currentDecimal = decimalFair && decimalFair[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.softCap / 10 ** TokenDecimal;
  });

  const maxBuyFair = dataMainFair.map((item: any, index: number) => {
    const currentDecimal = decimalFair && decimalFair[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.maxBuy / 10 ** TokenDecimal;
  });
  //🚀 Subscription
  //1 / (sub rate)) * (softcap/ 10^tokendecimal)
  const softCapSub = dataMainSubscription.map((item: any, index: number) => {
    const currentDecimal = decimalSub && decimalSub[index];
    const TokenDecimal = currentDecimal || 18;
    return (1 / item.subRate) * (item?.softCap / 10 ** TokenDecimal);
  });

  const hardCapSub = dataMainSubscription.map((item: any, index: number) => {
    const currentDecimal = decimalSub && decimalSub[index];
    const TokenDecimal = currentDecimal || 18;
    return ((1 / item.subRate) * item?.hardCap) / 10 ** TokenDecimal;
  });

  // Currency Send for all
  //If purchaseToken address is not zero address then currency is purchaseToken's symbol else currency is MATIC
  //🚀 Presale
  const currencyPresale = dataMainPresale.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolPrivateSale[index];
    } else {
      return "MATIC";
    }
  });

  //🚀 Auction
  const currencyAuction = dataMainAuction.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolAuction[index];
    } else {
      return "MATIC";
    }
  });

  //🚀 Fair Launch
  const currencyFair = dataMainFair.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolFair[index];
    } else {
      return "MATIC";
    }
  });

  //🚀 Subscription
  const currencySub = dataMainSubscription.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolSub[index];
    } else {
      return "MATIC";
    }
  });

  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
        <div className="flex flex-col md:flex-row mb-4 ">
          <div className="w-full columns-0 md:columns-0 md:flex md:space-x-2">
            {/* Pool Type */}
            <div className="w-full ">
              <label
                htmlFor="poolType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pool Type
              </label>

              <select
                id="poolType"
                className="w-full bg-stone-50 border border-stone-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-1 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                onChange={(e) => handlePoolTypeChange(e.target.value)} // Use onChange event handler
                value={poolType} // Set the selected value to the state variable
              >
                <option value="all">No Filter</option>
                <option value="presale">Presale</option>
                <option value="fairlaunch">Fair Launch</option>
                <option value="auction">Auction</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>
            {/* Sort Type */}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 items-center justify-center">
          {poolType === "all" && (
            <>
              {isNaN(lengthSub) &&
              isNaN(lengthAuction) &&
              isNaN(lengthFair) &&
              isNaN(lengthPresales) ? (
                /* Render a dummy card here */
                <PreSaleCards
                  softCapCurrency={24}
                  hardCapCurrency={24}
                  id={0}
                  name={"Purple Sale"}
                  symbol={"PURPLE"}
                  Affiliate={0}
                  imgHref={
                    "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                  }
                  description={"0"}
                  Liquidity={0}
                  LockupTime={0}
                  SalesStartIn={0}
                  SalesEndIn={0}
                  moneyRaised={0}
                  currency={"MATIC"}
                  symbolTokenPrivateSales={"25"}
                />
              ) : (
                <>
                  {dataMainPresale.map((item: any, index: any) => {
                    const idWeb3Presale = index + 1;
                    const matchingIndex = idWeb2Presale.indexOf(idWeb3Presale);
                    return (
                      <PreSaleCards
                        key={index || 0}
                        softCapCurrency={softCapPresale[index] || 0}
                        hardCapCurrency={hardCapPresale[index] || 0}
                        id={index || 0}
                        name={namePrivateSale[index] || "Purple Sale"}
                        symbol={symbolPrivateSale[index] || "PURPLE"}
                        Affiliate={item?.affiliateRate || 0}
                        imgHref={
                          matchingIndex !== -1
                            ? web2DataPresale[matchingIndex]?.logoUrl
                            : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                        }
                        description={dataMainPresale[index]?.presaleRate || 0}
                        Liquidity={item?.liquidityAdditionPercent || 0}
                        LockupTime={item?.liquidityUnlockTime || 0}
                        SalesStartIn={item?.startTime || 0}
                        SalesEndIn={item?.endTime || 0}
                        moneyRaised={item?.moneyRaised || 0}
                        currency={currencyPresale[index] || "MATIC"}
                        symbolTokenPrivateSales={symbolTokenPrivateSale[index]}
                      />
                    );
                  })}
                  {dataMainFair.map((item: any, index: any) => {
                    const idWeb3Fair = index + 1;
                    const matchingIndex = idWeb2Fair.indexOf(idWeb3Fair);
                    return (
                      <FairLaunchCards
                        key={index || 0}
                        maxBuyFair={maxBuyFair[index] || 0}
                        softCapCurrency={softCapFair[index] || 0}
                        Affiliate={item.affiliateRate || 0}
                        imgHref={
                          matchingIndex !== -1
                            ? web2DataFair[matchingIndex]?.logoUrl
                            : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                        }
                        Liquidity={item?.liquidityAdditionPercent || 0}
                        LockupTime={item?.liquidityUnlockTime || 0}
                        SalesStartIn={item?.startTime || 0}
                        SalesEndIn={item?.endTime || 0}
                        moneyRaised={item?.moneyRaised || 0}
                        id={index || 0}
                        name={nameFair[index] || "Purple Sale"}
                        symbol={symbolFair[index] || "PURPLE"}
                        currency={currencyFair[index] || "MATIC"}
                      />
                    );
                  })}

                  {dataMainAuction.map((item: any, index: any) => {
                    const idWeb3Auction = index + 1;
                    const matchingIndex = idWeb2Auction.indexOf(idWeb3Auction);
                    return (
                      <DutchAuctionCards
                        key={index || 0}
                        maxBuyFair={maxBuyAuction[index] || 0}
                        softCapCurrency={softCapAuction[index] || 0}
                        id={index || 0}
                        imgHref={
                          matchingIndex !== -1
                            ? web2DataAuction[matchingIndex]?.logoUrl
                            : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                        }
                        Liquidity={item?.liquidityAdditionPercent || 0}
                        LockupTime={item?.liquidityUnlockTime || 0}
                        SalesStartIn={item?.startTime || 0}
                        SalesEndIn={item?.endTime || 0}
                        moneyRaised={item?.moneyRaised || 0}
                        name={nameAuction[index] || "Purple Sale"}
                        symbol={symbolAuction[index] || "PURPLE"}
                        currency={currencyAuction[index] || "MATIC"}
                      />
                    );
                  })}

                  {dataMainSubscription.map((item: any, index: any) => {
                    const idWeb3Subscription = index + 1;
                    const matchingIndex =
                      idWeb2Subscription.indexOf(idWeb3Subscription);
                    return (
                      <SubscriptionCards
                        key={index || 0}
                        softCapCurrency={softCapSub[index] || 0}
                        hardCapCurrency={hardCapSub[index] || 0}
                        id={index || 0}
                        imgHref={
                          matchingIndex !== -1
                            ? web2DataSubscription[matchingIndex]?.logoUrl
                            : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                        }
                        moneyRaised={item?.moneyRaised || 0}
                        liquidity={item?.liquidityAdditionPercent || 0}
                        lockupTime={item?.liquidityUnlockTime || 0}
                        salesStartIn={item?.startTime || 0}
                        salesEndIn={item?.endTime || 0}
                        name={nameSub[index] || "Purple Sale"}
                        symbol={symbolSub[index] || "PURPLE"}
                        currency={currencySub[index] || "MATIC"}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}

          {poolType === "presale" && (
            <>
              {dataMainPresale.map((item: any, index: any) => {
                const idWeb3Presale = index + 1;
                const matchingIndex = idWeb2Presale.indexOf(idWeb3Presale);
                return (
                  <PreSaleCards
                    key={index}
                    softCapCurrency={softCapPresale[index] || 0}
                    hardCapCurrency={hardCapPresale[index] || 0}
                    id={index || 0}
                    name={namePrivateSale[index] || "Purple Sale"}
                    symbol={symbolPrivateSale[index] || "PURPLE"}
                    Affiliate={item.affiliateRate || 0}
                    imgHref={
                      matchingIndex !== -1
                        ? web2DataPresale[matchingIndex]?.logoUrl
                        : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                    }
                    description={dataMainPresale[index]?.presaleRate || 0}
                    Liquidity={item?.liquidityAdditionPercent || 0}
                    LockupTime={item?.liquidityUnlockTime || 0}
                    SalesStartIn={item?.startTime || 0}
                    SalesEndIn={item?.endTime || 0}
                    moneyRaised={item?.moneyRaised || 0}
                    currency={currencyPresale[index] || "MATIC"}
                    symbolTokenPrivateSales={symbolTokenPrivateSale[index]}
                  />
                );
              })}
            </>
          )}

          {poolType === "fairlaunch" && (
            <>
              {dataMainFair.map((item: any, index: any) => {
                const idWeb3Fair = index + 1;
                const matchingIndex = idWeb2Fair.indexOf(idWeb3Fair);
                return (
                  <FairLaunchCards
                    key={index}
                    maxBuyFair={maxBuyFair[index] || 0}
                    softCapCurrency={softCapFair[index] || 0}
                    Affiliate={item.affiliateRate || 0}
                    imgHref={
                      matchingIndex !== -1
                        ? web2DataFair[matchingIndex]?.logoUrl
                        : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                    }
                    Liquidity={item?.liquidityAdditionPercent || 0}
                    LockupTime={item?.liquidityUnlockTime || 0}
                    SalesStartIn={item?.startTime || 0}
                    SalesEndIn={item?.endTime || 0}
                    moneyRaised={item?.moneyRaised || 0}
                    id={index || 0}
                    name={nameFair[index] || "Purple Sale"}
                    symbol={symbolFair[index] || "PURPLE"}
                    currency={currencyFair[index] || "MATIC"}
                  />
                );
              })}
            </>
          )}

          {poolType === "auction" && (
            <>
              {dataMainAuction.map((item: any, index: any) => {
                const idWeb3Auction = index + 1;
                const matchingIndex = idWeb2Auction.indexOf(idWeb3Auction);
                return (
                  <DutchAuctionCards
                    key={index || 0}
                    maxBuyFair={maxBuyAuction[index] || 0}
                    softCapCurrency={softCapAuction[index] || 0}
                    id={index || 0}
                    imgHref={
                      matchingIndex !== -1
                        ? web2DataAuction[matchingIndex]?.logoUrl
                        : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                    }
                    Liquidity={item?.liquidityAdditionPercent || 0}
                    LockupTime={item?.liquidityUnlockTime || 0}
                    SalesStartIn={item?.startTime || 0}
                    SalesEndIn={item?.endTime || 0}
                    moneyRaised={item?.moneyRaised || 0}
                    name={nameAuction[index] || "Purple Sale"}
                    symbol={symbolAuction[index] || "PURPLE"}
                    currency={currencyAuction[index] || "MATIC"}
                  />
                );
              })}
            </>
          )}
          {poolType === "subscription" && (
            <>
              {dataMainSubscription.map((item: any, index: any) => {
                const idWeb3Subscription = index + 1;
                const matchingIndex =
                  idWeb2Subscription.indexOf(idWeb3Subscription);
                return (
                  <SubscriptionCards
                    key={index || 0}
                    softCapCurrency={softCapSub[index] || 0}
                    hardCapCurrency={hardCapSub[index] || 0}
                    id={index || 0}
                    imgHref={
                      matchingIndex !== -1
                        ? web2DataSubscription[matchingIndex]?.logoUrl
                        : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
                    }
                    moneyRaised={item?.moneyRaised || 0}
                    liquidity={item?.liquidityAdditionPercent || 0}
                    lockupTime={item?.liquidityUnlockTime || 0}
                    salesStartIn={item?.startTime || 0}
                    salesEndIn={item?.endTime || 0}
                    name={nameSub[index] || "Purple Sale"}
                    symbol={symbolSub[index] || "PURPLE"}
                    currency={currencySub[index] || "MATIC"}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(All), { ssr: false });
