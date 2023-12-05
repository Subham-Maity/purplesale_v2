import {
  ERC20Abi,
  dutchAuctionAbi,
  dutchAuctionAddress,
  fairLaunchAddress,
  fairLaunchAbi,
} from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import { enqueueSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import { useNetwork } from "wagmi";
import axios from "@/constants/axio";
import toast, { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
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
  } = useContext(FormContext);
  const allowanceValue = ethers.constants.MaxUint256.toString();

  const { write: allowance } = useContractWrite({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "approve",
    //change address here accordingly.
    args: [dutchAuctionAddress, allowanceValue],
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
  }, [currency, chain, altTokenAddress, feeOption, infoData.refundType]);

  console.log("ref", infoData.refundType);
  const { data: altTokenAddressDecimals } = useContractRead({
    //@ts-ignore
    address: altTokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const decimals: any =
    altTokenAddressDecimals === undefined ? 18 : altTokenAddressDecimals;

  const { write: createDutchAuction } = useContractWrite({
    address: dutchAuctionAddress,
    abi: dutchAuctionAbi,
    functionName: "createAuction",
    args: [
      tokenAddress,
      altTokenAddress,
      whitelist,
      refund,
      vesting.enabled,
      fee,
      infoData.tokensToSell * 10 ** tokenDetails.decimals,
      infoData.minContribution * 10 ** decimals,
      infoData.maxContribution * 10 ** decimals,
      infoData.decreasePriceCycle,
      infoData.startPrice * 10 ** decimals,
      infoData.endPrice * 10 ** decimals,
      Math.floor(new Date(infoData.startDate).getTime() / 1000),
      Math.floor(new Date(infoData.endDate).getTime() / 1000),
      infoData.liquidityPercent,
      infoData.liquidityLockup * 24 * 3600,
      infoData.tgereleasePercentage,
      infoData.cycle,
      infoData.cycleReleasePercentage,
    ],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating dutch-action ${error}`, {
        variant: "error",
      });
    },
  });

  console.log("args", tokenAddress, vesting.enabled);
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

  //❌ Length of Web3
  //🚀 Fair Launch

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

  const [web3Length, setWeb3Length] = useState(lengthAuction);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [transactionPassed, setTransactionPassed] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 150000);
  useEffect(() => {
    if (web3Length < dataLengthAuction) {
      setTransactionPassed(true);
    } else {
      setTransactionPassed(false);
    }
    setWeb3Length(dataLengthAuction);
  }, [dataLengthAuction]);

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
      await axios.post("/dutchAuctionInfo", postData);
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
        dataLengthAuction,
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
    createDutchAuction();

    setWeb3Length(dataLengthAuction);

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
              TokenDetails: {tokenDetails.decimals}, {tokenDetails.name},{" "}
              {tokenDetails.symbol}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Purchase Token Currency: {currency}</p>
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
          <p>Refund Type: {infoData.refundType}</p>
          <p>Fee: {feeOption}</p>
          <p>Tokens To Sell: {infoData.tokensToSell}</p>
          <p>Minimum Buy: {infoData.minContribution}</p>
          <p>Maximum Buy: {infoData.maxContribution}</p>
          <p>Decrease Price Cycle: {infoData.decreasePriceCycle} Minutes</p>
          <p>Start Price: {infoData.startPrice}</p>
          <p>End Price: {infoData.endPrice}</p>
          <p>HardCap: {infoData.startPrice * infoData.tokensToSell}</p>
          <p>SoftCap: {infoData.endPrice * infoData.tokensToSell}</p>
          <p>Start Time: {formattedStartDate}</p>

          <p>End Time: {formattedEndDate}</p>

          <p>Liquidity: {infoData.liquidityPercent}%</p>
          <p>Liquidity Lockup: {infoData.liquidityLockup} Days</p>
          {vesting.enabled ? (
            <div>
              <p className="mb-4">
                First Release Percentage:{" "}
                {infoData.tgereleasePercentage.toString()}
              </p>
              <p className="mb-4">
                Cycle Release Percentage:{" "}
                {infoData.cycleReleasePercentage.toString()}
              </p>
              <p className="mb-4">Cycle: {infoData.cycle} Days</p>
            </div>
          ) : (
            <div>
              <p>Vesting : Disabled</p>
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
            className="btn h-6 w-48 bg-green-500 rounded text-center"
            onClick={() => {
              handleCombinedButtonClick();
            }}
          >
            {" "}
            CREATE DUTCH AUCTION
          </div>
        </form>
      </div>
    </div>
  );
};

export default Finish;
