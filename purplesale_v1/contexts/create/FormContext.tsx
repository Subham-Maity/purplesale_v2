import React from "react";

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

export interface vestingProps {
  enabled: boolean;
  firstReleasePercentage: 0;
  vestingPeriod: 0;
  cycleReleasePercentage: 0;
}

export interface FormContextState {
  tokenAddress: string;
  userAddress: string;
  isAffiliateEnabled: number;
  currency: string;
  feeOption: string;
  tokenDetails: TokenDetails;
  refundType: string;
  routerSelect: string;
  infoData: InfoData;
  whitelist: boolean;
  isDarkTheme: boolean;
  vesting: vestingProps;
  selectedListingOption: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  facebook: string;
  twitter: string;
  github: string;
  telegram: string;
  instagram: string;
  discord: string;
  reddit: string;
  youtube: string;
  airDrop: string;
  title: string;
}

export interface FormContextDispatch {
  setTokenAddress: React.Dispatch<React.SetStateAction<string>>;
  setUserAddress: React.Dispatch<React.SetStateAction<string>>;
  setIsAffiliateEnabled: React.Dispatch<React.SetStateAction<number>>;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  setFeeOption: React.Dispatch<React.SetStateAction<string>>;
  setTokenDetails: React.Dispatch<React.SetStateAction<TokenDetails>>;
  setRefundType: React.Dispatch<React.SetStateAction<string>>;
  setRouterSelect: React.Dispatch<React.SetStateAction<string>>;
  setInfoData: React.Dispatch<React.SetStateAction<InfoData>>;
  setWhitelist: React.Dispatch<React.SetStateAction<boolean>>;
  setVesting: React.Dispatch<React.SetStateAction<vestingProps>>;
  setSelectedListingOption: React.Dispatch<React.SetStateAction<string>>;
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  setLogoUrl: React.Dispatch<React.SetStateAction<string>>;
  setWebsiteUrl: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFacebook: React.Dispatch<React.SetStateAction<string>>;
  setTwitter: React.Dispatch<React.SetStateAction<string>>;
  setGithub: React.Dispatch<React.SetStateAction<string>>;
  setTelegram: React.Dispatch<React.SetStateAction<string>>;
  setInstagram: React.Dispatch<React.SetStateAction<string>>;
  setDiscord: React.Dispatch<React.SetStateAction<string>>;
  setReddit: React.Dispatch<React.SetStateAction<string>>;
  setYoutube: React.Dispatch<React.SetStateAction<string>>;
  setAirdrop: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

type FormContextProps = FormContextState & FormContextDispatch;

const defaultTokenDetails: TokenDetails = {
  name: "",
  symbol: "",
  decimals: 0,
};

const defaultInfoData: InfoData = {
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
};

const vestingData: vestingProps = {
  enabled: false,
  firstReleasePercentage: 0,
  vestingPeriod: 0,
  cycleReleasePercentage: 0,
};

const defaultDispatch: FormContextDispatch = {
  setTokenAddress: () => {},
  setUserAddress: () => {},
  setIsAffiliateEnabled: () => {},
  setCurrency: () => {},
  setFeeOption: () => {},
  setTokenDetails: () => {},
  setRefundType: () => {},
  setRouterSelect: () => {},
  setInfoData: () => {},
  setWhitelist: () => {},
  setVesting: () => {},
  setSelectedListingOption: () => {},
  setIsDarkTheme: () => {},
  setLogoUrl: () => {},
  setWebsiteUrl: () => {},
  setDescription: () => {},
  setFacebook: () => {},
  setTwitter: () => {},
  setGithub: () => {},
  setTelegram: () => {},
  setInstagram: () => {},
  setDiscord: () => {},
  setReddit: () => {},
  setYoutube: () => {},
  setAirdrop: () => {},
  setTitle: () => {},
};

const defaultFormContext: FormContextProps = {
  ...defaultDispatch,
  tokenAddress: "",
  userAddress: "",
  isAffiliateEnabled: 0,
  currency: "",
  feeOption: "",
  tokenDetails: defaultTokenDetails,
  refundType: "",
  routerSelect: "",
  infoData: defaultInfoData,
  whitelist: false,
  isDarkTheme: false,
  vesting: vestingData,
  selectedListingOption: "auto",
  logoUrl: "",
  websiteUrl: "",
  description: "",
  facebook: "",
  twitter: "",
  github: "",
  telegram: "",
  instagram: "",
  discord: "",
  reddit: "",
  youtube: "",
  airDrop: "",
  title: "",
};

const FormContext = React.createContext<FormContextProps>(defaultFormContext);

export default FormContext;
