import React from "react";
import BgPinklockToken from "@/components/TailwindWrapper/PinklockToken/BgPinkLock";

interface Props {
  lockedAmount: number;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
}

const TopBox: React.FC<Props> = ({
  lockedAmount,
  tokenAddress,
  tokenName,
  tokenSymbol,
  tokenDecimals,
}) => {
  return (
    <BgPinklockToken>
      <div className="border-b-2 dark:border-stone-900 border-stone-100">
        <h1 className="text-lg mb-2 dark:text-gray-200 text-neutral-800 ">
          Lock info
        </h1>
      </div>
      <div className="flex gap0-12 justify-between break-all mb-8">
        <p>Current Locked Amount</p>
        <p>
          {lockedAmount} {tokenSymbol}
        </p>
      </div>
      <div className="flex gap0-12 justify-between break-all mb-8">
        <p>Token Address</p>
        <p>{tokenAddress}</p>
      </div>
      <div className="flex gap0-12 justify-between break-all mb-8">
        <p>Token Name</p>
        <p>{tokenName}</p>
      </div>
      <div className="flex gap0-12 justify-between break-all mb-8">
        <p>Token Symbol</p>
        <p> {tokenSymbol}</p>
      </div>
      <div className="flex gap0-12 justify-between break-all ">
        <p>Token Decimals</p>
        <p>{tokenDecimals}</p>
      </div>
    </BgPinklockToken>
  );
};

export default TopBox;
