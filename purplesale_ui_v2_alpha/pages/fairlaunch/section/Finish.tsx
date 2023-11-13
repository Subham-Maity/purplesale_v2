import {
  ERC20Abi,
  createAbiAlpha,
  createAddress,
  fairLaunchAbiAlpha,
  fairLaunchAddressAlpha,
} from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import { enqueueSnackbar } from "notistack";
import React, { use, useContext, useEffect, useState } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import { useNetwork } from "wagmi";
import axios from "@/constants/axio";
import { toast as toastify, ToastContainer } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import { ethers } from "ethers";
import FinishWrapper from "@/components/TailwindWrapper/FinishPage/bgFinish";

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
  } = useContext(FormContext);

  const allowanceValue = ethers.constants.MaxUint256.toString();

  const { write: allowance } = useContractWrite({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "approve",
    //change address here accordingly.
    args: [fairLaunchAddressAlpha, allowanceValue],
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

    updateRefundType(refundType);
  }, [currency, chain, altTokenAddress, feeOption, refundType]);
  const { data: altTokenAddressDecimals } = useContractRead({
    //@ts-ignore
    address: altTokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const decimals: any =
    altTokenAddressDecimals === undefined ? 18 : altTokenAddressDecimals;
  const { write: createFairLaunch } = useContractWrite({
    address: fairLaunchAddressAlpha,
    abi: fairLaunchAbiAlpha,
    functionName: "createLaunch",
    args: [
      tokenAddress,
      altTokenAddress,
      whitelist,
      fee,
      infoData.softCap * 10 ** decimals,
      infoData.tokensToSell * 10 ** tokenDetails.decimals,
      infoData.maxContribution * 10 ** decimals,
      Math.floor(new Date(infoData.startDate).getTime() / 1000),
      Math.floor(new Date(infoData.endDate).getTime() / 1000),
      isAffiliateEnabled.toString(),
      infoData.liquidityAdditionPercent,
      infoData.liquidityLockup * 24 * 60 * 60,
    ],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating fair-launch ${error}`, {
        variant: "error",
      });
    },
  });
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

  const dataLengthFair: any = returnLengthFair?.toString();

  const lengthFair = parseInt(dataLengthFair);

  const [web3Length, setWeb3Length] = useState(lengthFair);
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

  // Define a function to show an error notification
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
    if (web3Length < lengthFair) {
      setTransactionPassed(true);
    } else {
      setTransactionPassed(false);
    }
    setWeb3Length(lengthFair);
  }, [lengthFair]);

  //❌ Data Retrieval

  const {
    logoUrl,
    bgLogoUrl,
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
    bgLogoUrl: string,
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
      bgLogoUrl: bgLogoUrl,
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
      await axios.post("/Alpha/fairLaunchInfo", postData);
      toast.dismiss();
      toast.success("Data saved successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //❌ Function to handle combined button click

  //Step - 1

  useEffect(() => {
    if (transactionPassed && buttonClicked) {
      handleSave(
        lengthFair,
        logoUrl,
        bgLogoUrl,
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
    createFairLaunch();

    setWeb3Length(lengthFair);

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
        duration: 150000,
        style: {
          backgroundColor: "#242525",
          borderRadius: "10px",
          border: "1px solid #8f8c8c",
        },
      },
    );
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 150000);
  };

  return (
    <>
      <Toaster />
      <ToastContainer position="bottom-right" theme="dark" autoClose={1000} />
      <FinishWrapper>
        <p className="flex justify-between">
          <span>TokenDetails: </span>{" "}
          <span>
            {tokenDetails.decimals}, {tokenDetails.name}, {tokenDetails.symbol}{" "}
          </span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        {whitelist ? (
          <p className="flex justify-between">
            <span>Whitelist:</span> <span> Enabled</span>
          </p>
        ) : (
          <p className="flex justify-between">
            <span>Whitelist:</span> <span> Disabled</span>
          </p>
        )}
        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Soft Cap:</span> <span>{infoData.softCap}</span>{" "}
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Purchase Token Currency:</span> <span>{currency}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Fee:</span> <span>{feeOption}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>

        <p className="flex justify-between">
          <span> Token To Sell:</span> <span>{infoData.tokensToSell}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Max Buy:</span> <span>{infoData.maxContribution}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Start Time:</span> <span>{formattedStartDate}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>End Time:</span> <span>{formattedEndDate}</span>{" "}
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          <span>Affiliate Rate:</span>
          <span> {isAffiliateEnabled}</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          {" "}
          <span>Liquidity:</span>{" "}
          <span>{infoData.liquidityAdditionPercent}%</span>
        </p>

        <hr className="border-b border-dashed border-white/10"></hr>
        <p className="flex justify-between">
          {" "}
          <span>Liquidity Lockup:</span>
          <span> {infoData.liquidityLockup} Days</span>
        </p>

        <div className="flex justify-start gap-4 pt-8">
          <button
            className="finishButton"
            onClick={() => {
              allowance();
            }}
          >
            ALLOWANCE
          </button>
          <button
            className="finishButton"
            onClick={() => {
              handleCombinedButtonClick();
            }}
          >
            {" "}
            FAIR LAUNCH
          </button>
        </div>
      </FinishWrapper>
    </>
  );
};

export default Finish;
