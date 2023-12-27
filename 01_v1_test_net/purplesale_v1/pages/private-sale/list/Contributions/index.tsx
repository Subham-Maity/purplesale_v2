import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
import {
  airdropAbi,
  airdropAddress,
  ERC20Abi,
  privSaleAbi,
  privSaleAddress,
} from "@/constants/createConstants";
import { enqueueSnackbar } from "notistack";
import PrivateSaleCards from "@/components/Cards/PrivateSale/PrivateSaleCards";
import { InfinitySpin } from "react-loader-spinner";
import axios from "@/constants/axio";

const Advance = () => {
  const { address, isConnected } = useAccount();
  const testingAddress = "0x76ac0a51b9fE44f560d4419a8C4D4022Dc29AeAA";
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

  console.log(number + "number");

  //✅ Step1: Data from the contract

  // My Private Sale
  const { data: getUserPrivsales } = useContractRead({
    address: privSaleAddress,
    abi: privSaleAbi,
    functionName: "getUserPrivsales",
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

  console.log(dataPrivString + "privsalesArray");

  const dataPrivString2 = JSON.stringify(getUserPrivsales, (key, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
  //✅ Step3: Check if the data is available
  if (!dataPrivString || !dataPrivString2) {
    return (
      <div className="flex justify-center items-center">
        <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      </div>
    );
  }
  //✅ Step4: Parse the data to JSON format
  const dataPriv = JSON.parse(dataPrivString);
  const dataPriv2 = JSON.parse(dataPrivString2);

  //✅ Step5: Create the key for the data

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

  console.log(dataMain + "dataMain");

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

  console.log(
    web2Data.map((item: any) => {
      return JSON.stringify(item?.logoUrl);
    }, "web2Data"),
  );

  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6 ">
        <div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4 items-center justify-center">
            {selectedIndices.map((index: number) => {
              const idWeb3Presale = index + 1;
              const matchingIndex = idWeb2privsales.indexOf(idWeb3Presale);
              return (
                <PrivateSaleCards
                  currency={"ss"}
                  key={index || 0}
                  id={index || 0}
                  title={web2Data[index]?.title || "Title"} // Access data based on index
                  vestingFirstReleasePercent={
                    dataMain[matchingIndex]?.firstReleasePercent || 0
                  }
                  softCapCurrency={softCap[index] || 0} // Access data based on index
                  hardCapCurrency={hardCap[index] || 0} // Access data based on index
                  moneyRaised={dataMain[index]?.moneyRaised || 0} // Access data based on index
                  startTime={dataMain[index]?.startTime || 0} // Access data based on index
                  endTime={dataMain[index]?.endTime || 0} // Access data based on index
                  imgHref={web2Data[index]?.logoUrl}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Advance), { ssr: false });
