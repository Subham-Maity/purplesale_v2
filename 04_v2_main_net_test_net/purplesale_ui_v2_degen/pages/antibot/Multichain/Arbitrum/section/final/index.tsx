import {
  antiBotAbi,
  antiBotAddress,
  antiBotReadAbi,
  antiBotReadAddress,
  ERC20Abi,
  isAntiBotEnabledAbi,
} from "@/constants/createConstants";
import FormContext from "@/contexts/create/FormContext";
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { useContractRead, useContractWrite } from "wagmi";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import BgInput from "@/components/TailwindWrapper/InputBg/BgInput";
import Image from "next/image";

type VerifyTokenProps = {
  onStepValidation: (isValid: boolean) => void;
};

const Final: React.FC<VerifyTokenProps> = () => {
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [affiliateChangePercent, setAffiliateChangePercent] =
    useState<number>(0);
  const { infoData } = useContext(FormContext);
  const { setInfoData } = useContext(FormContext);
  const {
    userAddress,
    tokenAddress,
    setUserAddress,
    setIsAffiliateEnabled,
    tokenDetails,
    setTokenDetails,
  } = useContext(FormContext);

  const router = useRouter();

  const { isAntiBotEnabledCheck } = router.query;

  const handleChangeTokenAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTokenAddress = event.target.value;
    const isValidFormat = /^0x[0-9A-Fa-f]+$/.test(inputTokenAddress);
    setUserAddress(event.target.value);
    setIsValidAddress(isValidFormat);
  };

  const checkTokenAddressValidity = () => {
    if (userAddress.trim() === "") {
      setIsValidAddress(false);
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
      return;
    }

    const isTokenAddressFormatValid = /^0x[0-9A-Fa-f]{40}$/i.test(userAddress);

    setIsValidAddress(isTokenAddressFormatValid);
    if (isTokenAddressFormatValid) {
      fetchTokenDetails();
    } else {
      setTokenDetails({ name: "", symbol: "", decimals: 0 });
    }
  };

  const { data: decimals } = useContractRead({
    //@ts-ignore
    address: userAddress,
    abi: ERC20Abi,
    functionName: "decimals",
  });

  const { data: name } = useContractRead({
    //@ts-ignore
    address: userAddress,
    abi: ERC20Abi,
    functionName: "name",
  });

  const { data: symbol } = useContractRead({
    //@ts-ignore
    address: userAddress,
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
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const isFormValid = (): boolean => {
      const isValidTokenAddress = isValidAddress && userAddress.trim() !== "";
      return isValidTokenAddress && isValidAddress;
    };
    setIsAffiliateEnabled(affiliateChangePercent);
  }, [isValidAddress, userAddress]);

  const { data: isAntiBotEnabled } = useContractRead({
    //@ts-ignore
    address: userAddress,
    abi: isAntiBotEnabledAbi,
    functionName: "isAntiBotEnabled",
  });

  const { write: toggleAntiBot } = useContractWrite({
    //@ts-ignore
    address: tokenAddress,
    abi: isAntiBotEnabledAbi,
    functionName: "toggleAntiBot",
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating fair-launch ${error}`, {
        variant: "error",
      });
    },
  });

  const [antiBotState, setAntiBotState] = useState(false);

  const handleToggleAntiBot = () => {
    toggleAntiBot();
    setAntiBotState(!antiBotState);
  };

  const { write: toggleBlacklist } = useContractWrite({
    //@ts-ignore
    address: userAddress,
    abi: isAntiBotEnabledAbi,
    functionName: "toggleBlacklist",
    args: [userAddress],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating fair-launch ${error}`, {
        variant: "error",
      });
    },
  });
  const handleToggleAntiBotCheck = () => {
    toggleAntiBot();
  };
  const handleToggleBlacklist = () => {
    toggleBlacklist();
  };

  const { data: isBlacklisted } = useContractRead({
    //@ts-ignore
    address: tokenAddress,
    abi: isAntiBotEnabledAbi,
    functionName: "isBlacklisted",
    args: [userAddress],
  }) as { data: boolean };

  const handleIsBlacklisted = () => {
    //@ts-ignore
    isBlacklisted();
  };
  const amountLimitPerTradeDecimals =
    infoData.amountLimitPerTrade * 10 ** tokenDetails.decimals;

  const amountToBeAddedPerBlockDecimals =
    infoData.amountToBeAddedPerBlock * 10 ** tokenDetails.decimals;
  const { write: configureAntiBot } = useContractWrite({
    //@ts-ignore
    address: tokenAddress,
    abi: isAntiBotEnabledAbi,
    functionName: "configureAntiBot",
    args: [
      amountLimitPerTradeDecimals,
      amountToBeAddedPerBlockDecimals,
      infoData.timeLimitPerTrade,
      infoData.blockNumberToDisableAntiBot,
    ],
    onError(error: any) {
      console.log("Error", error);
      enqueueSnackbar(`Error creating fair-launch ${error}`, {
        variant: "error",
      });
    },
  });

  return (
    <div className="mb-8">
      <BgInput>
        <p className="flex">
          <Image
            src={"/Line.svg"}
            alt={"Line"}
            width={3}
            height={2}
            className="inputImageBar"
          />
          <label htmlFor="main" className="inputHeading">
            Enable Pink Anti-Bot
          </label>
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 mt-6">
          <button
            className=" border border-[#9e9cf3] hover:border-[#b8a4ff] text-neutral-700 dark:text-white font-bold py-2 px-4 rounded"
            disabled={isAntiBotEnabledCheck !== "false"}
            onClick={handleToggleAntiBotCheck}
          >
            Enable Purple Anti-Bot
          </button>
          <button
            className=" border border-red-500 hover:border-red-700 text-neutral-700 dark:text-white font-bold py-2 px-4 rounded"
            disabled={isAntiBotEnabledCheck === "false"}
            onClick={handleToggleAntiBotCheck}
          >
            Disable Purple Anti-Bot
          </button>
        </div>
        <div className="flex mt-12 justify-between">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="facebook" className="block  mt-2 font-bold">
              Blacklist
            </label>
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
            <button
              className=" border border-[#9e9cf3] hover:border-[#b8a4ff] text-neutral-700 dark:text-white font-bold py-2 px-4 rounded"
              disabled={isBlacklisted}
              onClick={handleToggleBlacklist}
            >
              Add user to blacklist
            </button>
            <button
              className=" border border-red-500 hover:border-red-700 text-neutral-700 dark:text-white font-bold py-2 px-4 rounded"
              disabled={!isBlacklisted}
              onClick={handleToggleBlacklist}
            >
              Remove user from blacklist
            </button>
          </div>
        </div>
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
            <label className="inputHeading" htmlFor="userAddress">
              User Address<span className="text-red-500">*</span>
            </label>
          </p>
          <input
            id="userAddress"
            type="text"
            className="input"
            value={userAddress}
            onChange={handleChangeTokenAddress}
            onBlur={checkTokenAddressValidity}
            required
          />
        </div>
      </BgInput>

      <div>
        <BgInput>
          <div className="col-span-1">
            <p className="flex">
              <Image
                src={"/Line.svg"}
                alt={"Line"}
                width={3}
                height={2}
                className="inputImageBar"
              />
              <label htmlFor="amountLimitPerTrade" className="inputHeading">
                Amount Limit Per Trade
              </label>
            </p>
            <input
              onChange={handleOnChange}
              id="amountLimitPerTrade"
              name="amountLimitPerTrade"
              type="text"
              placeholder="ex: 1000000000000000000"
              className="input"
            />
          </div>
        </BgInput>
        <BgInput>
          <div className="col-span-1">
            <p className="flex">
              <Image
                src={"/Line.svg"}
                alt={"Line"}
                width={3}
                height={2}
                className="inputImageBar"
              />
              <label htmlFor="twitter" className="inputHeading">
                Amount To Be Added Per Block
              </label>
            </p>
            <input
              onChange={handleOnChange}
              id="amountToBeAddedPerBlock"
              name="amountToBeAddedPerBlock"
              type="text"
              placeholder="ex: 1000000000000000000"
              className="input"
            />
          </div>
        </BgInput>
      </div>

      <BgInput>
        <div className="col-span-1 mt-8">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="timeLimitPerTrade" className="inputHeading">
              Time Limit Per Trade (Seconds)
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="timeLimitPerTrade"
            name="timeLimitPerTrade"
            type="text"
            placeholder="Ex: 60"
            className="input"
          />
        </div>
      </BgInput>
      <BgInput>
        <div className="col-span-1 mt-8">
          <p className="flex">
            <Image
              src={"/Line.svg"}
              alt={"Line"}
              width={3}
              height={2}
              className="inputImageBar"
            />
            <label htmlFor="instagram" className="inputHeading">
              Block Number to Disable Anti-Bot (Listing is Block #1)
            </label>
          </p>
          <input
            onChange={handleOnChange}
            id="blockNumberToDisableAntiBot"
            name="blockNumberToDisableAntiBot"
            type="text"
            placeholder="Ex: 100"
            className="input"
          />
        </div>

        <button
          className="finishButton mt-8 ml-2"
          onClick={() => {
            configureAntiBot();
          }}
        >
          UPDATE CONFIGURE
        </button>
      </BgInput>
    </div>
  );
};

export default Final;
