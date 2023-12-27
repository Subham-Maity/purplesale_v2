import React, { useState } from "react";
import FormContext, {
  FormContextDispatch,
  FormContextState,
  vestingProps,
} from "./FormContext"; // Import the FormContext and types

export interface TokenDetails {
  name: string;
  symbol: string;
  decimals: number;
}

export interface InfoData {
  softCap: number;
  hardCap: number;
  perSaleRate: number;
  minimumBuy: number;
  maximumBuy: number;
  liquidity: number;
  listingRate: number;
  liquidityLockup: number;
  startDate: string;
  endDate: string;
  ApeSwap: number;
  buybackPercentage: number;
  maxContribution: number;
  hardCapTokens: number;
  softCapTokens: number;
  hardCapTokenPerUser: number;
  subRate: number;
  liquidityAdditionPercent: number;
  liquidityUnlockTime: number;
  tokensToSell: number;
  startPrice: number;
  endPrice: number;
  minContribution: number;
  decreasePriceCycle: number;
  liquidityPercent: number;
  tgereleasePercentage: number;
  cycle: number;
  cycleReleasePercentage: number;
  title: string;
  firstReleasePercentage: number;
  vestingPeriod: number;
  fundReleaseEachCycle: number;
  lockUntil: string;
  cycleReleasePercent: number;
  cycleDays: number;
  tgePercent: number;
  tgeDate: string;
  amount: number;
  owner: string;
  refundType: string;
  affiliateProgram: number;
  selectedListingOption: string;
  totalSupply: number;
  tfToGenYield: number;
  tfToGenLiquidity: number;
  charityAddress: string;
  charityPercentage: number;
  rewardToken: string;
  minTokenBalanceDividend: number;
  tokenRewardFee: number;
  marketingFee: number;
  autoAddLiquidity: number;
  marketingWallet: string;
  reflectionFee: number;
  buybackFee: number;
  amountLimitPerTrade: number;
  amountToBeAddedPerBlock: number;
  timeLimitPerTrade: number;
  blockNumberToDisableAntiBot: number;
  antiBotName: string;
  antiBotSymbol: string;
  antiBotDecimals: number;
  createTokenName: string;
  createTokenSymbol: string;
  createTokenDecimals: number;
  buyBackBabyTokenName: string;
  buyBackBabyTokenSymbol: string;
  liquidityGeneratorTokenName: string;
  liquidityGeneratorTokenSymbol: string;
  liquidityFeeBps: number;
  launchpadDetailsAmount: number;
  userWalletAddress: string;
}

interface FormProviderProps {
  children: React.ReactNode;
}

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [isAffiliateEnabled, setIsAffiliateEnabled] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("");
  const [feeOption, setFeeOption] = useState<string>("");
  const [selectedListingOption, setSelectedListingOption] =
    useState<string>("auto");
  const [tokenDetails, setTokenDetails] = useState<TokenDetails>({
    name: "",
    symbol: "",
    decimals: 0,
  });
  const [whitelist, setWhitelist] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [refundType, setRefundType] = useState<string>("");
  const [routerSelect, setRouterSelect] = useState<string>("");
  const [infoData, setInfoData] = useState<InfoData>({
    softCap: 0,
    hardCap: 0,
    perSaleRate: 0,
    minimumBuy: 0,
    maximumBuy: 0,
    liquidity: 0,
    listingRate: 0,
    liquidityLockup: 0,
    startDate: "",
    endDate: "",
    ApeSwap: 0,
    buybackPercentage: 0,
    maxContribution: 0,
    hardCapTokens: 0,
    softCapTokens: 0,
    hardCapTokenPerUser: 0,
    subRate: 0,
    liquidityAdditionPercent: 0,
    liquidityUnlockTime: 0,
    tokensToSell: 0,
    startPrice: 0,
    endPrice: 0,
    minContribution: 0,
    decreasePriceCycle: 0,
    liquidityPercent: 0,
    tgereleasePercentage: 0,
    cycle: 0,
    cycleReleasePercentage: 0,
    title: "",
    firstReleasePercentage: 0,
    vestingPeriod: 0,
    fundReleaseEachCycle: 0,
    lockUntil: "",
    cycleReleasePercent: 0,
    cycleDays: 0,
    tgePercent: 0,
    tgeDate: "",
    amount: 0,
    owner: "",
    refundType: "Burn",
    affiliateProgram: 0,
    selectedListingOption: "auto",
    totalSupply: 0,
    tfToGenYield: 0,
    tfToGenLiquidity: 0,
    charityAddress: "",
    charityPercentage: 0,
    rewardToken: "",
    minTokenBalanceDividend: 0,
    tokenRewardFee: 0,
    marketingFee: 0,
    autoAddLiquidity: 0,
    marketingWallet: "",
    reflectionFee: 0,
    buybackFee: 0,
    amountLimitPerTrade: 0,
    amountToBeAddedPerBlock: 0,
    timeLimitPerTrade: 0,
    blockNumberToDisableAntiBot: 0,
    antiBotName: "",
    antiBotSymbol: "",
    antiBotDecimals: 0,
    createTokenName: "",
    createTokenSymbol: "",
    createTokenDecimals: 0,
    buyBackBabyTokenName: "",
    buyBackBabyTokenSymbol: "",
    liquidityGeneratorTokenName: "",
    liquidityGeneratorTokenSymbol: "",
    liquidityFeeBps: 0,
    launchpadDetailsAmount: 0,
    userWalletAddress: "",
  });
  const [vesting, setVesting] = useState<vestingProps>({
    enabled: false,
    firstReleasePercentage: 0,
    vestingPeriod: 0,
    cycleReleasePercentage: 0,
  });
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [reddit, setReddit] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [airDrop, setAirdrop] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const formContextState: FormContextState = {
    tokenAddress,
    userAddress,
    isAffiliateEnabled,
    currency,
    feeOption,
    tokenDetails,
    refundType,
    routerSelect,
    infoData,
    selectedListingOption,
    whitelist,
    isDarkTheme,
    vesting,
    logoUrl,
    websiteUrl,
    description,
    facebook,
    twitter,
    github,
    telegram,
    instagram,
    discord,
    reddit,
    youtube,
    airDrop,
    title,
  };

  const formContextDispatch: FormContextDispatch = {
    setTokenAddress,
    setUserAddress,
    setIsAffiliateEnabled,
    setCurrency,
    setFeeOption,
    setTokenDetails,
    setRefundType,
    setRouterSelect,
    setInfoData,
    setSelectedListingOption,
    setWhitelist,
    setIsDarkTheme,
    setVesting,
    setLogoUrl,
    setWebsiteUrl,
    setDescription,
    setFacebook,
    setTwitter,
    setGithub,
    setTelegram,
    setInstagram,
    setDiscord,
    setReddit,
    setYoutube,
    setAirdrop,
    setTitle,
  };

  return (
    <FormContext.Provider
      value={{ ...formContextState, ...formContextDispatch }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
