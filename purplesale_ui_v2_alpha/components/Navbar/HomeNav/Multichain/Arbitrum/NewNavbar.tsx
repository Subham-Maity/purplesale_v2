"use client";
import React, { useEffect, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { RiMenu2Fill } from "react-icons/ri";
import axios from "@/constants/axio";
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
} from "@/constants/Arbitrum/createConstants";

import { InfinitySpin } from "react-loader-spinner";
import { useRouter } from "next/router";
import { RiUserSettingsLine } from "react-icons/ri";
import dynamic from "next/dynamic";
import TrendingBar from "@/components/Navbar/TrendingBar/TrendingBar";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar, isSidebarOpen }: NavbarProps) => {
  const [presale, setPresale] = useState<any>([]);
  //Web2 Fair Launch
  const [fairLaunch, setFairLaunch] = useState<any>([]);

  //Web2 Auction
  const [auction, setAuction] = useState<any>([]);
  //Web2 Subscription
  const [subscription, setSubscription] = useState<any>([]);

  //Length of the array
  const router = useRouter();
  const fetchWeb2DataPresale = async () => {
    try {
      const response = await axios.get("/presale-fetch-data/Arbitrum");
      setPresale(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataFairLaunch = async () => {
    try {
      const response = await axios.get("/fairLaunch-fetch-data/Arbitrum");
      setFairLaunch(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataAuction = async () => {
    try {
      const response = await axios.get("/dutchAuction-fetch-data/Arbitrum");
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataSubscription = async () => {
    try {
      const response = await axios.get("/Subscription-fetch-data/Arbitrum");
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

  //Calculate the data
  //🚀 Presale Name

  const privateSaleName = namePrivateSale.map((item: any) => {
    return item;
  });

  //🚀 Auction Name

  const auctionName = nameAuction.map((item: any) => {
    return item;
  });

  //🚀 Fair Launch Name

  const fairName = nameFair.map((item: any) => {
    return item;
  });

  //🚀 Subscription Name

  const subName = nameSub.map((item: any) => {
    return item;
  });

  //🚀 Private Sale Image

  const privateSaleImage = web2DataPresale.map((item: any) => {
    return item.logoUrl || "https://cryptologos.cc/logos/ethereum-eth-logo.png";
  });

  //🚀 Auction Image

  const auctionImage = web2DataAuction.map((item: any) => {
    return item.logoUrl || "https://cryptologos.cc/logos/ethereum-eth-logo.png";
  });

  //🚀 Fair Launch Image

  const fairImage = web2DataFair.map((item: any) => {
    return item.logoUrl || "https://cryptologos.cc/logos/ethereum-eth-logo.png";
  });

  //🚀 Subscription Image

  const subImage = web2DataSubscription.map((item: any) => {
    return item.logoUrl || "https://cryptologos.cc/logos/ethereum-eth-logo.png";
  });

  const presaleData = dataMainPresale.map((item: any, index: number) => {
    return {
      name: privateSaleName[index] || "Presale",
      image:
        privateSaleImage[index] ||
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/details/launchpad/" + index || "/details/launchpad/0",
    };
  });

  const auctionData = dataMainAuction.map((item: any, index: number) => {
    return {
      name: auctionName[index] || "Auction",
      image:
        auctionImage[index] ||
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/details/auction/" + index || "/details/auction/0",
    };
  });

  const fairData = dataMainFair.map((item: any, index: number) => {
    return {
      name: fairName[index] || "FairLaunch",
      image:
        fairImage[index] ||
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/details/fairlaunch/" + index || "/details/fairlaunch/0",
    };
  });

  const subData = dataMainSubscription.map((item: any, index: number) => {
    return {
      name: subName[index] || "Subscription",
      image:
        subImage[index] || "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/details/subscription/" + index || "/details/subscription/0",
    };
  });

  //One array for all data

  let allData = presaleData.concat(auctionData, fairData, subData);
  const dummyData = [
    {
      name: "ETH",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/",
    },
    {
      name: "FairLaunch",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/",
    },
    {
      name: "Dutch",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/",
    },
    {
      name: "Subs",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/",
    },
    {
      name: "Purple",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/",
    },
    {
      name: "Doge",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/",
    },
    {
      name: "Eth",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/",
    },
    {
      name: "Bitcoin",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      href: "/",
    },
  ];
  // Check if allData is empty, and if it is, assign dummyData to it
  if (allData.length === 0) {
    allData = dummyData;
  }

  //Navigation
  const navigation = [
    {
      id: 1,
      name: "Trending",
      component: <TrendingBar loop={false} Trending={allData} />,
      current: false,
    },
    {
      id: 2,
      name: "Settings",
      component: (
        <button
          onClick={() => {
            router.push("/me");
          }}
        >
          <RiUserSettingsLine className="text-2xl lg:mb-2 text-white hover:text-gray-400 shadow-2xl shadow-white" />
        </button>
      ),
      current: false,
    },
    // {
    //   id: 3,
    //   name: "Switch",
    //   component: <Switcher />,
    //   current: false,
    // },
    {
      id: 3,
      name: "Connect",
      component: (
        <div className="lg:mb-4">
          <ConnectButton />
        </div>
      ),
      current: false,
    },
  ];

  return (
    <div className="w-[340px] sm:w-[670px] md:w-[945px] lg:w-[960px] xl:w-[1050px] 2xl:w-[1440px] z-50  max-w-8xl px-4 sm:px-6 lg:px-4 py-2 sm:py-2 lg:py-2 ">
      <div className="flex h-12 items-center justify-between">
        <div>
          <div className=" flex  items-center space-x-4 gap-0 lg:gap-0">
            <div>
              <RiMenu2Fill
                size={25}
                className={`hover:cursor-pointer lg:hidden `}
                onClick={() => {
                  toggleSidebar();
                }}
              />
            </div>
            <h1 className="dark:text-white text-left text-black ml-2 font-bold whitespace-nowrap text-2xl lg:hidden block">
              Purple Sale
            </h1>
            {navigation.map((item) =>
              item.component ? <div key={item.id}>{item.component}</div> : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
