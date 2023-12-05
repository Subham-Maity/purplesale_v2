import React from "react";

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
    <div className="flex justify-center items-center mt-12">
      <div className="dark:bg-[#242525] lg:w-[1060px] text-sm bg-stone-50 rounded-md p-8 mb-4">
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
      </div>
    </div>
  );
};

export default TopBox;
