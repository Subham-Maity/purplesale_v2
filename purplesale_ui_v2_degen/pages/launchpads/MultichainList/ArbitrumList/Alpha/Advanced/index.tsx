import React, { useContext, useEffect, useState } from "react";
import { ConfigProvider, Table, theme } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import {
  createAbiAlpha,
  createAddressAlpha,
  dutchAuctionAbiAlpha,
  dutchAuctionAddressAlpha,
  ERC20Abi,
  fairLaunchAbiAlpha,
  fairLaunchAddressAlpha,
  subAbiAlpha,
  subAddressAlpha,
} from "@/constants/Arbitrum/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import { FaCheckCircle, FaTimesCircle, FaTwitter } from "react-icons/fa";
import { useTheme } from "next-themes";
import FormContext from "@/contexts/create/FormContext";
import { IoGlobeOutline } from "react-icons/io5";
import { LiaTelegramPlane } from "react-icons/lia";
import { useRouter } from "next/router";
import axios from "@/constants/axio";
import BgAdvanceLaunchPadList from "@/components/TailwindWrapper/LaunchPadListAdvance/bgBox";
import Image from "next/image";
import Link from "next/link";
import { BiLogoDiscordAlt } from "react-icons/bi";
import {
  AiFillYoutube,
  AiOutlineFacebook,
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineReddit,
} from "react-icons/ai";
import BgCards from "@/components/TailwindWrapper/Cards/bgCards";
import CardsWrapper from "@/components/TailwindWrapper/Cards/wrapperCards";

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
          className="dark:bg-[#b8a4ff] bg-[#b8a4ff] p-0.5 rounded text-center"
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
  // @ts-ignore
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filterSearch: true,

      width: 130,
      // filters: [
      //   {
      //     text: "Mumbai USD Coin",
      //     value: "Mumbai USD Coin",
      //   },
      //   {
      //     text: "metageeks",
      //     value: "metageeks",
      //   },
      //   {
      //     text: "ChainLink Token",
      //     value: "ChainLink Token",
      //   },
      //   {
      //     text: "BSC",
      //     value: "BSC",
      //   },
      //   {
      //     text: "ETH",
      //     value: "ETH",
      //   },
      //   {
      //     text: "Matic",
      //     value: "Matic",
      //   },
      //   {
      //     text: "AVAX",
      //     value: "AVAX",
      //   },
      //   {
      //     text: "Cronos",
      //     value: "Cronos",
      //   },
      //   {
      //     text: "FTM",
      //     value: "FTM",
      //   },
      //   {
      //     text: "wDOGE",
      //     value: "wDOGE",
      //   },
      //   {
      //     text: "Alvey",
      //     value: "Alvey",
      //   },
      //   {
      //     text: "Arbitrum",
      //     value: "Arbitrum",
      //   },
      //   {
      //     text: "PulseChain",
      //     value: "PulseChain",
      //   },
      //   {
      //     text: "Bitrock",
      //     value: "Bitrock",
      //   },
      //   {
      //     text: "Shibarium",
      //     value: "Shibarium",
      //   },
      // ],

      //@ts-ignore
      // onFilter: (value: string, record) => record.name === value,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "HC",
      dataIndex: "hc",
      filterSearch: true,
      fixed: "left",
      filters: [
        {
          text: "Presale",
          value: "Presale",
        },
        {
          text: "Fair Launch",
          value: "Fair Launch",
        },
        {
          text: "Auction",
          value: "Auction",
        },
        {
          text: "Subscriptions",
          value: "Subscription",
        },
      ],
      //@ts-ignore
      onFilter: (value, record) => record.category === value,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.hc.length - b.hc.length,
    },
    {
      title: "Coin",
      dataIndex: "coin",
      fixed: "right",
      width: 130,
      // filters: [
      //   {
      //     text: "BNB",
      //     value: "bnb",
      //   },
      //   {
      //     text: "BUSD",
      //     value: "busd",
      //   },
      //   {
      //     text: "USDT",
      //     value: "usdt",
      //   },
      //   {
      //     text: "USDC",
      //     value: "usdc",
      //   },
      //   {
      //     text: "ETH",
      //     value: "eth",
      //   },
      //   {
      //     text: "ETH",
      //     value: "matic",
      //   },
      //   {
      //     text: "AVAX",
      //     value: "avax",
      //   },
      //   {
      //     text: "CRO",
      //     value: "cro",
      //   },
      //   {
      //     text: "FTM",
      //     value: "ftm",
      //   },
      // ],
      // //@ts-ignore
      // onFilter: (value: string, record) => record.coin.indexOf(value) === 0,
    },
    {
      title: "KYC/Audit",
      dataIndex: "kyc",
      width: 130,
      responsive: ["sm"],
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
      title: "Links",
      dataIndex: "links",
      width: 250,
      responsive: ["sm"],
      //@ts-ignore
      render: (links) => {
        return (
          <div>
            <div className="flex gap-3 mb-4">
              {links?.website ? (
                <Link href={links?.website}>
                  <button>
                    <IoGlobeOutline />
                  </button>
                </Link>
              ) : (
                <></>
              )}
              {links?.twitter ? (
                <Link href={links?.twitter}>
                  <button>
                    <FaTwitter />
                  </button>
                </Link>
              ) : (
                <></>
              )}
              {links?.facebook ? (
                <Link href={links?.facebook}>
                  <button>
                    <AiOutlineFacebook />
                  </button>
                </Link>
              ) : (
                <></>
              )}
              {links?.github ? (
                <Link href={links?.github}>
                  <button>
                    <AiOutlineGithub />
                  </button>
                </Link>
              ) : (
                <></>
              )}

              {links?.instagram ? (
                <Link href={links?.instagram}>
                  <button>
                    <AiOutlineInstagram />
                  </button>
                </Link>
              ) : (
                <></>
              )}

              {links?.discord ? (
                <Link href={links?.discord}>
                  <button>
                    <BiLogoDiscordAlt />
                  </button>
                </Link>
              ) : (
                <></>
              )}

              {links?.reddit ? (
                <Link href={links?.reddit}>
                  <button>
                    <AiOutlineReddit />
                  </button>
                </Link>
              ) : (
                <></>
              )}

              {links?.youtube ? (
                <Link href={links?.youtube}>
                  <button>
                    <AiFillYoutube />
                  </button>
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Countdown",
      dataIndex: "countDown",
      responsive: ["sm"],
      width: 130,
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
            className="finishButton"
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
  const { address, isConnected } = useAccount();
  const [poolType, setPoolType] = useState("all");
  //Web2 Presale
  const [presale, setPresale] = useState<any>([]);
  //Web2 Fair Launch
  const [fairLaunch, setFairLaunch] = useState<any>([]);

  //Web2 Auction
  const [auction, setAuction] = useState<any>([]);
  //Web2 Subscription
  const [subscription, setSubscription] = useState<any>([]);
  const [reloadFlag, setReloadFlag] = useState(false);

  useEffect(() => {
    let reloadTimeout: string | number | NodeJS.Timeout | undefined;

    if (isConnected && !reloadFlag) {
      setReloadFlag(true);
      reloadTimeout = setTimeout(() => {
        window.location.reload();
      }, 1000);
    }

    return () => {
      if (reloadTimeout) {
        clearTimeout(reloadTimeout);
      }
    };
  }, [isConnected, address, reloadFlag]);

  const fetchWeb2DataPresale = async () => {
    try {
      const response = await axios.get("/Alpha/presale-fetch-data/Arbitrum");
      setPresale(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataFairLaunch = async () => {
    try {
      const response = await axios.get("/Alpha/fairLaunch-fetch-data/Arbitrum");
      setFairLaunch(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataAuction = async () => {
    try {
      const response = await axios.get(
        "/Alpha/dutchAuction-fetch-data/Arbitrum",
      );
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataSubscription = async () => {
    try {
      const response = await axios.get(
        "/Alpha/Subscription-fetch-data/Arbitrum",
      );
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
    address: createAddressAlpha,
    abi: createAbiAlpha,
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
    address: fairLaunchAddressAlpha,
    abi: fairLaunchAbiAlpha,
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
    address: dutchAuctionAddressAlpha,
    abi: dutchAuctionAbiAlpha,
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
    address: subAddressAlpha,
    abi: subAbiAlpha,
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
      address: createAddressAlpha,
      abi: createAbiAlpha,
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
      address: fairLaunchAddressAlpha,
      abi: fairLaunchAbiAlpha,
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
        address: dutchAuctionAddressAlpha,
        abi: dutchAuctionAbiAlpha,
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
      address: subAddressAlpha,
      abi: subAbiAlpha,
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
      <BgCards>
        <CardsWrapper>
          <></>
        </CardsWrapper>
      </BgCards>
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
      <BgCards>
        <CardsWrapper>
          <></>
        </CardsWrapper>
      </BgCards>
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
      <BgCards>
        <CardsWrapper>
          <></>
        </CardsWrapper>
      </BgCards>
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
      <BgCards>
        <CardsWrapper>
          <></>
        </CardsWrapper>
      </BgCards>
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
      <BgCards>
        <BgCards>
          <></>
        </BgCards>
      </BgCards>
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

  //✅ Step9: Additional Calculations

  //❗❗❗ Subscription

  let purchaseTokenDecimalSub = decimalSub !== undefined ? decimalsSub : 18;

  const hardCapSub = dataMainSubscription.map((item: any, index: number) => {
    const currentDecimal = decimalSub && decimalSub[index];
    const TokenDecimal = currentDecimal || 18;
    return ((1 / item.subRate) * item?.hardCap) / 10 ** TokenDecimal;
  });

  const purchaseTokenAddressSub = dataMainSubscription.map(
    (item: any, index: number) => item.purchaseToken,
  );

  const currencySub = dataMainSubscription.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolSub[index];
    } else {
      return "ETH";
    }
  });

  const SubsCoin =
    purchaseTokenAddressSub == "0x0000000000000000000000000000000000000000"
      ? "ETH"
      : nameSub;

  const SubEndIn = dataMainSubscription.map((item: any, index: number) => {
    return item.endTime;
  });
  const viewOfSub = dataMainSubscription.map((item: any, index: number) => {
    const data = "/details/subscription/" + index;
    return data;
  });

  //❗❗❗ presale
  let purchaseTokenDecimal =
    decimalPrivateSale !== undefined ? decimalPrivateSale : 18;

  const hardCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal = decimalPrivateSale && decimalPrivateSale[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.hardCap / 10 ** TokenDecimal;
  });

  const currencyPresale = dataMainPresale.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolPrivateSale[index];
    } else {
      return "ETH";
    }
  });
  const purchaseTokenAddressPresale = dataMainPresale.map(
    (item: any, index: number) => item.purchaseToken,
  );
  const presaleCoin =
    purchaseTokenAddressPresale == "0x0000000000000000000000000000000000000000"
      ? "ETH"
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
      ? "ETH"
      : nameFair;

  const currencyFair = dataMainFair.map((item: any, index: number) => {
    return "";
  });

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
    return "Auction";
  });

  const main = JSON.stringify(purchaseTokenDecimalAuction);

  const maxBuyAuction = dataMainAuction.map((item: any, index: number) => {
    return item.maxBuy / 10 ** purchaseTokenDecimalAuction;
  });

  const purchaseTokenAddressAuction = dataMainAuction.map(
    (item: any, index: number) => item.purchaseToken,
  );

  const currencyAuction = dataMainAuction.map((item: any, index: number) => {
    return "";
  });

  const AuctionCoin =
    purchaseTokenAddressAuction == "0x0000000000000000000000000000000000000000"
      ? "ETH"
      : nameAuction;

  const AuctionEndIn = dataMainAuction.map((item: any, index: number) => {
    return item.endTime;
  });
  const viewOfAuction = dataMainAuction.map((item: any, index: number) => {
    const data = "/details/auction/" + index;
  });

  //🚀 Presale

  const LinksPreSaleWeb = web2DataPresale.map((item: any, index: number) => {
    return item.websiteUrl;
  });
  const LinksPreSaleFacebook = web2DataPresale.map(
    (item: any, index: number) => {
      return item.facebook;
    },
  );

  const LinksPreSaleTwitter = web2DataPresale.map(
    (item: any, index: number) => {
      return item.twitter;
    },
  );

  const LinksPreSaleGithub = web2DataPresale.map((item: any, index: number) => {
    return item.github;
  });

  const LinksPreSaleInstagram = web2DataPresale.map(
    (item: any, index: number) => {
      return item.instagram;
    },
  );

  const LinksPreSaleDiscord = web2DataPresale.map(
    (item: any, index: number) => {
      return item.discord;
    },
  );

  const LinksPreSaleReddit = web2DataPresale.map((item: any, index: number) => {
    return item.reddit;
  });

  const LinksPreSaleYoutube = web2DataPresale.map(
    (item: any, index: number) => {
      return item.youtube;
    },
  );

  const LinksPreSaleDescription = web2DataPresale.map(
    (item: any, index: number) => {
      return item.description;
    },
  );

  //🚀 Auction

  const LinksAuctionWeb = web2DataAuction.map((item: any, index: number) => {
    return item.websiteUrl;
  });

  const LinksAuctionFacebook = web2DataAuction.map(
    (item: any, index: number) => {
      return item.facebook;
    },
  );

  const LinksAuctionTwitter = web2DataAuction.map(
    (item: any, index: number) => {
      return item.twitter;
    },
  );

  const LinksAuctionGithub = web2DataAuction.map((item: any, index: number) => {
    return item.github;
  });

  const LinksAuctionInstagram = web2DataAuction.map(
    (item: any, index: number) => {
      return item.instagram;
    },
  );

  const LinksAuctionDiscord = web2DataAuction.map(
    (item: any, index: number) => {
      return item.discord;
    },
  );

  const LinksAuctionReddit = web2DataAuction.map((item: any, index: number) => {
    return item.reddit;
  });

  const LinksAuctionYoutube = web2DataAuction.map(
    (item: any, index: number) => {
      return item.youtube;
    },
  );

  const LinksAuctionDescription = web2DataAuction.map(
    (item: any, index: number) => {
      return item.description;
    },
  );

  //🚀 Fair Launch

  const LinksFairWeb = web2DataFair.map((item: any, index: number) => {
    return item.websiteUrl;
  });

  const LinksFairFacebook = web2DataFair.map((item: any, index: number) => {
    return item.facebook;
  });

  const LinksFairTwitter = web2DataFair.map((item: any, index: number) => {
    return item.twitter;
  });

  const LinksFairGithub = web2DataFair.map((item: any, index: number) => {
    return item.github;
  });

  const LinksFairInstagram = web2DataFair.map((item: any, index: number) => {
    return item.instagram;
  });

  const LinksFairDiscord = web2DataFair.map((item: any, index: number) => {
    return item.discord;
  });

  const LinksFairReddit = web2DataFair.map((item: any, index: number) => {
    return item.reddit;
  });

  const LinksFairYoutube = web2DataFair.map((item: any, index: number) => {
    return item.youtube;
  });

  const LinksFairDescription = web2DataFair.map((item: any, index: number) => {
    return item.description;
  });

  //🚀 Subscription

  const LinksSubWeb = web2DataSubscription.map((item: any, index: number) => {
    return item.websiteUrl;
  });

  const LinksSubFacebook = web2DataSubscription.map(
    (item: any, index: number) => {
      return item.facebook;
    },
  );

  const LinksSubTwitter = web2DataSubscription.map(
    (item: any, index: number) => {
      return item.twitter;
    },
  );

  const LinksSubGithub = web2DataSubscription.map(
    (item: any, index: number) => {
      return item.github;
    },
  );

  const LinksSubInstagram = web2DataSubscription.map(
    (item: any, index: number) => {
      return item.instagram;
    },
  );

  const LinksSubDiscord = web2DataSubscription.map(
    (item: any, index: number) => {
      return item.discord;
    },
  );

  const LinksSubReddit = web2DataSubscription.map(
    (item: any, index: number) => {
      return item.reddit;
    },
  );

  const LinksSubYoutube = web2DataSubscription.map(
    (item: any, index: number) => {
      return item.youtube;
    },
  );

  const LinksSubDescription = web2DataSubscription.map(
    (item: any, index: number) => {
      return item.description;
    },
  );

  //Total Array of Links

  const LinksWeb = [
    ...LinksPreSaleWeb,
    ...LinksAuctionWeb,
    ...LinksFairWeb,
    ...LinksSubWeb,
  ];

  const LinksFacebook = [
    ...LinksPreSaleFacebook,
    ...LinksAuctionFacebook,
    ...LinksFairFacebook,
    ...LinksSubFacebook,
  ];

  const LinksTwitter = [
    ...LinksPreSaleTwitter,
    ...LinksAuctionTwitter,
    ...LinksFairTwitter,
    ...LinksSubTwitter,
  ];

  const LinksGithub = [
    ...LinksPreSaleGithub,
    ...LinksAuctionGithub,
    ...LinksFairGithub,
    ...LinksSubGithub,
  ];

  const LinksInstagram = [
    ...LinksPreSaleInstagram,
    ...LinksAuctionInstagram,
    ...LinksFairInstagram,
    ...LinksSubInstagram,
  ];

  const LinksDiscord = [
    ...LinksPreSaleDiscord,
    ...LinksAuctionDiscord,
    ...LinksFairDiscord,
    ...LinksSubDiscord,
  ];

  const LinksReddit = [
    ...LinksPreSaleReddit,
    ...LinksAuctionReddit,
    ...LinksFairReddit,
    ...LinksSubReddit,
  ];

  const LinksYoutube = [
    ...LinksPreSaleYoutube,
    ...LinksAuctionYoutube,
    ...LinksFairYoutube,
    ...LinksSubYoutube,
  ];

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
  const categorySub = dataMainSubscription.map((item: any, index: number) => {
    return "Subscription";
  });

  const categoryPresale = dataMainPresale.map((item: any, index: number) => {
    return "Presale";
  });

  const categoryFair = dataMainFair.map((item: any, index: number) => {
    return "Fair Launch";
  });

  const categoryAuction = dataMainAuction.map((item: any, index: number) => {
    return "Auction";
  });

  const category = [
    ...categorySub,
    ...categoryPresale,
    ...categoryFair,
    ...categoryAuction,
  ];

  const currency = [
    ...currencySub,
    ...currencyPresale,
    ...currencyFair,
    ...currencyAuction,
  ];

  const data = allNames.map((item: any, index: number) =>
    //Subs
    ({
      name: allNames[index] || "N/A",
      hc: allHc[index] + " " + currency[index] || "N/A",
      coin: allCoin[index] || "N/A",
      status: "Ended",
      countDown: allEndIn[index] || "N/A",
      saleEndIn: allEndIn[index] || "N/A",
      category: category[index] || "N/A",
      links:
        {
          website: LinksWeb[index],
          twitter: LinksTwitter[index],
          facebook: LinksFacebook[index],
          github: LinksGithub[index],
          instagram: LinksInstagram[index],
          discord: LinksDiscord[index],
          reddit: LinksReddit[index],
          youtube: LinksYoutube[index],
        } || "N/A",
      operation: allViewData[index] || "N/A",
    }),
  );

  const isDarkMode = true;
  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <>
      <BgAdvanceLaunchPadList>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            token: {
              colorPrimary: "#464243",
              borderRadius: 2,
              colorBgContainer: "#2c2b2c",
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            size="large"
            scroll={{ x: 350 }}
          />
        </ConfigProvider>
      </BgAdvanceLaunchPadList>
    </>
  );
};

export default App;
