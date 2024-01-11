import React, { useEffect, useState } from "react";
import { AiOutlineFire, AiOutlineRocket } from "react-icons/ai";
import All from "@/pages/airdrop/Multichain/Arbitrum/list/AllAirdrops";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { useAccount, useContractRead } from "wagmi";
import { enqueueSnackbar } from "notistack";
import {
  airdropAbi,
  airdropAddress,
  ERC20Abi,
} from "@/constants/Arbitrum/createConstants";
import dynamic from "next/dynamic";
import CreatedByYou from "@/pages/airdrop/Multichain/Arbitrum/list/CreatedByYou";
import MyAirdrops from "./MyAirdrops";
import axios from "@/constants/axio";
import BgCards from "@/components/TailwindWrapper/Cards/bgCards";

import AirDropTab from "@/components/Tabs/SubComponent/AirDropTabs";
import AirDrop from "@/components/Cards/Arbitrum/AirDrop/AirDrop";

interface SubBoxProps {
  title: string;
  number: number;
}
interface TabData {
  name: string;
  icon: React.ElementType;
  content: React.ReactNode;
}

export function SubBox({ title, number }: SubBoxProps) {
  return (
    <div className="flex flex-col items-center p-3">
      <div className="text-black dark:text-gray-300 text-lg">{title}</div>
      <div className="text-black dark:text-white text-3xl font-bold">
        {number}
      </div>
    </div>
  );
}

const Index = () => {
  const { address, isConnected } = useAccount();
  const testingAddress = "0x76ac0a51b9fE44f560d4419a8C4D4022Dc29AeAA";
  const [airdrop, setAirdrop] = useState<any>([]);

  const fetchWeb2DataPrivSale = async () => {
    try {
      const response = await axios.get("/airDrop-fetch-data/Arbitrum");
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
  const [airDropLength, setAirDropLength] = useState<any>(
    returnLength?.toString(),
  );
  useEffect(() => {
    setAirDropLength(returnLength?.toString());
  }, []);

  const dataLength: any = airDropLength;
  const number = parseInt(dataLength);

  //✅ Step1: Data from the contract

  //Created by you

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: getUserAirdops } = useContractRead({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "getUserAirdops",
    args: [address],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });

  // My Airdrops

  const { data: getUserInvested } = useContractRead({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "getUserInvested",
    args: [address],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });

  //All Airdrops

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
  const getAirdropInvestorsArrayss = Array.from(
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

  const [getAirdropInvestorsArray, setGetAirdropInvestorsArray] = useState<any>(
    getAirdropInvestorsArrayss,
  );

  useEffect(() => {
    setGetAirdropInvestorsArray(getAirdropInvestorsArrayss);
  }, []);

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

  const getAirdropInvestorsArrays = JSON.parse(getAirdropInvestorsString);

  // Create an array to store the number of addresses in each sub-array
  const addressCounts = getAirdropInvestorsArrays.map((subArray: any) =>
    subArray && subArray[0] ? subArray[0].length : 0 || 0,
  );

  const airdropsString = JSON.stringify(airdropsArray, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  const getUserAirdopsString = JSON.stringify(getUserAirdops, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });

  const getUserInvestedAmountString = JSON.stringify(
    getUserInvested,
    (key, value) => {
      if (typeof value === "bigint") {
        return value.toString();
      }
      return value;
    },
  );

  //✅ Step3: Check if the data is available
  if (
    !getTotalInvestorsString ||
    !getAirdropInvestorsString ||
    !airdropsString ||
    !getUserAirdopsString ||
    !getUserInvestedAmountString
  ) {
    return (
      <BgCards>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:px-12 lg:py-4 justify-items-center">
          <>
            <AirDrop
              currency={"Arbitrum"}
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
        </div>
      </BgCards>
    );
  }

  //✅ Step4: Parse the data to JSON format
  const getTotalInvestorsData = JSON.parse(getTotalInvestorsString);
  const getAirdropInvestorsData = JSON.parse(getAirdropInvestorsString);
  const airdropsData = JSON.parse(airdropsString);
  const getUserAirdopsData = JSON.parse(getUserAirdopsString);
  const getUserInvestedAmountData = JSON.parse(getUserInvestedAmountString);

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

  //3. AirDrop

  if (!web2DataAirDrop) {
    return (
      <BgCards>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:px-12 lg:py-4 justify-items-center">
          <>
            <AirDrop
              currency={"Arbitrum"}
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
        </div>
      </BgCards>
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
  //Top Box Data
  const subBoxData = [
    { title: "Total Airdrops", number: number },
    { title: "PARTICIPANTS IN All-TIME", number: TotalInvestorsData },
  ];

  //Card Data

  const totalTokens = airdropData.map((item: any, index: number) => {
    return item.totalAllocated / 10 ** decimals[index];
  });

  const totalTokensNumber = totalTokens.map((item: any) => {
    return item.toString();
  });

  //Length of the address == Length of the participants
  const length = airdropData.map((item: any) => {
    return AirdropInvestorsData.length;
  });

  //🚀 AirDrop Data
  interface AirDropProps {
    id: number[];
    imgHref: string[];
    title: string[];
    token: string[];
    totalTokens: number[];
    participants: number[];
    starTime: number[];
    selectedIndices: number[];
    selectedIndices2: number[];
    idWeb2privsales: number[];
    idWeb3Presale: number[];
    web2Data: any;
    airdropDatas: any;
  }
  const createAirDropData = (
    data: Partial<AirDropProps> = {},
  ): AirDropProps => {
    const {
      id = web2DataAirDrop.map((item: any) => item?.id),
      imgHref = web2DataAirDrop.map((item: any) => item?.logoUrl),
      title = web2DataAirDrop.map((item: any) => item?.airdropTitle),
      token = name.map((item: string) => item),
      totalTokens = totalTokensNumber,
      participants = addressCounts,
      starTime = airdropData.map((item: any) => item.startTime),
      selectedIndices = getUserAirdopsData,
      selectedIndices2 = getUserInvestedAmountData,
      idWeb2privsales = idWeb2airDrop,
      idWeb3Presale = idWeb2airDrop,
      web2Data = web2DataAirDrop,
      airdropDatas = airdropData,
    } = data;

    return {
      id,
      imgHref,
      title,
      token,
      totalTokens,
      participants,
      starTime,
      selectedIndices,
      selectedIndices2,
      idWeb2privsales,
      idWeb3Presale,
      web2Data,
      airdropDatas,
    };
  };

  const tabData = [
    {
      name: "All launchpads",
      icon: AiOutlineRocket,
      content: <All {...createAirDropData()} />,
    },
    {
      name: "My Airdrop",
      icon: AiOutlineFire,
      content: <CreatedByYou {...createAirDropData()} />,
    },
    {
      name: "Created by you",
      icon: LiaHandsHelpingSolid,
      content: <MyAirdrops {...createAirDropData()} />,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <BgCards>
        <div className="lg:mx-52 flex justify-between">
          {subBoxData.map((data, index) => (
            <SubBox key={index} title={data.title} number={data.number} />
          ))}
        </div>
      </BgCards>
      <AirDropTab
        tabs={tabData.map((data) => data.name)}
        icons={tabData.map((data) => data.icon)}
      >
        {tabData.map((data) => data.content)}
      </AirDropTab>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
