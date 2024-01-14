import {
  ERC20Abi,
  airdropAbi,
  airdropAddress,
} from "@/constants/PolygonMumbai/createConstants";
import FormContext from "@/contexts/create/FormContext";

import { enqueueSnackbar } from "notistack";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import { useNetwork } from "wagmi";
type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};

import axios from "@/constants/axio";
import toast, { Toaster } from "react-hot-toast";
import { toast as toastify, ToastContainer } from "react-toastify";
import Countdown from "react-countdown";
import { ethers } from "ethers";
import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import Image from "next/image";
import FormWrapper from "@/components/TailwindWrapper/formMainBg/formBg";
const VerifyToken: React.FC<VerifyTokenProps> = ({ onStepValidation }) => {
  const { chain } = useNetwork();
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);
  const [affiliateChangePercent, setAffiliateChangePercent] =
    useState<number>(0);
  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);

  const {
    tokenAddress,
    setTokenAddress,
    isAffiliateEnabled,
    setIsAffiliateEnabled,
    currency,
    setCurrency,
    feeOption,
    setFeeOption,
    tokenDetails,
    setTokenDetails,
    selectedListingOption,
    setSelectedListingOption,
  } = useContext(FormContext);
  const { infoData, setInfoData } = useContext(FormContext);
  const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
    setFeeOption(`5% ${event.target.value} raised only (Recommended)`);
  };

  const handleAffiliateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpenAffiliate(event.target.value === "enable" ? true : false);
  };

  const handleAffiliateChangePercent = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setAffiliateChangePercent(parseFloat(event.target.value));
  };

  const handleChangeTokenAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTokenAddress = event.target.value;
    const isValidFormat = /^0x[0-9A-Fa-f]+$/.test(inputTokenAddress);
    setTokenAddress(event.target.value);
    setIsValidAddress(isValidFormat);
  };

  const checkTokenAddressValidity = () => {
    if (tokenAddress.trim() === "") {
      setIsValidAddress(false);
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
      return;
    }

    const isTokenAddressFormatValid = /^0x[0-9A-Fa-f]{40}$/i.test(tokenAddress);
    console.log(isTokenAddressFormatValid, "isTokenAddressFormatValid");
    setIsValidAddress(isTokenAddressFormatValid);
    if (isTokenAddressFormatValid) {
      fetchTokenDetails();
    } else {
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
    }
  };

  const { data: decimals } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const { data: name } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "name",
  });

  const { data: symbol } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "symbol",
  });

  const fetchTokenDetails = async () => {
    if (decimals && name && symbol) {
      setTokenDetails({
        //@ts-ignore
        name: name,
        //@ts-ignore
        symbol: symbol,
        //@ts-ignore
        decimals: decimals,
      });

      setIsValidAddress(true);
    } else {
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
      setIsValidAddress(false);
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const isFormValid = (): boolean => {
      const isValidTokenAddress = isValidAddress && tokenAddress.trim() !== "";
      return isValidTokenAddress && isValidAddress;
    };
    onStepValidation(isFormValid());
    setIsAffiliateEnabled(affiliateChangePercent);
    function parseInputData(inputData: string) {
      const lines = inputData.trim().split("\n");
      const addresses: string[] = [];
      const amounts: number[] = [];

      lines.forEach((line) => {
        const [addressStr, amountStr] = line.split(",");

        const cleanedAddress = addressStr.trim();
        const amount = parseInt(amountStr);

        addresses.push(cleanedAddress);
        amounts.push(amount);
      });

      return { addresses, amounts };
    }
    const { addresses, amounts } = parseInputData(infoData.title);
    setAddresses(addresses);
    setAmounts(amounts);
  }, [
    isValidAddress,
    tokenAddress,
    onStepValidation,
    setIsAffiliateEnabled,
    affiliateChangePercent,
    infoData.title,
  ]);

  const { vesting, setVesting } = useContext(FormContext);
  const handleVestingEnableChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const enableVesting = event.target.value === "enable";

    if (enableVesting) {
      setVesting({
        ...vesting,
        enabled: true,
      });
    } else {
      setVesting({
        enabled: false,
        firstReleasePercentage: 0,
        vestingPeriod: 0,
        cycleReleasePercentage: 0,
      });
    }
  };

  const { write: airdrop } = useContractWrite({
    address: airdropAddress,
    abi: airdropAbi,
    functionName: "createAirdrop",
    args: [
      tokenAddress,
      addresses,
      amounts,
      Math.floor(new Date(infoData.lockUntil).getTime() / 1000),
      vesting.enabled,
      infoData.tgereleasePercentage,
      infoData.cycle,
      infoData.cycleReleasePercentage,
    ],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error getting airdrop set ${error}`, {
        variant: "error",
      });
    },
  });
  const allowanceValue = ethers.constants.MaxUint256.toString();

  const { write: allowance } = useContractWrite({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "approve",
    //change address here accordingly.
    args: [airdropAddress, allowanceValue],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error gettig allowance ${error}`, {
        variant: "error",
      });
    },
  });

  //✅✅✅✅ Web2 Section ✅✅✅✅

  //❌ Length of Web3
  //🚀 Fair Launch

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

  const dataLengthFair: any = returnLength?.toString();

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
    airDrop,
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
    airDrop: string,
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
      airdropTitle: airDrop,
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
      await axios.post("/airDropInfo/PolygonMumbai", postData);
      toast.dismiss();
      toast.success("Data saved successfully");
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
        lengthFair,
        airDrop,
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
    airdrop();

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
    <FormWrapper>
      <>
        <BgInput>
          <Toaster />
          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={1000}
          />
          <div className="mt-10">
            <p className="flex">
              <Image
                src={"/Line.svg"}
                alt={"Line"}
                width={3}
                height={2}
                className="inputImageBar"
              />
              <label className="inputHeading" htmlFor="tokenAddress">
                Token address<span className="text-red-500">*</span>
              </label>
            </p>
            <input
              id="tokenAddress"
              type="text"
              className="input"
              value={tokenAddress}
              onChange={handleChangeTokenAddress}
              onBlur={checkTokenAddressValidity}
              required
            />
            {!isValidAddress && tokenAddress.trim() !== "" && (
              <p className="inputAlert">Invalid/Network token address</p>
            )}
          </div>
          {isValidAddress && (
            <div className="mt-4">
              <p className="inputAlert">Name: {tokenDetails.name}</p>
              <p className="inputAlert">Symbol: {tokenDetails.symbol}</p>
              <p className="inputAlert">Decimals: {tokenDetails.decimals}</p>
            </div>
          )}
          {!isValidAddress && tokenAddress.trim() === "" && (
            <div className="mt-4">
              <p className="inputAlert">Token address cannot be blank</p>
            </div>
          )}
          {isValidAddress && (
            <div className="mt-4">
              <p className="inputAlert">Correct</p>
            </div>
          )}{" "}
        </BgInput>

        <div className="mt-10">
          <BgInput>
            <p className="flex">
              <Image
                src={"/Line.svg"}
                alt={"Line"}
                width={3}
                height={2}
                className="inputImageBar"
              />
              <label htmlFor="title" className="inputHeading">
                Allocations<span className="text-red-500">*</span>
              </label>
            </p>
            <textarea
              rows={20}
              id="title"
              className="input"
              name="title"
              placeholder="Insert allocation: separate with line breaks. Format: address,amount"
              //@ts-ignore
              onChange={handleOnChange}
              required
            />
          </BgInput>
          <BgInput>
            <div>
              <p className="flex">
                <Image
                  src={"/Line.svg"}
                  alt={"Line"}
                  width={3}
                  height={2}
                  className="inputImageBar"
                />
                <label htmlFor="lockUntil" className="inputHeading">
                  <strong>Lock until (UTC time)</strong>
                  <span className="ml-1 text-red-500"></span>
                </label>
              </p>

              <div className="mb-4">
                <input
                  id="lockUntil"
                  name="lockUntil"
                  //@ts-ignore
                  onChange={handleOnChange}
                  type="datetime-local"
                  className="input"
                  required
                />
              </div>
            </div>
          </BgInput>
          <BgInput>
            <div className="flex items-center">
              <input
                type="radio"
                id="vestingEnabled"
                name="vestingEnabled"
                value="enable"
                onChange={handleVestingEnableChange}
                className="form-radio ml-2"
              />

              <label
                htmlFor="vestingEnabled"
                className="ml-2 whitespace-nowrap"
              >
                Enable Vesting
              </label>
            </div>

            <div className="flex items-center mb-8">
              <input
                type="radio"
                id="vestingDisabled"
                name="vestingEnabled"
                value="disable"
                onChange={handleVestingEnableChange}
                className="form-radio ml-2"
              />

              <label
                htmlFor="vestingDisabled"
                className="ml-2 whitespace-nowrap"
              >
                Disable Vesting
              </label>
            </div>
            {vesting.enabled && (
              <div className="mt-10">
                <p className="flex">
                  <Image
                    src={"/Line.svg"}
                    alt={"Line"}
                    width={3}
                    height={2}
                    className="inputImageBar"
                  />
                  <label
                    htmlFor="tgereleasePercentage"
                    className="inputHeading"
                  >
                    TGE Release percentage(%)
                    <span className="text-red-500">*</span>
                  </label>
                </p>
                <input
                  id="tgereleasePercentage"
                  name="tgereleasePercentage"
                  onChange={handleOnChange}
                  type="number"
                  className="input"
                  placeholder="Ex: 10"
                />
                <div>
                  <div className="mt-10">
                    <p className="flex">
                      <Image
                        src={"/Line.svg"}
                        alt={"Line"}
                        width={3}
                        height={2}
                        className="inputImageBar"
                      />
                      <label htmlFor="cycle" className="inputHeading">
                        Cycle (days)<span className="text-red-500">*</span>
                      </label>
                    </p>
                    <input
                      onChange={handleOnChange}
                      id="cycle"
                      name="cycle"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                  </div>
                  <div className="mt-10">
                    <p className="flex">
                      <Image
                        src={"/Line.svg"}
                        alt={"Line"}
                        width={3}
                        height={2}
                        className="inputImageBar"
                      />
                      <label
                        htmlFor="cycleReleasePercentage"
                        className="inputHeading"
                      >
                        Cycle Release percentage(%)
                        <span className="text-red-500">*</span>
                      </label>
                    </p>
                    <input
                      onChange={handleOnChange}
                      id="cycleReleasePercentage"
                      name="cycleReleasePercentage"
                      type="number"
                      className="input"
                      placeholder="Ex: 10"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-start gap-4 pt-8">
              <button
                className="finishButton"
                onClick={() => {
                  allowance();
                }}
              >
                ALLOWANCE
              </button>
              <br />
              <button
                className="finishButton"
                onClick={async () => {
                  handleCombinedButtonClick();
                }}
              >
                Airdrop
              </button>
            </div>
          </BgInput>
        </div>
      </>
    </FormWrapper>
  );
};

export default VerifyToken;
