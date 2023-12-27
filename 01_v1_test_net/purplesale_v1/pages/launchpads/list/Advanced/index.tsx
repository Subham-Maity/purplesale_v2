import React, { useContext, useEffect, useState } from "react";
import { ConfigProvider, Table, theme } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useContractRead, useContractWrite } from "wagmi";
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
import { FaCheckCircle, FaTimesCircle, FaTwitter } from "react-icons/fa";
import { useTheme } from "next-themes";
import FormContext from "@/contexts/create/FormContext";
import { IoGlobeOutline } from "react-icons/io5";
import { LiaTelegramPlane } from "react-icons/lia";
import { useRouter } from "next/router";
import axios from "@/constants/axio";

interface DataType {
  key: React.Key;
  name: string;
  hc: string;
  // initialCap: string;
  coin: string;
  // kyc: string;
  status: string;
  links?: string;
  // tgOnline: string;
  countDown: any;
  saleEndIn: string;
  operation: string;
}

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log("params", pagination, filters, sorter, extra);
};
interface CountdownProps {
  startDate: number;
  endDate: number;
}
const SaleStatus = ({ startDate, endDate }: CountdownProps) => {
  const [saleState, setSaleState] = useState<string>("");

  const calculateSaleState = () => {
    const now = new Date().getTime();
    const startTime = startDate * 1000;
    const endTime = endDate * 1000;

    if (now < startTime) {
      // Sale has not started yet
      setSaleState("Upcoming");
    } else if (now >= startTime && now <= endTime) {
      // Sale is ongoing
      setSaleState("Live");
    } else {
      // Sale has ended
      setSaleState("Ended");
    }
  };

  useEffect(() => {
    calculateSaleState();
    const interval = setInterval(calculateSaleState, 1000); // Update every second

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  let textClass = "";

  // Determine the text color class based on the sale state
  switch (saleState) {
    case "Upcoming":
      break;
    case "Sale Live":
      break;
    case "Sale Ended":
      break;
    default:
  }

  return <span>{saleState}</span>;
};

const EndDate = ({ timestamp }: { timestamp: number }) => {
  const endDate = new Date(timestamp * 1000);
  const formattedEndDateTime = `${endDate.getFullYear()}.${(
    "0" +
    (endDate.getMonth() + 1)
  ).slice(-2)}.${("0" + endDate.getDate()).slice(-2)} ${(
    "0" + endDate.getHours()
  ).slice(-2)}:${("0" + endDate.getMinutes()).slice(-2)}`;

  return <div className="flex space-x-0.5">{formattedEndDateTime}</div>;
};

const CountdownTimer = ({ timestamp }: { timestamp: number }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const calculateTimeLeft = () => {
    const now = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    const timeDifference = timestamp - now;

    if (timeDifference > 0) {
      setTimeLeft(timeDifference);
    } else {
      setTimeLeft(0);
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [timestamp]);

  const formatTime = (time: number): string => {
    const days = Math.floor(time / 86400);
    const hours = Math.floor((time % 86400) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${days.toString().padStart(2, "0")} : ${hours
      .toString()
      .padStart(2, "0")} : ${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timeComponents = formatTime(timeLeft).split(" : ");

  return (
    <div className="flex space-x-0.5">
      {timeComponents.map((component, index) => (
        <p
          key={index}
          className="dark:bg-green-800 bg-green-500 p-0.5 rounded text-center"
        >
          <span className="text-lg font-bold">{component}</span>
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const { themes } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = useContext(FormContext);
  const router = useRouter();

  // @ts-ignore
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filterSearch: true,
      filters: [
        {
          text: "Mumbai USD Coin",
          value: "Mumbai USD Coin",
        },
        {
          text: "metageeks",
          value: "metageeks",
        },
        {
          text: "ChainLink Token",
          value: "ChainLink Token",
        },
        {
          text: "BSC",
          value: "BSC",
        },
        {
          text: "ETH",
          value: "ETH",
        },
        {
          text: "Matic",
          value: "Matic",
        },
        {
          text: "AVAX",
          value: "AVAX",
        },
        {
          text: "Cronos",
          value: "Cronos",
        },
        {
          text: "FTM",
          value: "FTM",
        },
        {
          text: "wDOGE",
          value: "wDOGE",
        },
        {
          text: "Alvey",
          value: "Alvey",
        },
        {
          text: "Arbitrum",
          value: "Arbitrum",
        },
        {
          text: "PulseChain",
          value: "PulseChain",
        },
        {
          text: "Bitrock",
          value: "Bitrock",
        },
        {
          text: "Shibarium",
          value: "Shibarium",
        },
      ],

      //@ts-ignore
      onFilter: (value: string, record) => record.name === value,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "HC",
      dataIndex: "hc",
      filterSearch: true,
      filters: [
        {
          text: "Presale",
          value: "presale",
        },
        {
          text: "Fair Launch",
          value: "Fair Launch",
        },
        {
          text: "Auction",
          value: "auction",
        },
        {
          text: "Subscriptions",
          value: "subscriptions",
        },
        {
          text: "Matic",
          value: "Matic",
        },
      ],
      //@ts-ignore
      onFilter: (value: string, record) => record.hc === value,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.hc.length - b.hc.length,
    },
    {
      title: "Coin",
      dataIndex: "coin",
      filters: [
        {
          text: "BNB",
          value: "bnb",
        },
        {
          text: "BUSD",
          value: "busd",
        },
        {
          text: "USDT",
          value: "usdt",
        },
        {
          text: "USDC",
          value: "usdc",
        },
        {
          text: "ETH",
          value: "eth",
        },
        {
          text: "MATIC",
          value: "matic",
        },
        {
          text: "AVAX",
          value: "avax",
        },
        {
          text: "CRO",
          value: "cro",
        },
        {
          text: "FTM",
          value: "ftm",
        },
      ],
      //@ts-ignore
      onFilter: (value: string, record) => record.coin.indexOf(value) === 0,
    },
    {
      title: "KYC/Audit",
      dataIndex: "kyc",
      filters: [
        {
          text: "KYC",
          value: "KYC",
        },
        {
          text: "Audit",
          value: "Audit",
        },
        {
          text: "Safu",
          value: "Safu",
        },
        {
          text: "Doxx",
          value: "Doxx",
        },
      ],
      //@ts-ignore
      onFilter: (value: string, record) => record.kyc.indexOf(value) === 0,
      render: () => {
        interface Props {
          total: number;
        }
        const renderIcons = (total: number) => {
          const icons = [];
          for (let i = 0; i < total; i++) {
            if (i < 2) {
              icons.push(
                <div key={i} className="text-green-500">
                  <FaCheckCircle className="h-4 w-4 ml-1" />
                </div>,
              );
            } else {
              icons.push(
                <div key={i} className="text-red-500">
                  <FaTimesCircle className="h-4 w-4 ml-1" />
                </div>,
              );
            }
          }
          return icons;
        };

        return (
          <div className="flex justify-center items-center">
            {renderIcons(4)}{" "}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      filters: [
        {
          text: "Upcoming",
          value: "Upcoming",
        },
        {
          text: "Live",
          value: "Live",
        },
        {
          text: "Fill",
          value: "Fill",
        },
      ],
      //@ts-ignore
      onFilter: (value: string, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.length - b.status.length,
      render: (status, percent) => {
        return (
          <div className="flex flex-col justify-center items-center">
            {" "}
            <p className="text-sm font-bold p-0.5">{status}</p>
            <div className="w-full bg-gray-300 rounded-full">
              <div
                className={`h-2 rounded-full bg-gradient-to-r from-green-400 to-lime-500`}
                style={{ width: `${0}%` }}
              >
                {" "}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Links",
      dataIndex: "links",
      render: (status, percent) => {
        return (
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div>
                <div className="flex gap-3 mb-4">
                  <button>
                    <IoGlobeOutline />
                  </button>
                  <button>
                    <FaTwitter />
                  </button>
                  <button>
                    <LiaTelegramPlane />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Countdown",
      dataIndex: "countDown",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.countDown - b.countDown,
      render: (EndTime) => <CountdownTimer timestamp={EndTime} />,
    },
    {
      title: "Sale end in",
      dataIndex: "saleEndIn",
      defaultSortOrder: "descend",

      render: (EndTime) => <EndDate timestamp={EndTime} />,
    },
    {
      title: "",
      dataIndex: "operation",
      defaultSortOrder: "descend",
      render: (view) => (
        <>
          <button
            className="bg-green-500 hover:bg-green-300 px-0.5 py-0.5 rounded-md dark:text-gray-200 text-neutral-700"
            onClick={() => {
              router.push(view);
            }}
          >
            View
          </button>
        </>
      ),
    },
  ];

  const [poolType, setPoolType] = useState("all");
  const handlePoolTypeChange = (newPoolType: any) => {
    setPoolType(newPoolType);
  };
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

  console.log(
    dataMainPresale.map((item: any) => item.listingRate),
    "dataMainPresale",
  );

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

  //✅ Step9: Additional Calculations

  //❗❗❗ Subscription

  let purchaseTokenDecimalSub = decimalSub !== undefined ? decimalsSub : 18;

  console.log(purchaseTokenDecimalSub + "purchaseTokenDecimalSub");

  const hardCapSub = dataMainSubscription.map((item: any, index: number) => {
    const currentDecimal = decimalSub && decimalSub[index];
    const TokenDecimal = currentDecimal || 18;
    return item.hardCap / 10 ** TokenDecimal;
  });

  const purchaseTokenAddressSub = dataMainSubscription.map(
    (item: any, index: number) => item.purchaseToken,
  );

  const SubsCoin =
    purchaseTokenAddressSub == "0x0000000000000000000000000000000000000000"
      ? "MATIC"
      : nameSub;

  const SubEndIn = dataMainSubscription.map((item: any, index: number) => {
    return item.endTime;
  });
  const viewOfSub = dataMainSubscription.map((item: any, index: number) => {
    const data = "/details/subscription" + index;
    return data;
  });

  //❗❗❗ presale
  let purchaseTokenDecimal =
    decimalPrivateSale !== undefined ? decimalPrivateSale : 18;

  const hardCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal = decimalPrivateSale && decimalPrivateSale[index];
    const TokenDecimal = currentDecimal || 18;
    return item.hardCap / 10 ** TokenDecimal;
  });

  const purchaseTokenAddressPresale = dataMainPresale.map(
    (item: any, index: number) => item.purchaseToken,
  );
  const presaleCoin =
    purchaseTokenAddressPresale == "0x0000000000000000000000000000000000000000"
      ? "MATIC"
      : namePrivateSale;

  const presaleEndIn = dataMainPresale.map((item: any, index: number) => {
    return item.endTime;
  });
  const viewOfPresale = dataMainPresale.map((item: any, index: number) => {
    const data = "/details/launchpad/" + index;
    return data;
  });
  //❗❗❗ Fair Launch

  const hardCapFair = dataMainFair.map((item: any, index: number) => {
    return "Fair Launch";
  });

  const purchaseTokenAddressFair = dataMainFair.map(
    (item: any, index: number) => item.purchaseToken,
  );
  const FairCoin =
    purchaseTokenAddressFair == "0x0000000000000000000000000000000000000000"
      ? "MATIC"
      : nameFair;

  const FairEndIn = dataMainFair.map((item: any, index: number) => {
    return item.endTime;
  });
  const viewOfFair = dataMainFair.map((item: any, index: number) => {
    const data = "/details/fairlaunch/" + index;
    return data;
  });

  //❗❗❗ Auction

  let purchaseTokenDecimalAuction =
    decimalAuction !== undefined ? decimalAuction : 18;
  const hardCapAuction = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal = decimalAuction && decimalAuction[index];
    const TokenDecimal = currentDecimal || 18;
    return item.hardCap / 10 ** TokenDecimal;
  });

  const main = JSON.stringify(purchaseTokenDecimalAuction);
  console.log(main + "hardCapAuction");

  const maxBuyAuction = dataMainAuction.map((item: any, index: number) => {
    return item.maxBuy / 10 ** purchaseTokenDecimalAuction;
  });

  const purchaseTokenAddressAuction = dataMainAuction.map(
    (item: any, index: number) => item.purchaseToken,
  );

  const AuctionCoin =
    purchaseTokenAddressAuction == "0x0000000000000000000000000000000000000000"
      ? "MATIC"
      : nameAuction;

  const AuctionEndIn = dataMainAuction.map((item: any, index: number) => {
    return item.endTime;
  });
  const viewOfAuction = dataMainAuction.map((item: any, index: number) => {
    const data = "/details/auction/" + index;
  });
  //✅ Step10: Merge the data into one array - Remember to add in the sequence you want to display the data

  const allNames: any = [
    ...nameSub,
    ...namePrivateSale,
    ...nameFair,
    ...nameAuction,
  ];
  const allHc: any = [
    ...hardCapSub,
    ...hardCapPresale,
    ...hardCapFair,
    ...hardCapAuction,
  ];
  const allCoin: any = [
    ...SubsCoin,
    ...presaleCoin,
    ...FairCoin,
    ...AuctionCoin,
  ];
  const allEndIn: any = [
    ...SubEndIn,
    ...presaleEndIn,
    ...FairEndIn,
    ...AuctionEndIn,
  ];

  const allViewData: any = [
    ...viewOfSub,
    ...viewOfPresale,
    ...viewOfFair,
    ...viewOfAuction,
  ];

  const data = allNames.map((item: any, index: number) => ({
    name: allNames[index],
    hc: allHc[index] + " Matic" || "0",
    coin: allCoin[index],
    status: "Ended",
    countDown: allEndIn[index],
    saleEndIn: allEndIn[index],
    links: "0",
    operation: allViewData[index],
  }));

  const isDarkMode = isDarkTheme;
  const { defaultAlgorithm, darkAlgorithm } = theme;
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-[370px] md:w-[368px] lg:w-[1060px] rounded-md dark:bg-[#242525] bg-stone-50 p-2 ">
          <ConfigProvider
            theme={{
              algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}
          >
            <Table
              columns={columns}
              dataSource={data}
              onChange={onChange}
              size="small"
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default App;
