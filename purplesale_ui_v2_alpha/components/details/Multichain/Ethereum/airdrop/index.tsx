import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAccount, useConnect, useContractRead } from "wagmi";
import { useRouter } from "next/router";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  airdropAbi,
  airdropAddress,
  ERC20Abi,
} from "@/constants/Ethereum/createConstants";
import { enqueueSnackbar } from "notistack";
import { InfinitySpin } from "react-loader-spinner";
import FinishDetails from "@/components/details/Multichain/Ethereum/airdrop/FinishDetails";
import Cards2 from "@/components/details/Multichain/Ethereum/airdrop/Cards2";
import BottomBox from "@/components/details/Multichain/Ethereum/airdrop/BottomBox";
import axios from "@/constants/axio";
import Button from "@/components/details/Multichain/Ethereum/airdrop/Button";
import DetailsSize from "@/components/TailwindWrapper/Details/Size";

const Airdrop = () => {
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
      setDataIndex(parseInt(id) - 1);
    }
  }, [id]);

  const [airdrop, setAirdrop] = useState<any>([]);

  const fetchWeb2DataPrivSale = async () => {
    try {
      const response = await axios.get("/airDrop-fetch-data/Ethereum");
      setAirdrop(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeb2DataPrivSale();
  }, []);

  const web2DataAirDrop = airdrop;
  const idWeb2airDrop = web2DataAirDrop.map((item: any) => {
    return item.id;
  });

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

  const dataLength: any = returnLength?.toString();
  const number = parseInt(dataLength);

  //✅ Step1: Data from the contract

  //getTotalInvestors from the participants
  const { data: getTotalInvestors } = useContractRead({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "getTotalInvestors",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });
  //getAirdropInvestors from the participants
  const getAirdropInvestorsArray = Array.from(
    { length: number },
    (_, index) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: getAirdropInvestors } = useContractRead({
        address: airdropAddress,
        abi: airdropAbi,
        functionName: "getAirdropInvestors",
        args: [index],
        onError(error: any) {
          console.log("Error", error);
          enqueueSnackbar(`Error creating presale ${error}`, {
            variant: "error",
          });
        },
      });
      return getAirdropInvestors;
    },
  );

  const airdropsArray = Array.from({ length: number }, (_, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: airdrops } = useContractRead({
      address: airdropAddress,
      abi: airdropAbi,
      functionName: "airdrops",
      args: [index],
      onError(error: any) {
        console.log("Error", error);
        enqueueSnackbar(`Error creating presale ${error}`, {
          variant: "error",
        });
      },
    });
    return airdrops;
  });
  const airdropsgetAllocationArray = Array.from(
    { length: number },
    (_, index) => {
      //Get Allocation from the participants
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: getAllocation } = useContractRead({
        address: airdropAddress,
        abi: airdropAbi,
        functionName: "getAllocation",
        args: [index, address],
        onError(error: any) {
          console.log("Error", error);
          enqueueSnackbar(`Error creating presale ${error}`, {
            variant: "error",
          });
        },
      });

      return getAllocation;
    },
  );

  const getAllocation = airdropsgetAllocationArray.map((item: any) => {
    return item;
  });
  const airdropsgetClaimed = Array.from({ length: number }, (_, index) => {
    //Get Claimed from the participants
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: getClaimed } = useContractRead({
      address: airdropAddress,
      abi: airdropAbi,
      functionName: "getClaimed",
      args: [dataIndex, address],
      onError(error: any) {
        console.log("Error", error);
        enqueueSnackbar(`Error creating presale ${error}`, {
          variant: "error",
        });
      },
    });
    return getClaimed;
  });
  const getClaimed = airdropsgetClaimed.map((item: any) => {
    return item;
  });

  //✅ Step2: Convert the data to JSON format
  const getTotalInvestorsString = JSON.stringify(
    getTotalInvestors,
    (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    },
  );

  const getAirdropInvestorsString = JSON.stringify(
    getAirdropInvestorsArray,
    (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    },
  );

  const airdropsString = JSON.stringify(airdropsArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  const getAllocationString = JSON.stringify(getAllocation, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  const getClaimedString = JSON.stringify(getClaimed, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  //✅ Step3: Check if the data is available
  if (
    !getTotalInvestorsString ||
    !getAirdropInvestorsString ||
    !airdropsString
  ) {
    return <div></div>;
  }

  //✅ Step4: Parse the data to JSON format
  const getTotalInvestorsData = JSON.parse(getTotalInvestorsString);
  const getAirdropInvestorsData = JSON.parse(getAirdropInvestorsString);
  const airdropsData = JSON.parse(airdropsString);
  const getAllocationData = JSON.parse(getAllocationString);
  const getClaimedData = JSON.parse(getClaimedString);

  //✅ Step5: Create the key for the data

  //1. Get Total Investors
  const TotalInvestorsData = getTotalInvestorsData;

  //2. Get Airdrop Investors

  const AirdropInvestorsWeb3Key = ["address", "amount"];
  const AirdropInvestorsData = getAirdropInvestorsData.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < AirdropInvestorsWeb3Key.length; i++) {
      if (item) {
        obj[AirdropInvestorsWeb3Key[i]] = item[i];
      } else {
        obj[AirdropInvestorsWeb3Key[i]] = null;
      }
    }
    return obj;
  });

  if (!web2DataAirDrop) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 mt-10">
          <p>Metamask is not connected</p>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }

  //Blockchain
  const airDropKey = [
    "token",
    "totalAllocated",
    "startTime",
    "isVesting",
    "firstReleasePercentage",
    "vestingPeriodInDays",
    "cycleReleasePercentage",
  ];

  const airdropData = airdropsData.map((item: any) => {
    let obj: any = {};
    for (let i: number = 0; i < airDropKey.length; i++) {
      if (item) {
        obj[airDropKey[i]] = item[i];
      } else {
        obj[airDropKey[i]] = null; // Handle the case where item is null
      }
    }
    return obj;
  });

  //Step 6: Decimals & Name & Symbol
  const tokenArray = airdropData.map((item: any) => {
    return item.token;
  });

  //Name
  const nameArray = tokenArray.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: name } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "name",
    });
    return { data: name };
  });

  const name = nameArray.map((item: any) => {
    return item.data;
  });

  //Symbol
  const symbolArray = tokenArray.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: symbol } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "symbol",
    });
    return { data: symbol };
  });

  const symbol = symbolArray.map((item: any) => {
    return item.data;
  });

  //Decimals
  const decimalsArray = tokenArray.map((token: string, index: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: decimals } = useContractRead({
      //@ts-ignore
      address: token,
      abi: ERC20Abi,
      functionName: "decimals",
    });
    return { data: decimals };
  });

  const decimals = decimalsArray.map((item: any) => {
    return item.data;
  });

  //✅ Step7: Additional Calculation

  //Card Data

  const totalTokens = airdropData.map((item: any, index: number) => {
    return item?.totalAllocated / 10 ** decimals[index];
  });

  const totalTokensNumber = totalTokens.map((item: any) => {
    return item.toString();
  });

  //Length of the address == Length of the participants
  const length = airdropData.map((item: any) => {
    return AirdropInvestorsData?.length;
  });

  const Amount = AirdropInvestorsData.map((item: any, index: any) => {
    const currentDecimal = decimals[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.amount;
  });

  const Address = AirdropInvestorsData.map((item: any, index: any) => {
    const currentDecimal = decimals[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.address;
  });

  const currencyAir = airdropData.map((item: any, index: number) => {
    if (item?.token !== "0x0000000000000000000000000000000000000000") {
      return symbol[index];
    } else {
      return "ETH";
    }
  });
  //Length of the a
  const lengthAirdrop = AirdropInvestorsData[dataIndex]?.amount.length;
  const idWeb3AirDrop = dataIndex + 1;
  const matchingIndex = idWeb2airDrop.indexOf(idWeb3AirDrop);
  return (
    <DetailsSize>
      <div className="lg:flex flex-col ">
        <div className="flex-col ">
          <FinishDetails
            tokenAddress={tokenArray[dataIndex]}
            name={name[dataIndex] || "Token 1"}
            symbol={symbol[dataIndex]}
            totalTokens={totalTokensNumber[dataIndex]}
            startTime={airdropData[dataIndex]?.startTime}
            title={web2DataAirDrop[matchingIndex]?.airdropTitle}
            imgHref={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.logoUrl
                : "https://photos.pinksale.finance/file/pinksale-logo-upload/1691108553098-4e38c715fb3f6ab7c9b0c3f49d7daf74.jpg"
            }
            description={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.description
                : "www.google.com"
            }
            facebook={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.facebook
                : "www.facebook.com"
            }
            twitter={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.twitter
                : "www.twitter.com"
            }
            github={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.github
                : "www.github.com"
            }
            website={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.website
                : "www.google.com"
            }
            instagram={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.instagram
                : "www.instagram.com"
            }
            discord={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.discord
                : "www.discord.com"
            }
            reddit={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.reddit
                : "www.reddit.com"
            }
            youtube={
              matchingIndex !== -1
                ? web2DataAirDrop[matchingIndex]?.youtube
                : "www.youtube.com"
            }
          />
        </div>
        <div className="flex-col ">
          <div className="mt-4 flex justify-left mb-4 items-center">
            <div className="mt-6 mb-6 mx-4 lg:mx-10  px-6 py-2 w-[370px] sm:w-[970px] md:w-[880px] lg:w-[560px] xl:w-[900px] 2xl:w-[740px] dark:bg-[#242525] dark:bg-gradient-to-tl dark:via-[#2a2c33] dark:from-[#2a2c33] dark:to-[#4b4646] bg-gradient-to-r h-fit drop-shadow-xl transition-shadow shadow-stone-700 shadow-md bg-stone-50 rounded-2xl ">
              <div className="flex justify-between">
                <p className="font-bold">Allocations</p>
              </div>
              {Address[dataIndex]?.map((allocation: any, index: any) => (
                <BottomBox
                  key={index}
                  allocations={allocation}
                  amount={Amount[dataIndex][index] / 10 ** decimals[dataIndex]}
                  symbol={symbol[dataIndex]}
                />
              ))}
              <Button argsValue={dataIndex} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4 items-center justify-center">
          <Cards2
            purchaseTokenAddress={"sss"}
            symbolToken={symbol[dataIndex]}
            EndTime={airdropData[dataIndex]?.startTime}
            index={dataIndex}
            amountDecimal={decimals[dataIndex]}
            address={address}
            Affiliate={355}
            moneyRaised={25}
            hardCapCurrency={25}
            allocation={
              getAllocationData[dataIndex] / 10 ** decimals[dataIndex] || 0
            }
            claimed={getClaimedData[dataIndex] / 10 ** decimals[dataIndex]}
            currency={currencyAir[dataIndex]}
          />
        </div>
      </div>
    </DetailsSize>
  );
};

export default dynamic(() => Promise.resolve(Airdrop), { ssr: false });
