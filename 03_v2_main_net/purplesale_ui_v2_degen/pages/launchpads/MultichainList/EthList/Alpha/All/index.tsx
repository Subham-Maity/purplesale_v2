import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead } from "wagmi";
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
} from "@/constants/Ethereum/createConstants";
import { enqueueSnackbar } from "notistack";
import PreSaleCards from "@/components/Cards/Ethereum/Alpha/Launchpads/PreSaleCards";
import FairLaunchCards from "@/components/Cards/Ethereum/Alpha/Launchpads/FairLaunchCards";
import DutchAuctionCards from "@/components/Cards/Ethereum/Alpha/Launchpads/dutchAuctionCards";
import SubscriptionCards from "@/components/Cards/Ethereum/Alpha/Launchpads/SubscriptionCards";
import axios from "@/constants/axio";
import CardsWrapper from "@/components/TailwindWrapper/Cards/wrapperCards";
import BgCards from "@/components/TailwindWrapper/Cards/bgCards";

const All = () => {
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
      const response = await axios.get("/Alpha/presale-fetch-data/Ethereum");
      setPresale(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataFairLaunch = async () => {
    try {
      const response = await axios.get("/Alpha/fairLaunch-fetch-data/Ethereum");
      setFairLaunch(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataAuction = async () => {
    try {
      const response = await axios.get(
        "/Alpha/dutchAuction-fetch-data/Ethereum",
      );
      setAuction(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeb2DataSubscription = async () => {
    try {
      const response = await axios.get(
        "/Alpha/Subscription-fetch-data/Ethereum",
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
          <>
            <PreSaleCards
              softCapCurrency={12}
              hardCapCurrency={18}
              id={0}
              name={"Bitcoin"}
              symbol={"BTC"}
              Affiliate={1}
              imgHref={"/PlaceHolder.svg"}
              description={"This is Crypto"}
              Liquidity={4}
              LockupTime={8}
              SalesStartIn={1658256}
              SalesEndIn={2336623}
              moneyRaised={80}
              currency={"BNB"}
              symbolTokenPrivateSales={"60"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={15}
              hardCapCurrency={20}
              id={1}
              name={"Ethereum"}
              symbol={"ETH"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The world's computer"}
              Liquidity={5}
              LockupTime={10}
              SalesStartIn={1987463}
              SalesEndIn={2873910}
              moneyRaised={100}
              currency={"ETH"}
              symbolTokenPrivateSales={"70"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={10}
              hardCapCurrency={25}
              id={2}
              name={"Cardano"}
              symbol={"ADA"}
              Affiliate={3}
              imgHref={"/PlaceHolder.svg"}
              description={"Blockchain for the future"}
              Liquidity={6}
              LockupTime={12}
              SalesStartIn={1425897}
              SalesEndIn={2047136}
              moneyRaised={90}
              currency={"ADA"}
              symbolTokenPrivateSales={"75"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={14}
              hardCapCurrency={22}
              id={3}
              name={"Solana"}
              symbol={"SOL"}
              Affiliate={4}
              imgHref={"/PlaceHolder.svg"}
              description={"High-performance"}
              Liquidity={7}
              LockupTime={14}
              SalesStartIn={1546321}
              SalesEndIn={2219874}
              moneyRaised={95}
              currency={"SOL"}
              symbolTokenPrivateSales={"80"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={2}
              hardCapCurrency={4}
              id={2}
              name={"Binance Coin"}
              symbol={"BNB"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The Binance "}
              Liquidity={2}
              LockupTime={16}
              SalesStartIn={1194852}
              SalesEndIn={1712458}
              moneyRaised={320}
              currency={"BNB"}
              symbolTokenPrivateSales={"65"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={13}
              hardCapCurrency={21}
              id={5}
              name={"Ripple"}
              symbol={"XRP"}
              Affiliate={6}
              imgHref={"/PlaceHolder.svg"}
              description={"Digital payment protocol"}
              Liquidity={9}
              LockupTime={18}
              SalesStartIn={1357849}
              SalesEndIn={1958463}
              moneyRaised={88}
              currency={"XRP"}
              symbolTokenPrivateSales={"72"}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
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
          <>
            <PreSaleCards
              softCapCurrency={12}
              hardCapCurrency={18}
              id={0}
              name={"Bitcoin"}
              symbol={"BTC"}
              Affiliate={1}
              imgHref={"/PlaceHolder.svg"}
              description={"This is Crypto"}
              Liquidity={4}
              LockupTime={8}
              SalesStartIn={1658256}
              SalesEndIn={2336623}
              moneyRaised={80}
              currency={"BNB"}
              symbolTokenPrivateSales={"60"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={15}
              hardCapCurrency={20}
              id={1}
              name={"Ethereum"}
              symbol={"ETH"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The world's computer"}
              Liquidity={5}
              LockupTime={10}
              SalesStartIn={1987463}
              SalesEndIn={2873910}
              moneyRaised={100}
              currency={"ETH"}
              symbolTokenPrivateSales={"70"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={10}
              hardCapCurrency={25}
              id={2}
              name={"Cardano"}
              symbol={"ADA"}
              Affiliate={3}
              imgHref={"/PlaceHolder.svg"}
              description={"Blockchain for the future"}
              Liquidity={6}
              LockupTime={12}
              SalesStartIn={1425897}
              SalesEndIn={2047136}
              moneyRaised={90}
              currency={"ADA"}
              symbolTokenPrivateSales={"75"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={14}
              hardCapCurrency={22}
              id={3}
              name={"Solana"}
              symbol={"SOL"}
              Affiliate={4}
              imgHref={"/PlaceHolder.svg"}
              description={"High-performance"}
              Liquidity={7}
              LockupTime={14}
              SalesStartIn={1546321}
              SalesEndIn={2219874}
              moneyRaised={95}
              currency={"SOL"}
              symbolTokenPrivateSales={"80"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={2}
              hardCapCurrency={4}
              id={2}
              name={"Binance Coin"}
              symbol={"BNB"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The Binance "}
              Liquidity={2}
              LockupTime={16}
              SalesStartIn={1194852}
              SalesEndIn={1712458}
              moneyRaised={320}
              currency={"BNB"}
              symbolTokenPrivateSales={"65"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={13}
              hardCapCurrency={21}
              id={5}
              name={"Ripple"}
              symbol={"XRP"}
              Affiliate={6}
              imgHref={"/PlaceHolder.svg"}
              description={"Digital payment protocol"}
              Liquidity={9}
              LockupTime={18}
              SalesStartIn={1357849}
              SalesEndIn={1958463}
              moneyRaised={88}
              currency={"XRP"}
              symbolTokenPrivateSales={"72"}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
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
          <>
            <PreSaleCards
              softCapCurrency={12}
              hardCapCurrency={18}
              id={0}
              name={"Bitcoin"}
              symbol={"BTC"}
              Affiliate={1}
              imgHref={"/PlaceHolder.svg"}
              description={"This is Crypto"}
              Liquidity={4}
              LockupTime={8}
              SalesStartIn={1658256}
              SalesEndIn={2336623}
              moneyRaised={80}
              currency={"BNB"}
              symbolTokenPrivateSales={"60"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={15}
              hardCapCurrency={20}
              id={1}
              name={"Ethereum"}
              symbol={"ETH"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The world's computer"}
              Liquidity={5}
              LockupTime={10}
              SalesStartIn={1987463}
              SalesEndIn={2873910}
              moneyRaised={100}
              currency={"ETH"}
              symbolTokenPrivateSales={"70"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={10}
              hardCapCurrency={25}
              id={2}
              name={"Cardano"}
              symbol={"ADA"}
              Affiliate={3}
              imgHref={"/PlaceHolder.svg"}
              description={"Blockchain for the future"}
              Liquidity={6}
              LockupTime={12}
              SalesStartIn={1425897}
              SalesEndIn={2047136}
              moneyRaised={90}
              currency={"ADA"}
              symbolTokenPrivateSales={"75"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={14}
              hardCapCurrency={22}
              id={3}
              name={"Solana"}
              symbol={"SOL"}
              Affiliate={4}
              imgHref={"/PlaceHolder.svg"}
              description={"High-performance"}
              Liquidity={7}
              LockupTime={14}
              SalesStartIn={1546321}
              SalesEndIn={2219874}
              moneyRaised={95}
              currency={"SOL"}
              symbolTokenPrivateSales={"80"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={2}
              hardCapCurrency={4}
              id={2}
              name={"Binance Coin"}
              symbol={"BNB"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The Binance "}
              Liquidity={2}
              LockupTime={16}
              SalesStartIn={1194852}
              SalesEndIn={1712458}
              moneyRaised={320}
              currency={"BNB"}
              symbolTokenPrivateSales={"65"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={13}
              hardCapCurrency={21}
              id={5}
              name={"Ripple"}
              symbol={"XRP"}
              Affiliate={6}
              imgHref={"/PlaceHolder.svg"}
              description={"Digital payment protocol"}
              Liquidity={9}
              LockupTime={18}
              SalesStartIn={1357849}
              SalesEndIn={1958463}
              moneyRaised={88}
              currency={"XRP"}
              symbolTokenPrivateSales={"72"}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
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
          <>
            <PreSaleCards
              softCapCurrency={12}
              hardCapCurrency={18}
              id={0}
              name={"Bitcoin"}
              symbol={"BTC"}
              Affiliate={1}
              imgHref={"/PlaceHolder.svg"}
              description={"This is Crypto"}
              Liquidity={4}
              LockupTime={8}
              SalesStartIn={1658256}
              SalesEndIn={2336623}
              moneyRaised={80}
              currency={"BNB"}
              symbolTokenPrivateSales={"60"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={15}
              hardCapCurrency={20}
              id={1}
              name={"Ethereum"}
              symbol={"ETH"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The world's computer"}
              Liquidity={5}
              LockupTime={10}
              SalesStartIn={1987463}
              SalesEndIn={2873910}
              moneyRaised={100}
              currency={"ETH"}
              symbolTokenPrivateSales={"70"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={10}
              hardCapCurrency={25}
              id={2}
              name={"Cardano"}
              symbol={"ADA"}
              Affiliate={3}
              imgHref={"/PlaceHolder.svg"}
              description={"Blockchain for the future"}
              Liquidity={6}
              LockupTime={12}
              SalesStartIn={1425897}
              SalesEndIn={2047136}
              moneyRaised={90}
              currency={"ADA"}
              symbolTokenPrivateSales={"75"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={14}
              hardCapCurrency={22}
              id={3}
              name={"Solana"}
              symbol={"SOL"}
              Affiliate={4}
              imgHref={"/PlaceHolder.svg"}
              description={"High-performance"}
              Liquidity={7}
              LockupTime={14}
              SalesStartIn={1546321}
              SalesEndIn={2219874}
              moneyRaised={95}
              currency={"SOL"}
              symbolTokenPrivateSales={"80"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={2}
              hardCapCurrency={4}
              id={2}
              name={"Binance Coin"}
              symbol={"BNB"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The Binance "}
              Liquidity={2}
              LockupTime={16}
              SalesStartIn={1194852}
              SalesEndIn={1712458}
              moneyRaised={320}
              currency={"BNB"}
              symbolTokenPrivateSales={"65"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={13}
              hardCapCurrency={21}
              id={5}
              name={"Ripple"}
              symbol={"XRP"}
              Affiliate={6}
              imgHref={"/PlaceHolder.svg"}
              description={"Digital payment protocol"}
              Liquidity={9}
              LockupTime={18}
              SalesStartIn={1357849}
              SalesEndIn={1958463}
              moneyRaised={88}
              currency={"XRP"}
              symbolTokenPrivateSales={"72"}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
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
          <>
            <PreSaleCards
              softCapCurrency={12}
              hardCapCurrency={18}
              id={0}
              name={"Bitcoin"}
              symbol={"BTC"}
              Affiliate={1}
              imgHref={"/PlaceHolder.svg"}
              description={"This is Crypto"}
              Liquidity={4}
              LockupTime={8}
              SalesStartIn={1658256}
              SalesEndIn={2336623}
              moneyRaised={80}
              currency={"BNB"}
              symbolTokenPrivateSales={"60"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={15}
              hardCapCurrency={20}
              id={1}
              name={"Ethereum"}
              symbol={"ETH"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The world's computer"}
              Liquidity={5}
              LockupTime={10}
              SalesStartIn={1987463}
              SalesEndIn={2873910}
              moneyRaised={100}
              currency={"ETH"}
              symbolTokenPrivateSales={"70"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={10}
              hardCapCurrency={25}
              id={2}
              name={"Cardano"}
              symbol={"ADA"}
              Affiliate={3}
              imgHref={"/PlaceHolder.svg"}
              description={"Blockchain for the future"}
              Liquidity={6}
              LockupTime={12}
              SalesStartIn={1425897}
              SalesEndIn={2047136}
              moneyRaised={90}
              currency={"ADA"}
              symbolTokenPrivateSales={"75"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={14}
              hardCapCurrency={22}
              id={3}
              name={"Solana"}
              symbol={"SOL"}
              Affiliate={4}
              imgHref={"/PlaceHolder.svg"}
              description={"High-performance"}
              Liquidity={7}
              LockupTime={14}
              SalesStartIn={1546321}
              SalesEndIn={2219874}
              moneyRaised={95}
              currency={"SOL"}
              symbolTokenPrivateSales={"80"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={2}
              hardCapCurrency={4}
              id={2}
              name={"Binance Coin"}
              symbol={"BNB"}
              Affiliate={2}
              imgHref={"/PlaceHolder.svg"}
              description={"The Binance "}
              Liquidity={2}
              LockupTime={16}
              SalesStartIn={1194852}
              SalesEndIn={1712458}
              moneyRaised={320}
              currency={"BNB"}
              symbolTokenPrivateSales={"65"}
              bg={"/PlaceholderCardBg.png"}
            />
            <PreSaleCards
              softCapCurrency={13}
              hardCapCurrency={21}
              id={5}
              name={"Ripple"}
              symbol={"XRP"}
              Affiliate={6}
              imgHref={"/PlaceHolder.svg"}
              description={"Digital payment protocol"}
              Liquidity={9}
              LockupTime={18}
              SalesStartIn={1357849}
              SalesEndIn={1958463}
              moneyRaised={88}
              currency={"XRP"}
              symbolTokenPrivateSales={"72"}
              bg={"/PlaceholderCardBg.png"}
            />
          </>
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

  //✅ Step8: Additional Calculations

  //🚀 Presale
  const softCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal = decimalPrivateSale && decimalPrivateSale[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.softCap / 10 ** TokenDecimal;
  });

  const hardCapPresale = dataMainPresale.map((item: any, index: number) => {
    const currentDecimal = decimalPrivateSale && decimalPrivateSale[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.hardCap / 10 ** TokenDecimal;
  });

  //🚀 Auction

  const softCapAuction = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal = decimalAuction && decimalAuction[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.softCap / 10 ** TokenDecimal;
  });

  const maxBuyAuction = dataMainAuction.map((item: any, index: number) => {
    const currentDecimal = decimalAuction && decimalAuction[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.maxBuy / 10 ** TokenDecimal;
  });

  //🚀 Fair Launch

  const softCapFair = dataMainFair.map((item: any, index: number) => {
    const currentDecimal = decimalFair && decimalFair[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.softCap / 10 ** TokenDecimal;
  });

  const maxBuyFair = dataMainFair.map((item: any, index: number) => {
    const currentDecimal = decimalFair && decimalFair[index];
    const TokenDecimal = currentDecimal || 18;
    return item?.maxBuy / 10 ** TokenDecimal;
  });
  //🚀 Subscription
  //1 / (sub rate)) * (softcap/ 10^tokendecimal)
  const softCapSub = dataMainSubscription.map((item: any, index: number) => {
    const currentDecimal = decimalSub && decimalSub[index];
    const TokenDecimal = currentDecimal || 18;
    return (1 / item.subRate) * (item?.softCap / 10 ** TokenDecimal);
  });

  const hardCapSub = dataMainSubscription.map((item: any, index: number) => {
    const currentDecimal = decimalSub && decimalSub[index];
    const TokenDecimal = currentDecimal || 18;
    return ((1 / item.subRate) * item?.hardCap) / 10 ** TokenDecimal;
  });

  // Currency Send for all
  //If purchaseToken address is not zero address then currency is purchaseToken's symbol else currency is ETH
  //🚀 Presale
  const currencyPresale = dataMainPresale.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolPrivateSale[index];
    } else {
      return "ETH";
    }
  });

  //🚀 Auction
  const currencyAuction = dataMainAuction.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolAuction[index];
    } else {
      return "ETH";
    }
  });

  //🚀 Fair Launch
  const currencyFair = dataMainFair.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolFair[index];
    } else {
      return "ETH";
    }
  });

  //🚀 Subscription
  const currencySub = dataMainSubscription.map((item: any, index: number) => {
    if (item?.purchaseToken !== "0x0000000000000000000000000000000000000000") {
      return symbolSub[index];
    } else {
      return "ETH";
    }
  });

  return (
    <BgCards>
      <div className="pt-8 pb-8 ">
        {isNaN(lengthSub) &&
        isNaN(lengthAuction) &&
        isNaN(lengthFair) &&
        isNaN(lengthPresales) ? null : (
          <>
            <select
              id="poolType"
              className="w-auto sm:w-[670px] md:w-[945px] lg:w-[960px] xl:w-[1050px] 2xl:w-[1420px] bg-gradient-to-tr from-[#2020aa]/5 to-[#6161b3]/25 border border-stone-300 text-gray-900 outline-none text-sm rounded-lg block p-1 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-gray-400 dark:text-white "
              onChange={(e) => handlePoolTypeChange(e.target.value)}
              value={poolType}
            >
              <option value="all">All</option>
              <option value="presale">Presale</option>
              <option value="fairlaunch">Fair Launch</option>
              <option value="auction">Auction</option>
              <option value="subscription">Subscription</option>
            </select>
          </>
        )}
      </div>
      <CardsWrapper>
        {poolType === "all" && (
          <>
            {isNaN(lengthSub) &&
            isNaN(lengthAuction) &&
            isNaN(lengthFair) &&
            isNaN(lengthPresales) ? (
              <>
                <PreSaleCards
                  softCapCurrency={12}
                  hardCapCurrency={18}
                  id={0}
                  name={"Bitcoin"}
                  symbol={"BTC"}
                  Affiliate={1}
                  imgHref={"/PlaceHolder.svg"}
                  description={"This is Crypto"}
                  Liquidity={4}
                  LockupTime={8}
                  SalesStartIn={1658256}
                  SalesEndIn={2336623}
                  moneyRaised={80}
                  currency={"BNB"}
                  symbolTokenPrivateSales={"60"}
                  bg={"/PlaceholderCardBg.png"}
                />
                <PreSaleCards
                  softCapCurrency={15}
                  hardCapCurrency={20}
                  id={1}
                  name={"Ethereum"}
                  symbol={"ETH"}
                  Affiliate={2}
                  imgHref={"/PlaceHolder.svg"}
                  description={"The world's computer"}
                  Liquidity={5}
                  LockupTime={10}
                  SalesStartIn={1987463}
                  SalesEndIn={2873910}
                  moneyRaised={100}
                  currency={"ETH"}
                  symbolTokenPrivateSales={"70"}
                  bg={"/PlaceholderCardBg.png"}
                />
                <PreSaleCards
                  softCapCurrency={10}
                  hardCapCurrency={25}
                  id={2}
                  name={"Cardano"}
                  symbol={"ADA"}
                  Affiliate={3}
                  imgHref={"/PlaceHolder.svg"}
                  description={"Blockchain for the future"}
                  Liquidity={6}
                  LockupTime={12}
                  SalesStartIn={1425897}
                  SalesEndIn={2047136}
                  moneyRaised={90}
                  currency={"ADA"}
                  symbolTokenPrivateSales={"75"}
                  bg={"/PlaceholderCardBg.png"}
                />
                <PreSaleCards
                  softCapCurrency={14}
                  hardCapCurrency={22}
                  id={3}
                  name={"Solana"}
                  symbol={"SOL"}
                  Affiliate={4}
                  imgHref={"/PlaceHolder.svg"}
                  description={"High-performance"}
                  Liquidity={7}
                  LockupTime={14}
                  SalesStartIn={1546321}
                  SalesEndIn={2219874}
                  moneyRaised={95}
                  currency={"SOL"}
                  symbolTokenPrivateSales={"80"}
                  bg={"/PlaceholderCardBg.png"}
                />
                <PreSaleCards
                  softCapCurrency={2}
                  hardCapCurrency={4}
                  id={2}
                  name={"Binance Coin"}
                  symbol={"BNB"}
                  Affiliate={2}
                  imgHref={"/PlaceHolder.svg"}
                  description={"The Binance "}
                  Liquidity={2}
                  LockupTime={16}
                  SalesStartIn={1194852}
                  SalesEndIn={1712458}
                  moneyRaised={320}
                  currency={"BNB"}
                  symbolTokenPrivateSales={"65"}
                  bg={"/PlaceholderCardBg.png"}
                />
                <PreSaleCards
                  softCapCurrency={13}
                  hardCapCurrency={21}
                  id={5}
                  name={"Ripple"}
                  symbol={"XRP"}
                  Affiliate={6}
                  imgHref={"/PlaceHolder.svg"}
                  description={"Digital payment protocol"}
                  Liquidity={9}
                  LockupTime={18}
                  SalesStartIn={1357849}
                  SalesEndIn={1958463}
                  moneyRaised={88}
                  currency={"XRP"}
                  symbolTokenPrivateSales={"72"}
                  bg={"/PlaceholderCardBg.png"}
                />
              </>
            ) : (
              <>
                {dataMainPresale.map((item: any, index: any) => {
                  const idWeb3Presale = index + 1;
                  const matchingIndex = idWeb2Presale.indexOf(idWeb3Presale);
                  return (
                    <PreSaleCards
                      key={index || 0}
                      softCapCurrency={softCapPresale[index] || 0}
                      hardCapCurrency={hardCapPresale[index] || 0}
                      id={index || 0}
                      name={namePrivateSale[index] || "Purple Sale"}
                      symbol={symbolPrivateSale[index] || "PURPLE"}
                      Affiliate={item?.affiliateRate || 0}
                      imgHref={
                        matchingIndex !== -1
                          ? web2DataPresale[matchingIndex]?.logoUrl
                          : "/PlaceHolder.svg"
                      }
                      description={dataMainPresale[index]?.presaleRate || 0}
                      Liquidity={item?.liquidityAdditionPercent || 0}
                      LockupTime={item?.liquidityUnlockTime || 0}
                      SalesStartIn={item?.startTime || 0}
                      SalesEndIn={item?.endTime || 0}
                      moneyRaised={item?.moneyRaised || 0}
                      currency={currencyPresale[index] || "ETH"}
                      symbolTokenPrivateSales={symbolTokenPrivateSale[index]}
                      bg={
                        matchingIndex !== -1
                          ? web2DataPresale[matchingIndex]?.bgLogoUrl
                          : "/PlaceholderCardBg.png"
                      }
                    />
                  );
                })}
                {dataMainFair.map((item: any, index: any) => {
                  const idWeb3Fair = index + 1;
                  const matchingIndex = idWeb2Fair.indexOf(idWeb3Fair);
                  return (
                    <FairLaunchCards
                      key={index || 0}
                      maxBuyFair={maxBuyFair[index] || 0}
                      softCapCurrency={softCapFair[index] || 0}
                      Affiliate={item.affiliateRate || 0}
                      imgHref={
                        matchingIndex !== -1
                          ? web2DataFair[matchingIndex]?.logoUrl
                          : "/PlaceHolder.svg"
                      }
                      Liquidity={item?.liquidityAdditionPercent || 0}
                      LockupTime={item?.liquidityUnlockTime || 0}
                      SalesStartIn={item?.startTime || 0}
                      SalesEndIn={item?.endTime || 0}
                      moneyRaised={item?.moneyRaised || 0}
                      id={index || 0}
                      name={nameFair[index] || "Purple Sale"}
                      symbol={symbolFair[index] || "PURPLE"}
                      currency={currencyFair[index] || "ETH"}
                      bg={
                        matchingIndex !== -1
                          ? web2DataFair[matchingIndex]?.bgLogoUrl
                          : "/PlaceholderCardBg.png"
                      }
                    />
                  );
                })}

                {dataMainAuction.map((item: any, index: any) => {
                  const idWeb3Auction = index + 1;
                  const matchingIndex = idWeb2Auction.indexOf(idWeb3Auction);
                  return (
                    <DutchAuctionCards
                      key={index || 0}
                      maxBuyFair={maxBuyAuction[index] || 0}
                      softCapCurrency={softCapAuction[index] || 0}
                      id={index || 0}
                      imgHref={
                        matchingIndex !== -1
                          ? web2DataAuction[matchingIndex]?.logoUrl
                          : "/PlaceHolder.svg"
                      }
                      Liquidity={item?.liquidityAdditionPercent || 0}
                      LockupTime={item?.liquidityUnlockTime || 0}
                      SalesStartIn={item?.startTime || 0}
                      SalesEndIn={item?.endTime || 0}
                      moneyRaised={item?.moneyRaised || 0}
                      name={nameAuction[index] || "Purple Sale"}
                      symbol={symbolAuction[index] || "PURPLE"}
                      currency={currencyAuction[index] || "ETH"}
                      bg={
                        matchingIndex !== -1
                          ? web2DataAuction[matchingIndex]?.bgLogoUrl
                          : "/PlaceholderCardBg.png"
                      }
                    />
                  );
                })}

                {dataMainSubscription.map((item: any, index: any) => {
                  const idWeb3Subscription = index + 1;
                  const matchingIndex =
                    idWeb2Subscription.indexOf(idWeb3Subscription);
                  return (
                    <SubscriptionCards
                      key={index || 0}
                      softCapCurrency={softCapSub[index] || 0}
                      hardCapCurrency={hardCapSub[index] || 0}
                      id={index || 0}
                      imgHref={
                        matchingIndex !== -1
                          ? web2DataSubscription[matchingIndex]?.logoUrl
                          : "/PlaceHolder.svg"
                      }
                      moneyRaised={item?.moneyRaised || 0}
                      liquidity={item?.liquidityAdditionPercent || 0}
                      lockupTime={item?.liquidityUnlockTime || 0}
                      salesStartIn={item?.startTime || 0}
                      salesEndIn={item?.endTime || 0}
                      name={nameSub[index] || "Purple Sale"}
                      symbol={symbolSub[index] || "PURPLE"}
                      currency={currencySub[index] || "ETH"}
                      bg={
                        matchingIndex !== -1
                          ? web2DataSubscription[matchingIndex]?.bgLogoUrl
                          : "/PlaceholderCardBg.png"
                      }
                    />
                  );
                })}
              </>
            )}
          </>
        )}

        {poolType === "presale" && (
          <>
            {dataMainPresale.map((item: any, index: any) => {
              const idWeb3Presale = index + 1;
              const matchingIndex = idWeb2Presale.indexOf(idWeb3Presale);
              return (
                <PreSaleCards
                  key={index}
                  softCapCurrency={softCapPresale[index] || 0}
                  hardCapCurrency={hardCapPresale[index] || 0}
                  id={index || 0}
                  name={namePrivateSale[index] || "Purple Sale"}
                  symbol={symbolPrivateSale[index] || "PURPLE"}
                  Affiliate={item.affiliateRate || 0}
                  imgHref={
                    matchingIndex !== -1
                      ? web2DataPresale[matchingIndex]?.logoUrl
                      : "/PlaceHolder.svg"
                  }
                  description={dataMainPresale[index]?.presaleRate || 0}
                  Liquidity={item?.liquidityAdditionPercent || 0}
                  LockupTime={item?.liquidityUnlockTime || 0}
                  SalesStartIn={item?.startTime || 0}
                  SalesEndIn={item?.endTime || 0}
                  moneyRaised={item?.moneyRaised || 0}
                  currency={currencyPresale[index] || "ETH"}
                  symbolTokenPrivateSales={symbolTokenPrivateSale[index]}
                  bg={
                    matchingIndex !== -1
                      ? web2DataPresale[matchingIndex]?.bgLogoUrl
                      : "/PlaceholderCardBg.png"
                  }
                />
              );
            })}
          </>
        )}

        {poolType === "fairlaunch" && (
          <>
            {dataMainFair.map((item: any, index: any) => {
              const idWeb3Fair = index + 1;
              const matchingIndex = idWeb2Fair.indexOf(idWeb3Fair);
              return (
                <FairLaunchCards
                  key={index}
                  maxBuyFair={maxBuyFair[index] || 0}
                  softCapCurrency={softCapFair[index] || 0}
                  Affiliate={item.affiliateRate || 0}
                  imgHref={
                    matchingIndex !== -1
                      ? web2DataFair[matchingIndex]?.logoUrl
                      : "/PlaceHolder.svg"
                  }
                  Liquidity={item?.liquidityAdditionPercent || 0}
                  LockupTime={item?.liquidityUnlockTime || 0}
                  SalesStartIn={item?.startTime || 0}
                  SalesEndIn={item?.endTime || 0}
                  moneyRaised={item?.moneyRaised || 0}
                  id={index || 0}
                  name={nameFair[index] || "Purple Sale"}
                  symbol={symbolFair[index] || "PURPLE"}
                  currency={currencyFair[index] || "ETH"}
                  bg={
                    matchingIndex !== -1
                      ? web2DataFair[matchingIndex]?.bgLogoUrl
                      : "/PlaceholderCardBg.png"
                  }
                />
              );
            })}
          </>
        )}

        {poolType === "auction" && (
          <>
            {dataMainAuction.map((item: any, index: any) => {
              const idWeb3Auction = index + 1;
              const matchingIndex = idWeb2Auction.indexOf(idWeb3Auction);
              return (
                <DutchAuctionCards
                  key={index || 0}
                  maxBuyFair={maxBuyAuction[index] || 0}
                  softCapCurrency={softCapAuction[index] || 0}
                  id={index || 0}
                  imgHref={
                    matchingIndex !== -1
                      ? web2DataAuction[matchingIndex]?.logoUrl
                      : "/PlaceHolder.svg"
                  }
                  Liquidity={item?.liquidityAdditionPercent || 0}
                  LockupTime={item?.liquidityUnlockTime || 0}
                  SalesStartIn={item?.startTime || 0}
                  SalesEndIn={item?.endTime || 0}
                  moneyRaised={item?.moneyRaised || 0}
                  name={nameAuction[index] || "Purple Sale"}
                  symbol={symbolAuction[index] || "PURPLE"}
                  currency={currencyAuction[index] || "ETH"}
                  bg={
                    matchingIndex !== -1
                      ? web2DataAuction[matchingIndex]?.bgLogoUrl
                      : "/PlaceholderCardBg.png"
                  }
                />
              );
            })}
          </>
        )}
        {poolType === "subscription" && (
          <>
            {dataMainSubscription.map((item: any, index: any) => {
              const idWeb3Subscription = index + 1;
              const matchingIndex =
                idWeb2Subscription.indexOf(idWeb3Subscription);
              return (
                <SubscriptionCards
                  key={index || 0}
                  softCapCurrency={softCapSub[index] || 0}
                  hardCapCurrency={hardCapSub[index] || 0}
                  id={index || 0}
                  imgHref={
                    matchingIndex !== -1
                      ? web2DataSubscription[matchingIndex]?.logoUrl
                      : "/PlaceHolder.svg"
                  }
                  moneyRaised={item?.moneyRaised || 0}
                  liquidity={item?.liquidityAdditionPercent || 0}
                  lockupTime={item?.liquidityUnlockTime || 0}
                  salesStartIn={item?.startTime || 0}
                  salesEndIn={item?.endTime || 0}
                  name={nameSub[index] || "Purple Sale"}
                  symbol={symbolSub[index] || "PURPLE"}
                  currency={currencySub[index] || "ETH"}
                  bg={
                    matchingIndex !== -1
                      ? web2DataSubscription[matchingIndex]?.bgLogoUrl
                      : "/PlaceholderCardBg.png"
                  }
                />
              );
            })}
          </>
        )}
      </CardsWrapper>
    </BgCards>
  );
};

export default dynamic(() => Promise.resolve(All), { ssr: false });
