import AffiliateProgram from "@/components/details/Multichain/Ethereum/Alpha/LauchpadDetails/AffiliateProgram";
import Faq from "@/components/FAQ/Faq";
import FinishDetails from "@/components/details/Multichain/Ethereum/Alpha/LauchpadDetails/FinishDetails";
import TokenMetrics from "@/components/details/Multichain/Ethereum/Alpha/LauchpadDetails/TokenMetrics";
import React, { useEffect, useState } from "react";
import { useConnect, useContractRead } from "wagmi";
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
} from "@/constants/Ethereum/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DisqusComments from "@/components/Disqus/Disqus";
import { useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Cards2 from "@/components/details/Multichain/Ethereum/Alpha/LauchpadDetails/Cards2";
import Button from "@/components/details/Multichain/Ethereum/Alpha/LauchpadDetails/Button";
import SidePanel from "@/components/details/Multichain/Ethereum/Alpha/LauchpadDetails/SidePanel";
import axios from "@/constants/axio";
import FinishDisqusWrapper from "@/components/TailwindWrapper/Details/DisqusBg";
import DetailsSize from "@/components/TailwindWrapper/Details/Size";

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
      const response = await axios.get("/presale-fetch-data/Ethereum");
      setPresale(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataFairLaunch = async () => {
    try {
      const response = await axios.get("/fairLaunch-fetch-data/Ethereum");
      setFairLaunch(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataAuction = async () => {
    try {
      const response = await axios.get("/dutchAuction-fetch-data/Ethereum");
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataSubscription = async () => {
    try {
      const response = await axios.get("/Subscription-fetch-data/Ethereum");
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

  //✅ Step1: Get the data from the contract
  //🚀 Presale
  const presalesArray = Array.from(
    { length: lengthPresales || 1 },
    (_, index) => {
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
    },
  );

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
  //normal
  const tokenArrayPrivateSale = dataMainPresale.map((item: any) => {
    return item?.token;
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

  //for softcap value
  const tokenArrayDecimalsPrivateSale = dataMainPresale.map((item: any) => {
    return item?.purchaseToken;
  });

  const purchaseTokenDecimalsPrivateSale = tokenArrayDecimalsPrivateSale.map(
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

  const purchaseTokenDecimals = purchaseTokenDecimalsPrivateSale.map(
    (item: any) => {
      return item.data;
    },
  );

  const purchaseTokenDecimalsModify = purchaseTokenDecimals.map((item: any) => {
    return item === undefined ? 18 : item;
  });

  //🚀 Auction
  //normal
  const tokenArrayAuction = dataMainAuction.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  //for softcap value
  const tokenArrayDecimalsAuction = dataMainAuction.map((item: any) => {
    return item?.purchaseToken;
  });

  const purchaseTokenDecimalsAuction = tokenArrayDecimalsAuction.map(
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

  const purchaseTokenDecimalsAuctionSoft = purchaseTokenDecimalsAuction.map(
    (item: any) => {
      return item.data;
    },
  );

  //🚀 Fair Launch
  //normal
  const tokenArrayFair = dataMainFair.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  //for softcap value
  const tokenArrayDecimalsFair = dataMainFair.map((item: any) => {
    return item?.purchaseToken;
  });

  const purchaseTokenDecimalsFair = tokenArrayDecimalsFair.map(
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

  const purchaseTokenDecimalsFairSoft = purchaseTokenDecimalsFair.map(
    (item: any) => {
      return item.data;
    },
  );

  //🚀 Subscription
  //normal
  const tokenArraySub = dataMainSubscription.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  //for softcap value

  const tokenArrayDecimalsSub = dataMainSubscription.map((item: any) => {
    return item?.purchaseToken;
  });

  const purchaseTokenDecimalsSub = tokenArrayDecimalsSub.map(
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

  const purchaseTokenDecimalsSubSoft = purchaseTokenDecimalsSub.map(
    (item: any) => {
      return item.data;
    },
  );

  //✔️ Name
  //🚀 Presale
  const tokenArrayPrivateSaleName = dataMainPresale.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  //🚀 Auction
  const tokenArrayAuctionName = dataMainAuction.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  //🚀 Fair Launch

  const tokenArrayFairName = dataMainFair.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  //🚀 Subscription

  const tokenArraySubName = dataMainSubscription.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  //✔️ Symbol
  //🚀 Presale

  const tokenArrayPrivateSaleSymbol = dataMainPresale.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  const softCapCurrencyTokenArrayPrivateSaleSymbol = dataMainPresale.map(
    (item: any) => {
      return item?.purchaseToken;
    },
  );

  const softCapCurrencySymbolsPrivateSale =
    softCapCurrencyTokenArrayPrivateSaleSymbol.map(
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

  const softCapCurrencySymbolPrivateSale =
    softCapCurrencySymbolsPrivateSale.map((item: any) => {
      return item.data;
    });

  //🚀 Auction

  const tokenArrayAuctionSymbol = dataMainAuction.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  const softCapCurrencyTokenArrayAuctionSymbol = dataMainAuction.map(
    (item: any) => {
      return item?.purchaseToken;
    },
  );

  const softCapCurrencySymbolsAuction =
    softCapCurrencyTokenArrayAuctionSymbol.map(
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

  const softCapCurrencySymbolAuction = softCapCurrencySymbolsAuction.map(
    (item: any) => {
      return item.data;
    },
  );

  //🚀 Fair Launch
  const tokenArrayFairSymbol = dataMainFair.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  const softCapCurrencyTokenArrayFairSymbol = dataMainFair.map((item: any) => {
    return item?.purchaseToken;
  });

  const softCapCurrencySymbolsFair = softCapCurrencyTokenArrayFairSymbol.map(
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

  const softCapCurrencySymbolFair = softCapCurrencySymbolsFair.map(
    (item: any) => {
      return item.data;
    },
  );

  //🚀 Subscription
  const tokenArraySubSymbol = dataMainSubscription.map((item: any) => {
    return item.token;
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
    return item.data;
  });

  const softCapCurrencyTokenArraySubSymbol = dataMainSubscription.map(
    (item: any) => {
      return item?.purchaseToken;
    },
  );

  const softCapCurrencySymbolsSub = softCapCurrencyTokenArraySubSymbol.map(
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

  const softCapCurrencySymbolSub = softCapCurrencySymbolsSub.map(
    (item: any) => {
      return item.data;
    },
  );

  //✅ Step8: Total Supply
  const totalSupplies = tokenArrayPrivateSale.map((token: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: totalSupply } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "totalSupply",
    });
    // return an object with the data property
    return { data: totalSupply };
  });

  const totalSupplyString = JSON.stringify(totalSupplies, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  const totalSupply = JSON.parse(totalSupplyString).map((item: any) => {
    return item?.data;
  });

  const totalSuppliesAuction = totalSupply[dataIndex];

  // Additional Calculations
  //❗Finish Details Logic
  const title = namePrivateSale[dataIndex];
  const symbolToken = symbolPrivateSale[dataIndex];
  const tokenDecimals = decimalPrivateSale[dataIndex];

  const tokenName = namePrivateSale[dataIndex];
  const preSaleAddress = dataMainPresale[dataIndex]?.addressCreator;
  const tokenAddress = dataMainPresale[dataIndex]?.token;
  const tokenTotalSupply = totalSupply[dataIndex];
  const presaleRate = dataMainPresale[dataIndex]?.presaleRate;
  const liquidityPercentIndex =
    dataMainPresale[dataIndex]?.liquidityAdditionPercent;
  const softCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal =
      purchaseTokenDecimals && purchaseTokenDecimals[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.softCap / 10 ** TokenDecimal;
  });

  const hardCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal =
      purchaseTokenDecimals && purchaseTokenDecimals[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.hardCap / 10 ** TokenDecimal;
  });

  const tokenDecimalsPresale = purchaseTokenDecimals[dataIndex];
  let purchaseTokenDecimalPresale =
    tokenDecimalsPresale !== undefined ? tokenDecimalsPresale : 18;

  const burnOrRefund = dataMainPresale[dataIndex]?.burnOrRefund;
  const preSaleStartTime = dataMainPresale[dataIndex]?.startTime;
  const preSaleEndTime = dataMainPresale[dataIndex]?.endTime;
  const liquidityAdditionPercent =
    dataMainPresale[dataIndex]?.liquidityAdditionPercent;
  const liquidityUnlockTime = dataMainPresale[dataIndex]?.liquidityUnlockTime;
  const listingRate = dataMainPresale[dataIndex]?.listingRate;
  const imgHref = web2DataPresale[dataIndex]?.logoUrl;
  const AffiliateLink = url;
  //❗Chart Logic
  const labels = ["Presale", "Liquidity", "Unlocked"];
  const Presale =
    ((presaleRate * hardCapPresale[dataIndex]) /
      (tokenTotalSupply / 10 ** tokenDecimals)) *
    100;

  const Liquidity =
    ((liquidityAdditionPercent * (presaleRate * hardCapPresale[dataIndex])) /
      100 /
      (tokenTotalSupply / 10 ** tokenDecimals)) *
    100;

  const data = [Presale, Liquidity, 100 - Presale - Liquidity];
  const darkTheme = true;

  //❗Card 2 Logic
  const affiliateValues = dataMainPresale[dataIndex]?.affiliateRate;
  const purchaseTokenAddress = dataMainPresale[dataIndex]?.purchaseToken;
  const card2Symbol = symbolSub[dataIndex];
  const EndTime = dataMainPresale[dataIndex]?.endTime;
  const Index = dataIndex;
  const amountDecimal = decimalSub[dataIndex];
  const queryParams = new URLSearchParams(url);
  let AffiliateAddress;
  if (queryParams.has("refId")) {
    const refId = queryParams.get("refId");
    if (refId && /^0x[a-fA-F0-9]{40}$/.test(refId)) {
      AffiliateAddress = refId;
    } else {
      AffiliateAddress = "0x0000000000000000000000000000000000000000";
    }
  } else {
    AffiliateAddress = "0x0000000000000000000000000000000000000000";
  }
  const MoneyRaised = dataMainPresale[dataIndex]?.moneyRaised;

  const hardCapCurrency = hardCapPresale[dataIndex];

  //❗Button Logic
  const createTokenAddress = dataMainPresale[dataIndex]?.token;
  const userWalletAddress = address;
  const argsValue = dataIndex;
  const endTime = dataMainPresale[dataIndex]?.endTime;
  const moneyRaised = dataMainPresale[dataIndex]?.moneyRaised;
  const softCapCurrency = softCapPresale[dataIndex];
  const whitelistedEnabled = dataMainPresale[dataIndex]?.whitelistedEnabled;
  //❗SidePanel Logic
  const startDate = preSaleStartTime;
  const endDate = preSaleEndTime;
  const maximumBuy =
    dataMainPresale[dataIndex]?.maxBuy /
    10 ** purchaseTokenDecimalsModify[dataIndex];
  const minimumBuy =
    dataMainPresale[dataIndex]?.minBuy /
    10 ** purchaseTokenDecimalsModify[dataIndex];
  const moneyRaisedSidePanel = dataMainPresale[dataIndex]?.moneyRaised;
  const hardCapCurrencySidePanel = hardCapPresale[dataIndex];
  // Currency Send for all
  //If purchaseToken address is not zero address then currency is purchaseToken's symbol else currency is ETH
  //🚀 Presale
  const currencyPresale = dataMainPresale.map((item: any, index: number) => {
    if (item?.token !== "0x0000000000000000000000000000000000000000") {
      return symbolPrivateSale[index];
    } else {
      return "ETH";
    }
  });

  //For only softCapCurrency
  const softCapHardCapCurrencyPresale = dataMainPresale.map(
    (item: any, index: number) => {
      if (
        item?.purchaseToken !== "0x0000000000000000000000000000000000000000"
      ) {
        return softCapCurrencySymbolPrivateSale[index];
      } else {
        return "ETH";
      }
    },
  );

  //🚀 Auction
  const currencyAuction = dataMainAuction.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolAuction[index];
    } else {
      return "ETH";
    }
  });

  //🚀 Fair Launch
  const currencyFair = dataMainFair.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolFair[index];
    } else {
      return "ETH";
    }
  });

  //🚀 Subscription
  const currencySub = dataMainSubscription.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolSub[index];
    } else {
      return "ETH";
    }
  });

  //Id FOR DATA of Web2
  const idWeb3Presale = dataIndex + 1;
  const matchingIndex = idWeb2Presale.indexOf(idWeb3Presale);

  return (
    <DetailsSize>
      <div className="lg:flex flex-col ">
        <div className="flex-col ">
          <FinishDetails
            softCapCurrency={softCapHardCapCurrencyPresale[dataIndex] || 0}
            hardCapCurrency={softCapHardCapCurrencyPresale[dataIndex] || 0}
            hardCapTokenForPresale={dataMainPresale[dataIndex]?.hardCap || 0}
            title={title || "PinkSale"}
            tokenName={tokenName || "PinkSale"}
            symbolToken={symbolToken || "PinkSale"}
            tokenDecimals={tokenDecimals || 18}
            tokenAddress={
              tokenAddress || "0x0000000000000000000000000000000000000000"
            }
            totalSupply={tokenTotalSupply || 0}
            presaleRate={presaleRate || 0}
            softCap={softCapPresale[dataIndex] || 0}
            hardCap={hardCapPresale[dataIndex] || 0}
            burnOrRefund={burnOrRefund || false}
            preSaleStartTime={preSaleStartTime || 0}
            preSaleEndTime={preSaleEndTime || 0}
            liquidityAdditionPercent={liquidityAdditionPercent || 0}
            liquidityUnlockTime={liquidityUnlockTime || 0}
            listingRate={listingRate || 0}
            dataIndex={dataIndex || 0}
            imgHref={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.logoUrl
                : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
            }
            description={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.description
                : "www.google.com"
            }
            facebook={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.facebook
                : "www.facebook.com"
            }
            twitter={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.twitter
                : "www.twitter.com"
            }
            github={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.github
                : "www.github.com"
            }
            website={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.website
                : "www.google.com"
            }
            instagram={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.instagram
                : "www.instagram.com"
            }
            discord={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.discord
                : "www.discord.com"
            }
            reddit={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.reddit
                : "www.reddit.com"
            }
            youtube={
              matchingIndex !== -1
                ? web2DataPresale[matchingIndex]?.youtube
                : "www.youtube.com"
            }
            currency={currencyPresale[dataIndex] || "ETH"}
            purchaseTokenDecimal={purchaseTokenDecimalPresale || 18}
          />

          <AffiliateProgram
            tokenAddress={AffiliateLink}
            affiliateLink={address}
          />

          <TokenMetrics data={data} labels={labels} darkTheme={darkTheme} />

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
            purchaseTokenAddress={purchaseTokenAddress}
            symbolToken={card2Symbol}
            EndTime={EndTime}
            index={Index}
            amountDecimal={amountDecimal}
            address={AffiliateAddress}
            dataIndex={dataIndex}
            Affiliate={affiliateValues}
            moneyRaised={MoneyRaised}
            hardCapCurrency={hardCapCurrency}
            currency={softCapHardCapCurrencyPresale[dataIndex]}
          />
        </div>
        <Button
          createTokenAddress={createTokenAddress}
          userWalletAddress={userWalletAddress}
          argsValue={argsValue}
          endTime={endTime}
          moneyRaised={moneyRaised}
          softCapCurrency={softCapCurrency}
          whitelistedEnabled={whitelistedEnabled}
        />
        <SidePanel
          preSaleStartTime={startDate}
          preSaleEndTime={endDate}
          maximumBuy={maximumBuy}
          minimumBuy={minimumBuy}
          moneyRaised={moneyRaisedSidePanel}
          hardCapCurrency={hardCapCurrencySidePanel}
          currency={softCapHardCapCurrencyPresale[dataIndex]}
        />
      </div>
    </DetailsSize>
  );
};

export default dynamic(() => Promise.resolve(SubComponent), { ssr: false });
