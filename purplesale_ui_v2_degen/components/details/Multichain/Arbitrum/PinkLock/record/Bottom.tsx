import BgPinklockToken from "@/components/TailwindWrapper/PinklockToken/BgPinkLock";
import React from "react";
interface Props {
  title: string;
  totalAmountLocked: number;
  totalValueLocked: number;
  owner: string;
  unlockDate: string;
  tokenSymbol: string;
}
const BottomBox: React.FC<Props> = ({
  title,
  totalAmountLocked,
  tokenSymbol,
  totalValueLocked,
  owner,
  unlockDate,
}) => {
  return (
    <BgPinklockToken>
      <div className="border-b-2 dark:border-stone-900 border-stone-100">
        <h1 className="text-lg mb-2 dark:text-gray-200 text-neutral-800 ">
          Lock info
        </h1>
      </div>
      <div className="flex gap0-12 justify-between break-all mb-8">
        <p>Title</p>
        <p>{title}</p>
      </div>
      <div className="flex gap0-12 justify-between break-all mb-8">
        <p>Total Amount Locked</p>
        <p>
          {totalAmountLocked} {tokenSymbol}
        </p>
      </div>

      <div className="flex gap0-12 justify-between break-all mb-8">
        <p>Owner</p>
        <p>{owner}</p>
      </div>

      <div className="flex gap0-12 justify-between break-all ">
        <p>Unlock Date</p>
        <p>{unlockDate}</p>
      </div>
    </BgPinklockToken>
  );
};

export default BottomBox;
