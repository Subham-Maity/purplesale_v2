import {
  ERC20Abi,
  createAbi,
  createAddress,
} from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import React, { use, useContext, useEffect, useState } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import { useNetwork } from "wagmi";
import { enqueueSnackbar } from "notistack";
import axios from "@/constants/axio";
import { toast as toastify, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import { ethers } from "ethers";

const Finish = () => {
  const {
    tokenAddress,
    isAffiliateEnabled,
    currency,
    feeOption,
    tokenDetails,
    refundType,
    routerSelect,
    infoData,
    whitelist,
    vesting,
    selectedListingOption,
  } = useContext(FormContext);

  const allowanceValue = ethers.constants.MaxUint256.toString();

  const { write: allowance } = useContractWrite({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "approve",
    //change address here accordingly.
    args: [createAddress, allowanceValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating priv sale ${error}`, {
        variant: "error",
      });
    },
  });

  const { chain } = useNetwork();
  const [fee, setFee] = useState<boolean>(false);
  const [refund, setRefund] = useState<boolean>(false);
  const [altTokenAddress, setAltTokenAddress] = useState<string>(
    "0x0000000000000000000000000000000000000000",
  );

  useEffect(() => {
    function updateAltTokenAddress(x: string, altTokenAddress: string): string {
      if (currency == "USDC" && x == "Polygon") {
        setAltTokenAddress("0x2791bca1f2de4661ed88a30c99a7a9449aa84174");
      } else if (currency === "USDT" && x === "Polygon") {
        setAltTokenAddress("0xc2132d05d31c914a87c6611c10748aeb04b58e8f");
      }

      if (currency == "USDT" && x == "Polygon Mumbai") {
        setAltTokenAddress("0x4987D9DDe3b2e059dB568fa26D7Eb38F40956013");
      } else if (currency == "USDC" && x == "Polygon Mumbai") {
        setAltTokenAddress("0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747");
      }
      return altTokenAddress;
    }

    if (chain) {
      updateAltTokenAddress(chain.name, altTokenAddress);
    }

    function updateFeeOption(x: string) {
      if (x == `2% ${currency} + 2% token sold`) {
        setFee(true);
      } else {
        setFee(false);
      }
    }

    updateFeeOption(feeOption);

    function updateRefundType(x: string) {
      if (x == "Refund") {
        setRefund(true);
      } else {
        setRefund(false);
      }
    }

    updateRefundType(infoData.refundType);
  }, [
    currency,
    chain,
    altTokenAddress,
    feeOption,
    infoData.refundType,
    infoData.selectedListingOption,
  ]);
  const { data: altTokenAddressDecimals } = useContractRead({
    //@ts-ignore
    address: altTokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const decimals: any =
    altTokenAddressDecimals === undefined ? 18 : altTokenAddressDecimals;

  const { write: createPresale } = useContractWrite({
    address: createAddress,
    abi: createAbi,
    functionName: "createPresale",
    args: [
      tokenAddress,
      altTokenAddress,
      whitelist,
      refund,
      vesting.enabled,
      fee,
      infoData.softCap * 10 ** decimals,
      infoData.hardCap * 10 ** decimals,
      infoData.perSaleRate,
      infoData.minimumBuy * 10 ** decimals,
      infoData.maximumBuy * 10 ** decimals,
      Math.floor(new Date(infoData.startDate).getTime() / 1000),
      Math.floor(new Date(infoData.endDate).getTime() / 1000),
      isAffiliateEnabled.toString(),
      vesting.firstReleasePercentage.toString(),
      vesting.vestingPeriod.toString(),
      vesting.cycleReleasePercentage.toString(),
      infoData.liquidity,
      infoData.liquidityLockup * 24 * 3600,
      infoData.listingRate,
    ],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
    },
  });

  const totalToken = infoData.hardCap * infoData.perSaleRate;
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");

  useEffect(() => {
    if (infoData.startDate) {
      const startDate = new Date(infoData.startDate);
      const formattedStartDateTime =
        startDate.getFullYear() +
        "-" +
        ("0" + (startDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + startDate.getDate()).slice(-2) +
        "/" +
        ("0" + startDate.getHours()).slice(-2) +
        ":" +
        ("0" + startDate.getMinutes()).slice(-2);
      setFormattedStartDate(formattedStartDateTime);
    }

    if (infoData.endDate) {
      const endDate = new Date(infoData.endDate);
      const formattedEndDateTime =
        endDate.getFullYear() +
        "-" +
        ("0" + (endDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + endDate.getDate()).slice(-2) +
        "/" +
        ("0" + endDate.getHours()).slice(-2) +
        ":" +
        ("0" + endDate.getMinutes()).slice(-2);
      setFormattedEndDate(formattedEndDateTime);
    }
  }, [infoData.startDate, infoData.endDate]);

  //✅✅✅✅ Web2 Section ✅✅✅✅

  //❌ Length of Web3
  //🚀 Presale
  const { data: returnLength } = useContractRead({
    address: createAddress,
    abi: createAbi,
    functionName: "returnLength",
    watch: true,
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, {
        variant: "error",
      });
    },
  });
  const dataLengthPresales: any = returnLength?.toString();

  const lengthPresales = parseInt(dataLengthPresales);

  const [web3Length, setWeb3Length] = useState(lengthPresales);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [transactionPassed, setTransactionPassed] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 150000);
  const notifySuccess = () => {
    toastify.success("Data saved successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyError = () => {
    toastify.error("Error saving data", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  useEffect(() => {
    if (web3Length < lengthPresales) {
      setTransactionPassed(true);
    } else {
      setTransactionPassed(false);
    }
    setWeb3Length(lengthPresales);
  }, [lengthPresales]);

  //❌ Data Retrieval

  const {
    logoUrl,
    websiteUrl,
    facebook,
    twitter,
    github,
    instagram,
    discord,
    reddit,
    youtube,
    description,
  } = useContext(FormContext);

  //❌ Function to save data to database
  const handleSave = async (
    id: number,
    logoUrl: string,
    websiteUrl: string,
    facebook: string,
    twitter: string,
    github: string,
    instagram: string,
    discord: string,
    reddit: string,
    youtube: string,
    description: string,
  ) => {
    const postData = {
      id: id,
      logoUrl: logoUrl,
      websiteUrl: websiteUrl,
      facebook: facebook,
      twitter: twitter,
      github: github,
      instagram: instagram,
      discord: discord,
      reddit: reddit,
      youtube: youtube,
      description: description,
    };
    try {
      await axios.post("/presaleInfo", postData);
      toast.dismiss();
      notifySuccess();
    } catch (error) {
      notifyError();
      console.error("Error:", error);
    }
  };

  //❌ Function to handle combined button click

  //Step - 1

  useEffect(() => {
    if (transactionPassed && buttonClicked) {
      handleSave(
        lengthPresales,
        logoUrl,
        websiteUrl,
        facebook,
        twitter,
        github,
        instagram,
        discord,
        reddit,
        youtube,
        description,
      );
      setButtonClicked(false);
    }
  }, [transactionPassed, buttonClicked]);
  const handleCombinedButtonClick = async () => {
    createPresale();

    setWeb3Length(lengthPresales);

    setButtonClicked(true);
    setCountdownTime(Date.now() + 60000); // Update the countdown time
    const toastId = toast.loading(
      (t) => (
        <Countdown
          date={countdownTime}
          renderer={({ hours, minutes, seconds, completed }) => {
            if (completed) {
              toast.error(
                <p>
                  {" "}
                  <p className="text-md font-bold text-gray-200">
                    Maybe something went wrong. Please try again.
                  </p>
                </p>,
                { id: t.id },
              );
            }
            return (
              <div>
                <p className="text-md font-bold text-gray-200">
                  After completing the transaction, wait for confirmation. Don’t
                  refresh or close the page.
                </p>
                <p className="text-sm text-gray-200">
                  Please wait!. This may take a few minutes/seconds. {hours}:
                  {minutes}:{seconds}
                </p>
              </div>
            );
          }}
        />
      ),
      {
        duration: countdownTime,
        style: {
          backgroundColor: "#242525",
          borderRadius: "10px",
          border: "1px solid #8f8c8c",
        },
      },
    );
    setTimeout(() => {
      toast.dismiss(toastId);
    }, countdownTime);
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
        <Toaster />
        <ToastContainer position="bottom-right" theme="dark" autoClose={1000} />
        <form className="px-16 py-16 space-y-4">
          <div className="flex justify-between">
            <p>
              {" "}
              Token Details: {tokenDetails.decimals}, {tokenDetails.name},{" "}
              {tokenDetails.symbol}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Total Token: {totalToken}</p>
          </div>

          <div className="flex justify-between">
            <p>Soft Cap: {infoData.softCap}</p>
          </div>
          <div className="flex justify-between">
            <p>Hard Cap: {infoData.hardCap}</p>
          </div>
          <div className="flex justify-between">
            <p>Purchase Token Currency: {currency}</p>
          </div>
          <div className="flex justify-between">
            <p>Refund Type: {infoData.refundType}</p>
          </div>
          <div className="flex justify-between">
            <p>Affiliate Program: {isAffiliateEnabled}</p>
          </div>
          {whitelist ? (
            <div className="flex justify-between">
              <p>Whitelist: Enabled</p>
            </div>
          ) : (
            <div className="flex justify-between">
              <p>Whitelist: Disabled</p>
            </div>
          )}
          <div className="flex justify-between">
            <p>PreSale Rate: {infoData.perSaleRate} </p>
          </div>
          <div className="flex justify-between">
            <p>Minimum Buy: {infoData.minimumBuy} </p>
          </div>
          <div className="flex justify-between">
            <p>Maximum Buy: {infoData.maximumBuy}</p>
          </div>
          <div className="flex justify-between">
            <p>Start Time: {formattedStartDate}</p>
          </div>
          <div className="flex justify-between">
            <p>End Time: {formattedEndDate}</p>
          </div>
          <div className="flex justify-between">
            <p>Fee: {feeOption}</p>
          </div>

          {selectedListingOption == "auto" ? (
            <div>
              <div className="flex justify-between ">
                <p className="mb-4">Liquidity: {infoData.liquidity}%</p>
              </div>
              <div className="flex justify-between">
                <p className="mb-4">Listing Rate: {infoData.listingRate}</p>
              </div>
              <div className="flex justify-between">
                <p className="">
                  Liquidity Lockup: {infoData.liquidityLockup} Days
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <p className="">Listing Options: Manual</p>
            </div>
          )}

          {vesting.enabled ? (
            <div>
              <div className="flex justify-between">
                <p className="mb-4">
                  First Release Percentage: {infoData.firstReleasePercentage}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="mb-4">Vesting Period: {infoData.vestingPeriod}</p>
              </div>
              <div className="flex justify-between">
                <p className="">
                  Cycle Release Percentage: {infoData.cycleReleasePercentage}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <p>Vesting: Disabled</p>
            </div>
          )}
          <div
            className="btn h-6 w-36 cursor-pointer bg-green-500 rounded text-center"
            onClick={() => {
              allowance();
            }}
          >
            ALLOWANCE
          </div>

          <div
            className="btn h-6 w-36 bg-green-500 rounded text-center"
            onClick={() => {
              handleCombinedButtonClick();
            }}
          >
            {" "}
            CREATE PRESALE
          </div>
        </form>
      </div>
    </div>
  );
};

export default Finish;
