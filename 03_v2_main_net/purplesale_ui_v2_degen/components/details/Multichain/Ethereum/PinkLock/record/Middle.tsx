import BgPinklockToken from "@/components/TailwindWrapper/PinklockToken/BgPinkLock";
import React from "react";
interface Props {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
}
const MiddleBox: React.FC<Props> = ({
  tokenAddress,
  tokenName,
  tokenSymbol,
  tokenDecimals,
}) => {
  return (
    <BgPinklockToken>
      <div className="border-b-2 dark:border-stone-900 border-stone-100">
        <h1 className="text-lg mb-2 dark:text-gray-200 text-neutral-800 ">
          Token Info
        </h1>
      </div>
      <div className="flex gap0-12 justify-between break-all mt-4 mb-8">
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
      <div className="flex gap0-12 justify-between break-all mb-8">
        <p>Token Decimals</p>
        <p>{tokenDecimals}</p>
      </div>
    </BgPinklockToken>
  );
};

export default MiddleBox;