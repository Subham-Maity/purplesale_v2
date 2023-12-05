import {
  ERC20Abi,
  createAddress,
  tokenLockAbi,
  tokenLockAddress,
  pinkLockAddress,
  pinkLockABI,
  fairLaunchAddress,
  fairLaunchAbi,
} from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import { enqueueSnackbar } from "notistack";
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useRef,
} from "react";
import { useContractRead, useContractWrite } from "wagmi";
import axios from "@/constants/axio";
import toast, { Toaster } from "react-hot-toast";
import { toast as toastify, ToastContainer } from "react-toastify";
import Countdown from "react-countdown";

type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};

const Pinklock: React.FC<VerifyTokenProps> = () => {
  const [selectedToken, setSelectedToken] = useState<string>("Standard");
  const [checkBox, setCheckBox] = useState<boolean>(false);
  const [checkBox2, setCheckBox2] = useState<boolean>(false);
  const { infoData, setInfoData } = useContext(FormContext);

  const [isValidAddress, setIsValidAddress] = useState(false);
  const [affiliateChangePercent, setAffiliateChangePercent] =
    useState<number>(0);
  const [openAffiliate, setOpenAffiliate] = useState<boolean>(false);
  const [lockdays, setLockdays] = useState<any>(0);

  const {
    tokenAddress,
    setTokenAddress,
    isAffiliateEnabled,
    setIsAffiliateEnabled,
    setCurrency,
    setFeeOption,
    tokenDetails,
    setTokenDetails,
  } = useContext(FormContext);

  const { write: allowance } = useContractWrite({
    //@ts-ignore
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "approve",
    //change address here accordingly.
    args: [tokenLockAddress, 10000000000000],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating priv sale ${error}`, {
        variant: "error",
      });
    },
  });

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

  useEffect(() => {
    const isFormValid = (): boolean => {
      const isValidTokenAddress = isValidAddress && tokenAddress.trim() !== "";
      return isValidTokenAddress && isValidAddress;
    };
    setLockdays(
      infoData.lockUntil == "" ? infoData.tgePercent : infoData.lockUntil,
    );
    setIsAffiliateEnabled(affiliateChangePercent);
  }, [
    isValidAddress,
    tokenAddress,
    affiliateChangePercent,
    setIsAffiliateEnabled,
    infoData.lockUntil,
    infoData.tgePercent,
  ]);

  console.log(isAffiliateEnabled, "isAffiliateEnabled");
  console.log(affiliateChangePercent, "affiliateChangePercent");

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox(event.target.checked);
  };
  const handleCheckBox2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox2(event.target.checked);
  };
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });

    isFormValid();
  };
  const isFormValid = (): boolean => {
    return infoData.softCap > 0;
  };

  const { write: lock } = useContractWrite({
    address: tokenLockAddress,
    abi: tokenLockAbi,
    functionName: "lockTokens",
    args: [
      tokenAddress,
      checkBox ? infoData.owner : tokenAddress,
      infoData.title,
      infoData.amount * 10 ** 18,
      Math.floor(
        new Date(checkBox2 ? infoData.tgeDate : infoData.lockUntil).getTime() /
          1000,
      ),
      checkBox2,
      infoData.tgePercent.toString(),
      infoData.cycleDays.toString(),
      infoData.cycleReleasePercent.toString(),
    ],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating lock ${error}`, {
        variant: "error",
      });
    },
  });

  //✅✅✅✅ Web2 Section ✅✅✅✅

  //❌ Length of Web3
  //🚀 Fair Launch

  const { data: returnLength } = useContractRead({
    address: pinkLockAddress,
    abi: pinkLockABI,
    functionName: "returnLength",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating presale ${error}`, { variant: "error" });
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

  //❌ Function to save data to database
  const handleSave = async (id: number, title: string) => {
    const postData = {
      id: id,
      title: title,
    };
    try {
      await axios.post("/save-data-pinklock", postData);
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
      handleSave(lengthFair, infoData.title);
      setButtonClicked(false);
    }
  }, [transactionPassed, buttonClicked]);
  const handleCombinedButtonClick = async () => {
    lock();

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
    <div className="flex mt-6 justify-center items-center ">
      <div className="lg:w-[1060px] dark:bg-[#242525] bg-stone-50 rounded-md p-6">
        <Toaster />
        <ToastContainer position="bottom-right" theme="dark" autoClose={1000} />
        <div>
          <div className="mt-10">
            <label className="block text-lg mb-2" htmlFor="tokenAddress">
              Token or LP Token address<span className="text-red-500">*</span>
            </label>
            <input
              id="tokenAddress"
              type="text"
              className="w-full border border-gray-300 rounded py-2 px-4"
              value={tokenAddress}
              onChange={handleChangeTokenAddress}
              onBlur={checkTokenAddressValidity}
              required
            />
            {!isValidAddress && tokenAddress.trim() !== "" && (
              <p className="text-red-500">Invalid/Network token address</p>
            )}
          </div>

          {isValidAddress && (
            <div className="mt-4">
              <p>Name: {tokenDetails.name}</p>
              <p>Symbol: {tokenDetails.symbol}</p>
              <p>Decimals: {tokenDetails.decimals}</p>
            </div>
          )}
          {!isValidAddress && tokenAddress.trim() === "" && (
            <div className="mt-4">
              <p>Token address cannot be blank</p>
            </div>
          )}
          {isValidAddress && (
            <div className="mt-4">
              <p>Correct</p>
            </div>
          )}

          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              onChange={handleCheckBox}
              type="checkbox"
              value="enable"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              use another owner?
            </label>
          </div>
          {checkBox && (
            <div className="mt-6">
              <label
                htmlFor="owner"
                className="block mb-2 mt-4 text-sm font-medium"
              >
                <strong>Owner</strong>
              </label>
              <div className="mb-4">
                <input
                  id="owner"
                  name="owner"
                  type="text"
                  onChange={handleOnChange}
                  placeholder="Ex: Enter the owner address"
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
            </div>
          )}

          <label
            htmlFor="title"
            className="block mb-2 mt-4 text-sm font-medium"
          >
            <strong>Title</strong>
          </label>
          <div className="mb-4">
            <input
              id="title"
              name="title"
              onChange={handleOnChange}
              type="text"
              placeholder="Ex: My Lock"
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <label
            htmlFor="amount"
            className="block mb-2 mt-4 text-sm font-medium"
          >
            <strong>Amount</strong>
            <span className="text-red-500">*</span>
          </label>
          <div className="mb-4">
            <input
              id="amount"
              name="amount"
              type="text"
              onChange={handleOnChange}
              placeholder="Ex: Enter the amount of tokens to lock"
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="flex items-center mb-4">
            <input
              id="default-checkbox2"
              onChange={handleCheckBox2}
              type="checkbox"
              value="enable"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Implement Pink Anti-Bot System?
            </label>
          </div>

          {checkBox2 && (
            <div className="mt-6">
              <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="tgeDate"
                    className="block mb-2 mt-4 text-sm font-medium"
                  >
                    <strong>TGE Date (UTC time)</strong>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mb-4">
                    <input
                      id="tgeDate"
                      name="tgeDate"
                      type="datetime-local"
                      onChange={handleOnChange}
                      placeholder="Ex: 0x000"
                      required
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="tgePercent"
                    className="block mb-2 mt-4 text-sm font-medium"
                  >
                    <strong>TGE Percent</strong>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mb-4">
                    <input
                      id="tgePercent"
                      name="tgePercent"
                      onChange={handleOnChange}
                      type="text"
                      placeholder="0-100"
                      required
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="cycleDays"
                    className="block mb-2 mt-4 text-sm font-medium"
                  >
                    <strong>Cycle (days)</strong>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mb-4">
                    <input
                      id="cycleDays"
                      name="cycleDays"
                      onChange={handleOnChange}
                      type="text"
                      placeholder="0-100"
                      required
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="cycleReleasePercent"
                    className="block mb-2 mt-4 text-sm font-medium"
                  >
                    <strong>Cycle Release Percent</strong>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="mb-4">
                    <input
                      id="cycleReleasePercent"
                      onChange={handleOnChange}
                      name="cycleReleasePercent"
                      type="text"
                      placeholder="0-100"
                      required
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {!checkBox2 && (
            <div>
              <label
                htmlFor="lockUntil"
                className="block mb-2 mt-4 text-sm font-medium"
              >
                <strong>Lock until (UTC time)</strong>
                <span className="ml-1 text-red-500"></span>
              </label>

              <div className="mb-4">
                <input
                  id="lockUntil"
                  name="lockUntil"
                  onChange={handleOnChange}
                  type="datetime-local"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            </div>
          )}
          <br />
          <div
            className="btn h-6 pb-4 w-36 cursor-pointer bg-green-500 rounded text-center"
            onClick={() => {
              allowance();
            }}
          >
            ALLOWANCE
          </div>
          <br />
          <div
            className="btn h-6 w-48 cursor-pointer bg-green-500 rounded text-center"
            onClick={async () => {
              handleCombinedButtonClick();
            }}
          >
            PINK LOCK.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pinklock;
